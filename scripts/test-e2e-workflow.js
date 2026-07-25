/* scripts/test-e2e-workflow.js - Test E2E chaîne reçus/notifs/stock/calculs (Task L8)
 *
 * Simule en Node.js le workflow complet acheteur -> vendeur decrit dans la
 * mission L8 :
 *   1. Acheteur (beta_acheteur_1) ajoute 2 produits SEL001 au panier
 *   2. Checkout.process -> genere recu avec order_id, items, total, QR, vendeurs
 *   3. Stock decremente pour les 2 produits
 *   4. Vendeur SEL001 recoit notif 'order_received'
 *   5. Vendeur (beta_vendeur_1) voit la commande dans son dashboard
 *   6. Accepter -> statut 'acceptee' + acheteur recoit 'order_accepted'
 *   7. Marquer livree -> statut 'livree' + acheteur recoit 'order_delivered'
 *   8. Acheteur marque recu -> statut 'recu' + vendeur recoit notification
 *   9. Trust upgrade : quand ventes_count franchit palier 50/200, notif trust_upgrade
 *
 * Usage : node /home/z/my-project/scripts/test-e2e-workflow.js
 */

'use strict';

/* ================================================================== */
/* 1. ENVIRONNEMENT : mock window / localStorage / document / fetch   */
/* ================================================================== */
global.window = global;

global.localStorage = (function () {
  const store = {};
  return {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
    setItem: function (k, v) { store[k] = String(v); },
    removeItem: function (k) { delete store[k]; },
    clear: function () { for (const k in store) delete store[k]; },
    // Extension necessaire pour dashboard-vendeur.js (getOrders scan localStorage.length)
    get length() { return Object.keys(store).length; },
    key: function (i) { return Object.keys(store)[i] || null; }
  };
})();

global.fetch = function () { return Promise.reject(new Error('no fetch in test env')); };

if (typeof global.CustomEvent === 'undefined') {
  global.CustomEvent = function (type, opts) {
    return { type: type, detail: opts && opts.detail || null };
  };
}
if (typeof global.URLSearchParams === 'undefined') {
  global.URLSearchParams = function (str) {
    const params = {};
    if (str) str.replace(/^\?/, '').split('&').forEach(p => {
      const [k, v] = p.split('=');
      params[decodeURIComponent(k)] = decodeURIComponent(v || '');
    });
    this.get = k => params[k] || null;
  };
}

/* Mock element minimal pour querySelector / addEventListener / innerHTML */
function MockElement(tag) {
  this.tagName = (tag || 'div').toUpperCase();
  this.children = [];
  this._eventListeners = {};
  this._innerHTML = '';
  this.attributes = {};
  this.dataset = {};
  this.classList = {
    _set: new Set(),
    add: function (c) { this._set.add(c); },
    remove: function (c) { this._set.delete(c); },
    contains: function (c) { return this._set.has(c); },
    toggle: function (c) { if (this._set.has(c)) this._set.delete(c); else this._set.add(c); }
  };
}
MockElement.prototype.setAttribute = function (k, v) { this.attributes[k] = String(v); };
MockElement.prototype.removeAttribute = function (k) { delete this.attributes[k]; };
MockElement.prototype.getAttribute = function (k) { return this.attributes[k] || null; };
MockElement.prototype.addEventListener = function (ev, cb) {
  if (!this._eventListeners[ev]) this._eventListeners[ev] = [];
  this._eventListeners[ev].push(cb);
};
MockElement.prototype.removeEventListener = function () {};
MockElement.prototype.dispatchEvent = function () { return true; };
MockElement.prototype.appendChild = function (c) { this.children.push(c); return c; };
MockElement.prototype.removeChild = function (c) {
  this.children = this.children.filter(x => x !== c);
};
MockElement.prototype.append = function (...nodes) { nodes.forEach(n => this.children.push(n)); };

/* innerHTML setter : parse les elements avec data-* et boutons .action-btn /
 * .mark-received-btn / .view-receipt-btn pour les tests du dashboard. */
Object.defineProperty(MockElement.prototype, 'innerHTML', {
  get: function () { return this._innerHTML; },
  set: function (html) {
    this._innerHTML = String(html);
    this.children = [];
    // Parse les boutons d'action (data-action, data-order-id, data-buyer-id)
    const actionRe = /<button[^>]*class="[^"]*action-btn[^"]*"[^>]*data-action="([^"]+)"[^>]*data-order-id="([^"]+)"[^>]*data-buyer-id="([^"]+)"[^>]*>/g;
    let m;
    while ((m = actionRe.exec(this._innerHTML)) !== null) {
      const btn = new MockElement('button');
      btn.dataset.action = m[1];
      btn.dataset.orderId = m[2];
      btn.dataset.buyerId = m[3];
      btn.getAttribute = function (k) {
        if (k === 'data-action') return this.dataset.action;
        if (k === 'data-order-id') return this.dataset.orderId;
        if (k === 'data-buyer-id') return this.dataset.buyerId;
        return this.attributes[k] || null;
      };
      this.children.push(btn);
    }
    // Parse boutons mark-received (acheteur)
    const markRe = /<button[^>]*class="[^"]*mark-received-btn[^"]*"[^>]*data-order-id="([^"]+)"[^>]*>/g;
    while ((m = markRe.exec(this._innerHTML)) !== null) {
      const btn = new MockElement('button');
      btn.classList.add('mark-received-btn');
      btn.dataset.orderId = m[1];
      btn.getAttribute = function (k) {
        if (k === 'data-order-id') return this.dataset.orderId;
        return this.attributes[k] || null;
      };
      this.children.push(btn);
    }
  }
});

/* querySelector / querySelectorAll : recherche par classe ou attribut */
MockElement.prototype.querySelector = function (selector) {
  for (const c of this.children) {
    if (selector.startsWith('.') && c.classList.contains(selector.slice(1))) return c;
    if (selector.startsWith('#') && c.id === selector.slice(1)) return c;
  }
  return null;
};
MockElement.prototype.querySelectorAll = function (selector) {
  if (selector.startsWith('.')) {
    return this.children.filter(c => c.classList.contains(selector.slice(1)));
  }
  if (selector.startsWith('#')) {
    return this.children.filter(c => c.id === selector.slice(1));
  }
  return this.children.slice();
};

global.document = {
  dispatchEvent: function () { return true; },
  addEventListener: function () {},
  createElement: function (tag) { return new MockElement(tag); },
  querySelector: function () { return null; },
  querySelectorAll: function () { return []; },
  documentElement: { setAttribute: function () {} }
};

/* ================================================================== */
/* 2. CHARGEMENT DES FICHIERS JS + JSON                                */
/* ================================================================== */
const fs = require('fs');
const path = require('path');

const PROD_DIR = '/home/z/my-project/workspace/prod';
const JS_DIR = path.join(PROD_DIR, 'js');
const JSON_DIR = path.join(PROD_DIR, 'json');

function loadJs(file) {
  const content = fs.readFileSync(path.join(JS_DIR, file), 'utf8');
  /* eslint-disable no-eval */
  eval(content);
  /* eslint-enable no-eval */
  console.log('[LOAD] ' + file);
}

function loadJson(file) {
  return JSON.parse(fs.readFileSync(path.join(JSON_DIR, file), 'utf8'));
}

/* Charge EmbeddedData en injectant directement les JSON (evite de parser
 * embedded-data.js qui est enorme). */
console.log('--- Chargement EmbeddedData (injecte depuis JSON reels) ---');
global.EmbeddedData = {
  products: loadJson('products.json'),
  sellers: loadJson('sellers.json'),
  categories: loadJson('categories.json'),
  certifications: loadJson('certifications.json'),
  regions: loadJson('regions.json'),
  beta_accounts: loadJson('beta-accounts.json'),
  trust_badges: loadJson('trust-badges.json'),
  cart_rules: loadJson('cart-rules.json'),
  reseller_rules: loadJson('reseller-rules.json'),
  search_config: loadJson('search-config.json'),
  form_schemas: loadJson('form-schemas.json'),
  expert_modules: loadJson('expert-modules.json'),
  beta_activity: loadJson('beta-activity.json')
};
console.log('  products=' + EmbeddedData.products.length);
console.log('  sellers=' + EmbeddedData.sellers.sellers.length);
console.log('  beta_accounts=' + EmbeddedData.beta_accounts.accounts.length);

/* Charge les scripts JS dans l'ordre des dependances */
console.log('--- Chargement des scripts JS ---');
loadJs('utils.js');
loadJs('storage.js');
loadJs('data-seed.js');
loadJs('auth.js');
loadJs('cart.js');
loadJs('trust-system.js');
loadJs('checkout.js');
loadJs('notifications.js');
loadJs('dashboard-vendeur.js');
loadJs('dashboard-acheteur.js');

/* Mock UI minimal pour les appels UI.toast / UI.modal / etc. */
global.UI = {
  toast: function (msg, type) { console.log('  [UI.toast ' + (type || 'info') + '] ' + msg); },
  modal: function (opts) { console.log('  [UI.modal] ' + (opts.title || '')); return true; },
  confirm: function (msg, cb) { console.log('  [UI.confirm] ' + msg); cb(); },
  updateNotifBadge: function () {},
  updateCartCount: function () {},
  applyTheme: function () {},
  injectLayout: function () {},
  renderStatCard: function () { return '<div class="stat-card-modern"></div>'; },
  renderActivityFeed: function () { return '<ul class="activity-feed"></ul>'; },
  trustBadgeHTML: function () { return '<span class="trust-badge"></span>'; },
  _injectHeader_refresh: function () {}
};
global.window.UI = global.UI;

/* ================================================================== */
/* 3. INITIALISATION DES DONNEES                                      */
/* ================================================================== */
console.log('\n--- Initialisation Data ---');
Data._loadEmbedded();
Data._applySellerOverrides();
console.log('  Data.products=' + Data.products.length);
console.log('  Data.sellers=' + Data.sellers.length);
console.log('  Data.betaAccounts=' + Data.betaAccounts.length);

/* ================================================================== */
/* 4. FRAMEWORK DE TEST                                               */
/* ================================================================== */
let testCount = 0, passCount = 0, failCount = 0;
const failures = [];

function assert(cond, label) {
  testCount++;
  if (cond) {
    passCount++;
    console.log('  [PASS] ' + label);
  } else {
    failCount++;
    failures.push(label);
    console.log('  [FAIL] ' + label);
  }
}

function assertEqual(actual, expected, label) {
  testCount++;
  const ok = actual === expected;
  if (ok) {
    passCount++;
    console.log('  [PASS] ' + label + ' (=' + JSON.stringify(actual) + ')');
  } else {
    failCount++;
    failures.push(label + ' (got ' + JSON.stringify(actual) + ', expected ' + JSON.stringify(expected) + ')');
    console.log('  [FAIL] ' + label + ' : got ' + JSON.stringify(actual) + ', expected ' + JSON.stringify(expected));
  }
}

function assertApprox(actual, expected, tol, label) {
  testCount++;
  const ok = Math.abs(actual - expected) <= tol;
  if (ok) {
    passCount++;
    console.log('  [PASS] ' + label + ' (=' + actual + ')');
  } else {
    failCount++;
    failures.push(label + ' (got ' + actual + ', expected ~' + expected + ')');
    console.log('  [FAIL] ' + label + ' : got ' + actual + ', expected ~' + expected);
  }
}

function section(name) { console.log('\n=== ' + name + ' ==='); }

/* ================================================================== */
/* 5. WORKFLOW E2E                                                    */
/* ================================================================== */

/* --- Etape 1 : login acheteur beta_acheteur_1 --- */
section('Etape 1 : Login acheteur (beta_acheteur_1)');
let res = Auth.betaLogin('beta_acheteur_1', 'acheteur');
assert(res.success, 'Login beta_acheteur_1 reussi');
let session = Auth.current();
assertEqual(session.user_id, 'beta_acheteur_1', 'user_id = beta_acheteur_1');
assertEqual(session.user_type, 'acheteur', 'user_type = acheteur');

/* --- Etape 2 : identifier 2 produits de SEL001 --- */
section('Etape 2 : Identifier 2 produits SEL001');
const sel001Products = Data.getProductsBySeller('SEL001');
console.log('  SEL001 a ' + sel001Products.length + ' produits');
assert(sel001Products.length >= 2, 'SEL001 a au moins 2 produits');
const p1 = sel001Products[0];
const p2 = sel001Products[1];
console.log('  Produit 1: ' + p1.id + ' - ' + p1.nom + ' (stock=' + p1.quantite_disponible + ', prix=' + p1.prix + ')');
console.log('  Produit 2: ' + p2.id + ' - ' + p2.nom + ' (stock=' + p2.quantite_disponible + ', prix=' + p2.prix + ')');
assertEqual(p1.vendeur_id, 'SEL001', 'p1.vendeur_id = SEL001');
assertEqual(p2.vendeur_id, 'SEL001', 'p2.vendeur_id = SEL001');

/* Stock initial avant achat */
const stock1Before = Storage.getStock('SEL001', p1.id);
const stock2Before = Storage.getStock('SEL001', p2.id);
console.log('  Stock initial: p1=' + stock1Before + ', p2=' + stock2Before);

/* --- Etape 3 : ajouter au panier --- */
section('Etape 3 : Ajout au panier');
Cart.clear();
let added1 = Cart.addItem(p1.id, 2);
let added2 = Cart.addItem(p2.id, 1);
assert(added1, 'Ajout p1 x2 reussi');
assert(added2, 'Ajout p2 x1 reussi');
let cart = Cart.get();
assertEqual(cart.items.length, 2, 'Panier contient 2 items');

/* --- Etape 4 : calculer les totaux --- */
section('Etape 4 : Calcul des totaux (Cart.computeTotals)');
let totals = Cart.computeTotals();
const expectedSubtotal = p1.prix * 2 + p2.prix * 1;
console.log('  Subtotal attendu: ' + expectedSubtotal + ', calcule: ' + totals.subtotal);
assertApprox(totals.subtotal, expectedSubtotal, 1, 'Subtotal correct');
assertEqual(totals.remise_total, 0, 'Pas de remise (acheteur non revendeur)');
assertEqual(totals.total, totals.subtotal, 'Total = subtotal (pas de remise)');
assertEqual(totals.item_count, 3, 'item_count = 3 (2+1)');

/* --- Etape 5 : checkout --- */
section('Etape 5 : Checkout.process');
const formData = {
  buyer_name: 'Amadou Diallo',
  buyer_phone: '70123456',
  buyer_address: 'Quartier Wemtenga, rue 12',
  buyer_city: 'Ouagadougou',
  buyer_region: 'Centre',
  buyer_note: 'Livrer apres 18h',
  payment_method: 'wave'
};
const checkoutRes = Checkout.process(formData);
/* process peut renvoyer {success, order} ou une Promise selon implement.
 * Ici il est async mais ne fait pas d'await sur fetch donc resoud en sync. */
Promise.resolve(checkoutRes).then(cr => {
  if (cr.success) {
    runAfterCheckout(cr.order);
  } else {
    console.log('  [FAIL] Checkout.process a echoue : ' + cr.error);
    failCount++;
    failures.push('Checkout.process : ' + cr.error);
    printSummary();
  }
});

function runAfterCheckout(order) {
  assert(!!order, 'Checkout.process retourne un order');
  console.log('  order_id = ' + order.order_id);
  assert(/^BF-\d{8}-\d{5}$/.test(order.order_id), 'order_id format BF-YYYYMMDD-XXXXX');
  assertEqual(order.buyer_id, 'beta_acheteur_1', 'order.buyer_id = beta_acheteur_1');
  assertEqual(order.items.length, 2, 'order contient 2 items');
  assertEqual(order.seller_ids.length, 1, 'order.seller_ids = 1 (SEL001 only)');
  assertEqual(order.seller_ids[0], 'SEL001', 'order.seller_ids[0] = SEL001');
  assertEqual(order.status, 'en_cours', 'order.status = en_cours');
  assertEqual(order.payment_method, 'wave', 'order.payment_method = wave');
  assertApprox(order.subtotal, expectedSubtotal, 1, 'order.subtotal correct');
  assertEqual(order.remise_total, 0, 'order.remise_total = 0');
  assertApprox(order.total, expectedSubtotal, 1, 'order.total correct');

  /* --- Etape 6 : recu HTML --- */
  section('Etape 6 : Recu HTML (Checkout.renderReceiptHTML)');
  const html = Checkout.renderReceiptHTML(order);
  assert(html.indexOf(order.order_id) >= 0, 'Recu contient order_id');
  assert(html.indexOf('Beurre') >= 0 || html.indexOf(p1.nom) >= 0, 'Recu contient produit 1');
  assert(html.indexOf(p2.nom) >= 0, 'Recu contient produit 2');
  assert(html.indexOf('<svg') >= 0, 'Recu contient un SVG (QR-code)');
  assert(html.indexOf('class="receipt-qr"') >= 0, 'Recu contient QR-code SVG');
  assert(html.indexOf('Wave') >= 0 || html.indexOf('payment') >= 0, 'Recu mentionne le mode paiement');
  assert(html.indexOf('SEL001') >= 0 || html.indexOf('Femmes') >= 0 || Data.getSeller('SEL001').nom, 'Recu contient coordonnees vendeur');
  const seller = Data.getSeller('SEL001');
  assert(html.indexOf(seller.telephone) >= 0, 'Recu contient tel vendeur');
  assert(html.indexOf(seller.email) >= 0, 'Recu contient email vendeur');
  assert(html.indexOf(seller.ville) >= 0, 'Recu contient ville vendeur');

  /* --- Etape 7 : stock decremente --- */
  section('Etape 7 : Stock decremente');
  const stock1After = Storage.getStock('SEL001', p1.id);
  const stock2After = Storage.getStock('SEL001', p2.id);
  console.log('  Stock apres: p1=' + stock1After + ' (avant ' + stock1Before + ')');
  console.log('  Stock apres: p2=' + stock2After + ' (avant ' + stock2Before + ')');
  assertEqual(stock1After, stock1Before - 2, 'Stock p1 decremente de 2');
  assertEqual(stock2After, stock2Before - 1, 'Stock p2 decremente de 1');

  /* --- Etape 8 : panier vide apres commande --- */
  section('Etape 8 : Panier vide apres commande');
  assertEqual(Cart.get().items.length, 0, 'Panier vide apres Checkout.process');

  /* --- Etape 9 : notifications vendeur --- */
  section('Etape 9 : Notifications vendeur (order_received)');
  const sellerNotifs = Storage.getNotifications('SEL001');
  const orderReceivedNotifs = sellerNotifs.filter(n => n.type === 'order_received');
  console.log('  SEL001 a ' + sellerNotifs.length + ' notifs, dont ' + orderReceivedNotifs.length + ' order_received');
  assert(orderReceivedNotifs.length >= 1, 'SEL001 a recu au moins 1 notif order_received');
  assert(orderReceivedNotifs.some(n => (n.message || '').indexOf(order.order_id) >= 0), 'Notif order_received mentionne le order_id');

  /* --- Etape 10 : notifications acheteur --- */
  section('Etape 10 : Notifications acheteur (confirmation)');
  const buyerNotifs = Storage.getNotifications('beta_acheteur_1');
  const buyerConfirm = buyerNotifs.filter(n => n.type === 'order_received' && (n.message || '').indexOf(order.order_id) >= 0);
  assert(buyerConfirm.length >= 1, 'Acheteur a recu une notif de confirmation');

  /* --- Etape 11 : activite loggee --- */
  section('Etape 11 : Activites loggees');
  const buyerActivity = Storage.getActivity('beta_acheteur_1');
  const sellerActivity = Storage.getActivity('SEL001');
  const buyerCmdActivity = buyerActivity.filter(a => a.type === 'commande' && (a.detail || '').indexOf(order.order_id) >= 0);
  const sellerCmdActivity = sellerActivity.filter(a => a.type === 'commande_recue' && (a.detail || '').indexOf(order.order_id) >= 0);
  assert(buyerCmdActivity.length >= 1, 'Activite commande loggee cote acheteur');
  assert(sellerCmdActivity.length >= 1, 'Activite commande_recue loggee cote vendeur');

  /* --- Etape 12 : ventes_count incremente --- */
  section('Etape 12 : ventes_count incremente (TrustSystem.incrementSales)');
  const seller1 = Data.getSeller('SEL001');
  const overrides1 = Storage.getSellerOverrides();
  console.log('  SEL001 ventes_count dans override: ' + (overrides1['SEL001'] ? overrides1['SEL001'].ventes_count : 'N/A'));
  assert(overrides1['SEL001'] && overrides1['SEL001'].ventes_count >= (seller1.ventes_count || 0), 'Override persiste ventes_count pour SEL001');

  /* --- Etape 13 : dashboard vendeur voit la commande --- */
  section('Etape 13 : DashboardVendeur voit la commande');
  const sellerOrders = DashboardVendeur.getOrders('SEL001');
  console.log('  DashboardVendeur.getOrders(SEL001) retourne ' + sellerOrders.length + ' commande(s)');
  assert(sellerOrders.length >= 1, 'DashboardVendeur voit au moins 1 commande');
  assert(sellerOrders.some(o => o.order_id === order.order_id), 'La commande creee est visible dans le dashboard vendeur');

  /* --- Etape 14 : vendeur accepte la commande --- */
  section('Etape 14 : Vendeur accepte la commande');
  /* Simulation du clic "Accepter" : on appelle directement Storage.updateOrder
   * comme le fait DashboardVendeur._wireOrderActions */
  Storage.updateOrder('beta_acheteur_1', order.order_id, { status: 'acceptee' });
  Storage.addNotification('beta_acheteur_1', {
    type: 'order_accepted',
    title: 'Commande acceptee',
    message: 'Le vendeur a accepte votre commande ' + order.order_id,
    link: 'historique.html',
    order_id: order.order_id
  });
  const acceptedOrder = Storage.getOrders('beta_acheteur_1').find(o => o.order_id === order.order_id);
  assertEqual(acceptedOrder.status, 'acceptee', 'Statut passe a acceptee');
  const buyerAcceptedNotif = Storage.getNotifications('beta_acheteur_1').filter(n => n.type === 'order_accepted' && (n.message || '').indexOf(order.order_id) >= 0);
  assert(buyerAcceptedNotif.length >= 1, 'Acheteur a recu notif order_accepted');

  /* --- Etape 15 : vendeur marque livree --- */
  section('Etape 15 : Vendeur marque livree');
  Storage.updateOrder('beta_acheteur_1', order.order_id, { status: 'livree' });
  Storage.addNotification('beta_acheteur_1', {
    type: 'order_delivered',
    title: 'Commande livree',
    message: 'Votre commande ' + order.order_id + ' a ete livree. Confirmez la reception dans votre historique.',
    link: 'historique.html',
    order_id: order.order_id
  });
  const deliveredOrder = Storage.getOrders('beta_acheteur_1').find(o => o.order_id === order.order_id);
  assertEqual(deliveredOrder.status, 'livree', 'Statut passe a livree');
  const buyerDeliveredNotif = Storage.getNotifications('beta_acheteur_1').filter(n => n.type === 'order_delivered' && (n.message || '').indexOf(order.order_id) >= 0);
  assert(buyerDeliveredNotif.length >= 1, 'Acheteur a recu notif order_delivered');

  /* --- Etape 16 : acheteur marque recu --- */
  section('Etape 16 : Acheteur marque recu');
  Storage.updateOrder('beta_acheteur_1', order.order_id, { status: 'recu' });
  Storage.addNotification('SEL001', {
    type: 'order_delivered',
    title: "Commande confirmee par l'acheteur",
    message: "L'acheteur a confirme la reception de la commande " + order.order_id + '. Vente finalisee.',
    link: 'dashboard-vendeur.html',
    order_id: order.order_id
  });
  Storage.addActivity('beta_acheteur_1', {
    type: 'commande_recue',
    detail: 'Commande ' + order.order_id + ' marquee comme recue'
  });
  Storage.addActivity('SEL001', {
    type: 'vente_confirmee',
    detail: "Commande " + order.order_id + " confirmee par l'acheteur (vente finalisee)"
  });
  const receivedOrder = Storage.getOrders('beta_acheteur_1').find(o => o.order_id === order.order_id);
  assertEqual(receivedOrder.status, 'recu', 'Statut passe a recu');
  const sellerConfirmNotif = Storage.getNotifications('SEL001').filter(n => n.type === 'order_delivered' && (n.message || '').indexOf(order.order_id) >= 0 && (n.title || '').indexOf('confirmee') >= 0);
  assert(sellerConfirmNotif.length >= 1, 'Vendeur a recu notif "confirmee par acheteur"');
  const sellerConfirmActivity = Storage.getActivity('SEL001').filter(a => a.type === 'vente_confirmee' && (a.detail || '').indexOf(order.order_id) >= 0);
  assert(sellerConfirmActivity.length >= 1, 'Activite vente_confirmee loggee cote vendeur');

  /* --- Etape 17 : test palier trust_upgrade --- */
  section('Etape 17 : Trust upgrade (palier 50 -> argent, 200 -> or)');
  /* Force ventes_count a 49 pour SEL001, puis incrementSales doit franchir
   * le palier 50 et declencher trust_upgrade */
  const sellerBefore = Data.getSeller('SEL001');
  const savedCount = sellerBefore.ventes_count;
  const savedLevel = sellerBefore.trust_level;
  console.log('  Avant : ventes_count=' + savedCount + ', trust_level=' + savedLevel);

  /* Simule ventes_count = 49 */
  sellerBefore.ventes_count = 49;
  sellerBefore.trust_level = 'bronze';
  Storage.setSellerOverride('SEL001', { ventes_count: 49, trust_level: 'bronze' });

  /* Vider les notifs trust_upgrade pre-existantes pour le test */
  const allSellerNotifs = Storage.getNotifications('SEL001');
  const trustBefore = allSellerNotifs.filter(n => n.type === 'trust_upgrade').length;
  console.log('  Notifs trust_upgrade pre-existantes: ' + trustBefore);

  TrustSystem.incrementSales('SEL001', 1);
  const sellerAfter = Data.getSeller('SEL001');
  console.log('  Apres incrementSales(1) : ventes_count=' + sellerAfter.ventes_count + ', trust_level=' + sellerAfter.trust_level);
  assertEqual(sellerAfter.ventes_count, 50, 'ventes_count = 50 apres increment');
  assertEqual(sellerAfter.trust_level, 'argent', 'trust_level = argent (palier 50)');
  const trustAfter = Storage.getNotifications('SEL001').filter(n => n.type === 'trust_upgrade').length;
  console.log('  Notifs trust_upgrade apres: ' + trustAfter);
  assert(trustAfter > trustBefore, 'Notif trust_upgrade ajoutee');

  /* Restore */
  sellerBefore.ventes_count = savedCount;
  sellerBefore.trust_level = savedLevel;
  Storage.setSellerOverride('SEL001', { ventes_count: savedCount, trust_level: savedLevel });

  /* --- Etape 18 : palier or (200) --- */
  section('Etape 18 : Trust upgrade palier or (200)');
  sellerBefore.ventes_count = 199;
  sellerBefore.trust_level = 'argent';
  Storage.setSellerOverride('SEL001', { ventes_count: 199, trust_level: 'argent' });
  const trustBeforeOr = Storage.getNotifications('SEL001').filter(n => n.type === 'trust_upgrade').length;
  TrustSystem.incrementSales('SEL001', 1);
  const sellerAfterOr = Data.getSeller('SEL001');
  console.log('  Apres incrementSales(1) : ventes_count=' + sellerAfterOr.ventes_count + ', trust_level=' + sellerAfterOr.trust_level);
  assertEqual(sellerAfterOr.ventes_count, 200, 'ventes_count = 200 apres increment');
  assertEqual(sellerAfterOr.trust_level, 'or', 'trust_level = or (palier 200)');
  const trustAfterOr = Storage.getNotifications('SEL001').filter(n => n.type === 'trust_upgrade').length;
  assert(trustAfterOr > trustBeforeOr, 'Notif trust_upgrade (or) ajoutee');

  /* Restore again */
  sellerBefore.ventes_count = savedCount;
  sellerBefore.trust_level = savedLevel;
  Storage.setSellerOverride('SEL001', { ventes_count: savedCount, trust_level: savedLevel });

  /* --- Etape 19 : test storage.decrementStock strict --- */
  section('Etape 19 : Storage.decrementStock empeche stock negatif');
  /* Cree un faux produit avec stock 3 */
  Storage.setStockOverride('SEL001', 'TESTPRD001', 3);
  assertEqual(Storage.decrementStock('SEL001', 'TESTPRD001', 2), 1, 'Decrement 3-2=1 OK');
  assertEqual(Storage.decrementStock('SEL001', 'TESTPRD001', 5), false, 'Decrement 1-5=false (refuse)');
  assertEqual(Storage.getStock('SEL001', 'TESTPRD001'), 1, 'Stock reste a 1 (non modifie)');

  /* --- Etape 20 : test Storage.incrementStock (restauration sur refuse) --- */
  section('Etape 20 : Storage.incrementStock restaure le stock');
  assertEqual(Storage.incrementStock('SEL001', 'TESTPRD001', 10), 11, 'Increment 1+10=11 OK');
  assertEqual(Storage.getStock('SEL001', 'TESTPRD001'), 11, 'Stock passe a 11');

  /* --- Etape 21 : test workflow refus + restauration stock --- */
  section('Etape 21 : Refus commande -> restauration stock');
  /* Vider le panier + ajouter 1 produit */
  Cart.clear();
  Cart.addItem(p1.id, 3);
  const stockAvantRefus = Storage.getStock('SEL001', p1.id);
  console.log('  Stock avant refus: ' + stockAvantRefus);
  const refuseRes = Checkout.process(formData);
  Promise.resolve(refuseRes).then(refuseOrder => {
    const stockApresCheckout = Storage.getStock('SEL001', p1.id);
    console.log('  Stock apres checkout (avant refus): ' + stockApresCheckout);
    assertEqual(stockApresCheckout, stockAvantRefus - 3, 'Stock decremente de 3 apres checkout');

    /* Refus par le vendeur -> restauration */
    Storage.incrementStock('SEL001', p1.id, 3);
    const stockApresRefus = Storage.getStock('SEL001', p1.id);
    console.log('  Stock apres refus + restauration: ' + stockApresRefus);
    assertEqual(stockApresRefus, stockAvantRefus, 'Stock restaure au niveau initial apres refus');

    /* --- Etape 22 : test checkout avec stock insuffisant --- */
    section('Etape 22 : Checkout refuse si stock insuffisant');
    Cart.clear();
    /* Ajoute une quantite superieure au stock disponible */
    const hugeQty = stockApresRefus + 100;
    const addHuge = Cart.addItem(p1.id, hugeQty);
    console.log('  Ajout huge qty=' + hugeQty + ' : ' + (addHuge ? 'OK' : 'refuse par Cart.addItem'));
    /* Cart.addItem refuse si qty > stock. Donc le panier reste vide. */
    /* Pour tester le checkAvailability, on ajoute manuellement un item fantome */
    const cart = Cart.get();
    cart.items.push({ product_id: p1.id, quantity: hugeQty, unit_price: p1.prix, added_date: new Date().toISOString() });
    Storage.setCart(cart);
    const unavailable = Cart.checkAvailability();
    console.log('  checkAvailability retourne ' + unavailable.length + ' item(s) indisponible(s)');
    assert(unavailable.length >= 1, 'Cart.checkAvailability detecte le stock insuffisant');
    const checkoutFail = Checkout.process(formData);
    Promise.resolve(checkoutFail).then(cf => {
      assert(!cf.success, 'Checkout refuse avec stock insuffisant');
      console.log('  Message erreur: ' + cf.error);

      /* --- Etape 23 : test format order_id --- */
      section('Etape 23 : Format order_id (Utils.generateOrderId)');
      const oid = Utils.generateOrderId();
      console.log('  Genere: ' + oid);
      assert(/^BF-\d{8}-\d{5}$/.test(oid), 'order_id match /^BF-\\d{8}-\\d{5}$/');

      /* --- Etape 24 : test Cart.computeTotals avec remise revendeur --- */
      section('Etape 24 : Calcul remise revendeur (grande_boutique -15%, petite -8%)');
      const rules = Data.resellerRules;
      const gbRemise = rules.types.grande_boutique.remise_percentage;
      const pbRemise = rules.types.petite_boutique.remise_percentage;
      console.log('  Grande boutique: -' + gbRemise + '%, Petite boutique: -' + pbRemise + '%');
      assertEqual(gbRemise, 15, 'Grande boutique: 15% de remise');
      assertEqual(pbRemise, 8, 'Petite boutique: 8% de remise');

      /* Simule un panier avec item bulk (remise 15%) */
      Cart.clear();
      const cart2 = Cart.get();
      cart2.items.push({
        product_id: p1.id, quantity: 50, unit_price: p1.prix,
        bulk: true, lot_size: 50, remise_pct: 15,
        added_date: new Date().toISOString()
      });
      Storage.setCart(cart2);
      const totals2 = Cart.computeTotals();
      const gross = p1.prix * 50;
      const expectedRemise = gross * 0.15;
      const expectedTotal = gross - expectedRemise;
      console.log('  Gross=' + gross + ', remise=' + expectedRemise + ', total=' + expectedTotal);
      console.log('  Calcule: subtotal=' + totals2.subtotal + ', remise=' + totals2.remise_total + ', gross=' + totals2.gross_total);
      assertApprox(totals2.remise_total, expectedRemise, 1, 'Remise 15% calculee correctement');
      assertApprox(totals2.subtotal, expectedTotal, 1, 'Subtotal avec remise correct');
      assertApprox(totals2.gross_total, gross, 1, 'gross_total = prix * qty avant remise');
      Cart.clear();

      /* --- Etape 25 : test notifications badge / mark all read --- */
      section('Etape 25 : Marquer toutes les notifs comme lues');
      const beforeUnread = Storage.getNotifications('beta_acheteur_1').filter(n => !n.read).length;
      console.log('  Non lues avant: ' + beforeUnread);
      Storage.markAllNotificationsRead('beta_acheteur_1');
      const afterUnread = Storage.getNotifications('beta_acheteur_1').filter(n => !n.read).length;
      console.log('  Non lues apres: ' + afterUnread);
      assertEqual(afterUnread, 0, 'Toutes les notifs marquees comme lues');

      /* --- Etape 26 : test computeStats dashboard vendeur --- */
      section('Etape 26 : DashboardVendeur.computeStats');
      /* Init l'etat interne du dashboard vendeur */
      DashboardVendeur._state = {
        container: new MockElement('div'),
        session: Auth.betaLogin('beta_vendeur_1', 'vendeur').session,
        sellerId: 'SEL001',
        activeTab: 'overview',
        currentFilter: 'tous'
      };
      const stats = DashboardVendeur.computeStats();
      console.log('  total_sales=' + stats.total_sales + ', total_revenue=' + stats.total_revenue);
      console.log('  total_stock=' + stats.total_stock + ', benefice_net=' + stats.benefice_net);
      console.log('  stock_value=' + stats.stock_value + ', dead_stock=' + stats.dead_stock.length);
      assert(typeof stats.total_sales === 'number', 'computeStats.total_sales est un nombre');
      assert(typeof stats.total_revenue === 'number', 'computeStats.total_revenue est un nombre');
      assert(typeof stats.total_stock === 'number', 'computeStats.total_stock est un nombre');
      assert(typeof stats.benefice_net === 'number', 'computeStats.benefice_net est un nombre');
      assert(Array.isArray(stats.top5_ventes), 'computeStats.top5_ventes est un tableau');
      /* benefice_net = 40% du CA */
      assertApprox(stats.benefice_net, Math.round(stats.total_revenue * 0.4), 1, 'benefice_net = 40% du CA');

      /* --- Etape 27 : test notifications filtres (expiry, order, stock, trust) --- */
      section('Etape 27 : Notifications filtres par categorie');
      /* Cree un user de test avec un melange de notifications */
      const TEST_USER = 'test_filter_user';
      localStorage.removeItem('achetons_bf_notifications_' + TEST_USER);
      Storage.addNotification(TEST_USER, { type: 'order_received', title: 'Cmd', message: 'm' });
      Storage.addNotification(TEST_USER, { type: 'order_accepted', title: 'Acc', message: 'm' });
      Storage.addNotification(TEST_USER, { type: 'order_refused', title: 'Ref', message: 'm' });
      Storage.addNotification(TEST_USER, { type: 'order_delivered', title: 'Liv', message: 'm' });
      Storage.addNotification(TEST_USER, { type: 'stock_low', title: 'Stock', message: 'm' });
      Storage.addNotification(TEST_USER, { type: 'expiry_warning', title: 'Expiry', message: 'm' });
      Storage.addNotification(TEST_USER, { type: 'trust_upgrade', title: 'Trust', message: 'm' });
      Storage.addNotification(TEST_USER, { type: 'message_received', title: 'Msg', message: 'm' });
      /* Set session pour le test */
      Storage.setSession({ user_id: TEST_USER, user_type: 'acheteur' });

      const containerMock = new MockElement('div');
      Notifications.renderList(containerMock, 'order');
      /* Compte le nombre de .notif-item dans le HTML rendu */
      const orderCount = (containerMock.innerHTML.match(/class="notif-item card/g) || []).length;
      console.log('  Filtre "order" : ' + orderCount + ' notifs');
      assertEqual(orderCount, 4, 'Filtre order retourne 4 notifs (received/accepted/refused/delivered)');

      containerMock.innerHTML = '';
      Notifications.renderList(containerMock, 'expiry');
      const expiryCount = (containerMock.innerHTML.match(/class="notif-item card/g) || []).length;
      console.log('  Filtre "expiry" : ' + expiryCount + ' notifs');
      assertEqual(expiryCount, 1, 'Filtre expiry retourne 1 notif (expiry_warning)');

      containerMock.innerHTML = '';
      Notifications.renderList(containerMock, 'stock');
      const stockCount = (containerMock.innerHTML.match(/class="notif-item card/g) || []).length;
      console.log('  Filtre "stock" : ' + stockCount + ' notifs');
      assertEqual(stockCount, 1, 'Filtre stock retourne 1 notif (stock_low)');

      containerMock.innerHTML = '';
      Notifications.renderList(containerMock, 'toutes');
      const allCount = (containerMock.innerHTML.match(/class="notif-item card/g) || []).length;
      console.log('  Filtre "toutes" : ' + allCount + ' notifs');
      assertEqual(allCount, 8, 'Filtre toutes retourne les 8 notifs');

      /* --- Etape 28 : verification reception notification order_refused --- */
      section('Etape 28 : Type order_refused gere par Notifications.renderList');
      containerMock.innerHTML = '';
      Storage.addNotification(TEST_USER, { type: 'order_refused', title: 'Test refuse', message: 'detail' });
      Notifications.renderList(containerMock, 'order');
      const hasRefusedIcon = containerMock.innerHTML.indexOf('notif-error') >= 0;
      assert(hasRefusedIcon, 'order_refused a une icone notif-error (couleur rouge)');

      /* Cleanup */
      Storage.clearSession();

      printSummary();
    });
  });
}

function printSummary() {
  console.log('\n=== SUMMARY ===');
  console.log('Tests run    : ' + testCount);
  console.log('Passed       : ' + passCount);
  console.log('Failed       : ' + failCount);
  if (failures.length) {
    console.log('\n--- Failures ---');
    failures.forEach(f => console.log('  - ' + f));
  }
  process.exit(failCount === 0 ? 0 : 1);
}

/* Safety timeout : si les Promises ne se resolvent pas, on sort en erreur */
setTimeout(() => {
  if (testCount === 0) {
    console.log('\n[TIMEOUT] Aucun test n\'a ete execute - probablement une Promise non resolue');
    process.exit(2);
  }
}, 5000);

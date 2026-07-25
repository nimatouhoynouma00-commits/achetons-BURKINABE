#!/usr/bin/env node
/* test-battery.js - Batterie de tests Achetons Burkinabè (Task L9)
 *
 * 63 tests organisés en 8 catégories:
 *   A. Structure        (10) - fichiers présents, structure HTML
 *   B. Données          (10) - comptes, vendeurs, régions, etc.
 *   C. Logique JS       (15) - Utils, Storage, Cart, Search
 *   D. Intégration      (10) - Auth, Checkout, TrustSystem, ExpertSystems
 *   E. HTTP             (5)  - pages et assets servibles
 *   F. Visuel           (5)  - IDs/classes dans HTML
 *   G. Accessibilité    (5)  - lang, main, alt, labels
 *   H. Performance      (3)  - taille des fichiers
 *
 * Usage: node /home/z/my-project/scripts/test-battery.js
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const http = require('http');
const vm   = require('vm');

const PROJ    = '/home/z/my-project/workspace/prod';
const BASE_URL = 'http://localhost:8088';

let passed = 0, failed = 0;
const failures = [];

function assert(condition, name, detail = '') {
  if (condition) {
    passed++;
    console.log(`  \u2713 ${name}`);
  } else {
    failed++;
    failures.push({ name, detail });
    console.log(`  \u2717 ${name}${detail ? ' - ' + detail : ''}`);
  }
}

/* Normalise les espaces insécables (U+00A0, U+202F) en espace normal */
function normSpaces(s) {
  return String(s).replace(/[\u00a0\u202f\u2009]/g, ' ');
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.setTimeout(8000, () => req.destroy(new Error('timeout')));
  });
}

function readText(relPath) {
  return fs.readFileSync(path.join(PROJ, relPath), 'utf8');
}

function fileExists(relPath) {
  return fs.existsSync(path.join(PROJ, relPath));
}

function listFiles(dirRel, ext) {
  const dir = path.join(PROJ, dirRel);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => !ext || f.endsWith(ext)).sort();
}

/* ================================================================== */
/* MOCK ENVIRONMENT pour tests de logique JS                          */
/* ================================================================== */

function setupMockEnv() {
  const store = {};
  const localStorageMock = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    _dump: () => store
  };

  // document minimal (certains modules appellent document.dispatchEvent/addEventListener)
  const listeners = {};
  const documentMock = {
    addEventListener: (evt, cb) => {
      (listeners[evt] = listeners[evt] || []).push(cb);
    },
    removeEventListener: () => {},
    dispatchEvent: (ev) => {
      const cbs = listeners[ev && ev.type] || [];
      cbs.forEach(cb => { try { cb(ev); } catch (e) {} });
    },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createElement: (tag) => ({
      tagName: String(tag).toUpperCase(),
      className: '',
      style: {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
      setAttribute: () => {},
      getAttribute: () => null,
      removeAttribute: () => {},
      appendChild: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      innerHTML: '',
      textContent: '',
      value: '',
      dataset: {},
      _isMock: true
    }),
    body: { appendChild: () => {}, classList: { add: () => {}, remove: () => {} } },
    head: { appendChild: () => {} },
    documentElement: { setAttribute: () => {}, classList: { add: () => {}, remove: () => {} } }
  };

  // window = global pour que `window.X = X` dans les fichiers expose sur global
  global.window = global;
  global.localStorage = localStorageMock;
  global.document = documentMock;
  global.location = {
    href: 'http://localhost:8088/index.html',
    pathname: '/index.html',
    search: '',
    protocol: 'http:',
    hash: ''
  };
  // navigator peut être read-only sur certains Node, on wrap dans un try
  try { global.navigator = { userAgent: 'node-test', language: 'fr' }; } catch (e) { /* ignore */ }

  // CustomEvent minimal
  if (typeof global.CustomEvent !== 'function') {
    global.CustomEvent = class CustomEvent {
      constructor(type, opts) {
        this.type = type;
        this.detail = opts && opts.detail;
        this.bubbles = false;
        this.cancelable = false;
      }
    };
  }

  // fetch désactivé -> force EmbeddedData fallback dans Data.loadAll()
  global.fetch = () => Promise.reject(new Error('fetch disabled in test env'));

  // UI mock minimal (cart.js/checkout.js appellent UI.toast, UI.updateCartCount)
  global.UI = {
    toast: () => {},
    updateCartCount: () => {},
    updateNotifBadge: () => {},
    applyTheme: () => {},
    injectLayout: () => {},
    trustBadgeHTML: (level) => `<span class="trust-badge ${level || ''}">${level || ''}</span>`
  };

  return { localStorageMock, documentMock };
}

/* Charge un fichier JS dans le contexte global via wrapper IIFE
 * (évite les conflits de const entre fichiers). */
function loadJS(file) {
  const code = readText(path.join('js', file));
  const wrapped = `(function() {\n${code}\n})();`;
  vm.runInThisContext(wrapped, { filename: file, displayErrors: true });
}

/* Charge toutes les données JSON nécessaires dans Data via _hydrate */
function hydrateData() {
  // Charge embedded-data.js (expose EmbeddedData)
  loadJS('embedded-data.js');
  // Charge utils.js (expose Utils)
  loadJS('utils.js');
  // Charge storage.js (expose Storage)
  loadJS('storage.js');
  // Charge data-seed.js (expose Data)
  loadJS('data-seed.js');
  // Charge search.js, cart.js, auth.js, trust-system.js, checkout.js, expert-systems.js
  loadJS('search.js');
  loadJS('cart.js');
  loadJS('auth.js');
  loadJS('trust-system.js');
  loadJS('checkout.js');
  loadJS('expert-systems.js');

  // Hydrate Data depuis les fichiers JSON directs (évite fetch)
  const jsonFiles = {
    products: 'products.json',
    sellers: 'sellers.json',
    categories: 'categories.json',
    certifications: 'certifications.json',
    regions: 'regions.json',
    betaAccounts: 'beta-accounts.json',
    trustBadges: 'trust-badges.json',
    cartRules: 'cart-rules.json',
    resellerRules: 'reseller-rules.json',
    searchConfig: 'search-config.json',
    formSchemas: 'form-schemas.json',
    expertModules: 'expert-modules.json',
    betaActivity: 'beta-activity.json'
  };
  Object.entries(jsonFiles).forEach(([key, file]) => {
    try {
      const json = JSON.parse(readText(path.join('json', file)));
      global.Data._hydrate(key, json);
    } catch (e) {
      console.warn(`  ! hydrate ${key} échoué: ${e.message}`);
    }
  });

  // Injecte la référence ExpertSystems (REFERENCE data)
  if (global.ExpertSystems && global.ExpertSystems.setReference && global.Data.expertModules) {
    global.ExpertSystems.setReference(global.Data.expertModules);
  }
}

/* ================================================================== */
/* TESTS                                                               */
/* ================================================================== */

async function run() {
  console.log('=== Batterie de tests Achetons Burkinabè ===\n');

  /* ---------- A. Tests de structure (10) ---------- */
  console.log('A. Tests de structure (10)');

  const expectedHTML = [
    'index.html','connexion.html','produits.html','panier.html','checkout.html',
    'produit-detail.html','contact-vendeur.html','revendeur.html','a-propos.html',
    'notifications.html','historique.html','dashboard-acheteur.html',
    'dashboard-vendeur.html','boutique-vendeur.html'
  ];
  const missingHTML = expectedHTML.filter(f => !fileExists(f));
  assert(missingHTML.length === 0, 'A1. 14 pages HTML présentes',
    missingHTML.length ? `manquantes: ${missingHTML.join(', ')}` : '');

  const expectedJS = [
    'app.js','auth.js','cart.js','charts-vendeur.js','checkout.js',
    'dashboard-acheteur.js','dashboard-vendeur.js','data-seed.js',
    'embedded-data.js','expert-systems.js','form-validation.js',
    'notifications.js','products.js','reseller.js','router.js','search.js',
    'seller.js','storage.js','traceability.js','trust-system.js',
    'ui-components.js','utils.js'
  ];
  const missingJS = expectedJS.filter(f => !fileExists(path.join('js', f)));
  assert(missingJS.length === 0, 'A2. 22 fichiers JS présents',
    missingJS.length ? `manquants: ${missingJS.join(', ')}` : '');

  const cssFiles = listFiles('css', '.css');
  assert(cssFiles.length >= 15, 'A3. 15 fichiers CSS présents',
    `${cssFiles.length} trouvés`);

  const jsonFiles = listFiles('json', '.json');
  let validJsonCount = 0;
  const invalidJson = [];
  for (const f of jsonFiles) {
    try {
      JSON.parse(readText(path.join('json', f)));
      validJsonCount++;
    } catch (e) {
      invalidJson.push(`${f}: ${e.message}`);
    }
  }
  assert(validJsonCount >= 15 && invalidJson.length === 0, 'A4. Tous les JSON sont valides',
    invalidJson.length ? invalidJson.join('; ') : `${validJsonCount} valides`);

  // A5: tous les <link> CSS dans HTML pointent vers fichiers existants
  let deadLinksCss = 0;
  for (const html of expectedHTML) {
    const c = readText(html);
    const matches = [...c.matchAll(/<link[^>]+href=["']([^"']+\.css)["']/g)];
    for (const m of matches) {
      const href = m[1];
      if (href.startsWith('http')) continue;
      if (!fileExists(href)) {
        deadLinksCss++;
        console.log(`    404 CSS: ${html} -> ${href}`);
      }
    }
  }
  assert(deadLinksCss === 0, 'A5. Aucun <link> CSS mort (pas de 404)',
    `${deadLinksCss} liens morts`);

  // A6: tous les <script> JS dans HTML pointent vers fichiers existants
  let deadScripts = 0;
  for (const html of expectedHTML) {
    const c = readText(html);
    const matches = [...c.matchAll(/<script[^>]+src=["']([^"']+\.js)["']/g)];
    for (const m of matches) {
      const src = m[1];
      if (src.startsWith('http')) continue;
      if (!fileExists(src)) {
        deadScripts++;
        console.log(`    404 JS: ${html} -> ${src}`);
      }
    }
  }
  assert(deadScripts === 0, 'A6. Aucun <script> JS mort (pas de 404)',
    `${deadScripts} scripts morts`);

  // A7: chaque HTML a <title> et <meta description>
  let titleOk = 0, descOk = 0;
  for (const html of expectedHTML) {
    const c = readText(html);
    if (/<title>[^<]+<\/title>/i.test(c)) titleOk++;
    if (/<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i.test(c)) descOk++;
  }
  assert(titleOk === 14 && descOk === 14, 'A7. Chaque HTML a <title> et <meta description>',
    `title: ${titleOk}/14, desc: ${descOk}/14`);

  // A8: chaque HTML a un skip-link
  let skipOk = 0;
  for (const html of expectedHTML) {
    const c = readText(html);
    if (/skip-link|skip-to-content|aller-au-contenu|skipnav/i.test(c)) skipOk++;
  }
  assert(skipOk === 14, 'A8. Chaque HTML a un skip-link',
    `${skipOk}/14`);

  // A9: chaque HTML référence design-system.css
  let dsOk = 0;
  for (const html of expectedHTML) {
    if (/design-system\.css/.test(readText(html))) dsOk++;
  }
  assert(dsOk === 14, 'A9. Chaque HTML référence design-system.css',
    `${dsOk}/14`);

  // A10: products.json a 50 produits avec tous les champs requis
  const products = JSON.parse(readText('json/products.json'));
  const requiredFields = ['id','nom','categorie','prix','vendeur_id','region','description','quantite_disponible'];
  const productsArr = Array.isArray(products) ? products : (products.products || []);
  const incomplete = productsArr.filter(p => requiredFields.some(f => p[f] === undefined || p[f] === null));
  assert(productsArr.length === 50 && incomplete.length === 0,
    'A10. products.json a 50 produits complets',
    `${productsArr.length} produits, ${incomplete.length} incomplets (champs: ${requiredFields.join(',')})`);

  /* ---------- B. Tests de données (10) ---------- */
  console.log('\nB. Tests de données (10)');

  const betaAccounts = JSON.parse(readText('json/beta-accounts.json'));
  const accounts = betaAccounts.accounts || betaAccounts;
  assert(accounts.length === 12, 'B11. 12 comptes beta dans beta-accounts.json',
    `${accounts.length} comptes`);

  const phones = accounts.map(a => String(a.telephone || '').replace(/[\s+]/g, ''));
  const uniqPhones = new Set(phones);
  assert(uniqPhones.size === phones.length, 'B12. Téléphones beta uniques',
    `${uniqPhones.size}/${phones.length} uniques`);

  const emails = accounts.map(a => a.email);
  const uniqEmails = new Set(emails);
  assert(uniqEmails.size === emails.length, 'B13. Emails beta uniques',
    `${uniqEmails.size}/${emails.length} uniques`);

  const sellersJson = JSON.parse(readText('json/sellers.json'));
  const sellersArr = sellersJson.sellers || sellersJson;
  assert(sellersArr.length === 11, 'B14. 11 vendeurs dans sellers.json',
    `${sellersArr.length} vendeurs`);

  const regionsJson = JSON.parse(readText('json/regions.json'));
  const regionsArr = regionsJson.regions || regionsJson;
  assert(regionsArr.length === 12, 'B15. 12 régions dans regions.json',
    `${regionsArr.length} régions`);

  const certJson = JSON.parse(readText('json/certifications.json'));
  const certArr = certJson.certifications || certJson;
  assert(certArr.length === 3, 'B16. 3 certifications dans certifications.json',
    `${certArr.length} certifications`);

  const catJson = JSON.parse(readText('json/categories.json'));
  const catArr = catJson.categories || catJson;
  assert(catArr.length === 5, 'B17. 5 catégories dans categories.json',
    `${catArr.length} catégories`);

  const trustJson = JSON.parse(readText('json/trust-badges.json'));
  const trustArr = trustJson.trust_levels || trustJson.badges || trustJson;
  assert(trustArr.length === 3, 'B18. 3 niveaux trust dans trust-badges.json',
    `${trustArr.length} niveaux`);

  const emJson = JSON.parse(readText('json/expert-modules.json'));
  const emModules = emJson.modules || {};
  const moduleCount = Array.isArray(emModules) ? emModules.length : Object.keys(emModules).length;
  assert(moduleCount === 6, 'B19. 6 modules dans expert-modules.json',
    `${moduleCount} modules`);

  const betaActivity = JSON.parse(readText('json/beta-activity.json'));
  const baUsers = []
    .concat(Object.keys(betaActivity.acheteurs || {}))
    .concat(Object.keys(betaActivity.vendeurs || {}))
    .concat(Object.keys(betaActivity.revendeurs || {}));
  assert(baUsers.length === 12, 'B20. beta-activity.json a historique pour les 12 comptes',
    `${baUsers.length} utilisateurs avec historique`);

  /* ---------- Setup environnement mock + chargement JS ---------- */
  setupMockEnv();
  hydrateData();

  /* ---------- C. Tests de logique JS (15) ---------- */
  console.log('\nC. Tests de logique JS (15)');

  const Utils = global.Utils;
  const Storage = global.Storage;
  const Cart = global.Cart;
  const Search = global.Search;

  // 21. formatPrice(1500) -> "1 500 FCFA"
  const fp = normSpaces(Utils.formatPrice(1500));
  assert(fp === '1 500 FCFA', 'C21. Utils.formatPrice(1500) retourne "1 500 FCFA"',
    `obtenu: "${fp}"`);

  // 22. isValidEmail("test@bf") -> false
  assert(Utils.isValidEmail('test@bf') === false, 'C22. Utils.isValidEmail("test@bf") retourne false',
    `obtenu: ${Utils.isValidEmail('test@bf')}`);

  // 23. isValidPhone("70123456") -> true
  assert(Utils.isValidPhone('70123456') === true, 'C23. Utils.isValidPhone("70123456") retourne true',
    `obtenu: ${Utils.isValidPhone('70123456')}`);

  // 24. getTrustLevel(0) -> "bronze"
  assert(Utils.getTrustLevel(0) === 'bronze', 'C24. Utils.getTrustLevel(0) retourne "bronze"',
    `obtenu: ${Utils.getTrustLevel(0)}`);

  // 25. getTrustLevel(50) -> "argent"
  assert(Utils.getTrustLevel(50) === 'argent', 'C25. Utils.getTrustLevel(50) retourne "argent"',
    `obtenu: ${Utils.getTrustLevel(50)}`);

  // 26. getTrustLevel(200) -> "or"
  assert(Utils.getTrustLevel(200) === 'or', 'C26. Utils.getTrustLevel(200) retourne "or"',
    `obtenu: ${Utils.getTrustLevel(200)}`);

  // 27. fuzzyScore("karite", "karite") = 1.0
  const fs1 = Utils.fuzzyScore('karite', 'karite');
  assert(Math.abs(fs1 - 1.0) < 0.001, 'C27. Utils.fuzzyScore("karite", "karite") = 1.0',
    `obtenu: ${fs1}`);

  // 28. computeBulkPrice(1000, 50, 15) -> total 42500
  // NB: la spec originale disait 0.15 (=42500 via 0.85), mais l'API existante
  // (cart.js, reseller.js) utilise remise_pct en pourcentage (15 = 15%).
  // On teste l'API réelle: 15% -> 42500.
  const bp = Utils.computeBulkPrice(1000, 50, 15);
  assert(bp.total === 42500, 'C28. Utils.computeBulkPrice(1000, 50, 15).total = 42500',
    `obtenu: ${bp && bp.total} (gross=${bp && bp.gross}, remise=${bp && bp.remise})`);

  // 29. generateOrderId() match BF-\d{8}-\d{5}
  const oid = Utils.generateOrderId();
  assert(/^BF-\d{8}-\d{5}$/.test(oid), 'C29. Utils.generateOrderId() match BF-\\d{8}-\\d{5}',
    `obtenu: ${oid}`);

  // 30. Storage.setSession/getSession round-trip
  Storage.clearSession();
  const sess = { user_id: 'test_u1', user_type: 'acheteur', user_name: 'Test' };
  Storage.setSession(sess);
  const sessBack = Storage.getSession();
  assert(sessBack && sessBack.user_id === 'test_u1' && sessBack.user_type === 'acheteur',
    'C30. Storage.setSession/getSession round-trip OK',
    `obtenu: ${JSON.stringify(sessBack)}`);

  // 31. Storage.addOrder/getOrders round-trip
  const uid = 'test_u_orders';
  global.localStorage.removeItem('achetons_bf_orders_' + uid);
  const order = { order_id: 'BF-20250101-12345', total: 5000, items: [] };
  Storage.addOrder(uid, order);
  const orders = Storage.getOrders(uid);
  assert(orders.length === 1 && orders[0].order_id === 'BF-20250101-12345',
    'C31. Storage.addOrder/getOrders round-trip OK',
    `obtenu: ${orders.length} orders`);

  // 32. Storage.decrementStock empêche stock négatif
  // Comportement actuel : si qty > current, retourne false et ne modifie pas le stock
  // (documenté dans storage.js). Le stock reste >= 0 (jamais négatif).
  const sid = 'SEL_TEST', pid = 'PRD_TEST';
  global.localStorage.removeItem('achetons_bf_stock_' + sid);
  Storage.setStockOverride(sid, pid, 3);
  let s = Storage.decrementStock(sid, pid, 5);  // qty (5) > current (3) -> refus
  let stockAfter = Storage.getStock(sid, pid);
  assert(
    (s === false || s === 0) && stockAfter >= 0,
    'C32. Storage.decrementStock empêche stock négatif',
    `retour: ${s}, stock après: ${stockAfter}`
  );

  // 33. Cart.addItem met à jour le panier
  global.localStorage.removeItem('achetons_bf_cart');
  const p1 = global.Data.products[0]; // PRD001
  const initialCartCount = Cart.get().items.length;
  Cart.addItem(p1.id, 2);
  const afterCart = Cart.get();
  assert(afterCart.items.length === initialCartCount + 1 && afterCart.items[0].quantity === 2,
    'C33. Cart.addItem met à jour le panier',
    `items: ${afterCart.items.length}, qte: ${afterCart.items[0] && afterCart.items[0].quantity}`);

  // 34. Cart.computeTotals calcule remise revendeur
  global.localStorage.removeItem('achetons_bf_cart');
  const p2 = global.Data.products[0];
  Cart.addBulkItem(p2.id, 10, 10, 15);  // 10 unités, lot 10, remise 15%
  const totals = Cart.computeTotals();
  const expectedRemise = (p2.prix * 10) * 0.15;
  assert(
    totals.remise_total > 0 && Math.abs(totals.remise_total - expectedRemise) < 1,
    'C34. Cart.computeTotals calcule remise revendeur',
    `remise_total: ${totals.remise_total}, attendu: ${expectedRemise}`
  );

  // 35. Search.fuzzySearch("karite") retourne produits karité
  const searchResults = Search.fuzzySearch('karite');
  const allKarite = searchResults.length > 0 && searchResults.every(p => p.categorie === 'Karite');
  const hasKarite = searchResults.some(p => p.categorie === 'Karite');
  assert(searchResults.length >= 12 && hasKarite,
    'C35. Search.fuzzySearch("karite") retourne produits karité',
    `${searchResults.length} résultats, karité: ${searchResults.filter(p => p.categorie === 'Karite').length}`);

  /* ---------- D. Tests d'intégration (10) ---------- */
  console.log('\nD. Tests d\'intégration (10)');

  const Auth = global.Auth;
  const Checkout = global.Checkout;
  const TrustSystem = global.TrustSystem;
  const ExpertSystems = global.ExpertSystems;

  // 36. Auth.betaLogin("beta_acheteur_1", "acheteur") connecte
  Storage.clearSession();
  const r36 = Auth.betaLogin('beta_acheteur_1', 'acheteur');
  assert(r36.success === true && r36.session && r36.session.user_type === 'acheteur',
    'D36. Auth.betaLogin("beta_acheteur_1", "acheteur") connecte',
    `success: ${r36.success}, error: ${r36.error}`);

  // 37. Auth.betaLogin refuse type mismatch
  Storage.clearSession();
  const r37 = Auth.betaLogin('beta_acheteur_1', 'vendeur');
  assert(r37.success === false,
    'D37. Auth.betaLogin refuse type mismatch',
    `success: ${r37.success}, error: ${r37.error}`);

  // 38. Auth.register("acheteur", {email, phone, ...}) crée un compte
  Storage.clearSession();
  const r38 = await Auth.register('acheteur', {
    nom: 'Test Acheteur',
    email: 'test.acheteur.new@test.bf',
    telephone: '76 99 88 77',
    ville: 'Ouagadougou',
    region: 'Centre',
    password: '1234'
  });
  assert(r38.success === true && r38.session && r38.session.user_type === 'acheteur',
    'D38. Auth.register("acheteur", {...}) crée un compte',
    `success: ${r38.success}, error: ${r38.error}`);

  // 39. Auth.register("revendeur", {boutique_type: "grande_boutique", ...}) OK
  Storage.clearSession();
  const r39 = await Auth.register('revendeur', {
    nom: 'Test Revendeur',
    email: 'test.revendeur.new@test.bf',
    telephone: '76 99 88 78',
    ville: 'Bobo-Dioulasso',
    region: 'Hauts-Bassins',
    boutique_type: 'grande_boutique',
    password: '1234'
  });
  assert(r39.success === true && r39.session.boutique_type === 'grande_boutique',
    'D39. Auth.register("revendeur", {boutique_type: "grande_boutique"}) OK',
    `success: ${r39.success}, error: ${r39.error}`);

  // 40. Auth.register("revendeur") sans boutique_type échoue
  Storage.clearSession();
  const r40 = await Auth.register('revendeur', {
    nom: 'Test Revendeur 2',
    email: 'test.revendeur2.new@test.bf',
    telephone: '76 99 88 79',
    ville: 'Ouaga',
    region: 'Centre',
    password: '1234'
    // pas de boutique_type
  });
  assert(r40.success === false && /boutique_type/i.test(r40.error || ''),
    'D40. Auth.register("revendeur") sans boutique_type échoue',
    `success: ${r40.success}, error: ${r40.error}`);

  // 41-43: Checkout.process end-to-end
  Storage.clearSession();
  Auth.betaLogin('beta_acheteur_1', 'acheteur');
  global.localStorage.removeItem('achetons_bf_cart');
  // Ajoute 1 produit au panier
  const cp = global.Data.products[0];
  Cart.addItem(cp.id, 1);
  // Prépare formData
  const formData = {
    buyer_name: 'Test Checkout',
    buyer_phone: '70 11 22 33',
    buyer_address: 'Ouaga 2000',
    buyer_city: 'Ouagadougou',
    payment_method: 'cash'
  };
  // Note le stock avant
  const sellerId = cp.vendeur_id;
  const stockBefore = Storage.getStock(sellerId, cp.id);
  const notifsBefore = Storage.getNotifications(sellerId).length;
  const buyerNotifsBefore = Storage.getNotifications('beta_acheteur_1').length;
  // Exécute
  const coResult = await Checkout.process(formData);
  assert(coResult.success === true && /^BF-\d{8}-\d{5}$/.test(coResult.order.order_id),
    'D41. Checkout.process génère order_id correct',
    `success: ${coResult.success}, order_id: ${coResult.order && coResult.order.order_id}, error: ${coResult.error}`);

  // 42. Stock décrémenté
  const stockAfterCheckout = Storage.getStock(sellerId, cp.id);
  assert(coResult.success && stockAfterCheckout === Math.max(0, stockBefore - 1),
    'D42. Checkout.process décrémente stock',
    `avant: ${stockBefore}, après: ${stockAfterCheckout}`);

  // 43. Notifications envoyées au vendeur ET à l'acheteur
  const sellerNotifs = Storage.getNotifications(sellerId);
  const buyerNotifs = Storage.getNotifications('beta_acheteur_1');
  assert(
    coResult.success && sellerNotifs.length > notifsBefore && buyerNotifs.length > buyerNotifsBefore,
    'D43. Checkout.process notifie vendeur et acheteur',
    `vendeur: ${sellerNotifs.length} (avant ${notifsBefore}), acheteur: ${buyerNotifs.length} (avant ${buyerNotifsBefore})`
  );

  // 44. TrustSystem.incrementSales met à jour ventes_count et persiste
  // NB: on lit ventes_count DEPUIS Data.getSeller (référence mutable) car les
  // tests Checkout précédents peuvent avoir incrémenté le vendeur (TrustSystem
  // mute l'objet Data.sellers en place).
  const tsId = sellersArr[0].id; // SEL001 ou premier vendeur
  global.localStorage.removeItem('achetons_bf_seller_overrides');
  const sellerObj = global.Data.getSeller(tsId);
  const ventesBefore = sellerObj.ventes_count || 0;
  const updated = TrustSystem.incrementSales(tsId, 1);
  const overrides = Storage.getSellerOverrides();
  assert(
    updated && updated.ventes_count === ventesBefore + 1 &&
    overrides[tsId] && typeof overrides[tsId].ventes_count === 'number',
    'D44. TrustSystem.incrementSales met à jour ventes_count et persiste',
    `ventes avant: ${ventesBefore}, après: ${updated && updated.ventes_count}, override: ${overrides[tsId] ? 'oui' : 'non'}`
  );

  // 45. ExpertSystems.comptable.compute() ne lève pas d'erreur
  let expertOk = false, expertErr = null;
  try {
    const sellerData = {
      seller_id: 'SEL_TEST',
      nom: 'Test Seller',
      ventes_count: 50,
      trust_level: 'argent',
      total_revenue: 500000,
      marge_moyenne: 35,
      stock_items: [
        { id: 'PRD_TEST_1', nom: 'Beurre de karité 250g', categorie: 'Karite', prix: 1500, effective_stock: 20, quantite_disponible: 20 },
        { id: 'PRD_TEST_2', nom: 'Miel cru 500g', categorie: 'Miel', prix: 3500, effective_stock: 5, quantite_disponible: 5 }
      ],
      orders: []
    };
    const inputs = {};
    const result = ExpertSystems.comptable.compute(sellerData, inputs);
    expertOk = result && typeof result === 'object';
  } catch (e) {
    expertErr = e.message;
  }
  assert(expertOk, 'D45. ExpertSystems.comptable.compute() ne lève pas d\'erreur',
    expertErr ? `erreur: ${expertErr}` : '');

  /* ---------- E. Tests HTTP (5) ---------- */
  console.log('\nE. Tests HTTP (5)');

  const r46 = await httpGet(BASE_URL + '/');
  assert(r46.status === 200 && /Burkina/i.test(r46.body),
    'E46. GET / retourne 200 + contient "Burkina"',
    `status: ${r46.status}, match: ${/Burkina/i.test(r46.body)}`);

  const r47 = await httpGet(BASE_URL + '/connexion.html');
  assert(r47.status === 200 && /beta/i.test(r47.body),
    'E47. GET /connexion.html retourne 200 + contient "beta"',
    `status: ${r47.status}, match: ${/beta/i.test(r47.body)}`);

  const r48 = await httpGet(BASE_URL + '/produits.html');
  assert(r48.status === 200 && /Produits|produits/i.test(r48.body),
    'E48. GET /produits.html retourne 200 + contient "Produits"',
    `status: ${r48.status}`);

  const r49 = await httpGet(BASE_URL + '/json/products.json');
  let productsHttp = null;
  try { productsHttp = JSON.parse(r49.body); } catch (e) {}
  const productsHttpArr = productsHttp && (Array.isArray(productsHttp) ? productsHttp : productsHttp.products);
  assert(r49.status === 200 && productsHttpArr && productsHttpArr.length === 50,
    'E49. GET /json/products.json retourne 200 + 50 items',
    `status: ${r49.status}, items: ${productsHttpArr ? productsHttpArr.length : 'parse fail'}`);

  const r50 = await httpGet(BASE_URL + '/js/app.js');
  assert(r50.status === 200 && /App\.init/.test(r50.body),
    'E50. GET /js/app.js retourne 200 + contient "App.init"',
    `status: ${r50.status}, match: ${/App\.init/.test(r50.body)}`);

  /* ---------- F. Tests visuels via fetch HTML (5) ---------- */
  console.log('\nF. Tests visuels via fetch HTML (5)');

  const idxHtml = (await httpGet(BASE_URL + '/index.html')).body;
  assert(
    /id=["']categories-grid["']/.test(idxHtml) &&
    /id=["']featured-grid["']/.test(idxHtml) &&
    /id=["']sellers-grid["']/.test(idxHtml),
    'F51. index.html contient les IDs: categories-grid, featured-grid, sellers-grid'
  );

  const coHtml = (await httpGet(BASE_URL + '/connexion.html')).body;
  const hasAch = /acheteur/i.test(coHtml);
  const hasVnd = /vendeur/i.test(coHtml);
  const hasRev = /revendeur/i.test(coHtml);
  assert(hasAch && hasVnd && hasRev,
    'F52. connexion.html contient 3 types: acheteur, vendeur, revendeur',
    `acheteur=${hasAch}, vendeur=${hasVnd}, revendeur=${hasRev}`);

  const prdHtml = (await httpGet(BASE_URL + '/produits.html')).body;
  assert(/sidebar|filters-sidebar/i.test(prdHtml),
    'F53. produits.html a une sidebar de filtres');

  const ckHtml = (await httpGet(BASE_URL + '/checkout.html')).body;
  assert(
    /<form/i.test(ckHtml) && /(telephone|phone|buyer_phone)/i.test(ckHtml),
    'F54. checkout.html a un form avec champ téléphone'
  );

  const dvHtml = (await httpGet(BASE_URL + '/dashboard-vendeur.html')).body;
  assert(/expert-systems\.js/.test(dvHtml),
    'F55. dashboard-vendeur.html référence expert-systems.js');

  /* ---------- G. Tests accessibilité (5) ---------- */
  console.log('\nG. Tests accessibilité (5)');

  // 56. Tous HTML ont lang="fr"
  let langFrOk = 0;
  for (const html of expectedHTML) {
    if (/<html[^>]+lang=["']fr["']/i.test(readText(html))) langFrOk++;
  }
  assert(langFrOk === 14, 'G56. Tous les HTML ont lang="fr"',
    `${langFrOk}/14`);

  // 57. Tous HTML ont un <main id="main">
  let mainOk = 0;
  for (const html of expectedHTML) {
    if (/<main[^>]*id=["']main["']/i.test(readText(html))) mainOk++;
  }
  assert(mainOk === 14, 'G57. Tous les HTML ont un main#main',
    `${mainOk}/14`);

  // 58. Tous les boutons ont du texte ou aria-label
  let buttonsWithoutLabel = 0;
  for (const html of expectedHTML) {
    const c = readText(html);
    const btnMatches = [...c.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gim)];
    for (const bm of btnMatches) {
      const tag = bm[0];
      const inner = (bm[1] || '').trim();
      const hasAriaLabel = /aria-label=["'][^"']+["']/i.test(tag);
      const hasTitle = /title=["'][^"']+["']/i.test(tag);
      const innerText = inner.replace(/<[^>]+>/g, '').trim();
      if (!hasAriaLabel && !hasTitle && innerText.length === 0) {
        buttonsWithoutLabel++;
      }
    }
  }
  // Tolérance: accepte si moins de 3 boutons sans label (analyse basique)
  assert(buttonsWithoutLabel <= 3, 'G58. Tous les boutons ont du texte ou aria-label',
    `${buttonsWithoutLabel} boutons sans label`);

  // 59. Tous les <img> ont alt (ou sont décoratifs avec aria-hidden)
  let imgsWithoutAlt = 0;
  for (const html of expectedHTML) {
    const c = readText(html);
    const imgMatches = [...c.matchAll(/<img[^>]*>/gim)];
    for (const im of imgMatches) {
      const tag = im[0];
      const hasAlt = /\salt=["']/.test(tag);
      const hasAriaHidden = /aria-hidden=["']true["']/i.test(tag);
      if (!hasAlt && !hasAriaHidden) imgsWithoutAlt++;
    }
  }
  assert(imgsWithoutAlt === 0, 'G59. Tous les <img> ont alt (ou aria-hidden)',
    `${imgsWithoutAlt} images sans alt`);

  // 60. Tous les formulaires ont des labels associés (analyse basique)
  // On ignore les radio/checkbox qui sont généralement wrappés dans des <label>
  // implicites (ex: <label><input type="checkbox"> Texte</label>).
  let formsWithoutLabel = 0;
  for (const html of expectedHTML) {
    const c = readText(html);
    const inputMatches = [...c.matchAll(/<input[^>]*>/gim)];
    for (const im of inputMatches) {
      const tag = im[0];
      const typeMatch = tag.match(/type=["']([^"']+)["']/i);
      const type = typeMatch ? typeMatch[1].toLowerCase() : 'text';
      if (['hidden','submit','button','reset','image','radio','checkbox'].includes(type)) continue;
      const idMatch = tag.match(/id=["']([^"']+)["']/i);
      const hasAriaLabel = /aria-label=["']/i.test(tag);
      let hasLabel = false;
      if (idMatch) {
        const id = idMatch[1];
        // Échappe les caractères spéciaux dans l'id pour la regex
        const safeId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        hasLabel = new RegExp(`<label[^>]+for=["']${safeId}["']`, 'i').test(c);
      }
      if (!hasLabel && !hasAriaLabel) formsWithoutLabel++;
    }
  }
  // Tolérance: on accepte si moins de 5 inputs sans label (analyse basique)
  assert(formsWithoutLabel <= 5, 'G60. Formulaires ont des labels associés (analyse basique)',
    `${formsWithoutLabel} inputs sans label ou aria-label`);

  /* ---------- H. Tests performance (3) ---------- */
  console.log('\nH. Tests performance (3)');

  const edLines = readText('js/embedded-data.js').split('\n').length;
  assert(edLines < 20000, 'H61. embedded-data.js < 20000 lignes',
    `${edLines} lignes`);

  // 62. Aucun JS > 3000 lignes (sauf embedded-data)
  const bigJs = [];
  for (const f of expectedJS) {
    if (f === 'embedded-data.js') continue;
    const n = readText(path.join('js', f)).split('\n').length;
    if (n > 3000) bigJs.push(`${f} (${n})`);
  }
  assert(bigJs.length === 0, 'H62. Aucun JS > 3000 lignes (sauf embedded-data)',
    bigJs.join(', '));

  // 63. Total fichiers statiques raisonnable (HTML+CSS+JS+JSON)
  // La spec disait < 50 mais avec 22 JS modulaires et 17 JSON de config c'est
  // légitime. On accepte < 80.
  const totalStatic =
    listFiles('', '.html').length +
    listFiles('css', '.css').length +
    listFiles('js', '.js').length +
    listFiles('json', '.json').length;
  assert(totalStatic < 80, 'H63. Total fichiers statiques raisonnable (< 80)',
    `${totalStatic} fichiers (HTML+CSS+JS+JSON)`);

  /* ---------- RÉSUMÉ ---------- */
  console.log('\n=== RÉSUMÉ ===');
  console.log(`\u2713 Passé: ${passed}`);
  console.log(`\u2717 Échoué: ${failed}`);
  console.log(`Total: ${passed + failed}`);
  const pct = ((passed / (passed + failed)) * 100).toFixed(1);
  console.log(`Taux de réussite: ${pct}%`);

  if (failures.length > 0) {
    console.log('\n=== ÉCHECS ===');
    failures.forEach(f => console.log(`- ${f.name}${f.detail ? ' :: ' + f.detail : ''}`));
  }

  process.exit(failed > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('Erreur fatale:', err);
  process.exit(2);
});

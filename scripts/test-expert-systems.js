/* scripts/test-expert-systems.js - Tests pour expert-systems.js (Task L7b)
 *
 * Charge expert-modules.json + expert-systems.js dans un env Node simule,
 * construit un sellerData realiste (5 produits, 20 commandes sur 6 mois),
 * appelle chaque module.compute() / .render() / .getRecommendations(),
 * puis teste renderAll() avec un mock DOM minimal.
 *
 * Usage : node /home/z/my-project/scripts/test-expert-systems.js
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
    clear: function () { for (const k in store) delete store[k]; }
  };
})();

global.fetch = function () { return Promise.reject(new Error('no fetch in test env')); };

/* Mock CustomEvent (pour le dispatch dans renderAll) */
if (typeof global.CustomEvent === 'undefined') {
  global.CustomEvent = function (type, opts) {
    const ev = { type: type, detail: opts && opts.detail || null };
    return ev;
  };
}

/* Minimal mock element pour querySelector / addEventListener / innerHTML */
function MockElement(tag, parent) {
  this.tagName = (tag || 'div').toUpperCase();
  this.parent = parent || null;
  this.children = [];
  this._eventListeners = {};
  this._innerHTML = '';
  this.attributes = {};
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

/* innerHTML setter : parse les boutons .expert-tab et cree le contentEl.
 * Si un parent est defini, propage la maj pour que container.innerHTML
 * reste coherent (comportement proche d'un vrai DOM). */
Object.defineProperty(MockElement.prototype, 'innerHTML', {
  get: function () { return this._innerHTML; },
  set: function (html) {
    this._innerHTML = String(html);
    this.children = [];
    const re = /<button[^>]*class="expert-tab[^"]*"[^>]*data-module="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g;
    let m;
    while ((m = re.exec(this._innerHTML)) !== null) {
      const btn = new MockElement('button', this);
      btn.setAttribute('data-module', m[1]);
      btn.dataset = { module: m[1] };
      btn.getAttribute = function (k) {
        if (k === 'data-module') return this.dataset.module;
        return this.attributes[k] || null;
      };
      this.children.push(btn);
    }
    if (this._innerHTML.indexOf('id="expert-tab-content"') >= 0) {
      const content = new MockElement('div', this);
      content.id = 'expert-tab-content';
      const m2 = this._innerHTML.match(/<div class="expert-tab-content"[^>]*>([\s\S]*)<\/div>\s*$/);
      content._innerHTML = m2 ? m2[1] : '';
      this._contentEl = content;
    }
    /* Propage vers le parent si on est le contentEl */
    if (this.parent && this.id === 'expert-tab-content') {
      this.parent._syncFromContent();
    }
  }
});

/* querySelector : supporte .expert-tab et #expert-tab-content */
MockElement.prototype.querySelector = function (selector) {
  if (selector === '#expert-tab-content') {
    return this._contentEl || null;
  }
  if (selector === '.expert-tab' || selector.indexOf('.expert-tab[') === 0) {
    /* Extraction de l'attribut data-module recherche */
    const m = selector.match(/data-module="([^"]+)"/);
    const wantModule = m ? m[1] : null;
    for (const c of this.children) {
      if (c.dataset && c.dataset.module === wantModule) return c;
    }
    return wantModule ? null : (this.children[0] || null);
  }
  return null;
};
MockElement.prototype.querySelectorAll = function (selector) {
  if (selector === '.expert-tab') {
    return this.children.slice();
  }
  return [];
};

/* Permet a un MockElement "conteneur" de refleter le innerHTML de son contentEl
 * dans son propre innerHTML (comportement proche d'un vrai DOM). */
MockElement.prototype._syncFromContent = function () {
  if (this._contentEl && this._contentEl._innerHTML) {
    /* Reconstruit le innerHTML global en reinserant le contenu du contentEl */
    const open = '<div class="expert-tab-content" id="expert-tab-content">';
    const idx = this._innerHTML.indexOf(open);
    if (idx >= 0) {
      const before = this._innerHTML.slice(0, idx + open.length);
      const after = '</div>';
      this._innerHTML = before + this._contentEl._innerHTML + after;
    }
  }
};

global.document = {
  dispatchEvent: function () { return true; },
  addEventListener: function () {},
  createElement: function (tag) { return new MockElement(tag); }
};

/* ================================================================== */
/* 2. CHARGEMENT DES FICHIERS                                         */
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

/* Charge utils.js (dependance optionnelle pour ExpertSystems.utils.formatFCFA) */
try {
  loadJs('utils.js');
} catch (e) {
  console.log('[WARN] utils.js non charge : ' + e.message + ' - ExpertSystems utilisera ses fallbacks.');
}

/* Charge expert-systems.js */
loadJs('expert-systems.js');

/* Charge la reference JSON et l'injecte */
const refPath = path.join(JSON_DIR, 'expert-modules.json');
const refJson = JSON.parse(fs.readFileSync(refPath, 'utf8'));
if (typeof ExpertSystems.setReference === 'function') {
  ExpertSystems.setReference(refJson.reference_data || {});
} else {
  /* Fallback : on patche REFERENCE directement */
  const ref = ExpertSystems.getReference();
  Object.assign(ref, refJson.reference_data || {});
}
console.log('[LOAD] expert-modules.json injecte dans REFERENCE');
console.log('  - ratios_sains keys : ' + Object.keys(ExpertSystems.getReference().ratios_sains || {}).length);
console.log('  - saisonnalite keys : ' + Object.keys(ExpertSystems.getReference().saisonnalite || {}).length);
console.log('  - prix_moyens_marche keys : ' + Object.keys(ExpertSystems.getReference().prix_moyens_marche || {}).length);
console.log('  - messages_templates keys : ' + Object.keys(ExpertSystems.getReference().messages_templates || {}).length);

/* ================================================================== */
/* 3. SELLERDATA REALISTE (5 produits, 20 commandes sur 6 mois)       */
/* ================================================================== */
const STOCK_ITEMS = [
  { id: 'PRD001', nom: 'Beurre de karite brut 250g', categorie: 'Karite', prix: 1500,
    effective_stock: 80, quantite_disponible: 80, date_peremption: '2027-06-30', reviews_count: 12 },
  { id: 'PRD002', nom: 'Miel cru 500g', categorie: 'Miel', prix: 3500,
    effective_stock: 30, quantite_disponible: 30, date_peremption: '2027-12-31', reviews_count: 8 },
  { id: 'PRD003', nom: 'Faso Dan Fani 2m', categorie: 'Coton', prix: 8000,
    effective_stock: 12, quantite_disponible: 12, date_peremption: null, reviews_count: 5 },
  { id: 'PRD004', nom: 'Savon noir 150g', categorie: 'Karite', prix: 800,
    effective_stock: 200, quantite_disponible: 200, date_peremption: '2027-06-30', reviews_count: 15 },
  { id: 'PRD005', nom: 'Bracelet bronze', categorie: 'Artisanat', prix: 12000,
    effective_stock: 5, quantite_disponible: 5, date_peremption: null, reviews_count: 3 }
];

/* Genere 20 commandes sur 6 mois (Janvier-Juin 2025) avec paniers mixtes */
function buildOrders() {
  const orders = [];
  const sellerId = 'SEL_TEST';
  const clients = ['Amadou D.', 'Fatou O.', 'Issouf K.', 'Mariam S.', 'Salif B.',
                   'Aïcha T.', 'Boukary Z.', 'Nadège W.', 'Oumar C.', 'Rasmané N.'];
  /* Pattern de paniers : melange de mono et multi-produits pour cross-sell */
  const paniers = [
    [{ id: 'PRD001', q: 2 }, { id: 'PRD004', q: 1 }],            // karite + savon
    [{ id: 'PRD002', q: 1 }],
    [{ id: 'PRD001', q: 3 }],
    [{ id: 'PRD003', q: 1 }],
    [{ id: 'PRD002', q: 1 }, { id: 'PRD005', q: 1 }],            // miel + bracelet
    [{ id: 'PRD004', q: 5 }],
    [{ id: 'PRD001', q: 1 }, { id: 'PRD002', q: 1 }],            // karite + miel
    [{ id: 'PRD005', q: 1 }],
    [{ id: 'PRD002', q: 2 }, { id: 'PRD004', q: 2 }],
    [{ id: 'PRD003', q: 1 }, { id: 'PRD001', q: 1 }]
  ];

  const statuses = ['acceptee', 'livree', 'recu', 'acceptee', 'livree'];
  let totalRevenue = 0;

  for (let i = 0; i < 20; i++) {
    const panier = paniers[i % paniers.length];
    const client = clients[i % clients.length];
    /* Date etalee sur 6 mois : janvier (i=0) -> juin (i=19) */
    const month = Math.floor(i / 4) + 1; /* 4 commandes par mois */
    const day = ((i % 4) * 7) + 3;
    const dateStr = '2025-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');

    const items = panier.map(p => {
      const prod = STOCK_ITEMS.find(s => s.id === p.id);
      const lineTotal = prod.prix * p.q;
      return {
        product_id: p.id, nom: prod.nom, seller_id: sellerId,
        prix: prod.prix, quantite: p.q, line_total: lineTotal
      };
    });
    const total = items.reduce((s, it) => s + it.line_total, 0);
    totalRevenue += total;

    const status = statuses[i % statuses.length];
    orders.push({
      id: 'BF-2025-' + String(1000 + i),
      order_date: dateStr,
      status: status,
      client_name: client,
      items: items,
      total: total,
      livraison_date: status === 'acceptee' ? '2025-' + String(month).padStart(2, '0') + '-' + String(day + 3).padStart(2, '0') : null
    });
  }

  return { orders: orders, totalRevenue: totalRevenue };
}

const built = buildOrders();
const SELLER_DATA = {
  seller_id: 'SEL_TEST',
  nom: 'Coop Test Faso',
  ventes_count: 35,
  trust_level: 3,
  total_revenue: built.totalRevenue,
  marge_moyenne: 38,
  stock_items: STOCK_ITEMS,
  orders: built.orders
};

const INPUTS = {
  charges_fixes_mensuelles: 75000,
  charges_variables_pct: 28,
  taux_marge_nette: 38,
  cout_achat_moyen: null,
  tresorerie_initiale: 250000,
  creances_clients: 45000,
  dettes_fournisseurs: 30000,
  delai_paiement_client_jours: 21,
  delai_reappro_jours: 14,
  stock_securite_jours: 7,
  cout_possession_pct: 22
};

console.log('\n[SETUP] sellerData construit :');
console.log('  - seller_id : ' + SELLER_DATA.seller_id);
console.log('  - stock_items : ' + SELLER_DATA.stock_items.length + ' produits');
console.log('  - orders : ' + SELLER_DATA.orders.length + ' commandes');
console.log('  - total_revenue : ' + SELLER_DATA.total_revenue + ' FCFA');
console.log('  - marge_moyenne : ' + SELLER_DATA.marge_moyenne + '%');

/* ================================================================== */
/* 4. TESTS : chaque module compute / getRecommendations / render     */
/* ================================================================== */
console.log('\n========================================');
console.log('TESTS MODULES');
console.log('========================================');

const MODULE_IDS = ['comptable', 'financier', 'marketing', 'secretaire', 'stock', 'conseiller'];
const results = { ok: 0, fail: 0, errors: [] };

function assert(cond, msg) {
  if (cond) { results.ok++; console.log('  [PASS] ' + msg); }
  else { results.fail++; results.errors.push(msg); console.log('  [FAIL] ' + msg); }
}

MODULE_IDS.forEach(modId => {
  console.log('\n--- Module : ' + modId + ' ---');
  const mod = ExpertSystems[modId];
  assert(!!mod, 'module ' + modId + ' expose');
  assert(typeof mod.compute === 'function', modId + '.compute() est une fonction');
  assert(typeof mod.getRecommendations === 'function', modId + '.getRecommendations() est une fonction');
  assert(typeof mod.render === 'function', modId + '.render() est une fonction');

  /* compute */
  let computed = null;
  try {
    computed = mod.compute(SELLER_DATA, INPUTS);
    assert(computed && typeof computed === 'object', modId + '.compute() retourne un object (keys: ' + Object.keys(computed).slice(0, 5).join(', ') + '...)');
  } catch (e) {
    assert(false, modId + '.compute() LEVE une erreur : ' + e.message);
    console.log('    stack: ' + (e.stack || '').split('\n').slice(0, 3).join('\n    '));
    return;
  }

  /* getRecommendations */
  let recs = [];
  try {
    recs = mod.getRecommendations(SELLER_DATA, INPUTS);
    assert(Array.isArray(recs), modId + '.getRecommendations() retourne un array (' + recs.length + ' recs)');
    if (recs.length > 0) {
      const r0 = recs[0];
      assert(!!r0.id && !!r0.priorite && !!r0.action, modId + ' recs[0] a {id, priorite, action}');
    }
  } catch (e) {
    assert(false, modId + '.getRecommendations() LEVE une erreur : ' + e.message);
    return;
  }

  /* render */
  let html = '';
  try {
    html = mod.render(SELLER_DATA, INPUTS);
    assert(typeof html === 'string' && html.length > 0, modId + '.render() retourne du HTML non vide (' + html.length + ' chars)');
    assert(html.indexOf('expert-module') >= 0, modId + '.render() contient .expert-module');
    assert(html.indexOf('expert-kpis') >= 0, modId + '.render() contient .expert-kpis');
    assert(html.indexOf('recommendation') >= 0 || html.indexOf('card-modern') >= 0, modId + '.render() contient .recommendation ou .card-modern');
    /* Affiche les KPIs/recommandations detectees */
    const kpiCount = (html.match(/class="expert-kpi"/g) || []).length;
    const recCount = (html.match(/class="recommendation /g) || []).length;
    console.log('    KPIs rendus : ' + kpiCount + ', Recommandations rendues : ' + recCount);
  } catch (e) {
    assert(false, modId + '.render() LEVE une erreur : ' + e.message);
    console.log('    stack: ' + (e.stack || '').split('\n').slice(0, 3).join('\n    '));
  }
});

/* ================================================================== */
/* 5. TEST SPECIFIQUE : bug marketing (ligne 488 anciennement)        */
/* ================================================================== */
console.log('\n--- Test bug marketing (Cannot convert undefined or null to object) ---');
let marketingOk = true;
let marketingErr = null;
try {
  /* Avant fix : Object.keys(m.saisonnalite) levait une erreur car la variable
   * etait declaree "saissonnalite" (double-n) et retournee sous ce nom.
   * Donc m.saisonnalite (single-n) etait undefined. */
  const m = ExpertSystems.marketing.compute(SELLER_DATA, INPUTS);
  const recs = ExpertSystems.marketing.getRecommendations(SELLER_DATA, INPUTS);
  const html = ExpertSystems.marketing.render(SELLER_DATA, INPUTS);
  assert(m && m.saisonnalite && Object.keys(m.saisonnalite).length > 0,
    'marketing.compute().saisonnalite est un object non vide (' + Object.keys(m.saisonnalite).length + ' categories)');
  assert(m.bcg_matrix && m.bcg_matrix.length === 5, 'marketing.compute().bcg_matrix a 5 entrees (one per product)');
  assert(Array.isArray(recs) && recs.length >= 0, 'marketing.getRecommendations ne leve plus d\'erreur (' + recs.length + ' recs)');
  assert(html.indexOf('bcg-matrix') >= 0, 'marketing.render contient .bcg-matrix');
  assert(html.indexOf('bcg-cell') >= 0, 'marketing.render contient .bcg-cell');
} catch (e) {
  marketingOk = false;
  marketingErr = e;
  assert(false, 'marketing lève toujours une erreur : ' + e.message);
}

/* ================================================================== */
/* 6. TEST renderAll avec mock DOM                                    */
/* ================================================================== */
console.log('\n--- Test renderAll() avec mock DOM ---');
const container = new MockElement('div');
let renderAllOk = true;
try {
  ExpertSystems.renderAll(container, SELLER_DATA, INPUTS);
  /* renderAll est async (charge reference via fetch qui reject),
   * mais notre fetch renvoie une promesse rejetee -> loadReference appelle
   * quand meme callback(REFERENCE) avec REFERENCE par defaut. On attend un tick. */
  setTimeout(function () {
    try {
      assert(container.innerHTML.indexOf('expert-tabs') >= 0, 'renderAll injecte .expert-tabs');
      assert(container.children.length === 6, 'renderAll genere 6 onglets (trouve : ' + container.children.length + ')');
      assert(container.innerHTML.indexOf('expert-tab-content') >= 0, 'renderAll injecte .expert-tab-content');
      assert(container.innerHTML.indexOf('expert-module') >= 0, 'renderAll rend le module actif');

      /* Test persistance localStorage : on doit avoir achetons_bf_expert_tab_SEL_TEST */
      const persisted = localStorage.getItem('achetons_bf_expert_tab_SEL_TEST');
      assert(!!persisted, 'renderAll persiste l\'onglet actif (cle achetons_bf_expert_tab_SEL_TEST = ' + persisted + ')');

      /* Test clic sur un autre onglet : simule activate('marketing') */
      const marketingBtn = container.querySelector('.expert-tab[data-module="marketing"]');
      assert(!!marketingBtn, 'bouton marketing trouve via querySelector');
      if (marketingBtn && marketingBtn._eventListeners.click) {
        marketingBtn._eventListeners.click.forEach(function (cb) { cb({}); });
        const persistedAfterClick = localStorage.getItem('achetons_bf_expert_tab_SEL_TEST');
        assert(persistedAfterClick === 'marketing',
          'apres clic marketing, onglet persiste = ' + persistedAfterClick + ' (attendu marketing)');
      }

      finalReport();
    } catch (e) {
      assert(false, 'renderAll post-check a leve : ' + e.message);
      finalReport();
    }
  }, 50);
} catch (e) {
  renderAllOk = false;
  assert(false, 'renderAll leve une erreur synchrone : ' + e.message);
  finalReport();
}

/* ================================================================== */
/* 7. RAPPORT FINAL                                                   */
/* ================================================================== */
function finalReport() {
  console.log('\n========================================');
  console.log('RAPPORT FINAL');
  console.log('========================================');
  console.log('Tests OK : ' + results.ok);
  console.log('Tests FAIL : ' + results.fail);
  if (results.errors.length > 0) {
    console.log('\nEchecs :');
    results.errors.forEach(function (e) { console.log('  - ' + e); });
  }
  console.log('\n' + (results.fail === 0
    ? '\u2705 Tous les modules OK - expert-systems.js operationnel'
    : '\u274C ECHEC : ' + results.fail + ' test(s) ont echoue'));
  process.exit(results.fail === 0 ? 0 : 1);
}

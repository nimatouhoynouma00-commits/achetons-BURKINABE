/* js/data-seed.js - Charge les donnees JSON initiales et les expose via window.Data
 *
 * Strategy :
 * 1. Tente fetch() des fichiers json/*.json (fonctionne avec un serveur HTTP)
 * 2. Si fetch echoue (file:// protocol), fallback sur EmbeddedData (embarque dans embedded-data.js)
 *
 * Apres chargement, fusionne les overrides vendeurs persistes (Storage) avec les
 * donnees JSON de base (ventes_count, trust_level) afin que trust-system soit
 * coherent d'une session a l'autre.
 */

const Data = {
  products: [],
  sellers: [],
  categories: [],
  certifications: [],
  regions: [],
  betaAccounts: [],
  trustBadges: [],
  cartRules: {},
  resellerRules: {},
  searchConfig: {},
  formSchemas: {},
  expertModules: {},     // contenu de json/expert-modules.json
  betaActivity: {},      // contenu de json/beta-activity.json

  /* Extrait les donnees d'un objet JSON vers les proprietes de Data.
   * Plusieurs fichiers JSON sont des tableaux racines (products.json,
   * regions.json sont parfois wrapper-ises dans un objet). On gere les
   * deux formats pour robustesse. */
  _hydrate(key, json) {
    if (!json) return;
    switch (key) {
      case 'products':       Data.products       = Array.isArray(json) ? json : (json.products || []); break;
      case 'sellers':        Data.sellers        = json.sellers || []; break;
      case 'categories':     Data.categories     = Array.isArray(json) ? json : (json.categories || []); break;
      case 'certifications': Data.certifications = Array.isArray(json) ? json : (json.certifications || []); break;
      case 'regions':        Data.regions        = Array.isArray(json) ? json : (json.regions || []); break;
      case 'betaAccounts':   Data.betaAccounts   = json.accounts || (Array.isArray(json) ? json : []); break;
      case 'trustBadges':    Data.trustBadges    = json.trust_levels || (Array.isArray(json) ? json : []); break;
      case 'cartRules':      Data.cartRules      = json.cart_rules || (json || {}); break;
      case 'resellerRules':  Data.resellerRules  = json.reseller_rules || (json || {}); break;
      case 'searchConfig':   Data.searchConfig   = json.search_settings || (json || {}); break;
      case 'formSchemas':    Data.formSchemas    = json.schemas || (json || {}); break;
      case 'expertModules':  Data.expertModules  = json || {}; break;
      case 'betaActivity':   Data.betaActivity   = json || {}; break;
    }
  },

  /* Charge depuis EmbeddedData (fallback file://) */
  _loadEmbedded() {
    if (typeof EmbeddedData === 'undefined') {
      console.error('EmbeddedData non disponible. Inclure js/embedded-data.js avant data-seed.js');
      return false;
    }
    const mapping = {
      products:       'products',
      sellers:        'sellers',
      categories:     'categories',
      certifications: 'certifications',
      regions:        'regions',
      betaAccounts:   'beta_accounts',
      trustBadges:    'trust_badges',
      cartRules:      'cart_rules',
      resellerRules:  'reseller_rules',
      searchConfig:   'search_config',
      formSchemas:    'form_schemas',
      expertModules:  'expert_modules',
      betaActivity:   'beta_activity'
    };
    Object.entries(mapping).forEach(([dataKey, embeddedKey]) => {
      Data._hydrate(dataKey, EmbeddedData[embeddedKey]);
    });
    return true;
  },

  /* Fusionne les overrides vendeur persistes (ventes_count, trust_level)
   * avec les donnees JSON de base. Appele apres chaque chargement. */
  _applySellerOverrides() {
    if (typeof Storage === 'undefined' || !Storage.getSellerOverrides) return;
    const overrides = Storage.getSellerOverrides();
    if (!overrides) return;
    Data.sellers.forEach(seller => {
      const ov = overrides[seller.id];
      if (!ov) return;
      if (typeof ov.ventes_count === 'number') seller.ventes_count = ov.ventes_count;
      if (ov.trust_level) seller.trust_level = ov.trust_level;
      if (typeof ov.achats_count === 'number') seller.achats_count = ov.achats_count;
    });
  },

  /* Charge tous les JSON en parallel, fallback sur EmbeddedData si fetch echoue */
  async loadAll() {
    // Detection file:// : on skip fetch entirely (sinon erreurs CORS dans la console)
    const isFileProtocol = window.location.protocol === 'file:';

    if (!isFileProtocol) {
      const files = [
        ['products',       'json/products.json'],
        ['sellers',        'json/sellers.json'],
        ['categories',     'json/categories.json'],
        ['certifications', 'json/certifications.json'],
        ['regions',        'json/regions.json'],
        ['betaAccounts',   'json/beta-accounts.json'],
        ['trustBadges',    'json/trust-badges.json'],
        ['cartRules',      'json/cart-rules.json'],
        ['resellerRules',  'json/reseller-rules.json'],
        ['searchConfig',   'json/search-config.json'],
        ['formSchemas',    'json/form-schemas.json'],
        ['expertModules',  'json/expert-modules.json'],
        ['betaActivity',   'json/beta-activity.json']
      ];

      let fetchOk = false;
      try {
        const results = await Promise.all(
          files.map(([key, path]) =>
            fetch(path)
              .then(r => {
                if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + path);
                return r.json();
              })
              .then(json => [key, json])
              .catch(err => [key, null])
          )
        );

        results.forEach(([key, json]) => {
          if (json) {
            Data._hydrate(key, json);
            fetchOk = true;
          }
        });
      } catch (e) {
        console.warn('fetch() a echoue, fallback sur EmbeddedData:', e.message);
      }

      if (!fetchOk) {
        Data._loadEmbedded();
      }
    } else {
      // file:// : on utilise directement les donnees embarquees
      Data._loadEmbedded();
    }

    // Reapplique les overrides persistes (ventes_count / trust_level)
    Data._applySellerOverrides();

    Storage.markSeeded();
    document.dispatchEvent(new CustomEvent('data:ready'));
    return Data;
  },

  /* Helpers d'acces */
  getProduct(id) {
    return Data.products.find(p => p.id === id);
  },

  getSeller(id) {
    return Data.sellers.find(s => s.id === id);
  },

  getCategory(name) {
    return Data.categories.find(c => c.nom === name);
  },

  getCertification(name) {
    return Data.certifications.find(c => c.nom === name);
  },

  /* Recupere le niveau de trust d'un vendeur */
  getTrustLevel(sellerId) {
    const seller = Data.getSeller(sellerId);
    if (!seller) return null;
    return seller.trust_level;
  },

  /* Recupere les produits d'un vendeur */
  getProductsBySeller(sellerId) {
    return Data.products.filter(p => p.vendeur_id === sellerId);
  },

  /* Recupere les produits d'une categorie */
  getProductsByCategory(categoryName) {
    return Data.products.filter(p => p.categorie === categoryName);
  },

  /* Recupere les produits phares (top notes + stock) */
  getFeatured(limit = 8) {
    return [...Data.products]
      .sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
      .slice(0, limit);
  },

  /* Recupere les produits similaires */
  getRelated(product, limit = 4) {
    if (!product) return [];
    return Data.products
      .filter(p => p.id !== product.id && p.categorie === product.categorie)
      .slice(0, limit);
  },

  /* Stock effectif d'un produit (override ou stock de base) */
  getEffectiveStock(product) {
    if (!product) return 0;
    const session = Storage.getSession();
    if (session && session.user_type === 'vendeur') {
      const overrides = Storage.getStockOverrides(session.user_id);
      if (overrides[product.id] !== undefined) {
        return overrides[product.id];
      }
    }
    return product.quantite_disponible || 0;
  },

  /* ====================================================================
   * NOUVEAU : historique d'activité + notifications initiales (beta-activity)
   * ==================================================================== */

  /* Cherche l'entree d'activite d'un utilisateur dans beta_activity.
   * Retourne null si non trouve ou si betaActivity non charge. */
  _findBetaActivityUser(userId) {
    if (!Data.betaActivity) return null;
    // Recherche dans acheteurs / vendeurs / revendeurs
    const buckets = ['acheteurs', 'vendeurs', 'revendeurs'];
    for (const b of buckets) {
      const bucket = Data.betaActivity[b];
      if (bucket && bucket[userId]) return bucket[userId];
    }
    return null;
  },

  /* Historique d'activite d'un user (depuis beta_activity).
   * Retourne un tableau (vide si non trouve). */
  getActivityForUser(userId) {
    const user = Data._findBetaActivityUser(userId);
    if (!user) return [];
    return (user.historique_activite || []).slice();
  },

  /* Notifications initiales d'un user (depuis beta_activity).
   * Retourne un tableau normalise avec {id, type, titre, message, date, lu, source}. */
  getNotificationsForUser(userId) {
    const user = Data._findBetaActivityUser(userId);
    if (!user) return [];
    return (user.notifications_recentes || []).map((n, i) => ({
      id: 'beta_notif_' + i + '_' + userId,
      type: n.type || 'info',
      title: n.titre || n.type || 'Notification',
      message: n.message || '',
      created_at: n.date || new Date().toISOString(),
      read: !!n.lu,
      source: 'beta_seed'
    }));
  },

  /* ====================================================================
   * NOUVEAU : recommandations expert pour un vendeur
   * ==================================================================== */

  /* Construit l'objet sellerData attends par ExpertSystems a partir du vendeur
   * et de ses produits / commandes Storage. */
  _buildSellerData(sellerId) {
    const seller = Data.getSeller(sellerId);
    if (!seller) return null;

    const stockItems = Data.getProductsBySeller(sellerId).map(p => ({
      id: p.id,
      nom: p.nom,
      categorie: p.categorie,
      prix: p.prix,
      effective_stock: Storage.getStock(sellerId, p.id),
      quantite_disponible: p.quantite_disponible
    }));

    // Recupere les commandes du vendeur depuis Storage (acheteurs)
    // Note: Storage.getOrders est par user (acheteur). On scanne tous les
    // sellers overrides + on filtre par seller_id dans les items.
    const orders = [];
    if (Storage && Storage.get) {
      // Heuristique: on regarde les sessions beta connues pour recuperer leurs orders
      // (limite aux 12 comptes beta pour ne pas scanner tout localStorage)
      const betaIds = (Data.betaAccounts || []).map(a => a.id);
      betaIds.forEach(uid => {
        const userOrders = Storage.get('orders_' + uid, []);
        userOrders.forEach(o => {
          if (o.items && o.items.some(it => it.seller_id === sellerId)) {
            orders.push(o);
          }
        });
      });
    }

    const totalRevenue = orders.reduce((sum, o) => {
      return sum + (o.items || [])
        .filter(it => it.seller_id === sellerId)
        .reduce((s, it) => s + (it.line_total || 0), 0);
    }, 0);

    const avgMargin = seller.marge_moyenne || 35;

    return {
      seller_id: sellerId,
      nom: seller.nom,
      ventes_count: seller.ventes_count || 0,
      trust_level: seller.trust_level,
      total_revenue: totalRevenue,
      marge_moyenne: avgMargin,
      stock_items: stockItems,
      orders: orders
    };
  },

  /* Genere des recommandations pour un vendeur en utilisant ExpertSystems.
   * Retourne un objet { ok, recommendations, modules_used, error }.
   * Si ExpertSystems n'est pas charge, retourne ok=false avec un message. */
  getRecommendationsForSeller(sellerId) {
    if (typeof ExpertSystems === 'undefined') {
      return {
        ok: false,
        error: 'ExpertSystems non disponible (js/expert-systems.js non charge)',
        recommendations: []
      };
    }

    const sellerData = Data._buildSellerData(sellerId);
    if (!sellerData) {
      return { ok: false, error: 'Vendeur introuvable', recommendations: [] };
    }

    const inputs = (Storage && Storage.getExpertInputs)
      ? Storage.getExpertInputs(sellerId)
      : (ExpertSystems.utils && ExpertSystems.utils.loadInputs ? ExpertSystems.utils.loadInputs(sellerId) : {});

    // On agrege les recommandations de tous les modules
    const modulesToUse = ['comptable', 'financier', 'marketing', 'stock', 'conseiller'];
    const allRecs = [];
    const used = [];

    modulesToUse.forEach(modId => {
      const mod = ExpertSystems[modId];
      if (!mod || typeof mod.getRecommendations !== 'function') return;
      try {
        const recs = mod.getRecommendations(sellerData, inputs) || [];
        recs.forEach(r => {
          allRecs.push({
            module: modId,
            id: r.id || (modId + '_' + Math.random().toString(36).slice(2, 8)),
            priorite: r.priorite || 'moyenne',
            action: r.action || r.message || ''
          });
        });
        used.push(modId);
      } catch (e) {
        console.warn('[Data.getRecommendationsForSeller] module', modId, 'erreur:', e);
      }
    });

    // Tri par priorite (haute > moyenne > basse)
    const order = { haute: 0, high: 0, moyenne: 1, medium: 1, basse: 2, low: 2 };
    allRecs.sort((a, b) => (order[a.priorite] ?? 3) - (order[b.priorite] ?? 3));

    return {
      ok: true,
      recommendations: allRecs,
      modules_used: used,
      seller_data: sellerData,
      error: null
    };
  }
};

window.Data = Data;

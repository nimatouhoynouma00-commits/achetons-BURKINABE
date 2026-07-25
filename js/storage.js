/* js/storage.js - Abstraction localStorage avec namespaces */

const Storage = {
  PREFIX: 'achetons_bf_',
  _memoryStore: {},

  _key(name) {
    return this.PREFIX + name;
  },

  _getStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
      if (typeof localStorage !== 'undefined') return localStorage;
    } catch (e) {
      // ignore
    }
    return null;
  },

  get(name, fallback = null) {
    const storage = this._getStorage();
    try {
      const raw = storage
        ? storage.getItem(this._key(name))
        : this._memoryStore[this._key(name)];
      if (raw === null || raw === undefined) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Storage.get failed for', name, e);
      return fallback;
    }
  },

  set(name, value) {
    const storage = this._getStorage();
    try {
      if (storage) {
        storage.setItem(this._key(name), JSON.stringify(value));
      } else {
        this._memoryStore[this._key(name)] = JSON.stringify(value);
      }
      return true;
    } catch (e) {
      console.warn('Storage.set failed for', name, e);
      return false;
    }
  },

  remove(name) {
    const storage = this._getStorage();
    if (storage) {
      storage.removeItem(this._key(name));
    } else {
      delete this._memoryStore[this._key(name)];
    }
  },

  /* Cart helpers */
  getCart() {
    return Storage.get('cart', { items: [], last_updated: null });
  },

  setCart(cart) {
    cart.last_updated = new Date().toISOString();
    return Storage.set('cart', cart);
  },

  /* Session */
  getSession() {
    return Storage.get('session', null);
  },

  setSession(session) {
    return Storage.set('session', session);
  },

  clearSession() {
    Storage.remove('session');
  },

  /* Orders par user */
  getOrders(userId) {
    return Storage.get('orders_' + userId, []);
  },

  addOrder(userId, order) {
    const orders = Storage.getOrders(userId);
    orders.unshift(order);
    Storage.set('orders_' + userId, orders);
    return order;
  },

  updateOrder(userId, orderId, patch) {
    const orders = Storage.getOrders(userId);
    const idx = orders.findIndex(o => o.order_id === orderId);
    if (idx >= 0) {
      orders[idx] = { ...orders[idx], ...patch };
      Storage.set('orders_' + userId, orders);
      return orders[idx];
    }
    return null;
  },

  /* ====================================================================
   * Notifications par user
   * ==================================================================== */
  getNotifications(userId) {
    return Storage.get('notifications_' + userId, []);
  },

  addNotification(userId, notif) {
    const list = Storage.getNotifications(userId);
    notif.id = notif.id || Utils.uuid();
    notif.created_at = notif.created_at || new Date().toISOString();
    notif.read = false;
    list.unshift(notif);
    Storage.set('notifications_' + userId, list);
    return notif;
  },

  markNotificationRead(userId, notifId) {
    const list = Storage.getNotifications(userId);
    const n = list.find(x => x.id === notifId);
    if (n) {
      n.read = true;
      Storage.set('notifications_' + userId, list);
    }
  },

  markAllNotificationsRead(userId) {
    const list = Storage.getNotifications(userId);
    list.forEach(n => n.read = true);
    Storage.set('notifications_' + userId, list);
  },

  /* ====================================================================
   * Activite par user - historique d'evenements (login, commande, etc.)
   * ==================================================================== */

  /* Recupere l'activite d'un user. Si vide et qu'un beta seed existe dans
   * Data.betaActivity, l'initialise depuis ce seed. */
  getActivity(userId) {
    let list = Storage.get('activity_' + userId, null);
    if (list === null) {
      // Tente d'initialiser depuis Data.betaActivity si dispo
      if (typeof Data !== 'undefined' && Data.getActivityForUser) {
        const seed = Data.getActivityForUser(userId);
        if (seed && seed.length) {
          Storage.set('activity_' + userId, seed);
          return seed.slice();
        }
      }
      return [];
    }
    return list;
  },

  /* Ajoute une entree d'activite en tete. Limite a 50 entrees.
   * entry = { date, type, detail, ... } */
  addActivity(userId, entry) {
    if (!userId || !entry) return null;
    const list = Storage.getActivity(userId);
    const cleanEntry = {
      date: entry.date || new Date().toISOString(),
      type: entry.type || 'info',
      detail: entry.detail || '',
      meta: entry.meta || null
    };
    list.unshift(cleanEntry);
    // Limite a 50 entrees pour eviter l'inflation de localStorage
    if (list.length > 50) list.length = 50;
    Storage.set('activity_' + userId, list);
    return cleanEntry;
  },

  /* ====================================================================
   * Seller overrides - persiste les modifications vendeur (trust upgrades,
   * ventes_count, achats_count) pour qu'elles survivent a un rechargement.
   * ==================================================================== */

  getSellerOverrides() {
    return Storage.get('seller_overrides', {});
  },

  setSellerOverride(sellerId, data) {
    if (!sellerId) return false;
    const overrides = Storage.getSellerOverrides();
    overrides[sellerId] = Object.assign({}, overrides[sellerId] || {}, data || {});
    overrides[sellerId].updated_at = new Date().toISOString();
    return Storage.set('seller_overrides', overrides);
  },

  clearSellerOverride(sellerId) {
    const overrides = Storage.getSellerOverrides();
    if (overrides[sellerId]) {
      delete overrides[sellerId];
      Storage.set('seller_overrides', overrides);
    }
  },

  /* ====================================================================
   * Stock effectif par vendeur / produit
   * ==================================================================== */

  /* Stock override brut pour un vendeur (map productId -> quantite) */
  getStockOverrides(sellerId) {
    return Storage.get('stock_' + sellerId, {});
  },

  setStockOverride(sellerId, productId, qty) {
    const overrides = Storage.getStockOverrides(sellerId);
    overrides[productId] = qty;
    Storage.set('stock_' + sellerId, overrides);
  },

  /* Stock effectif d'un produit pour un vendeur donne :
   * - prend l'override Storage si present
   * - sinon cherche dans Data.products la valeur originale
   * Retourne 0 si introuvable. */
  getStock(sellerId, productId) {
    const overrides = Storage.getStockOverrides(sellerId);
    if (overrides[productId] !== undefined) {
      return overrides[productId];
    }
    // Fallback : data originale
    if (typeof Data !== 'undefined' && Data.products) {
      const p = Data.products.find(x => x.id === productId && x.vendeur_id === sellerId);
      if (p) return p.quantite_disponible || 0;
      // Si on ne trouve pas par (id, vendeur), cherche juste par id
      const p2 = Data.products.find(x => x.id === productId);
      if (p2) return p2.quantite_disponible || 0;
    }
    return 0;
  },

  /* Decremente le stock d'un produit pour un vendeur et persiste.
   * Empêche le stock négatif : si qty > current, retourne false sans modifier.
   * Sinon décrémente et retourne le nouveau stock (number >= 0). */
  decrementStock(sellerId, productId, qty = 1) {
    if (!sellerId || !productId) return null;
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const current = Storage.getStock(sellerId, productId);
    if (qty > current) {
      // Stock insuffisant : on refuse la décrémentation (pas de stock négatif)
      return false;
    }
    const next = current - qty;
    Storage.setStockOverride(sellerId, productId, next);
    return next;
  },

  /* Restaure le stock d'un produit (utile si commande refusee/annulee).
   * Retourne le nouveau stock. */
  incrementStock(sellerId, productId, qty = 1) {
    if (!sellerId || !productId) return null;
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const current = Storage.getStock(sellerId, productId);
    const next = current + qty;
    Storage.setStockOverride(sellerId, productId, next);
    return next;
  },

  /* ====================================================================
   * Expert modules inputs - marges, charges, ... saisis par le vendeur
   * ==================================================================== */

  getExpertInputs(sellerId) {
    return Storage.get('expert_inputs_' + sellerId, {});
  },

  setExpertInputs(sellerId, data) {
    if (!sellerId) return false;
    const current = Storage.getExpertInputs(sellerId);
    const merged = Object.assign({}, current, data || {});
    merged.updated_at = new Date().toISOString();
    return Storage.set('expert_inputs_' + sellerId, merged);
  },

  /* Theme */
  getTheme() {
    return Storage.get('mode_sombre', 'light') === true ? 'dark' : 'light';
  },

  setTheme(mode) {
    Storage.set('mode_sombre', mode === 'dark');
  },

  /* Reviews par produit */
  getReviews(productId) {
    return Storage.get('reviews_' + productId, []);
  },

  addReview(productId, review) {
    const list = Storage.getReviews(productId);
    review.id = review.id || Utils.uuid();
    review.created_at = review.created_at || new Date().toISOString();
    list.unshift(review);
    Storage.set('reviews_' + productId, list);
    return review;
  },

  /* Messages contact vendeur */
  getMessages(sellerId) {
    return Storage.get('messages_' + sellerId, []);
  },

  addMessage(sellerId, msg) {
    const list = Storage.getMessages(sellerId);
    msg.id = msg.id || Utils.uuid();
    msg.created_at = msg.created_at || new Date().toISOString();
    msg.read = false;
    list.unshift(msg);
    Storage.set('messages_' + sellerId, list);
    return msg;
  },

  /* Donnees seeded ? */
  isSeeded() {
    return Storage.get('seeded', false) === true;
  },

  markSeeded() {
    Storage.set('seeded', true);
  }
};

window.Storage = Storage;

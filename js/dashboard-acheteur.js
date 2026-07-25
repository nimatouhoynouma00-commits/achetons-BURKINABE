/* js/dashboard-acheteur.js - Logique dashboard acheteur (refonte L5-L6)
 *
 * Structure cible : dashboard-layout (sidebar + content) avec 5 tabs.
 *   - overview  : stats achats, commandes recentes, activity feed
 *   - orders    : historique commandes complet avec filtres statut
 *   - favorites : produits favoris (bookmarks localStorage)
 *   - activity  : historique activite complet
 *   - settings  : parametres compte, dark mode, preferences categories
 *
 * UX : classes design-system.css, dark mode via variables CSS, toasts.
 */

const DashboardAcheteur = {

  TABS: [
    { id: 'overview',  label: "Vue d'ensemble", icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'orders',    label: 'Mes commandes', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'favorites', label: 'Favoris',       icon: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z' },
    { id: 'activity',  label: 'Activite',      icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'settings',  label: 'Parametres',    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ],

  _state: { container: null, session: null, activeTab: 'overview', currentFilter: 'tous' },

  /* Entry point : DashboardAcheteur.render(container, session) */
  render(container, session) {
    DashboardAcheteur._state = {
      container,
      session,
      activeTab: DashboardAcheteur._getActiveTab(session.user_id)
    };

    // Log connexion
    Storage.addActivity(session.user_id, {
      type: 'connexion',
      detail: 'Connexion au dashboard acheteur'
    });

    container.innerHTML =
      '<div class="container dashboard-layout">' +
        DashboardAcheteur.renderSidebar() +
        '<div class="dashboard-content" id="dashboard-content"></div>' +
      '</div>';

    // Wire tab nav
    container.querySelectorAll('.dashboard-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        DashboardAcheteur.switchTab(item.dataset.tab);
      });
    });

    DashboardAcheteur.switchTab(DashboardAcheteur._state.activeTab);
  },

  _getActiveTab(userId) {
    try { return localStorage.getItem('da_active_tab_' + userId) || 'overview'; }
    catch (e) { return 'overview'; }
  },
  _setActiveTab(userId, tab) {
    try { localStorage.setItem('da_active_tab_' + userId, tab); } catch (e) {}
  },

  /* Favorites : produits bookmarkes par l'acheteur */
  getFavorites() {
    const userId = DashboardAcheteur._state.session.user_id;
    const ids = Storage.get('favorites_' + userId, []);
    return ids.map(id => Data.getProduct(id)).filter(Boolean);
  },
  toggleFavorite(productId) {
    const userId = DashboardAcheteur._state.session.user_id;
    const ids = Storage.get('favorites_' + userId, []);
    const idx = ids.indexOf(productId);
    if (idx >= 0) ids.splice(idx, 1);
    else ids.push(productId);
    Storage.set('favorites_' + userId, ids);
    return idx < 0; // true si ajoute
  },

  /* Compute stats acheteur */
  computeStats() {
    const userId = DashboardAcheteur._state.session.user_id;
    const orders = Storage.getOrders(userId);
    const totalSpent = orders.reduce((s, o) => s + (o.total || 0), 0);
    const uniqueSellers = new Set();
    orders.forEach(o => (o.seller_ids || []).forEach(sid => uniqueSellers.add(sid)));
    const validatedOrders = orders.filter(o => ['recu', 'livree'].includes(o.status));
    const pendingOrders = orders.filter(o => ['en_cours', 'acceptee'].includes(o.status));
    return {
      orders, totalSpent, total_orders: orders.length,
      unique_sellers: uniqueSellers.size,
      validated: validatedOrders.length,
      pending: pendingOrders.length
    };
  },

  renderSidebar() {
    const session = DashboardAcheteur._state.session;
    const activeTab = DashboardAcheteur._state.activeTab;
    const notifs = Storage.getNotifications(session.user_id).filter(n => !n.read).length;

    const items = DashboardAcheteur.TABS.map(t => {
      const isActive = t.id === activeTab ? ' active' : '';
      const badge = (t.id === 'orders' && notifs > 0)
        ? '<span class="badge-modern badge-modern-error" style="margin-left:auto;">' + notifs + '</span>'
        : '';
      return '<a href="#" class="dashboard-nav-item' + isActive + '" data-tab="' + t.id + '">' +
        '<svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + t.icon + '"/></svg>' +
        '<span>' + Utils.escapeHtml(t.label) + '</span>' +
        badge +
      '</a>';
    }).join('');

    return '<aside class="dashboard-sidebar">' +
      '<div style="padding:8px 12px 16px; border-bottom:1px solid var(--border-subtle); margin-bottom:12px;">' +
        '<div class="avatar avatar-sm" style="margin-bottom:8px;">' + Utils.escapeHtml((session.user_name || '?').charAt(0).toUpperCase()) + '</div>' +
        '<div style="font-weight:600; font-size:0.9rem;">' + Utils.escapeHtml(Utils.truncate(session.user_name, 24)) + '</div>' +
        '<div class="text-caption">' + Utils.escapeHtml(session.region || session.ville || 'Acheteur') + '</div>' +
      '</div>' +
      '<nav class="dashboard-nav" style="display:flex; flex-direction:column;">' + items + '</nav>' +
    '</aside>';
  },

  switchTab(tabName) {
    DashboardAcheteur._state.activeTab = tabName;
    DashboardAcheteur._setActiveTab(DashboardAcheteur._state.session.user_id, tabName);

    const navItems = DashboardAcheteur._state.container.querySelectorAll('.dashboard-nav-item');
    navItems.forEach(it => it.classList.toggle('active', it.dataset.tab === tabName));

    const content = DashboardAcheteur._state.container.querySelector('#dashboard-content');
    if (!content) return;

    const renderers = {
      overview:  DashboardAcheteur.renderOverview,
      orders:    DashboardAcheteur.renderOrders,
      favorites: DashboardAcheteur.renderFavorites,
      activity:  DashboardAcheteur.renderActivity,
      settings:  DashboardAcheteur.renderSettings
    };
    const fn = renderers[tabName] || renderers.overview;
    content.innerHTML = '';
    fn.call(DashboardAcheteur, content);
  },

  /* -------------------------------------------------------------- */
  /*  Tab : overview                                                */
  /* -------------------------------------------------------------- */
  renderOverview(container) {
    const session = DashboardAcheteur._state.session;
    const stats = DashboardAcheteur.computeStats();
    const activity = Storage.getActivity(session.user_id);
    const favorites = DashboardAcheteur.getFavorites();

    container.innerHTML =
      '<header class="dashboard-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:24px;">' +
        '<div>' +
          '<p class="eyebrow">Mon profil</p>' +
          '<h1>' + Utils.escapeHtml(session.user_name) + '</h1>' +
          '<p class="text-caption">' + Utils.escapeHtml(session.email || '') + (session.telephone ? ' · ' + Utils.escapeHtml(session.telephone) : '') + '</p>' +
        '</div>' +
        '<a href="produits.html" class="btn btn-primary btn-sm">Decouvrir les produits</a>' +
      '</header>' +

      '<section style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px;">' +
        UI.renderStatCard({
          label: 'Achats totaux',
          value: stats.total_orders,
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
          trend: stats.total_orders > 0 ? 'up' : 'neutral',
          trendValue: stats.validated + ' recues'
        }) +
        UI.renderStatCard({
          label: 'Montant total',
          value: Utils.formatPrice(stats.totalSpent),
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
          trend: stats.totalSpent > 0 ? 'up' : 'neutral',
          trendValue: 'Cumul'
        }) +
        UI.renderStatCard({
          label: 'Vendeurs contactes',
          value: stats.unique_sellers,
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
          trend: 'neutral',
          trendValue: 'Diversite'
        }) +
        UI.renderStatCard({
          label: 'Favoris',
          value: favorites.length,
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
          trend: favorites.length > 0 ? 'up' : 'neutral',
          trendValue: 'Sauvegardes'
        }) +
      '</section>' +

      '<div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;" class="overview-grid-2col">' +
        '<section>' +
          '<div class="card-modern" style="margin-bottom:16px;">' +
            '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">' +
              '<h3 style="margin:0;">Commandes recentes</h3>' +
              '<a href="#" class="btn btn-ghost btn-sm" id="go-orders-btn">Voir tout</a>' +
            '</div>' +
            (stats.orders.length
              ? '<div style="display:flex; flex-direction:column; gap:8px;">' +
                  stats.orders.slice(0, 5).map(o =>
                    '<div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-radius:8px; background:var(--surface-2);">' +
                      '<div><strong>' + o.order_id + '</strong><div class="text-caption">' + Utils.formatDateShort(o.order_date) + ' · ' + o.items.length + ' article(s)</div></div>' +
                      '<div style="text-align:right;"><strong>' + Utils.formatPrice(o.total) + '</strong><div><span class="badge ' + Checkout.statusBadgeClass(o.status) + '">' + Checkout.statusLabel(o.status) + '</span></div></div>' +
                    '</div>'
                  ).join('') +
                '</div>'
              : '<div class="empty-state-modern"><p>Aucun achat pour le moment.</p><a href="produits.html" class="btn btn-primary btn-sm">Voir les produits</a></div>') +
          '</div>' +

          (favorites.length
            ? '<div class="card-modern">' +
                '<h3 style="margin:0 0 12px;">Vos favoris</h3>' +
                '<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(140px, 1fr)); gap:8px;">' +
                  favorites.slice(0, 4).map(p =>
                    '<a href="produit-detail.html?id=' + p.id + '" style="text-decoration:none; color:inherit;">' +
                      '<div style="padding:8px; border-radius:8px; background:var(--surface-2);">' +
                        '<div style="font-weight:600; font-size:0.85rem;">' + Utils.escapeHtml(Utils.truncate(p.nom, 30)) + '</div>' +
                        '<div class="price-small" style="margin-top:4px;">' + Utils.formatPrice(p.prix) + '</div>' +
                      '</div>' +
                    '</a>'
                  ).join('') +
                '</div>' +
              '</div>'
            : '') +
        '</section>' +

        '<section class="card-modern">' +
          '<h3 style="margin:0 0 12px;">Activite recente</h3>' +
          UI.renderActivityFeed(activity) +
        '</section>' +
      '</div>';

    const goBtn = container.querySelector('#go-orders-btn');
    if (goBtn) goBtn.addEventListener('click', (e) => { e.preventDefault(); DashboardAcheteur.switchTab('orders'); });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : orders                                                  */
  /* -------------------------------------------------------------- */
  renderOrders(container) {
    const session = DashboardAcheteur._state.session;
    const orders = Storage.getOrders(session.user_id);
    const filter = DashboardAcheteur._state.currentFilter || 'tous';

    const filters = [
      { id: 'tous', label: 'Tous' },
      { id: 'en_cours', label: 'En cours' },
      { id: 'acceptee', label: 'Acceptees' },
      { id: 'livree', label: 'Livrees' },
      { id: 'recu', label: 'Recues' },
      { id: 'refusee', label: 'Refusees' }
    ];
    const filtered = filter === 'tous' ? orders : orders.filter(o => o.status === filter);

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Historique</p>' +
        '<h1>Mes commandes</h1>' +
        '<p class="text-doux">' + orders.length + ' commande(s) · ' + Utils.formatPrice(orders.reduce((s, o) => s + (o.total || 0), 0)) + ' au total</p>' +
      '</header>' +

      '<div class="tabs-modern" id="orders-filters">' +
        filters.map(f => '<button class="tab-modern' + (f.id === filter ? ' active' : '') + '" data-filter="' + f.id + '">' + Utils.escapeHtml(f.label) + '</button>').join('') +
      '</div>' +

      '<div class="card-modern">' +
        (filtered.length
          ? '<div class="table-responsive"><table class="table-modern"><thead><tr>' +
              '<th>Date</th><th>Numero</th><th>Articles</th><th>Vendeurs</th><th>Montant</th><th>Statut</th><th>Actions</th>' +
            '</tr></thead><tbody>' +
              filtered.map(o =>
                '<tr>' +
                  '<td>' + Utils.formatDateShort(o.order_date) + '</td>' +
                  '<td><strong>' + o.order_id + '</strong></td>' +
                  '<td>' + o.items.length + ' article' + (o.items.length > 1 ? 's' : '') + '</td>' +
                  '<td>' + (o.seller_ids || []).map(sid => { const s = Data.getSeller(sid); return s ? Utils.escapeHtml(s.nom) : sid; }).join('<br>') + '</td>' +
                  '<td class="price-small">' + Utils.formatPrice(o.total) + '</td>' +
                  '<td><span class="badge ' + Checkout.statusBadgeClass(o.status) + '">' + Checkout.statusLabel(o.status) + '</span></td>' +
                  '<td style="white-space:nowrap;">' +
                    '<button class="btn btn-ghost btn-sm view-receipt-btn" data-order-id="' + o.order_id + '">Recu</button>' +
                    (o.status === 'livree'
                      ? ' <button class="btn btn-success btn-sm mark-received-btn" data-order-id="' + o.order_id + '">Marquer recue</button>'
                      : '') +
                  '</td>' +
                '</tr>'
              ).join('') +
            '</tbody></table></div>'
          : '<div class="empty-state-modern"><p>Aucune commande dans cette categorie.</p></div>') +
      '</div>';

    container.querySelectorAll('#orders-filters .tab-modern').forEach(btn => {
      btn.addEventListener('click', () => {
        DashboardAcheteur._state.currentFilter = btn.dataset.filter;
        DashboardAcheteur.renderOrders(container);
      });
    });

    container.querySelectorAll('.view-receipt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.dataset.orderId;
        const order = orders.find(o => o.order_id === orderId);
        if (!order) { UI.toast('Commande introuvable', 'error'); return; }
        UI.modal({
          title: 'Recu - ' + orderId,
          body: '<div class="receipt-modal">' + Checkout.renderReceiptHTML(order) + '</div>',
          actions: [
            { text: 'Fermer', style: 'btn-ghost', close: true },
            { text: 'Imprimer', style: 'btn-primary', onClick: () => { window.print(); } }
          ]
        });
      });
    });

    container.querySelectorAll('.mark-received-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.dataset.orderId;
        Storage.updateOrder(session.user_id, orderId, { status: 'recu' });
        Storage.addActivity(session.user_id, {
          type: 'commande_recue',
          detail: 'Commande ' + orderId + ' marquee comme recue'
        });
        // Notifier les vendeurs (type 'order_delivered' = fin de cycle de livraison)
        const order = orders.find(o => o.order_id === orderId);
        if (order) (order.seller_ids || []).forEach(sid => {
          Storage.addNotification(sid, {
            type: 'order_delivered',
            title: 'Commande confirmee par l\'acheteur',
            message: 'L\'acheteur a confirme la reception de la commande ' + orderId +
                     '. Vente finalisee.',
            link: 'dashboard-vendeur.html',
            order_id: orderId
          });
          // Le ventes_count a deja ete incremente au moment du Checkout.process,
          // on log juste une activite cote vendeur.
          try {
            Storage.addActivity(sid, {
              type: 'vente_confirmee',
              detail: 'Commande ' + orderId + ' confirmee par l\'acheteur (vente finalisee)'
            });
          } catch (e) {}
        });
        UI.toast('Commande marquee recue', 'success');
        UI.updateNotifBadge();
        DashboardAcheteur.renderOrders(container);
      });
    });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : favorites                                               */
  /* -------------------------------------------------------------- */
  renderFavorites(container) {
    const favorites = DashboardAcheteur.getFavorites();

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Mes selections</p>' +
        '<h1>Favoris</h1>' +
        '<p class="text-doux">' + favorites.length + ' produit(s) sauvegarde(s)</p>' +
      '</header>' +

      '<div class="card-modern">' +
        (favorites.length
          ? '<div class="table-responsive"><table class="table-modern"><thead><tr>' +
              '<th>Produit</th><th>Categorie</th><th>Prix</th><th>Vendeur</th><th>Actions</th>' +
            '</tr></thead><tbody>' +
              favorites.map(p => {
                const seller = Data.getSeller(p.vendeur_id);
                return '<tr>' +
                  '<td><a href="produit-detail.html?id=' + p.id + '" style="text-decoration:none; color:inherit;"><strong>' + Utils.escapeHtml(p.nom) + '</strong></a></td>' +
                  '<td>' + Utils.escapeHtml(p.categorie) + '</td>' +
                  '<td class="price-small">' + Utils.formatPrice(p.prix) + '</td>' +
                  '<td>' + (seller ? Utils.escapeHtml(seller.nom) : '-') + '</td>' +
                  '<td style="white-space:nowrap;">' +
                    '<button class="btn btn-primary btn-sm add-cart-fav-btn" data-product-id="' + p.id + '"' + (p.quantite_disponible <= 0 ? ' disabled' : '') + '>Panier</button> ' +
                    '<button class="btn btn-ghost btn-sm remove-fav-btn" data-product-id="' + p.id + '">Retirer</button>' +
                  '</td>' +
                '</tr>';
              }).join('') +
            '</tbody></table></div>'
          : '<div class="empty-state-modern"><p>Aucun favori pour le moment.</p><a href="produits.html" class="btn btn-primary btn-sm">Parcourir les produits</a></div>') +
      '</div>';

    container.querySelectorAll('.add-cart-fav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Cart.addItem(btn.dataset.productId, 1);
        Storage.addActivity(DashboardAcheteur._state.session.user_id, {
          type: 'panier_ajout',
          detail: 'Ajout au panier depuis favoris : ' + (Data.getProduct(btn.dataset.productId)?.nom || '')
        });
      });
    });
    container.querySelectorAll('.remove-fav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        DashboardAcheteur.toggleFavorite(btn.dataset.productId);
        UI.toast('Favori retire', 'info');
        DashboardAcheteur.renderFavorites(container);
      });
    });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : activity                                                */
  /* -------------------------------------------------------------- */
  renderActivity(container) {
    const session = DashboardAcheteur._state.session;
    const activities = Storage.getActivity(session.user_id);
    const notifs = Storage.getNotifications(session.user_id);

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Trace</p>' +
        '<h1>Historique activite</h1>' +
        '<p class="text-doux">' + activities.length + ' action(s) · ' + notifs.length + ' notification(s)</p>' +
      '</header>' +

      '<div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;" class="activity-grid-2col">' +
        '<section class="card-modern">' +
          '<h3 style="margin:0 0 12px;">Activite recente (50 max)</h3>' +
          (activities.length
            ? '<ul class="activity-feed">' +
                activities.slice(0, 50).map(a => {
                  return '<li class="activity-item">' +
                    '<div class="activity-content" style="padding-left:0;">' +
                      '<div class="activity-detail">' + Utils.escapeHtml(a.detail || '') + '</div>' +
                      '<div class="activity-time">' + Utils.formatDate(a.date || a.created_at) + '</div>' +
                    '</div>' +
                  '</li>';
                }).join('') +
              '</ul>'
            : '<p class="text-doux">Aucune activite enregistree.</p>') +
        '</section>' +

        '<section class="card-modern">' +
          '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">' +
            '<h3 style="margin:0;">Notifications</h3>' +
            '<button class="btn btn-ghost btn-sm" id="mark-all-read-btn">Tout marquer lu</button>' +
          '</div>' +
          (notifs.length
            ? '<div style="display:flex; flex-direction:column; gap:6px;">' +
                notifs.slice(0, 15).map(n =>
                  '<div style="padding:8px; border-radius:6px;' + (n.read ? '' : 'background:var(--surface-2);') + '">' +
                    '<div style="font-weight:600; font-size:0.875rem;">' + Utils.escapeHtml(n.title || '') + '</div>' +
                    '<div class="text-caption">' + Utils.escapeHtml(Utils.truncate(n.message || '', 80)) + '</div>' +
                    '<div class="text-caption" style="font-size:0.7rem;">' + Utils.formatDateShort(n.created_at) + '</div>' +
                  '</div>'
                ).join('') +
              '</div>'
            : '<p class="text-doux">Aucune notification.</p>') +
        '</section>' +
      '</div>';

    const markBtn = container.querySelector('#mark-all-read-btn');
    if (markBtn) {
      markBtn.addEventListener('click', () => {
        Storage.markAllNotificationsRead(session.user_id);
        UI.toast('Notifications marquees comme lues', 'success');
        DashboardAcheteur.renderActivity(container);
      });
    }
  },

  /* -------------------------------------------------------------- */
  /*  Tab : settings                                                */
  /* -------------------------------------------------------------- */
  renderSettings(container) {
    const session = DashboardAcheteur._state.session;
    const prefs = Storage.get('prefs_acheteur_' + session.user_id, {
      notifications: true,
      dark_mode: Storage.getTheme() === 'dark',
      categories: session.categories || []
    });
    const categories = Data.categories || [];

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Configuration</p>' +
        '<h1>Parametres</h1>' +
      '</header>' +

      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;" class="settings-grid-2col">' +
        '<section class="card-modern">' +
          '<h3 style="margin:0 0 16px;">Informations personnelles</h3>' +
          '<div style="display:grid; gap:12px;">' +
            '<div class="input-group-modern"><label for="set-nom">Nom complet</label>' +
              '<input type="text" id="set-nom" class="input-modern" value="' + Utils.escapeHtml(session.user_name || '') + '"></div>' +
            '<div class="input-group-modern"><label for="set-email">Email</label>' +
              '<input type="email" id="set-email" class="input-modern" value="' + Utils.escapeHtml(session.email || '') + '"></div>' +
            '<div class="input-group-modern"><label for="set-tel">Telephone</label>' +
              '<input type="text" id="set-tel" class="input-modern" value="' + Utils.escapeHtml(session.telephone || '') + '"></div>' +
            '<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">' +
              '<div class="input-group-modern"><label for="set-ville">Ville</label>' +
                '<input type="text" id="set-ville" class="input-modern" value="' + Utils.escapeHtml(session.ville || '') + '"></div>' +
              '<div class="input-group-modern"><label for="set-region">Region</label>' +
                '<input type="text" id="set-region" class="input-modern" value="' + Utils.escapeHtml(session.region || '') + '"></div>' +
            '</div>' +
            '<button class="btn btn-primary" id="set-save-profile">Enregistrer</button>' +
          '</div>' +
        '</section>' +

        '<section style="display:flex; flex-direction:column; gap:16px;">' +
          '<div class="card-modern">' +
            '<h3 style="margin:0 0 16px;">Preferences</h3>' +
            '<div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0;">' +
              '<div><strong>Notifications</strong><div class="text-caption">Recevoir les alertes commande</div></div>' +
              '<label class="toggle-switch"><input type="checkbox" id="set-notif" ' + (prefs.notifications ? 'checked' : '') + '><span class="toggle-slider"></span></label>' +
            '</div>' +
            '<div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0;">' +
              '<div><strong>Mode sombre</strong><div class="text-caption">Interface faible luminosite</div></div>' +
              '<label class="toggle-switch"><input type="checkbox" id="set-dark" ' + (prefs.dark_mode ? 'checked' : '') + '><span class="toggle-slider"></span></label>' +
            '</div>' +
          '</div>' +

          '<div class="card-modern">' +
            '<h3 style="margin:0 0 12px;">Categories preferees</h3>' +
            '<p class="text-caption" style="margin-bottom:12px;">Cliquez pour selectionner les categories a suivre.</p>' +
            '<div style="display:flex; flex-wrap:wrap; gap:8px;">' +
              categories.map(c => {
                const active = prefs.categories && prefs.categories.includes(c.nom);
                return '<button class="btn btn-sm cat-toggle-btn' + (active ? ' btn-primary' : ' btn-ghost') + '" data-cat="' + Utils.escapeHtml(c.nom) + '">' + Utils.escapeHtml(c.nom) + '</button>';
              }).join('') +
            '</div>' +
          '</div>' +

          '<div class="card-modern">' +
            '<h3 style="margin:0 0 8px;">Session</h3>' +
            '<p class="text-caption">ID: ' + Utils.escapeHtml(session.user_id) + '</p>' +
            '<p class="text-caption">Membre depuis: ' + Utils.formatDate(session.login_time) + '</p>' +
            '<button class="btn btn-ghost btn-sm" id="set-logout" style="margin-top:8px;">Se deconnecter</button>' +
          '</div>' +
        '</section>' +
      '</div>';

    // Save profile
    container.querySelector('#set-save-profile').addEventListener('click', () => {
      const session = DashboardAcheteur._state.session;
      session.user_name = container.querySelector('#set-nom').value.trim();
      session.email = container.querySelector('#set-email').value.trim();
      session.telephone = container.querySelector('#set-tel').value.trim();
      session.ville = container.querySelector('#set-ville').value.trim();
      session.region = container.querySelector('#set-region').value.trim();
      Storage.setSession(session);
      Storage.addActivity(session.user_id, {
        type: 'profile_update',
        detail: 'Profil mis a jour : ' + session.user_name
      });
      UI.toast('Profil enregistre', 'success');
      UI._injectHeader_refresh();
    });

    // Toggles
    container.querySelector('#set-notif').addEventListener('change', (e) => {
      const p = Storage.get('prefs_acheteur_' + session.user_id, {});
      p.notifications = e.target.checked;
      Storage.set('prefs_acheteur_' + session.user_id, p);
      UI.toast('Notifications ' + (e.target.checked ? 'activees' : 'desactivees'), 'info');
    });

    container.querySelector('#set-dark').addEventListener('change', (e) => {
      const theme = e.target.checked ? 'dark' : 'light';
      Storage.setTheme(theme);
      UI.applyTheme(theme);
      UI._injectHeader_refresh();
      const p = Storage.get('prefs_acheteur_' + session.user_id, {});
      p.dark_mode = e.target.checked;
      Storage.set('prefs_acheteur_' + session.user_id, p);
    });

    // Categories toggle
    container.querySelectorAll('.cat-toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        const p = Storage.get('prefs_acheteur_' + session.user_id, { categories: [] });
        p.categories = p.categories || [];
        const idx = p.categories.indexOf(cat);
        if (idx >= 0) p.categories.splice(idx, 1);
        else p.categories.push(cat);
        Storage.set('prefs_acheteur_' + session.user_id, p);
        DashboardAcheteur.renderSettings(container);
      });
    });

    // Logout
    container.querySelector('#set-logout').addEventListener('click', () => {
      UI.confirm('Voulez-vous vous deconnecter ?', () => {
        Auth.logout();
        window.location.href = 'index.html';
      }, { confirmText: 'Se deconnecter', danger: true });
    });
  }
};

window.DashboardAcheteur = DashboardAcheteur;

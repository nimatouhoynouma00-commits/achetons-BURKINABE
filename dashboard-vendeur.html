/* js/dashboard-vendeur.js - Logique dashboard vendeur (refonte L5-L6)
 *
 * Structure cible : dashboard-layout (sidebar + content) avec 7 tabs.
 *   - overview : stats, mini chart, top produits, alertes peremption, activity feed
 *   - orders   : filtres + table moderne + actions + recu imprimable
 *   - stock    : table produits, modifier stock, ajouter produit, alertes
 *   - experts  : ExpertSystems.renderAll() avec persistence des inputs
 *   - finance  : ExpertSystems.comptable + financier, projection 3 mois
 *   - messages : Storage.getMessages + templates pre-remplis
 *   - settings : infos boutique, notifications, dark mode, ajout produit
 *
 * UX : utilise les classes CSS de design-system.css (card-modern, stat-card-modern,
 *      table-modern, tabs-modern, expert-tab, dashboard-layout, activity-feed).
 *      Dark mode compatible via variables CSS.
 *
 * Chaque action met a jour Storage, logge dans Storage.addActivity, notifie les
 * parties concernées, et re-render la vue active.
 */

const DashboardVendeur = {

  /* Mapping compte beta -> seller id reel (pour demo) */
  BETA_SELLER_MAP: {
    'beta_vendeur_1': 'SEL001',
    'beta_vendeur_2': 'SEL009',
    'beta_vendeur_3': 'SEL003',
    'beta_vendeur_4': 'SEL007'
  },

  TABS: [
    { id: 'overview', label: "Vue d'ensemble", icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'orders',   label: 'Commandes',     icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'stock',    label: 'Stock',         icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'experts',  label: 'Conseils experts', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { id: 'finance',  label: 'Finance',       icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
    { id: 'messages', label: 'Messages',      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'settings', label: 'Parametres',    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ],

  /* Etat interne : container racine + session + sellerId + tab courant */
  _state: { container: null, session: null, sellerId: null, activeTab: 'overview', currentFilter: 'tous' },

  /* -------------------------------------------------------------- */
  /*  Entry point : DashboardVendeur.render(container, session)     */
  /* -------------------------------------------------------------- */
  render(container, session) {
    const sellerId = DashboardVendeur._resolveSellerId(session);
    DashboardVendeur._state = {
      container,
      session,
      sellerId,
      activeTab: DashboardVendeur._getActiveTab(sellerId),
      currentFilter: 'tous'
    };

    // Pre-charge la reference ExpertSystems (json/expert-modules.json) en arriere-plan
    // pour que messages_templates et ratios_sains soient dispo des le tab messages.
    if (window.ExpertSystems && typeof ExpertSystems.loadReference === 'function') {
      ExpertSystems.loadReference(function () {
        // Re-render du tab messages si c'est le tab actif et que les templates viennent d'arriver
        if (DashboardVendeur._state.activeTab === 'messages' && DashboardVendeur._state.container) {
          const content = DashboardVendeur._state.container.querySelector('#dashboard-content');
          if (content) DashboardVendeur.renderMessages(content);
        }
      });
    }

    // Log connexion au dashboard
    Storage.addActivity(sellerId, {
      type: 'connexion',
      detail: 'Connexion au dashboard vendeur'
    });

    // Verifie les produits perimes / bientot perimes et notifie (one-shot
    // par session : on deduplique en verifiant les notifs deja presentes)
    DashboardVendeur._checkExpiryAlerts(sellerId);

    container.innerHTML =
      '<div class="container dashboard-layout">' +
        DashboardVendeur.renderSidebar() +
        '<div class="dashboard-content" id="dashboard-content"></div>' +
      '</div>';

    // Wire tab nav
    container.querySelectorAll('.dashboard-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        DashboardVendeur.switchTab(item.dataset.tab);
      });
    });

    DashboardVendeur.switchTab(DashboardVendeur._state.activeTab);
  },

  /* Resout l'id vendeur reel depuis la session (mapping beta ou SEL direct) */
  _resolveSellerId(session) {
    if (!session) return 'SEL001';
    if (session.user_id && DashboardVendeur.BETA_SELLER_MAP[session.user_id]) {
      return DashboardVendeur.BETA_SELLER_MAP[session.user_id];
    }
    if (session.user_id && session.user_id.startsWith('SEL')) {
      return session.user_id;
    }
    // Compte beta vendeur (3, 4) ou autre : fallback SEL001
    if (session.user_type === 'vendeur' && session.user_id && session.user_id.indexOf('beta_vendeur') === 0) {
      return DashboardVendeur.BETA_SELLER_MAP[session.user_id] || 'SEL001';
    }
    return 'SEL001';
  },

  _getActiveTab(sellerId) {
    try {
      return localStorage.getItem('dv_active_tab_' + sellerId) || 'overview';
    } catch (e) { return 'overview'; }
  },

  _setActiveTab(sellerId, tab) {
    try { localStorage.setItem('dv_active_tab_' + sellerId, tab); } catch (e) {}
  },

  /* Verifie les alertes de peremption et notifie le vendeur (one-shot).
   * - Pour chaque produit avec date_peremption et days_left < 30 :
   *   notifie 'expiry_warning' si pas deja notifie pour ce produit aujourd'hui.
   * - Pour chaque produit en rupture de stock (effective_stock <= 0) :
   *   notifie 'stock_low' si pas deja notifie. */
  _checkExpiryAlerts(sellerId) {
    if (!sellerId) return;
    const notifs = Storage.getNotifications(sellerId);
    const today = new Date().toISOString().slice(0, 10);

    const alreadyNotifiedToday = (type, productId) => {
      return notifs.some(n =>
        n.type === type &&
        n.product_id === productId &&
        (n.created_at || '').slice(0, 10) === today
      );
    };

    const products = Data.getProductsBySeller(sellerId);
    products.forEach(p => {
      // Alerte peremption
      if (p.date_peremption) {
        const days = Utils.daysUntil(p.date_peremption);
        if (days !== null && days < 30) {
          if (!alreadyNotifiedToday('expiry_warning', p.id)) {
            const label = days < 0 ? 'PERIME' : days + ' jour(s) restant(s)';
            Storage.addNotification(sellerId, {
              type: 'expiry_warning',
              title: 'Alerte peremption - ' + p.nom,
              message: 'Produit "' + p.nom + '" : ' + label +
                       ' (date: ' + Utils.formatDateShort(p.date_peremption) + ')',
              link: 'dashboard-vendeur.html',
              product_id: p.id
            });
          }
        }
      }
      // Alerte rupture
      const stock = Storage.getStock(sellerId, p.id);
      if (stock <= 0) {
        if (!alreadyNotifiedToday('stock_low', p.id)) {
          Storage.addNotification(sellerId, {
            type: 'stock_low',
            title: 'Rupture de stock - ' + p.nom,
            message: 'Le produit "' + p.nom + '" est en rupture de stock.',
            link: 'dashboard-vendeur.html',
            product_id: p.id
          });
        }
      }
    });
  },

  /* -------------------------------------------------------------- */
  /*  Data helpers                                                  */
  /* -------------------------------------------------------------- */

  /* Recupere vendeur + produits + commandes + overrides + activity */
  getSellerData() {
    const sellerId = DashboardVendeur._state.sellerId;
    const seller = Data.getSeller(sellerId);
    const overrides = Storage.getStockOverrides(sellerId);
    const stock_items = Data.getProductsBySeller(sellerId).map(p => ({
      ...p,
      effective_stock: overrides[p.id] !== undefined ? overrides[p.id] : p.quantite_disponible
    }));
    const orders = DashboardVendeur.getOrders(sellerId);
    const activity = Storage.getActivity(sellerId);
    const messages = Storage.getMessages(sellerId);
    const boutique_info = Storage.get('boutique_info_' + sellerId, null);
    return { seller_id: sellerId, seller, stock_items, orders, activity, messages, boutique_info, overrides };
  },

  /* Recupere les commandes pour un vendeur (scan tous les users) */
  getOrders(sellerId) {
    const allOrders = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(Storage.PREFIX + 'orders_')) {
        try {
          const orders = JSON.parse(localStorage.getItem(key));
          orders.forEach(o => {
            if (o.seller_ids && o.seller_ids.includes(sellerId)) {
              allOrders.push(o);
            }
          });
        } catch (e) {}
      }
    }
    return allOrders.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
  },

  /* Calcule les statistiques vendeur - etendu avec stock_value, dead_stock, expiring_soon */
  computeStats() {
    const { seller_id, seller, stock_items, orders } = DashboardVendeur.getSellerData();

    const totalSales = orders.filter(o => ['acceptee', 'livree', 'recu'].includes(o.status)).length;
    const pendingOrders = orders.filter(o => o.status === 'en_cours').length;
    const totalRevenue = orders
      .filter(o => ['acceptee', 'livree', 'recu'].includes(o.status))
      .reduce((sum, o) => {
        const sellerItems = o.items.filter(it => it.seller_id === seller_id);
        return sum + sellerItems.reduce((s, it) => s + it.line_total, 0);
      }, 0);
    const totalStock = stock_items.reduce((s, it) => s + it.effective_stock, 0);
    const beneficeNet = Math.round(totalRevenue * 0.4);
    const margeMoyenne = totalRevenue > 0 ? (beneficeNet / totalRevenue * 100) : 0;

    // Nouveaux indicateurs (L5-L6)
    // - Valeur du stock (au prix de vente)
    const stock_value = stock_items.reduce((s, it) => s + (it.effective_stock || 0) * (it.prix || 0), 0);
    // - Valeur d'achat estimee (60% du prix vente)
    const stock_cost = Math.round(stock_value * 0.6);
    // - Dead stock : produits sans vente > 60 jours
    const now = Date.now();
    const dead_stock = stock_items.filter(p => {
      const hasRecentSale = orders.some(o => {
        const d = new Date(o.order_date).getTime();
        return (now - d) < 60 * 24 * 3600 * 1000 &&
               o.items.some(it => it.product_id === p.id || it.nom === p.nom);
      });
      return !hasRecentSale;
    });
    // - Expiring soon (90 jours)
    const expiring_soon = stock_items
      .filter(it => it.date_peremption)
      .map(it => ({ ...it, days_left: Utils.daysUntil(it.date_peremption) }))
      .filter(it => it.days_left !== null && it.days_left < 90)
      .sort((a, b) => a.days_left - b.days_left);

    // Top 5 produits par ventes (CA)
    const top5_ventes = stock_items.map(p => {
      const ventes = orders.reduce((s, o) => {
        return s + o.items
          .filter(it => it.product_id === p.id || it.nom === p.nom)
          .reduce((ss, it) => ss + (it.line_total || 0), 0);
      }, 0);
      const qte = orders.reduce((s, o) => {
        return s + o.items
          .filter(it => it.product_id === p.id || it.nom === p.nom)
          .reduce((ss, it) => ss + (it.quantite || it.quantity || 0), 0);
      }, 0);
      return { id: p.id, nom: p.nom, ventes, qte, prix: p.prix };
    }).sort((a, b) => b.ventes - a.ventes).slice(0, 5);

    return {
      total_sales: totalSales,
      pending_orders: pendingOrders,
      total_revenue: totalRevenue,
      total_stock: totalStock,
      benefice_net: beneficeNet,
      marge_moyenne: margeMoyenne,
      stock_value,
      stock_cost,
      dead_stock,
      expiring_soon,
      top5_ventes,
      stock_items,
      orders,
      seller
    };
  },

  /* -------------------------------------------------------------- */
  /*  Sidebar                                                       */
  /* -------------------------------------------------------------- */
  renderSidebar() {
    const sellerId = DashboardVendeur._state.sellerId;
    const seller = Data.getSeller(sellerId);
    const activeTab = DashboardVendeur._state.activeTab;

    const items = DashboardVendeur.TABS.map(t => {
      const isActive = t.id === activeTab ? ' active' : '';
      const notifs = Storage.getNotifications(sellerId).filter(n => !n.read).length;
      const badge = (t.id === 'messages')
        ? (Storage.getMessages(sellerId).filter(m => !m.read).length > 0
            ? '<span class="badge-modern badge-modern-error" style="margin-left:auto;">' +
              Storage.getMessages(sellerId).filter(m => !m.read).length + '</span>' : '')
        : (t.id === 'orders' && notifs > 0
            ? '<span class="badge-modern badge-modern-error" style="margin-left:auto;">' + notifs + '</span>' : '');
      return '<a href="#" class="dashboard-nav-item' + isActive + '" data-tab="' + t.id + '">' +
        '<svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + t.icon + '"/></svg>' +
        '<span>' + Utils.escapeHtml(t.label) + '</span>' +
        badge +
      '</a>';
    }).join('');

    const sellerName = seller ? seller.nom : (DashboardVendeur._state.session?.user_name || 'Vendeur');
    const trustBadge = seller ? UI.trustBadgeHTML(seller.trust_level, seller.ventes_count) : '';

    return '<aside class="dashboard-sidebar">' +
      '<div class="sidebar-seller" style="padding:8px 12px 16px; border-bottom:1px solid var(--border-subtle); margin-bottom:12px;">' +
        '<div class="avatar avatar-sm" style="margin-bottom:8px;">' + Utils.escapeHtml((sellerName || '?').charAt(0).toUpperCase()) + '</div>' +
        '<div style="font-weight:600; font-size:0.9rem;">' + Utils.escapeHtml(Utils.truncate(sellerName, 24)) + '</div>' +
        '<div class="text-caption" style="margin-top:2px;">' + trustBadge + '</div>' +
      '</div>' +
      '<nav class="dashboard-nav" style="display:flex; flex-direction:column;">' +
        items +
      '</nav>' +
    '</aside>';
  },

  /* -------------------------------------------------------------- */
  /*  Tab switcher                                                  */
  /* -------------------------------------------------------------- */
  switchTab(tabName) {
    DashboardVendeur._state.activeTab = tabName;
    DashboardVendeur._setActiveTab(DashboardVendeur._state.sellerId, tabName);

    // Update active class in sidebar
    const navItems = DashboardVendeur._state.container.querySelectorAll('.dashboard-nav-item');
    navItems.forEach(it => {
      it.classList.toggle('active', it.dataset.tab === tabName);
    });

    const content = DashboardVendeur._state.container.querySelector('#dashboard-content');
    if (!content) return;

    // Dispatch au renderer de tab
    const renderers = {
      overview: DashboardVendeur.renderOverview,
      orders:   DashboardVendeur.renderOrders,
      stock:    DashboardVendeur.renderStock,
      experts:  DashboardVendeur.renderExperts,
      finance:  DashboardVendeur.renderFinance,
      messages: DashboardVendeur.renderMessages,
      settings: DashboardVendeur.renderSettings
    };
    const fn = renderers[tabName] || renderers.overview;
    content.innerHTML = '';
    fn.call(DashboardVendeur, content);
  },

  /* -------------------------------------------------------------- */
  /*  Tab : overview                                                */
  /* -------------------------------------------------------------- */
  renderOverview(container) {
    const stats = DashboardVendeur.computeStats();
    const seller = stats.seller;
    const session = DashboardVendeur._state.session;
    const sellerId = DashboardVendeur._state.sellerId;
    const activity = Storage.getActivity(sellerId);

    container.innerHTML =
      '<header class="dashboard-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:24px;">' +
        '<div>' +
          '<p class="eyebrow">Tableau de bord vendeur</p>' +
          '<h1>' + Utils.escapeHtml(seller ? seller.nom : session.user_name) + '</h1>' +
          '<div class="dashboard-trust" style="display:flex; gap:12px; align-items:center; margin-top:6px;">' +
            (seller ? UI.trustBadgeHTML(seller.trust_level, seller.ventes_count) : '') +
            '<span class="text-caption">' + Utils.escapeHtml(seller?.ville || '') + (seller?.ville && seller?.region ? ' · ' : '') + Utils.escapeHtml(seller?.region || '') + '</span>' +
          '</div>' +
        '</div>' +
        '<a href="boutique-vendeur.html?id=' + sellerId + '" class="btn btn-secondary btn-sm">' +
          '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>' +
          'Voir ma boutique' +
        '</a>' +
      '</header>' +

      '<section style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px;">' +
        UI.renderStatCard({
          label: 'CA total',
          value: Utils.formatPrice(stats.total_revenue),
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
          trend: stats.total_revenue > 0 ? 'up' : 'neutral',
          trendValue: stats.total_sales + ' ventes'
        }) +
        UI.renderStatCard({
          label: 'Commandes en cours',
          value: stats.pending_orders,
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>',
          trend: stats.pending_orders > 0 ? 'up' : 'neutral',
          trendValue: stats.pending_orders > 0 ? 'A traiter' : 'OK'
        }) +
        UI.renderStatCard({
          label: 'Stock total',
          value: stats.total_stock,
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
          trend: 'neutral',
          trendValue: stats.stock_items.length + ' produits'
        }) +
        UI.renderStatCard({
          label: 'Benefice estime',
          value: Utils.formatPrice(stats.benefice_net),
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
          trend: 'up',
          trendValue: stats.marge_moyenne.toFixed(0) + '% marge'
        }) +
      '</section>' +

      '<div style="display:grid; grid-template-columns:2fr 1fr; gap:24px; margin-bottom:24px;" class="overview-grid-2col">' +
        '<section>' +
          '<div class="card-modern">' +
            '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">' +
              '<h3 style="margin:0;">Revenus (6 derniers mois)</h3>' +
              '<span class="text-caption">Estimation</span>' +
            '</div>' +
            '<div class="chart-placeholder">' + DashboardVendeur._renderMiniChart(stats.orders, sellerId) + '</div>' +
          '</div>' +

          '<div class="card-modern" style="margin-top:16px;">' +
            '<h3 style="margin:0 0 12px;">Top 5 produits par ventes</h3>' +
            (stats.top5_ventes.length && stats.top5_ventes[0].ventes > 0
              ? '<div style="display:flex; flex-direction:column; gap:10px;">' +
                  stats.top5_ventes.map((p, i) => {
                    const maxVente = stats.top5_ventes[0].ventes || 1;
                    const pct = Math.round((p.ventes / maxVente) * 100);
                    return '<div>' +
                      '<div style="display:flex; justify-content:space-between; font-size:0.875rem; margin-bottom:4px;">' +
                        '<span><strong>' + (i + 1) + '.</strong> ' + Utils.escapeHtml(p.nom) + '</span>' +
                        '<span class="text-caption">' + Utils.formatPrice(p.ventes) + ' · ' + p.qte + ' vendus</span>' +
                      '</div>' +
                      '<div class="progress-modern"><div class="progress-modern-fill" style="width:' + pct + '%;"></div></div>' +
                    '</div>';
                  }).join('') +
                '</div>'
              : '<p class="text-doux">Aucune vente enregistree pour le moment.</p>') +
          '</div>' +
        '</section>' +

        '<section>' +
          '<div class="card-modern" style="margin-bottom:16px;">' +
            '<h3 style="margin:0 0 12px;">Alertes peremption</h3>' +
            (stats.expiring_soon.length
              ? stats.expiring_soon.slice(0, 3).map(it => {
                  let badge = '<span class="badge-modern badge-modern-success">OK</span>';
                  if (it.days_left < 0) badge = '<span class="badge-modern badge-modern-error">Perime</span>';
                  else if (it.days_left < 7) badge = '<span class="badge-modern badge-modern-error">Urgent</span>';
                  else if (it.days_left < 30) badge = '<span class="badge-modern badge-modern-warning">Attention</span>';
                  return '<div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--border-subtle);">' +
                    '<div><strong style="font-size:0.875rem;">' + Utils.escapeHtml(it.nom) + '</strong><div class="text-caption">' + (it.days_left < 0 ? 'Depasse' : it.days_left + ' jours') + '</div></div>' +
                    badge +
                  '</div>';
                }).join('')
              : '<p class="text-doux">Aucun produit perissable.</p>') +
          '</div>' +

          '<div class="card-modern">' +
            '<h3 style="margin:0 0 12px;">Activite recente</h3>' +
            UI.renderActivityFeed(activity) +
          '</div>' +
        '</section>' +
      '</div>';
  },

  /* -------------------------------------------------------------- */
  /*  Tab : orders                                                  */
  /* -------------------------------------------------------------- */
  renderOrders(container) {
    const sellerId = DashboardVendeur._state.sellerId;
    const orders = DashboardVendeur.getOrders(sellerId);
    const filter = DashboardVendeur._state.currentFilter || 'tous';

    const filters = [
      { id: 'tous', label: 'Tous' },
      { id: 'en_cours', label: 'En cours' },
      { id: 'acceptee', label: 'Acceptees' },
      { id: 'livree', label: 'Livrees' },
      { id: 'refusee', label: 'Refusees' }
    ];

    const filtered = filter === 'tous' ? orders : orders.filter(o => o.status === filter);

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Gestion</p>' +
        '<h1>Commandes</h1>' +
        '<p class="text-doux">' + orders.length + ' commande(s) au total · ' +
          orders.filter(o => o.status === 'en_cours').length + ' a traiter</p>' +
      '</header>' +

      '<div class="tabs-modern" id="orders-filters">' +
        filters.map(f => '<button class="tab-modern' + (f.id === filter ? ' active' : '') + '" data-filter="' + f.id + '">' + Utils.escapeHtml(f.label) + '</button>').join('') +
      '</div>' +

      '<div class="card-modern">' +
        (filtered.length
          ? '<div class="table-responsive">' + DashboardVendeur._renderOrdersTable(filtered, sellerId) + '</div>'
          : '<div class="empty-state-modern"><p>Aucune commande dans cette categorie.</p></div>') +
      '</div>';

    // Wire filters
    container.querySelectorAll('#orders-filters .tab-modern').forEach(btn => {
      btn.addEventListener('click', () => {
        DashboardVendeur._state.currentFilter = btn.dataset.filter;
        DashboardVendeur.renderOrders(container);
      });
    });

    DashboardVendeur._wireOrderActions(container);
  },

  _renderOrdersTable(orders, sellerId) {
    return '<table class="table-modern">' +
      '<thead><tr>' +
        '<th>Date</th><th>Numero</th><th>Acheteur</th><th>Produits</th><th>Montant</th><th>Statut</th><th>Actions</th>' +
      '</tr></thead>' +
      '<tbody>' +
        orders.map(o => {
          const sellerItems = o.items.filter(it => it.seller_id === sellerId);
          const amount = sellerItems.reduce((s, it) => s + it.line_total, 0);
          return '<tr data-order-id="' + o.order_id + '">' +
            '<td>' + Utils.formatDateShort(o.order_date) + '</td>' +
            '<td><strong>' + o.order_id + '</strong></td>' +
            '<td>' + Utils.escapeHtml(o.buyer_name) + '</td>' +
            '<td>' + sellerItems.map(it => Utils.escapeHtml(it.nom) + ' x' + it.quantity).join('<br>') + '</td>' +
            '<td class="price-small">' + Utils.formatPrice(amount) + '</td>' +
            '<td><span class="badge ' + Checkout.statusBadgeClass(o.status) + '">' + Checkout.statusLabel(o.status) + '</span></td>' +
            '<td style="white-space:nowrap;">' +
              '<button class="btn btn-ghost btn-sm view-receipt-btn" data-order-id="' + o.order_id + '" data-buyer-id="' + o.buyer_id + '" title="Voir le recu">Recu</button> ' +
              (o.status === 'en_cours' ? '<button class="btn btn-success btn-sm action-btn" data-action="accept" data-order-id="' + o.order_id + '" data-buyer-id="' + o.buyer_id + '">Accepter</button> <button class="btn btn-error btn-sm action-btn" data-action="reject" data-order-id="' + o.order_id + '" data-buyer-id="' + o.buyer_id + '">Refuser</button>' : '') +
              (o.status === 'acceptee' ? '<button class="btn btn-primary btn-sm action-btn" data-action="deliver" data-order-id="' + o.order_id + '" data-buyer-id="' + o.buyer_id + '">Marquer livree</button>' : '') +
            '</td>' +
          '</tr>';
        }).join('') +
      '</tbody>' +
    '</table>';
  },

  /* Wire les actions des commandes + bouton recu */
  _wireOrderActions(container) {
    const sellerId = DashboardVendeur._state.sellerId;

    container.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        const orderId = btn.dataset.orderId;
        const buyerId = btn.dataset.buyerId;
        // Mapping action -> (statut interne FR, type notif anglais)
        const statusMap = {
          accept:  { status: 'acceptee', notifType: 'order_accepted' },
          reject:  { status: 'refusee',  notifType: 'order_refused' },
          deliver: { status: 'livree',   notifType: 'order_delivered' }
        };
        const cfg = statusMap[action];
        if (!cfg) return;
        const newStatus = cfg.status;
        const notifType = cfg.notifType;

        // Recupere l'order AVANT update pour restauration stock si refuse
        const buyerOrders = Storage.getOrders(buyerId);
        const order = buyerOrders.find(o => o.order_id === orderId);

        Storage.updateOrder(buyerId, orderId, { status: newStatus });

        // Si refusee, restaure le stock des produits de ce vendeur
        if (action === 'reject' && order) {
          const sellerItems = (order.items || []).filter(it => it.seller_id === sellerId);
          sellerItems.forEach(it => {
            Storage.incrementStock(sellerId, it.product_id, it.quantity);
          });
        }

        const messages = {
          acceptee: { title: 'Commande acceptee', message: 'Le vendeur a accepte votre commande ' + orderId },
          refusee:  { title: 'Commande refusee',  message: 'Le vendeur a refuse votre commande ' + orderId + '. Stock restaure.' },
          livree:   { title: 'Commande livree',   message: 'Votre commande ' + orderId + ' a ete livree. Confirmez la reception dans votre historique.' }
        };
        Storage.addNotification(buyerId, {
          type: notifType,
          title: messages[newStatus].title,
          message: messages[newStatus].message,
          link: 'historique.html',
          order_id: orderId
        });

        // Activity log cote vendeur
        Storage.addActivity(sellerId, {
          type: 'commande_' + newStatus,
          detail: 'Commande ' + orderId + ' marquee "' + Checkout.statusLabel(newStatus) + '"' +
                  (action === 'reject' ? ' (stock restaure)' : '')
        });

        UI.toast('Commande ' + Checkout.statusLabel(newStatus), 'success');
        DashboardVendeur.renderOrders(container);
      });
    });

    // Bouton recu
    container.querySelectorAll('.view-receipt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.dataset.orderId;
        const buyerId = btn.dataset.buyerId;
        DashboardVendeur._showReceiptModal(orderId, buyerId);
      });
    });
  },

  _showReceiptModal(orderId, buyerId) {
    const orders = Storage.getOrders(buyerId);
    const order = orders.find(o => o.order_id === orderId);
    if (!order) {
      UI.toast('Commande introuvable', 'error');
      return;
    }
    UI.modal({
      title: 'Recu - ' + orderId,
      body: '<div class="receipt-modal">' + Checkout.renderReceiptHTML(order) + '</div>',
      actions: [
        { text: 'Fermer', style: 'btn-ghost', close: true },
        { text: 'Imprimer', style: 'btn-primary', onClick: () => { window.print(); } }
      ]
    });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : stock                                                   */
  /* -------------------------------------------------------------- */
  renderStock(container) {
    const sellerId = DashboardVendeur._state.sellerId;
    const { stock_items } = DashboardVendeur.getSellerData();
    const lowStock = stock_items.filter(it => it.effective_stock <= (it.stock_alerte || 5));

    container.innerHTML =
      '<header class="dashboard-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:24px; flex-wrap:wrap; gap:12px;">' +
        '<div>' +
          '<p class="eyebrow">Inventaire</p>' +
          '<h1>Stock</h1>' +
          '<p class="text-doux">' + stock_items.length + ' produits · ' + lowStock.length + ' alerte(s)</p>' +
        '</div>' +
        '<div style="display:flex; gap:8px;">' +
          '<button class="btn btn-secondary btn-sm" id="dv-add-product-btn">' +
            '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
            'Ajouter produit' +
          '</button>' +
        '</div>' +
      '</header>' +

      (lowStock.length > 0
        ? '<div class="card-modern" style="margin-bottom:16px; border-left:4px solid var(--attention);">' +
            '<div style="display:flex; gap:8px; align-items:flex-start;">' +
              '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="var(--attention)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
              '<div><strong>Alertes stock bas</strong><div class="text-caption" style="margin-top:4px;">' +
                lowStock.map(it => Utils.escapeHtml(it.nom) + ' (' + it.effective_stock + ')').join(' · ') +
              '</div></div>' +
            '</div>' +
          '</div>'
        : '') +

      '<div class="card-modern">' +
        (stock_items.length
          ? '<div class="table-responsive">' + DashboardVendeur._renderStockTable(stock_items) + '</div>'
          : '<div class="empty-state-modern"><p>Aucun produit dans votre stock.</p></div>') +
      '</div>';

    // Wire edit stock
    container.querySelectorAll('.edit-stock-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        DashboardVendeur._editStock(btn.dataset.productId, parseInt(btn.dataset.current, 10));
      });
    });

    // Wire add product
    const addBtn = container.querySelector('#dv-add-product-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => DashboardVendeur._addProductModal());
    }
  },

  _renderStockTable(items) {
    return '<table class="table-modern">' +
      '<thead><tr><th>Produit</th><th>Stock</th><th>Unite</th><th>Prix</th><th>Statut</th><th>Action</th></tr></thead>' +
      '<tbody>' +
        items.map(it => {
          const alertThreshold = it.stock_alerte || 5;
          const lowStock = it.effective_stock <= alertThreshold;
          const outOfStock = it.effective_stock <= 0;
          const status = outOfStock
            ? '<span class="badge badge-error">Rupture</span>'
            : (lowStock ? '<span class="badge badge-warning">Stock limite</span>' : '<span class="badge badge-success">En stock</span>');
          return '<tr>' +
            '<td><strong>' + Utils.escapeHtml(it.nom) + '</strong><div class="text-caption">' + Utils.escapeHtml(it.categorie) + '</div></td>' +
            '<td><span class="stock-value" data-product-id="' + it.id + '">' + it.effective_stock + '</span>' + (lowStock ? ' <span class="text-caption" style="color:var(--attention);">(seuil ' + alertThreshold + ')</span>' : '') + '</td>' +
            '<td>' + Utils.escapeHtml(it.unite_quantite) + '</td>' +
            '<td class="price-small">' + Utils.formatPrice(it.prix) + '</td>' +
            '<td>' + status + '</td>' +
            '<td><button class="btn btn-ghost btn-sm edit-stock-btn" data-product-id="' + it.id + '" data-current="' + it.effective_stock + '">Modifier</button></td>' +
          '</tr>';
        }).join('') +
      '</tbody>' +
    '</table>';
  },

  _editStock(productId, current) {
    const sellerId = DashboardVendeur._state.sellerId;
    const product = Data.getProduct(productId);
    if (!product) return;

    UI.modal({
      title: 'Modifier stock - ' + product.nom,
      body: '<div class="form-group">' +
        '<label class="form-label" for="new-stock">Nouvelle quantite</label>' +
        '<input type="number" id="new-stock" class="form-input" value="' + current + '" min="0">' +
        '<span class="form-hint">Stock actuel: ' + current + ' ' + Utils.escapeHtml(product.unite_quantite) + '</span>' +
      '</div>',
      actions: [
        { text: 'Annuler', style: 'btn-ghost', close: true },
        {
          text: 'Enregistrer',
          style: 'btn-primary',
          onClick: (content) => {
            const newQty = parseInt(content.querySelector('#new-stock').value, 10);
            if (isNaN(newQty) || newQty < 0) {
              UI.toast('Quantite invalide', 'error');
              return false;
            }
            Storage.setStockOverride(sellerId, productId, newQty);
            Storage.addActivity(sellerId, {
              type: 'stock_update',
              detail: 'Stock "' + product.nom + '" mis a jour : ' + current + ' -> ' + newQty
            });

            if (newQty <= (product.stock_alerte || 5) && newQty > 0) {
              Storage.addNotification(sellerId, {
                type: 'stock_low',
                title: 'Stock limite',
                message: 'Stock de "' + product.nom + '" est a ' + newQty + ' unites',
                link: 'dashboard-vendeur.html'
              });
            }

            UI.toast('Stock mis a jour', 'success');
            DashboardVendeur.switchTab('stock');
            return true;
          }
        }
      ]
    });
  },

  /* Ajout produit fonctionnel : sauvegarde dans Data.products + override stock */
  _addProductModal() {
    const sellerId = DashboardVendeur._state.sellerId;
    const seller = Data.getSeller(sellerId);
    const categories = (Data.categories || []).map(c => c.nom);

    const body = '<div style="display:grid; gap:12px;">' +
      '<div class="form-group"><label class="form-label" for="np-nom">Nom du produit *</label>' +
        '<input type="text" id="np-nom" class="form-input" placeholder="Ex: Beurre de karite 200g"></div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">' +
        '<div class="form-group"><label class="form-label" for="np-cat">Categorie</label>' +
          '<select id="np-cat" class="form-select">' + categories.map(c => '<option value="' + Utils.escapeHtml(c) + '">' + Utils.escapeHtml(c) + '</option>').join('') + '</select></div>' +
        '<div class="form-group"><label class="form-label" for="np-prix">Prix (FCFA) *</label>' +
          '<input type="number" id="np-prix" class="form-input" min="0" value="1500"></div>' +
      '</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">' +
        '<div class="form-group"><label class="form-label" for="np-stock">Quantite en stock</label>' +
          '<input type="number" id="np-stock" class="form-input" min="0" value="50"></div>' +
        '<div class="form-group"><label class="form-label" for="np-unite">Unite</label>' +
          '<input type="text" id="np-unite" class="form-input" value="piece"></div>' +
      '</div>' +
      '<div class="form-group"><label class="form-label" for="np-desc">Description courte</label>' +
        '<textarea id="np-desc" class="form-input" rows="3" placeholder="Decrivez votre produit..."></textarea></div>' +
      '<div class="form-group"><label class="form-label" for="np-peremption">Date de peremption (optionnel)</label>' +
        '<input type="date" id="np-peremption" class="form-input"></div>' +
    '</div>';

    UI.modal({
      title: 'Ajouter un produit',
      body,
      actions: [
        { text: 'Annuler', style: 'btn-ghost', close: true },
        {
          text: 'Ajouter',
          style: 'btn-primary',
          onClick: (content) => {
            const nom = content.querySelector('#np-nom').value.trim();
            const prix = parseInt(content.querySelector('#np-prix').value, 10);
            const stock = parseInt(content.querySelector('#np-stock').value, 10);
            const unite = content.querySelector('#np-unite').value.trim() || 'piece';
            const cat = content.querySelector('#np-cat').value;
            const desc = content.querySelector('#np-desc').value.trim();
            const peremption = content.querySelector('#np-peremption').value;

            if (!nom || nom.length < 3) { UI.toast('Nom trop court (3 caracteres min)', 'error'); return false; }
            if (!prix || prix <= 0) { UI.toast('Prix invalide', 'error'); return false; }
            if (isNaN(stock) || stock < 0) { UI.toast('Quantite invalide', 'error'); return false; }

            // Genere un ID PRD+timestamp
            const newId = 'PRD' + Date.now().toString().slice(-7);
            const newProduct = {
              id: newId,
              nom: nom,
              categorie: cat,
              prix: prix,
              devise: 'FCFA',
              unite_prix: unite,
              description: desc || nom,
              description_courte: desc ? Utils.truncate(desc, 80) : nom,
              vendeur_id: sellerId,
              region: seller ? seller.region : '',
              ville: seller ? seller.ville : '',
              certification: [],
              made_in_bf: true,
              quantite_disponible: stock,
              unite_quantite: unite,
              date_production: new Date().toISOString().slice(0, 10),
              date_peremption: peremption || null,
              conditions_stockage: 'Lieu sec et frais',
              processus_fabrication: '',
              poids_unitaire: '',
              en_stock: stock > 0,
              stock_alerte: Math.max(5, Math.round(stock * 0.1)),
              reviews_count: 0,
              average_rating: 0,
              tags: []
            };
            Data.products.push(newProduct);

            // Init override a la valeur saisie
            Storage.setStockOverride(sellerId, newId, stock);
            Storage.addActivity(sellerId, {
              type: 'produit_ajout',
              detail: 'Nouveau produit ajoute : ' + nom + ' (' + Utils.formatPrice(prix) + ') - stock ' + stock
            });
            UI.toast('Produit ajoute avec succes', 'success');
            DashboardVendeur.switchTab('stock');
            return true;
          }
        }
      ]
    });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : experts (la piece maitresse)                            */
  /* -------------------------------------------------------------- */
  renderExperts(container) {
    const sellerId = DashboardVendeur._state.sellerId;

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Intelligence metier</p>' +
        '<h1>Conseils experts</h1>' +
        '<p class="text-doux">6 modules experts : Comptable, Financier, Marketing, Secretaire, Stock, Conseiller ventes.</p>' +
      '</header>' +

      '<div class="card-modern" style="margin-bottom:16px;">' +
        '<details>' +
          '<summary style="cursor:pointer; font-weight:600;">Parametres avances (inputs des experts)</summary>' +
          '<div id="expert-inputs-form" style="margin-top:16px;"></div>' +
        '</details>' +
      '</div>' +

      '<div id="expert-modules-container"></div>';

    // Recupere les inputs persistes
    const inputs = (window.ExpertSystems && ExpertSystems.utils)
      ? ExpertSystems.utils.loadInputs(sellerId)
      : {};

    // Affiche le formulaire d'inputs editable
    DashboardVendeur._renderExpertInputsForm(container.querySelector('#expert-inputs-form'), inputs);

    // Donnees vendeur compilees pour les experts
    const stats = DashboardVendeur.computeStats();
    const sellerData = {
      seller_id: sellerId,
      seller: stats.seller,
      stock_items: stats.stock_items,
      orders: stats.orders,
      total_revenue: stats.total_revenue,
      marge_moyenne: stats.marge_moyenne
    };

    // Lancement du rendu des 6 modules
    if (window.ExpertSystems && typeof ExpertSystems.renderAll === 'function') {
      ExpertSystems.renderAll(container.querySelector('#expert-modules-container'), sellerData, inputs);
    } else {
      container.querySelector('#expert-modules-container').innerHTML =
        '<div class="card-modern"><p class="text-doux">Module ExpertSystems non disponible.</p></div>';
    }
  },

  /* Formulaire d'inputs editables pour les experts (charges, delais...) */
  _renderExpertInputsForm(container, inputs) {
    if (!container) return;
    inputs = inputs || {};
    const fields = [
      { key: 'charges_fixes_mensuelles', label: 'Charges fixes mensuelles (FCFA)', type: 'number', def: 50000 },
      { key: 'charges_variables_pct', label: 'Charges variables (% du CA HT)', type: 'number', def: 30, min: 0, max: 100 },
      { key: 'taux_marge_nette', label: 'Taux de marge nette (%)', type: 'number', def: 40, min: 0, max: 100 },
      { key: 'cout_achat_moyen', label: 'Cout d\'achat moyen unitaire (FCFA)', type: 'number', def: 0 },
      { key: 'tresorerie_initiale', label: 'Tresorerie initiale (FCFA)', type: 'number', def: 100000 },
      { key: 'creances_clients', label: 'Creances clients (FCFA)', type: 'number', def: 0 },
      { key: 'dettes_fournisseurs', label: 'Dettes fournisseurs (FCFA)', type: 'number', def: 0 },
      { key: 'delai_paiement_client_jours', label: 'Delai paiement client (jours)', type: 'number', def: 0 },
      { key: 'delai_reappro_jours', label: 'Delai de reapprovisionnement (jours)', type: 'number', def: 14 },
      { key: 'stock_securite_jours', label: 'Stock de securite (jours)', type: 'number', def: 7 },
      { key: 'cout_possession_pct', label: 'Cout de possession stock (%/an)', type: 'number', def: 22 }
    ];

    const html = '<div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px;">' +
      fields.map(f => {
        const val = inputs[f.key] !== undefined ? inputs[f.key] : f.def;
        return '<div class="input-group-modern">' +
          '<label for="ei-' + f.key + '">' + Utils.escapeHtml(f.label) + '</label>' +
          '<input type="' + f.type + '" id="ei-' + f.key + '" class="input-modern" value="' + val + '"' +
            (f.min !== undefined ? ' min="' + f.min + '"' : '') +
            (f.max !== undefined ? ' max="' + f.max + '"' : '') + '>' +
        '</div>';
      }).join('') +
    '</div>' +
    '<div style="margin-top:16px; display:flex; gap:8px;">' +
      '<button class="btn btn-primary btn-sm" id="ei-save-btn">Enregistrer</button>' +
      '<button class="btn btn-ghost btn-sm" id="ei-reset-btn">Reset</button>' +
    '</div>';

    container.innerHTML = html;

    const sellerId = DashboardVendeur._state.sellerId;
    container.querySelector('#ei-save-btn').addEventListener('click', () => {
      const newInputs = {};
      fields.forEach(f => {
        const el = container.querySelector('#ei-' + f.key);
        const v = el.value;
        newInputs[f.key] = (f.type === 'number') ? (parseFloat(v) || 0) : v;
      });
      if (window.ExpertSystems) {
        ExpertSystems.utils.saveInputs(sellerId, newInputs);
      }
      Storage.addActivity(sellerId, {
        type: 'expert_inputs_save',
        detail: 'Parametres experts mis a jour'
      });
      UI.toast('Parametres enregistres', 'success');
      DashboardVendeur.switchTab('experts');
    });

    container.querySelector('#ei-reset-btn').addEventListener('click', () => {
      if (window.ExpertSystems) {
        ExpertSystems.utils.saveInputs(sellerId, {});
      }
      UI.toast('Parametres reinitialises', 'info');
      DashboardVendeur.switchTab('experts');
    });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : finance                                                 */
  /* -------------------------------------------------------------- */
  renderFinance(container) {
    const sellerId = DashboardVendeur._state.sellerId;
    const stats = DashboardVendeur.computeStats();
    const inputs = (window.ExpertSystems && ExpertSystems.utils)
      ? ExpertSystems.utils.loadInputs(sellerId)
      : {};

    const sellerData = {
      seller_id: sellerId,
      seller: stats.seller,
      stock_items: stats.stock_items,
      orders: stats.orders,
      total_revenue: stats.total_revenue,
      marge_moyenne: stats.marge_moyenne
    };

    let comptableData = {}, financierData = {};
    if (window.ExpertSystems) {
      try {
        comptableData = ExpertSystems.comptable.compute(sellerData, inputs) || {};
        financierData = ExpertSystems.financier.compute(sellerData, inputs) || {};
      } catch (e) {
        console.warn('[DashboardVendeur] ExpertSystems compute failed', e);
      }
    }

    // Tableau mensuel : CA / charges / benefice net (3 derniers mois)
    const caByMonth = (window.ExpertSystems ? ExpertSystems.utils.caByMonth(stats.orders, sellerId) : {});
    const monthsKeys = Object.keys(caByMonth).sort().slice(-6).reverse();
    const monthlyTable = monthsKeys.length
      ? '<table class="table-modern"><thead><tr><th>Mois</th><th>CA TTC</th><th>Charges estimees</th><th>Benefice net</th></tr></thead><tbody>' +
        monthsKeys.map(k => {
          const ca = caByMonth[k] || 0;
          const charges = Math.round(ca * 0.6 + (inputs.charges_fixes_mensuelles || 50000));
          const benef = ca - charges;
          return '<tr><td><strong>' + k + '</strong></td>' +
            '<td>' + Utils.formatPrice(ca) + '</td>' +
            '<td>' + Utils.formatPrice(charges) + '</td>' +
            '<td style="color:' + (benef >= 0 ? 'var(--succes)' : 'var(--erreur)') + ';">' + Utils.formatPrice(benef) + '</td></tr>';
        }).join('') +
        '</tbody></table>'
      : '<p class="text-doux">Aucune donnee mensuelle disponible.</p>';

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Analyse financiere</p>' +
        '<h1>Finance</h1>' +
        '<p class="text-doux">Synthese comptable et financiere - powered by ExpertSystems</p>' +
      '</header>' +

      '<section style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px;">' +
        UI.renderStatCard({
          label: 'Cash flow mensuel',
          value: Utils.formatPrice(financierData.cash_flow || 0),
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
          trend: (financierData.cash_flow || 0) > 0 ? 'up' : 'down',
          trendValue: (financierData.cash_flow || 0) > 0 ? 'Positif' : 'Negatif'
        }) +
        UI.renderStatCard({
          label: 'Ratio tresorerie',
          value: (financierData.ratio_tresorerie || 0).toFixed(2) + ' mois',
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
          trend: (financierData.ratio_tresorerie || 0) >= 2 ? 'up' : 'down',
          trendValue: (financierData.ratio_tresorerie || 0) >= 2 ? 'Sain' : 'Critique'
        }) +
        UI.renderStatCard({
          label: 'DSO (jours)',
          value: Math.round(financierData.dso || 0),
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
          trend: (financierData.dso || 0) <= 30 ? 'up' : 'down',
          trendValue: (financierData.dso || 0) <= 30 ? 'OK' : 'Eleve'
        }) +
        UI.renderStatCard({
          label: 'ROI annuel',
          value: ExpertSystems.utils.formatPct(financierData.roi || 0),
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
          trend: (financierData.roi || 0) >= 0.3 ? 'up' : 'down',
          trendValue: (financierData.roi || 0) >= 0.3 ? 'Bon' : 'Faible'
        }) +
      '</section>' +

      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:24px;" class="finance-grid-2col">' +
        '<div class="card-modern">' +
          '<h3 style="margin:0 0 12px;">Projection 3 mois (CA estime)</h3>' +
          (financierData.projection_3_mois && financierData.projection_3_mois.length
            ? '<div style="display:flex; flex-direction:column; gap:8px;">' +
                financierData.projection_3_mois.map((v, i) => {
                  const pct = Math.min(100, Math.max(5, Math.round(v / (Math.max(...financierData.projection_3_mois) || 1) * 100)));
                  return '<div>' +
                    '<div style="display:flex; justify-content:space-between; font-size:0.875rem; margin-bottom:4px;">' +
                      '<span>M+' + (i + 1) + '</span>' +
                      '<strong>' + Utils.formatPrice(Math.round(v)) + '</strong>' +
                    '</div>' +
                    '<div class="progress-modern"><div class="progress-modern-fill" style="width:' + pct + '%;"></div></div>' +
                  '</div>';
                }).join('') +
              '</div>'
            : '<p class="text-doux">Projection indisponible.</p>') +
        '</div>' +

        '<div class="card-modern">' +
          '<h3 style="margin:0 0 12px;">Ratios cles</h3>' +
          '<div style="display:flex; flex-direction:column; gap:8px;">' +
            '<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">Marge brute</span><strong>' + ExpertSystems.utils.formatPct(comptableData.marge_brute_pct || 0) + '</strong></div>' +
            '<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">Marge nette</span><strong>' + ExpertSystems.utils.formatPct(comptableData.marge_nette_pct || 0) + '</strong></div>' +
            '<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">Seuil de rentabilite</span><strong>' + Utils.formatPrice(comptableData.seuil_rentabilite || 0) + '</strong></div>' +
            '<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">BFR</span><strong>' + Utils.formatPrice(financierData.bfr || 0) + '</strong></div>' +
            '<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">Valeur stock (achat)</span><strong>' + Utils.formatPrice(financierData.valeur_stock || 0) + '</strong></div>' +
            '<div style="display:flex; justify-content:space-between; padding:6px 0;"><span class="text-caption">Conseil</span><strong style="text-transform:capitalize;">' + Utils.escapeHtml(financierData.conseil_investissement || 'ajuster') + '</strong></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="card-modern">' +
        '<h3 style="margin:0 0 12px;">Tableau mensuel (6 derniers mois)</h3>' +
        monthlyTable +
      '</div>';
  },

  /* -------------------------------------------------------------- */
  /*  Tab : messages                                                */
  /* -------------------------------------------------------------- */
  renderMessages(container) {
    const sellerId = DashboardVendeur._state.sellerId;
    const messages = Storage.getMessages(sellerId);
    const templates = (window.ExpertSystems && ExpertSystems.getReference().messages_templates) || {};

    const unread = messages.filter(m => !m.read).length;

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Communication</p>' +
        '<h1>Messages clients</h1>' +
        '<p class="text-doux">' + messages.length + ' message(s) · ' + unread + ' non lu(s)</p>' +
      '</header>' +

      '<div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;" class="messages-grid-2col">' +
        '<section class="card-modern">' +
          '<h3 style="margin:0 0 12px;">Boite de reception</h3>' +
          (messages.length
            ? '<div style="display:flex; flex-direction:column; gap:8px;">' +
                messages.slice(0, 20).map(m => {
                  const cls = m.read ? '' : 'style="background:var(--surface-2);"';
                  return '<div ' + cls + ' style="padding:12px; border-radius:8px; border:1px solid var(--border-subtle);">' +
                    '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                      '<strong>' + Utils.escapeHtml(m.buyer_name || m.nom || 'Client') + '</strong>' +
                      '<span class="text-caption">' + Utils.formatDateShort(m.created_at) + '</span>' +
                    '</div>' +
                    '<p style="margin:6px 0; font-size:0.875rem;">' + Utils.escapeHtml(Utils.truncate(m.message || m.contenu || '', 120)) + '</p>' +
                    (m.telephone || m.phone ? '<p class="text-caption">Tel: ' + Utils.escapeHtml(m.telephone || m.phone) + '</p>' : '') +
                    '<button class="btn btn-ghost btn-sm reply-btn" data-buyer-id="' + Utils.escapeHtml(m.buyer_id || '') + '" data-buyer-name="' + Utils.escapeHtml(m.buyer_name || m.nom || '') + '" data-product="' + Utils.escapeHtml(m.product || m.produit || '') + '" style="margin-top:4px;">Repondre</button>' +
                  '</div>';
                }).join('') +
              '</div>'
            : '<div class="empty-state-modern"><p>Aucun message recu.</p></div>') +
        '</section>' +

        '<section class="card-modern">' +
          '<h3 style="margin:0 0 12px;">Templates rapides</h3>' +
          '<div style="display:flex; flex-direction:column; gap:8px;">' +
            Object.keys(templates).map(key => {
              const preview = Utils.truncate(templates[key].replace(/\n/g, ' '), 60);
              return '<button class="btn btn-secondary btn-sm template-btn" data-template="' + key + '" style="text-align:left;">' +
                '<strong>' + Utils.escapeHtml(key.replace(/_/g, ' ')) + '</strong><br>' +
                '<span class="text-caption">' + Utils.escapeHtml(preview) + '...</span>' +
              '</button>';
            }).join('') +
          '</div>' +
        '</section>' +
      '</div>';

    // Wire reply buttons
    container.querySelectorAll('.reply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        DashboardVendeur._replyModal(btn.dataset.buyerName, btn.dataset.product, 'reponse_info');
      });
    });
    container.querySelectorAll('.template-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        DashboardVendeur._replyModal('[Client]', '', btn.dataset.template);
      });
    });
  },

  _replyModal(buyerName, product, templateKey) {
    const sellerId = DashboardVendeur._state.sellerId;
    const seller = Data.getSeller(sellerId);
    const templates = (window.ExpertSystems && ExpertSystems.getReference().messages_templates) || {};
    const tpl = templates[templateKey] || '';
    const vars = {
      client: buyerName || '[Client]',
      commande_id: '[Commande]',
      montant: '[Montant]',
      produit: product || '[Produit]',
      vendeur: seller ? seller.nom : '[Vendeur]',
      delai: '7',
      boutique_url: 'boutique-vendeur.html?id=' + sellerId,
      avis_url: 'historique.html',
      offre_url: 'produits.html',
      date_fin: '[Date fin]',
      remise: '15',
      prix: '[Prix]',
      stock: '[Stock]',
      delai_livraison: '48h',
      conditions: 'Paiement a la livraison',
      date_livraison: '[Date livraison]',
      transporteur: '[Transporteur]',
      suivi: '[Reference]',
      date_reappro: '[Date reappro]'
    };
    let msg = tpl;
    Object.keys(vars).forEach(k => {
      msg = msg.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
    });

    UI.modal({
      title: 'Composer un message (' + templateKey + ')',
      body: '<div class="form-group">' +
        '<label class="form-label" for="msg-output">Message pre-rempli (modifiable)</label>' +
        '<textarea id="msg-output" class="form-input" rows="10" style="font-family:monospace;">' + Utils.escapeHtml(msg) + '</textarea>' +
        '<p class="form-hint">Copiez ce message puis envoyez-le via WhatsApp/SMS/email au client.</p>' +
      '</div>',
      actions: [
        { text: 'Fermer', style: 'btn-ghost', close: true },
        {
          text: 'Copier',
          style: 'btn-primary',
          onClick: (content) => {
            const txt = content.querySelector('#msg-output').value;
            try {
              navigator.clipboard.writeText(txt);
              UI.toast('Message copie dans le presse-papier', 'success');
              Storage.addActivity(sellerId, {
                type: 'message_template',
                detail: 'Template "' + templateKey + '" utilise pour ' + (buyerName || '[Client]')
              });
            } catch (e) {
              UI.toast('Copie impossible - selectionnez manuellement', 'info');
            }
            return false; // reste ouvert
          }
        }
      ]
    });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : settings                                                */
  /* -------------------------------------------------------------- */
  renderSettings(container) {
    const sellerId = DashboardVendeur._state.sellerId;
    const seller = Data.getSeller(sellerId);
    const session = DashboardVendeur._state.session;
    const boutique = Storage.get('boutique_info_' + sellerId, {
      nom: seller ? seller.nom : session.user_name,
      description: seller ? (seller.description || '') : '',
      contact: seller ? seller.telephone : '',
      email: seller ? seller.email : (session.email || ''),
      ville: seller ? seller.ville : '',
      region: seller ? seller.region : ''
    });
    const prefs = Storage.get('prefs_' + sellerId, { notifications: true, dark_mode: Storage.getTheme() === 'dark' });

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Configuration</p>' +
        '<h1>Parametres</h1>' +
      '</header>' +

      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;" class="settings-grid-2col">' +
        '<section class="card-modern">' +
          '<h3 style="margin:0 0 16px;">Infos boutique</h3>' +
          '<div style="display:grid; gap:12px;">' +
            '<div class="input-group-modern"><label for="set-nom">Nom boutique</label>' +
              '<input type="text" id="set-nom" class="input-modern" value="' + Utils.escapeHtml(boutique.nom) + '"></div>' +
            '<div class="input-group-modern"><label for="set-desc">Description</label>' +
              '<textarea id="set-desc" class="input-modern" rows="3">' + Utils.escapeHtml(boutique.description) + '</textarea></div>' +
            '<div class="input-group-modern"><label for="set-contact">Telephone</label>' +
              '<input type="text" id="set-contact" class="input-modern" value="' + Utils.escapeHtml(boutique.contact) + '"></div>' +
            '<div class="input-group-modern"><label for="set-email">Email</label>' +
              '<input type="email" id="set-email" class="input-modern" value="' + Utils.escapeHtml(boutique.email) + '"></div>' +
            '<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">' +
              '<div class="input-group-modern"><label for="set-ville">Ville</label>' +
                '<input type="text" id="set-ville" class="input-modern" value="' + Utils.escapeHtml(boutique.ville) + '"></div>' +
              '<div class="input-group-modern"><label for="set-region">Region</label>' +
                '<input type="text" id="set-region" class="input-modern" value="' + Utils.escapeHtml(boutique.region) + '"></div>' +
            '</div>' +
            '<button class="btn btn-primary" id="set-save-boutique">Enregistrer</button>' +
          '</div>' +
        '</section>' +

        '<section style="display:flex; flex-direction:column; gap:16px;">' +
          '<div class="card-modern">' +
            '<h3 style="margin:0 0 16px;">Preferences</h3>' +
            '<div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0;">' +
              '<div><strong>Notifications</strong><div class="text-caption">Recevoir les alertes commande/stock</div></div>' +
              '<label class="toggle-switch"><input type="checkbox" id="set-notif" ' + (prefs.notifications ? 'checked' : '') + '><span class="toggle-slider"></span></label>' +
            '</div>' +
            '<div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0;">' +
              '<div><strong>Mode sombre</strong><div class="text-caption">Interface adaptee faible luminosite</div></div>' +
              '<label class="toggle-switch"><input type="checkbox" id="set-dark" ' + (prefs.dark_mode ? 'checked' : '') + '><span class="toggle-slider"></span></label>' +
            '</div>' +
          '</div>' +

          '<div class="card-modern">' +
            '<h3 style="margin:0 0 16px;">Ajout rapide produit</h3>' +
            '<p class="text-doux" style="margin-bottom:12px;">Raccourci vers le formulaire complet d\'ajout de produit.</p>' +
            '<button class="btn btn-secondary btn-block" id="set-add-product">' +
              '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
              'Ajouter produit' +
            '</button>' +
          '</div>' +

          '<div class="card-modern">' +
            '<h3 style="margin:0 0 8px;">Session</h3>' +
            '<p class="text-caption">Connecte en tant que <strong>' + Utils.escapeHtml(session.user_name) + '</strong> (' + Utils.escapeHtml(session.user_id) + ')</p>' +
            '<p class="text-caption">Type: ' + Utils.escapeHtml(session.user_type) + (session.beta ? ' · Beta' : '') + '</p>' +
            '<button class="btn btn-ghost btn-sm" id="set-logout" style="margin-top:8px;">Se deconnecter</button>' +
          '</div>' +
        '</section>' +
      '</div>';

    // Wire save boutique
    container.querySelector('#set-save-boutique').addEventListener('click', () => {
      const newBoutique = {
        nom: container.querySelector('#set-nom').value.trim(),
        description: container.querySelector('#set-desc').value.trim(),
        contact: container.querySelector('#set-contact').value.trim(),
        email: container.querySelector('#set-email').value.trim(),
        ville: container.querySelector('#set-ville').value.trim(),
        region: container.querySelector('#set-region').value.trim()
      };
      Storage.set('boutique_info_' + sellerId, newBoutique);
      Storage.addActivity(sellerId, {
        type: 'boutique_update',
        detail: 'Infos boutique mises a jour : ' + newBoutique.nom
      });
      UI.toast('Infos boutique enregistrees', 'success');
      UI._injectHeader_refresh();
    });

    // Wire notifications toggle
    container.querySelector('#set-notif').addEventListener('change', (e) => {
      const p = Storage.get('prefs_' + sellerId, {});
      p.notifications = e.target.checked;
      Storage.set('prefs_' + sellerId, p);
      UI.toast('Preferences notifications ' + (e.target.checked ? 'activees' : 'desactivees'), 'info');
    });

    // Wire dark mode toggle
    container.querySelector('#set-dark').addEventListener('change', (e) => {
      const theme = e.target.checked ? 'dark' : 'light';
      Storage.setTheme(theme);
      UI.applyTheme(theme);
      UI._injectHeader_refresh();
      const p = Storage.get('prefs_' + sellerId, {});
      p.dark_mode = e.target.checked;
      Storage.set('prefs_' + sellerId, p);
    });

    // Add product
    container.querySelector('#set-add-product').addEventListener('click', () => {
      DashboardVendeur._addProductModal();
    });

    // Logout
    container.querySelector('#set-logout').addEventListener('click', () => {
      UI.confirm('Voulez-vous vous deconnecter ?', () => {
        Auth.logout();
        window.location.href = 'index.html';
      }, { confirmText: 'Se deconnecter', danger: true });
    });
  },

  /* -------------------------------------------------------------- */
  /*  Mini chart (existant - conserve)                              */
  /* -------------------------------------------------------------- */
  _renderMiniChart(orders, sellerId) {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ key: d.toISOString().slice(0, 7), label: d.toLocaleDateString('fr-FR', { month: 'short' }), total: 0 });
    }
    orders.forEach(o => {
      if (['acceptee', 'livree', 'recu'].includes(o.status)) {
        const key = o.order_date.slice(0, 7);
        const m = months.find(x => x.key === key);
        if (m) {
          // Restreint aux items du vendeur courant
          const amount = sellerId
            ? o.items.filter(it => it.seller_id === sellerId).reduce((s, it) => s + it.line_total, 0)
            : o.total;
          m.total += amount;
        }
      }
    });
    const max = Math.max(...months.map(m => m.total), 1);
    return '<div class="mini-chart" style="display:flex; align-items:flex-end; gap:8px; height:200px; padding:8px 0;">' +
      months.map(m => {
        const heightPct = (m.total / max * 100);
        return '<div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px; height:100%; justify-content:flex-end;">' +
          '<span class="text-caption" style="font-size:0.7rem;">' + (m.total > 0 ? Utils.formatPriceShort(m.total) : '-') + '</span>' +
          '<div class="bar-fill" style="width:60%; height:' + Math.max(2, heightPct) + '%; background:var(--gradient-terre); border-radius:6px 6px 0 0; transition:height 0.4s;"></div>' +
          '<span class="bar-label text-caption" style="font-size:0.7rem;">' + m.label + '</span>' +
        '</div>';
      }).join('') +
    '</div>';
  },

  /* -------------------------------------------------------------- */
  /*  Expiry table (existant - conserve)                            */
  /* -------------------------------------------------------------- */
  _renderExpiryTable(alerts) {
    if (!alerts.length) return '<p class="text-doux">Aucun produit perissable</p>';
    return '<table class="table-modern"><thead><tr><th>Produit</th><th>Date peremption</th><th>Jours restants</th><th>Niveau</th></tr></thead><tbody>' +
      alerts.map(it => {
        let badge = '<span class="badge badge-success">OK</span>';
        if (it.days_left < 0) badge = '<span class="badge badge-error">Perime</span>';
        else if (it.days_left < 7) badge = '<span class="badge badge-error">Urgent</span>';
        else if (it.days_left < 30) badge = '<span class="badge badge-warning">Attention</span>';
        return '<tr><td><strong>' + Utils.escapeHtml(it.nom) + '</strong></td>' +
          '<td>' + Utils.formatDate(it.date_peremption) + '</td>' +
          '<td>' + (it.days_left < 0 ? 'Depasse' : it.days_left + ' jours') + '</td>' +
          '<td>' + badge + '</td></tr>';
      }).join('') +
    '</tbody></table>';
  }
};

window.DashboardVendeur = DashboardVendeur;

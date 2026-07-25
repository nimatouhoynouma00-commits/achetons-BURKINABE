/* js/reseller.js - Logique revendeur, lots, calculs bulk (refonte L5-L6)
 *
 * Dashboard revendeur avec sidebar + 5 tabs :
 *   - overview     : stats (transactions, economies, fournisseurs)
 *   - bulk-catalog : catalogue gros avec calculator lot
 *   - suppliers    : liste fournisseurs/vendeurs avec contact
 *   - history      : historique achats en gros
 *   - calculator   : calculateur lot avance
 *
 * Conserve l'API publique Reseller.getRules / computeBulk / _bulkCardHTML
 * pour compatibilite (boutique-vendeur.html, etc.).
 */

const Reseller = {

  TABS: [
    { id: 'overview',     label: "Vue d'ensemble", icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'bulk-catalog', label: 'Catalogue gros', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { id: 'suppliers',    label: 'Fournisseurs',   icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
    { id: 'history',      label: 'Historique',     icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'calculator',   label: 'Calculateur',    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' }
  ],

  _state: { container: null, session: null, boutiqueType: 'grande_boutique', activeTab: 'overview' },

  /* Recupere les regles selon le type de boutique (API publique conservee) */
  getRules(boutiqueType) {
    return Data.resellerRules.types?.[boutiqueType] || null;
  },

  /* Calcule le prix lot + economie (API publique conservee) */
  computeBulk(unitPrice, qty, boutiqueType) {
    const rules = Reseller.getRules(boutiqueType);
    if (!rules) return { gross: unitPrice * qty, remise: 0, total: unitPrice * qty, remise_pct: 0 };
    const remisePct = rules.remise_percentage;
    return {
      ...Utils.computeBulkPrice(unitPrice, qty, remisePct),
      remise_pct: remisePct,
      min_lot: rules.min_lot_size,
      is_valid: qty >= rules.min_lot_size
    };
  },

  /* -------------------------------------------------------------- */
  /*  Entry point : Reseller.renderPage(container)                  */
  /*  (API publique conservee - mais desormais un dashboard)        */
  /* -------------------------------------------------------------- */
  renderPage(container) {
    const session = Auth.current();
    if (!session) return;

    const boutiqueType = session.boutique_type || 'grande_boutique';
    Reseller._state = {
      container,
      session,
      boutiqueType,
      activeTab: Reseller._getActiveTab(session.user_id)
    };

    // Log connexion
    Storage.addActivity(session.user_id, {
      type: 'connexion',
      detail: 'Connexion au dashboard revendeur (' + boutiqueType + ')'
    });

    container.innerHTML =
      '<div class="container dashboard-layout">' +
        Reseller.renderSidebar() +
        '<div class="dashboard-content" id="reseller-content"></div>' +
      '</div>';

    container.querySelectorAll('.dashboard-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        Reseller.switchTab(item.dataset.tab);
      });
    });

    Reseller.switchTab(Reseller._state.activeTab);
  },

  _getActiveTab(userId) {
    try { return localStorage.getItem('rs_active_tab_' + userId) || 'overview'; }
    catch (e) { return 'overview'; }
  },
  _setActiveTab(userId, tab) {
    try { localStorage.setItem('rs_active_tab_' + userId, tab); } catch (e) {}
  },

  /* Stats revendeur : scanne commandes bulk */
  computeStats() {
    const userId = Reseller._state.session.user_id;
    const orders = Storage.getOrders(userId);
    // Identifie les commandes bulk (avec au moins un item bulk=true ou remise_pct>0)
    const bulkOrders = orders.filter(o => o.items.some(it => it.bulk || it.remise_pct > 0));
    const totalSpent = bulkOrders.reduce((s, o) => s + (o.total || 0), 0);
    // Economie = somme des remises
    const savings = bulkOrders.reduce((s, o) => s + (o.remise_total || 0), 0);
    // Fournisseurs uniques
    const suppliers = new Set();
    bulkOrders.forEach(o => (o.seller_ids || []).forEach(sid => suppliers.add(sid)));
    return {
      bulk_orders: bulkOrders,
      total_orders: bulkOrders.length,
      total_spent: totalSpent,
      savings,
      suppliers_count: suppliers.size,
      all_orders: orders
    };
  },

  renderSidebar() {
    const session = Reseller._state.session;
    const activeTab = Reseller._state.activeTab;
    const notifs = Storage.getNotifications(session.user_id).filter(n => !n.read).length;

    const items = Reseller.TABS.map(t => {
      const isActive = t.id === activeTab ? ' active' : '';
      const badge = (t.id === 'history' && notifs > 0)
        ? '<span class="badge-modern badge-modern-error" style="margin-left:auto;">' + notifs + '</span>'
        : '';
      return '<a href="#" class="dashboard-nav-item' + isActive + '" data-tab="' + t.id + '">' +
        '<svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + t.icon + '"/></svg>' +
        '<span>' + Utils.escapeHtml(t.label) + '</span>' +
        badge +
      '</a>';
    }).join('');

    const typeLabel = Reseller._state.boutiqueType === 'grande_boutique' ? 'Grande boutique' : 'Petite boutique';
    const rules = Reseller.getRules(Reseller._state.boutiqueType);

    return '<aside class="dashboard-sidebar">' +
      '<div style="padding:8px 12px 16px; border-bottom:1px solid var(--border-subtle); margin-bottom:12px;">' +
        '<div class="avatar avatar-sm" style="margin-bottom:8px;">' + Utils.escapeHtml((session.user_name || '?').charAt(0).toUpperCase()) + '</div>' +
        '<div style="font-weight:600; font-size:0.9rem;">' + Utils.escapeHtml(Utils.truncate(session.user_name, 24)) + '</div>' +
        '<div class="text-caption">' + Utils.escapeHtml(typeLabel) + '</div>' +
        (rules ? '<div class="badge-modern badge-modern-terre" style="margin-top:6px;">-' + rules.remise_percentage + '% sur gros</div>' : '') +
      '</div>' +
      '<nav class="dashboard-nav" style="display:flex; flex-direction:column;">' + items + '</nav>' +
    '</aside>';
  },

  switchTab(tabName) {
    Reseller._state.activeTab = tabName;
    Reseller._setActiveTab(Reseller._state.session.user_id, tabName);

    const navItems = Reseller._state.container.querySelectorAll('.dashboard-nav-item');
    navItems.forEach(it => it.classList.toggle('active', it.dataset.tab === tabName));

    const content = Reseller._state.container.querySelector('#reseller-content');
    if (!content) return;

    const renderers = {
      'overview':     Reseller.renderOverview,
      'bulk-catalog': Reseller.renderBulkCatalog,
      'suppliers':    Reseller.renderSuppliers,
      'history':      Reseller.renderHistory,
      'calculator':   Reseller.renderCalculator
    };
    const fn = renderers[tabName] || renderers.overview;
    content.innerHTML = '';
    fn.call(Reseller, content);
  },

  /* -------------------------------------------------------------- */
  /*  Tab : overview                                                */
  /* -------------------------------------------------------------- */
  renderOverview(container) {
    const stats = Reseller.computeStats();
    const rules = Reseller.getRules(Reseller._state.boutiqueType);
    const activity = Storage.getActivity(Reseller._state.session.user_id);

    container.innerHTML =
      '<header class="dashboard-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:24px;">' +
        '<div>' +
          '<p class="eyebrow">Espace revendeurs</p>' +
          '<h1>Tableau de bord</h1>' +
          '<p class="text-doux">Type boutique : ' + (rules ? (Reseller._state.boutiqueType === 'grande_boutique' ? 'Grande boutique' : 'Petite boutique') : 'N/A') + ' · Remise ' + (rules ? '-' + rules.remise_percentage + '%' : '') + '</p>' +
        '</div>' +
        '<div style="display:flex; gap:8px;">' +
          '<button class="btn btn-ghost btn-sm" id="toggle-boutique-type">' +
            'Changer type boutique' +
          '</button>' +
        '</div>' +
      '</header>' +

      '<section style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px;">' +
        UI.renderStatCard({
          label: 'Transactions en gros',
          value: stats.total_orders,
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
          trend: stats.total_orders > 0 ? 'up' : 'neutral',
          trendValue: 'Cumul'
        }) +
        UI.renderStatCard({
          label: 'Economies realisees',
          value: Utils.formatPrice(stats.savings),
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
          trend: stats.savings > 0 ? 'up' : 'neutral',
          trendValue: 'Remises'
        }) +
        UI.renderStatCard({
          label: 'Total depense',
          value: Utils.formatPrice(stats.total_spent),
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
          trend: 'neutral',
          trendValue: 'Gros'
        }) +
        UI.renderStatCard({
          label: 'Fournisseurs',
          value: stats.suppliers_count,
          icon: '<svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
          trend: 'neutral',
          trendValue: 'Vendeurs'
        }) +
      '</section>' +

      '<div style="display:grid; grid-template-columns:2fr 1fr; gap:24px;" class="overview-grid-2col">' +
        '<section class="card-modern">' +
          '<h3 style="margin:0 0 12px;">Dernieres transactions en gros</h3>' +
          (stats.bulk_orders.length
            ? '<div style="display:flex; flex-direction:column; gap:8px;">' +
                stats.bulk_orders.slice(0, 5).map(o =>
                  '<div style="display:flex; justify-content:space-between; align-items:center; padding:10px; border-radius:8px; background:var(--surface-2);">' +
                    '<div><strong>' + o.order_id + '</strong><div class="text-caption">' + Utils.formatDateShort(o.order_date) + ' · ' + o.items.length + ' article(s)</div></div>' +
                    '<div style="text-align:right;"><strong>' + Utils.formatPrice(o.total) + '</strong>' +
                      (o.remise_total > 0 ? '<div class="text-caption" style="color:var(--succes);">- ' + Utils.formatPrice(o.remise_total) + '</div>' : '') +
                    '</div>' +
                  '</div>'
                ).join('') +
              '</div>'
            : '<div class="empty-state-modern"><p>Aucune transaction en gros.</p><a href="#" class="btn btn-primary btn-sm go-catalog-btn">Voir le catalogue gros</a></div>') +
        '</section>' +

        '<section class="card-modern">' +
          '<h3 style="margin:0 0 12px;">Activite recente</h3>' +
          UI.renderActivityFeed(activity) +
        '</section>' +
      '</div>';

    const toggleBtn = container.querySelector('#toggle-boutique-type');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const newType = Reseller._state.boutiqueType === 'grande_boutique' ? 'petite_boutique' : 'grande_boutique';
        Reseller._state.boutiqueType = newType;
        const session = Reseller._state.session;
        session.boutique_type = newType;
        Storage.setSession(session);
        Storage.addActivity(session.user_id, {
          type: 'boutique_type_change',
          detail: 'Type boutique change : ' + newType
        });
        UI.toast('Type boutique : ' + (newType === 'grande_boutique' ? 'Grande boutique' : 'Petite boutique'), 'success');
        Reseller.switchTab('overview');
      });
    }
    const goBtn = container.querySelector('.go-catalog-btn');
    if (goBtn) goBtn.addEventListener('click', (e) => { e.preventDefault(); Reseller.switchTab('bulk-catalog'); });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : bulk-catalog                                            */
  /* -------------------------------------------------------------- */
  renderBulkCatalog(container) {
    const rules = Reseller.getRules(Reseller._state.boutiqueType);
    const bulkProducts = Data.products.filter(p => p.quantite_disponible >= rules.min_lot_size);

    container.innerHTML =
      '<header class="dashboard-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:24px;">' +
        '<div>' +
          '<p class="eyebrow">Catalogue</p>' +
          '<h1>Produits en gros</h1>' +
          '<p class="text-doux">' + bulkProducts.length + ' produits disponibles · Remise -' + rules.remise_percentage + '% (min ' + rules.min_lot_size + ')</p>' +
        '</div>' +
        '<div style="display:flex; gap:8px; align-items:center;">' +
          '<label class="text-caption" for="bulk-type-select">Type boutique:</label>' +
          '<select id="bulk-type-select" class="form-select" style="width:auto;">' +
            '<option value="grande_boutique"' + (Reseller._state.boutiqueType === 'grande_boutique' ? ' selected' : '') + '>Grande boutique (-' + Data.resellerRules.types.grande_boutique.remise_percentage + '%)</option>' +
            '<option value="petite_boutique"' + (Reseller._state.boutiqueType === 'petite_boutique' ? ' selected' : '') + '>Petite boutique (-' + Data.resellerRules.types.petite_boutique.remise_percentage + '%)</option>' +
          '</select>' +
        '</div>' +
      '</header>' +

      '<div class="products-grid" id="bulk-grid">' +
        (bulkProducts.length
          ? bulkProducts.map(p => Reseller._bulkCardHTML(p, Reseller._state.boutiqueType)).join('')
          : '<div class="empty-state-modern"><p>Aucun produit disponible en gros pour ce type de boutique.</p></div>') +
      '</div>';

    container.querySelector('#bulk-type-select').addEventListener('change', (e) => {
      const newType = e.target.value;
      Reseller._state.boutiqueType = newType;
      const session = Reseller._state.session;
      session.boutique_type = newType;
      Storage.setSession(session);
      Reseller.renderBulkCatalog(container);
    });

    Reseller._wireBulkCards(container.querySelector('#bulk-grid'), Reseller._state.boutiqueType);
  },

  _bulkCardHTML(product, boutiqueType) {
    const seller = Data.getSeller(product.vendeur_id);
    const rules = Reseller.getRules(boutiqueType);
    const bulk = Reseller.computeBulk(product.prix, rules.min_lot_size, boutiqueType);
    const stock = Data.getEffectiveStock(product);

    return '<article class="card product-card bulk-card" data-product-id="' + product.id + '">' +
      '<a href="produit-detail.html?id=' + product.id + '">' +
        '<div class="product-card-image">' +
          (typeof ProductImage !== 'undefined' ? ProductImage.getHTML(product, { class: 'product-card-img' }) : '') +
          '<span class="badge badge-warning">-' + rules.remise_percentage + '%</span>' +
        '</div>' +
        '<div class="product-card-body">' +
          '<div class="product-card-badges">' +
            '<span class="badge badge-category">' + Utils.escapeHtml(product.categorie) + '</span>' +
            (product.made_in_bf ? '<span class="badge badge-made-in-bf">Made in BF</span>' : '') +
          '</div>' +
          '<h3 class="product-card-title">' + Utils.escapeHtml(product.nom) + '</h3>' +
          '<div class="bulk-prices">' +
            '<div><span class="text-caption">Prix unitaire</span><span class="price-small">' + Utils.formatPrice(product.prix) + '</span></div>' +
            '<div><span class="text-caption">Lot min ' + rules.min_lot_size + '</span><span class="price">' + Utils.formatPrice(bulk.total) + '</span></div>' +
            '<div><span class="text-caption">Economie</span><span class="price-small" style="color: var(--succes);">- ' + Utils.formatPrice(bulk.remise) + '</span></div>' +
          '</div>' +
          '<p class="text-caption">Stock dispo: ' + stock + ' ' + Utils.escapeHtml(product.unite_quantite) + '</p>' +
          (seller ? '<div class="product-card-seller">' + UI.trustBadgeHTML(seller.trust_level, seller.ventes_count) + '</div>' : '') +
        '</div>' +
      '</a>' +
      '<div class="product-card-actions">' +
        '<button class="btn btn-primary btn-sm btn-block add-bulk-btn" data-product-id="' + product.id + '">Ajouter lot de ' + rules.min_lot_size + '</button>' +
      '</div>' +
    '</article>';
  },

  _wireBulkCards(grid, boutiqueType) {
    if (!grid) return;
    grid.querySelectorAll('.add-bulk-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.productId;
        const rules = Reseller.getRules(boutiqueType);
        if (typeof Cart !== 'undefined' && Cart.addBulkItem) {
          Cart.addBulkItem(productId, rules.min_lot_size, rules.min_lot_size, rules.remise_percentage);
        }
        Storage.addActivity(Reseller._state.session.user_id, {
          type: 'panier_ajout',
          detail: 'Lot ajoute : ' + (Data.getProduct(productId)?.nom || '') + ' x' + rules.min_lot_size
        });
        UI.toast('Lot ajoute au panier', 'success');
      });
    });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : suppliers                                               */
  /* -------------------------------------------------------------- */
  renderSuppliers(container) {
    // Liste tous les vendeurs avec produits disponibles en gros
    const rules = Reseller.getRules(Reseller._state.boutiqueType);
    const sellersWithBulk = Data.sellers.filter(s =>
      Data.products.some(p => p.vendeur_id === s.id && p.quantite_disponible >= rules.min_lot_size)
    );

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Reseau</p>' +
        '<h1>Fournisseurs</h1>' +
        '<p class="text-doux">' + sellersWithBulk.length + ' vendeur(s) disponibles pour achats en gros</p>' +
      '</header>' +

      '<div class="card-modern">' +
        (sellersWithBulk.length
          ? '<div class="table-responsive"><table class="table-modern"><thead><tr>' +
              '<th>Vendeur</th><th>Region</th><th>Trust</th><th>Produits gros</th><th>Contact</th><th>Action</th>' +
            '</tr></thead><tbody>' +
              sellersWithBulk.map(s => {
                const bulkProducts = Data.products.filter(p => p.vendeur_id === s.id && p.quantite_disponible >= rules.min_lot_size);
                return '<tr>' +
                  '<td><strong>' + Utils.escapeHtml(s.nom) + '</strong><div class="text-caption">' + Utils.escapeHtml(s.ville || '') + '</div></td>' +
                  '<td>' + Utils.escapeHtml(s.region || '-') + '</td>' +
                  '<td>' + UI.trustBadgeHTML(s.trust_level, s.ventes_count) + '</td>' +
                  '<td>' + bulkProducts.length + ' produit' + (bulkProducts.length > 1 ? 's' : '') + '</td>' +
                  '<td class="text-caption">' + Utils.escapeHtml(s.telephone || s.email || '-') + '</td>' +
                  '<td><a href="boutique-vendeur.html?id=' + s.id + '" class="btn btn-ghost btn-sm">Voir boutique</a></td>' +
                '</tr>';
              }).join('') +
            '</tbody></table></div>'
          : '<div class="empty-state-modern"><p>Aucun fournisseur disponible.</p></div>') +
      '</div>';
  },

  /* -------------------------------------------------------------- */
  /*  Tab : history                                                 */
  /* -------------------------------------------------------------- */
  renderHistory(container) {
    const stats = Reseller.computeStats();
    const orders = stats.bulk_orders;

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Trace</p>' +
        '<h1>Historique achats en gros</h1>' +
        '<p class="text-doux">' + orders.length + ' transaction(s) · ' + Utils.formatPrice(stats.total_spent) + ' depense · ' + Utils.formatPrice(stats.savings) + ' economise</p>' +
      '</header>' +

      '<div class="card-modern">' +
        (orders.length
          ? '<div class="table-responsive"><table class="table-modern"><thead><tr>' +
              '<th>Date</th><th>Numero</th><th>Articles</th><th>Vendeurs</th><th>Montant</th><th>Economie</th><th>Statut</th><th>Recu</th>' +
            '</tr></thead><tbody>' +
              orders.map(o =>
                '<tr>' +
                  '<td>' + Utils.formatDateShort(o.order_date) + '</td>' +
                  '<td><strong>' + o.order_id + '</strong></td>' +
                  '<td>' + o.items.length + ' article' + (o.items.length > 1 ? 's' : '') + '</td>' +
                  '<td>' + (o.seller_ids || []).length + ' vendeur(s)</td>' +
                  '<td class="price-small">' + Utils.formatPrice(o.total) + '</td>' +
                  '<td style="color:var(--succes);">- ' + Utils.formatPrice(o.remise_total || 0) + '</td>' +
                  '<td><span class="badge ' + Checkout.statusBadgeClass(o.status) + '">' + Checkout.statusLabel(o.status) + '</span></td>' +
                  '<td><button class="btn btn-ghost btn-sm view-receipt-btn" data-order-id="' + o.order_id + '">Recu</button></td>' +
                '</tr>'
              ).join('') +
            '</tbody></table></div>'
          : '<div class="empty-state-modern"><p>Aucun achat en gros pour le moment.</p><a href="#" class="btn btn-primary btn-sm go-catalog-btn">Voir le catalogue</a></div>') +
      '</div>';

    container.querySelectorAll('.view-receipt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.dataset.orderId;
        const order = orders.find(o => o.order_id === orderId);
        if (!order) return;
        UI.modal({
          title: 'Recu - ' + orderId,
          body: '<div class="receipt-modal">' + Checkout.renderReceiptHTML(order) + '</div>',
          actions: [
            { text: 'Fermer', style: 'btn-ghost', close: true },
            { text: 'Imprimer', style: 'btn-primary', onClick: () => window.print() }
          ]
        });
      });
    });

    const goBtn = container.querySelector('.go-catalog-btn');
    if (goBtn) goBtn.addEventListener('click', (e) => { e.preventDefault(); Reseller.switchTab('bulk-catalog'); });
  },

  /* -------------------------------------------------------------- */
  /*  Tab : calculator                                              */
  /* -------------------------------------------------------------- */
  renderCalculator(container) {
    const rules = Reseller.getRules(Reseller._state.boutiqueType);

    container.innerHTML =
      '<header class="dashboard-header" style="margin-bottom:24px;">' +
        '<p class="eyebrow">Outil</p>' +
        '<h1>Calculateur de lot</h1>' +
        '<p class="text-doux">Simulez le prix d\'un lot selon votre type de boutique (remise -' + rules.remise_percentage + '%).</p>' +
      '</header>' +

      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;" class="calc-grid-2col">' +
        '<section class="card-modern">' +
          '<h3 style="margin:0 0 16px;">Parametres</h3>' +
          '<div style="display:grid; gap:12px;">' +
            '<div class="input-group-modern"><label for="calc-product">Produit</label>' +
              '<select id="calc-product" class="input-modern">' +
                Data.products.map(p => '<option value="' + p.id + '" data-price="' + p.prix + '">' + Utils.escapeHtml(p.nom) + ' (' + Utils.formatPrice(p.prix) + ')</option>').join('') +
              '</select></div>' +
            '<div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">' +
              '<div class="input-group-modern"><label for="calc-qty">Quantite lot</label>' +
                '<input type="number" id="calc-qty" class="input-modern" value="' + rules.min_lot_size + '" min="' + rules.min_lot_size + '"></div>' +
              '<div class="input-group-modern"><label for="calc-type">Type boutique</label>' +
                '<select id="calc-type" class="input-modern">' +
                  '<option value="grande_boutique"' + (Reseller._state.boutiqueType === 'grande_boutique' ? ' selected' : '') + '>Grande</option>' +
                  '<option value="petite_boutique"' + (Reseller._state.boutiqueType === 'petite_boutique' ? ' selected' : '') + '>Petite</option>' +
                '</select></div>' +
            '</div>' +
            '<button class="btn btn-primary" id="calc-btn">Calculer</button>' +
          '</div>' +
        '</section>' +

        '<section class="card-modern">' +
          '<h3 style="margin:0 0 16px;">Resultat</h3>' +
          '<div id="calc-result"></div>' +
        '</section>' +
      '</div>';

    const calcBtn = container.querySelector('#calc-btn');
    const run = () => {
      const productId = container.querySelector('#calc-product').value;
      const qty = parseInt(container.querySelector('#calc-qty').value, 10);
      const boutiqueType = container.querySelector('#calc-type').value;
      const product = Data.getProduct(productId);
      if (!product || !qty) return;
      const result = Reseller.computeBulk(product.prix, qty, boutiqueType);
      const activeRules = Reseller.getRules(boutiqueType);

      container.querySelector('#calc-result').innerHTML =
        '<div style="display:grid; gap:8px;">' +
          '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">Produit</span><strong>' + Utils.escapeHtml(product.nom) + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">Prix unitaire</span><strong>' + Utils.formatPrice(product.prix) + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">Quantite</span><strong>' + qty + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">Prix brut</span><strong>' + Utils.formatPrice(result.gross) + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-subtle);"><span class="text-caption">Remise (' + result.remise_pct + '%)</span><strong style="color:var(--succes);">- ' + Utils.formatPrice(result.remise) + '</strong></div>' +
          '<div style="display:flex; justify-content:space-between; padding:12px 0; background:var(--surface-2); border-radius:8px; padding:12px;"><span style="font-weight:600;">Total a payer</span><strong class="price-large">' + Utils.formatPrice(result.total) + '</strong></div>' +
          (result.is_valid
            ? '<div class="badge-modern badge-modern-success" style="justify-self:start;">Lot valide (min ' + result.min_lot + ')</div>'
            : '<div class="badge-modern badge-modern-error" style="justify-self:start;">Lot invalide (min ' + result.min_lot + ')</div>') +
          '<button class="btn btn-secondary btn-sm" id="calc-add-cart-btn" style="justify-self:start;">Ajouter ce lot au panier</button>' +
        '</div>';

      const addBtn = container.querySelector('#calc-add-cart-btn');
      if (addBtn && result.is_valid) {
        addBtn.addEventListener('click', () => {
          if (typeof Cart !== 'undefined' && Cart.addBulkItem) {
            Cart.addBulkItem(productId, qty, activeRules.min_lot_size, activeRules.remise_percentage);
          }
          Storage.addActivity(Reseller._state.session.user_id, {
            type: 'panier_ajout',
            detail: 'Lot calcule ajoute : ' + product.nom + ' x' + qty + ' (' + Utils.formatPrice(result.total) + ')'
          });
          UI.toast('Lot ajoute au panier', 'success');
        });
      }
    };
    calcBtn.addEventListener('click', run);
    container.querySelector('#calc-type').addEventListener('change', run);
    container.querySelector('#calc-product').addEventListener('change', run);
    container.querySelector('#calc-qty').addEventListener('input', run);
    run();
  }
};

window.Reseller = Reseller;

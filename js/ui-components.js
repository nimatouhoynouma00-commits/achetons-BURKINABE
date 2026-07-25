/* js/ui-components.js - Composants UI dynamiques : toasts, modals, header/footer injection
 *
 * Extension L5-L6 :
 *   - Storage.getActivity / Storage.addActivity (log actions vendeur/acheteur)
 *   - UI.renderStatCard({label, value, icon, trend, trendValue})
 *   - UI.renderActivityFeed(container, activities)
 *   - UI._injectHeader_refresh() rafraichit aussi le bouton auth (login/logout/avatar)
 */

/* ------------------------------------------------------------------ */
/* Extension Storage : activity log (tracke les actions utilisateur)  */
/* ------------------------------------------------------------------ */
if (window.Storage && typeof Storage.getActivity !== 'function') {
  Storage.getActivity = function (userId) {
    return Storage.get('activity_' + userId, []);
  };
}
if (window.Storage && typeof Storage.addActivity !== 'function') {
  Storage.addActivity = function (userId, activity) {
    const list = Storage.getActivity(userId);
    activity.id = activity.id || Utils.uuid();
    activity.created_at = activity.created_at || new Date().toISOString();
    activity.date = activity.date || activity.created_at;
    list.unshift(activity);
    // Garde les 200 dernieres activites (evite localStorage overflow)
    if (list.length > 200) list.length = 200;
    Storage.set('activity_' + userId, list);
    return activity;
  };
}

const UI = {
  /* === Toast === */
  toast(message, type = 'info', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('role', 'alert');
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
      success: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      error:   '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
      warning: '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
      info:    '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };

    toast.innerHTML = `
      ${icons[type] || icons.info}
      <span class="toast-msg">${Utils.escapeHtml(message)}</span>
      <button class="toast-close" aria-label="Fermer">×</button>
    `;

    container.appendChild(toast);

    const close = () => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector('.toast-close').addEventListener('click', close);
    if (duration > 0) setTimeout(close, duration);

    return toast;
  },

  /* === Modal === */
  modal({ title, body, actions = [] }) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal';

    const header = document.createElement('div');
    header.className = 'modal-header';
    header.innerHTML = `
      <h3 class="modal-title">${Utils.escapeHtml(title)}</h3>
      <button class="modal-close" aria-label="Fermer">×</button>
    `;

    const content = document.createElement('div');
    content.className = 'modal-body';
    if (typeof body === 'string') {
      content.innerHTML = body;
    } else if (body instanceof HTMLElement) {
      content.appendChild(body);
    }

    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    actions.forEach(a => {
      const btn = document.createElement('button');
      btn.className = `btn ${a.style || 'btn-primary'}`;
      btn.textContent = a.text;
      btn.addEventListener('click', () => {
        if (a.onClick) a.onClick(content, overlay);
        if (a.close !== false) overlay.remove();
      });
      footer.appendChild(btn);
    });

    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);
    overlay.appendChild(modal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    header.querySelector('.modal-close').addEventListener('click', () => overlay.remove());

    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));

    return { overlay, modal, content };
  },

  /* === Confirm dialog === */
  confirm(message, onConfirm, { confirmText = 'Confirmer', cancelText = 'Annuler', danger = false } = {}) {
    return UI.modal({
      title: 'Confirmation',
      body: `<p>${Utils.escapeHtml(message)}</p>`,
      actions: [
        { text: cancelText, style: 'btn-ghost', close: true },
        {
          text: confirmText,
          style: danger ? 'btn-error' : 'btn-primary',
          close: true,
          onClick: onConfirm
        }
      ]
    });
  },

  /* === Star rating HTML === */
  starsHTML(rating, max = 5) {
    rating = parseFloat(rating) || 0;
    let html = '<span class="star-rating" aria-label="Note ' + rating + ' sur ' + max + '">';
    for (let i = 1; i <= max; i++) {
      const cls = i <= Math.round(rating) ? 'star' : 'star empty';
      html += `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
    html += '</span>';
    return html;
  },

  /* === Trust badge HTML === */
  trustBadgeHTML(level, ventesCount) {
    if (!level) return '';
    const label = Utils.trustLabel(level);
    const icons = {
      bronze: '<svg class="icon-sm" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">3</text></svg>',
      argent: '<svg class="icon-sm" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">2</text></svg>',
      or:     '<svg class="icon-sm" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" fill="none"/><text x="12" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="currentColor">1</text></svg>'
    };
    const countTxt = ventesCount != null ? ` · ${ventesCount} ventes` : '';
    return `<span class="${Utils.trustClass(level)}">${icons[level] || ''}<span>${label}${countTxt}</span></span>`;
  },

  /* === Certification badges HTML === */
  certBadgesHTML(certs) {
    if (!certs || !certs.length) return '';
    return certs.map(c => {
      const map = {
        BioSPG:     { cls: 'badge-biospg',     label: 'BioSPG' },
        ABNORM:     { cls: 'badge-abnorm',     label: 'ABNORM' },
        Made_in_BF: { cls: 'badge-made-in-bf', label: 'Made in BF' }
      };
      const info = map[c] || { cls: 'badge-neutral', label: c };
      return `<span class="badge ${info.cls}">${info.label}</span>`;
    }).join('');
  },

  /* === Carte produit === */
  productCardHTML(product) {
    const seller = Data.getSeller(product.vendeur_id);
    const trust = seller ? Utils.trustLabel(seller.trust_level) : '';
    const stock = Data.getEffectiveStock(product);
    const outOfStock = stock <= 0;
    const lowStock = stock > 0 && stock <= 5;
    const stockBadge = outOfStock
      ? '<span class="badge badge-error">Rupture</span>'
      : (lowStock ? '<span class="badge badge-warning">Stock limite</span>' : '');

    const photoHTML = ProductImage.getHTML(product, { class: 'product-card-img' });

    return `
      <article class="card product-card" data-product-id="${product.id}">
        <a href="produit-detail.html?id=${product.id}" class="product-card-link">
          <div class="product-card-image">
            ${photoHTML}
            ${stockBadge ? `<div class="product-card-stock">${stockBadge}</div>` : ''}
          </div>
          <div class="product-card-body">
            <div class="product-card-badges">
              <span class="badge badge-category">${Utils.escapeHtml(product.categorie)}</span>
              ${product.made_in_bf ? '<span class="badge badge-made-in-bf">Made in BF</span>' : ''}
            </div>
            <h3 class="product-card-title">${Utils.escapeHtml(product.nom)}</h3>
            <p class="product-card-desc">${Utils.escapeHtml(Utils.truncate(product.description_courte || product.description, 80))}</p>
            <div class="product-card-price">
              <span class="price">${Utils.formatPrice(product.prix)}</span>
              <span class="text-caption">/ ${Utils.escapeHtml(product.unite_prix)}</span>
            </div>
            ${seller ? `
              <div class="product-card-seller">
                <span class="text-caption">par ${Utils.escapeHtml(seller.nom)}</span>
                ${seller.trust_level ? UI.trustBadgeHTML(seller.trust_level, seller.ventes_count) : ''}
              </div>
            ` : ''}
            ${UI.starsHTML(product.average_rating)} <span class="text-caption">(${product.reviews_count})</span>
          </div>
        </a>
        <div class="product-card-actions">
          <button class="btn btn-primary btn-sm btn-block add-to-cart-btn"
                  data-product-id="${product.id}"
                  ${outOfStock ? 'disabled' : ''}>
            ${outOfStock ? 'Indisponible' : 'Ajouter au panier'}
          </button>
        </div>
      </article>
    `;
  },

  /* === Injection header/footer sur chaque page === */
  injectLayout(activePage = '') {
    UI._injectHeader(activePage);
    UI._injectFooter();
    UI._initLayoutHandlers();
  },

  _injectHeader(activePage) {
    const existing = document.querySelector('[data-site-header]');
    if (existing) return;

    const session = Auth.current();
    const cart = Storage.getCart();
    const cartCount = cart.items.reduce((sum, it) => sum + it.quantity, 0);

    const navItems = [
      { page: 'accueil',   label: 'Accueil',     href: 'index.html',         icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { page: 'produits',  label: 'Produits',    href: 'produits.html',      icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
      { page: 'panier',    label: 'Panier',      href: 'panier.html',        icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', badge: 'cart' }
    ];

    const navHTML = navItems.map(n => {
      const active = activePage === n.page ? 'active' : '';
      const badgeStyle = cartCount > 0 ? '' : 'style="display:none"';
      const badge = n.badge === 'cart'
        ? `<span class="cart-count-badge" ${badgeStyle}>${cartCount}</span>`
        : '';
      return `<a href="${n.href}" class="nav-link ${active}">
        <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${n.icon}"/></svg>
        <span>${n.label}</span>
        ${badge}
      </a>`;
    }).join('');

    const authBtn = session
      ? `<div class="header-user">
          <a href="${session.user_type === 'vendeur' ? 'dashboard-vendeur.html' : (session.user_type === 'revendeur' ? 'revendeur.html' : 'dashboard-acheteur.html')}" class="nav-link">
            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <span>${Utils.escapeHtml(Utils.truncate(session.user_name, 18))}</span>
          </a>
          <button id="logout-btn" class="btn-icon" title="Se deconnecter" aria-label="Se deconnecter">
            <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
          </button>
        </div>`
      : `<a href="connexion.html" class="btn btn-primary btn-sm">
          <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
          Connexion
        </a>`;

    const theme = Storage.getTheme();
    const themeIcon = theme === 'dark'
      ? '<svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';

    const headerHTML = `
      <div class="motif-strip" aria-hidden="true"></div>
      <header class="site-header" data-site-header role="banner">
        <div class="container header-inner">
          <a href="index.html" class="logo" aria-label="Achetons Burkinabe - Accueil">
            <span class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21h18M3 7l9-4 9 4M5 21V11M9 21V11M15 21V11M19 21V11M3 11h18"/>
              </svg>
            </span>
            <span>Achetons Burkinabe</span>
          </a>
          <nav class="nav-links" role="navigation" aria-label="Navigation principale">
            ${navHTML}
          </nav>
          <div class="header-actions">
            <div class="header-search desktop-only">
              <form action="produits.html" method="GET" class="search-bar" role="search">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" name="q" class="form-input" placeholder="Rechercher un produit..." aria-label="Rechercher">
              </form>
            </div>
            <button id="theme-toggle" class="btn-icon" title="Changer de theme" aria-label="Basculer mode sombre/clair">
              ${themeIcon}
            </button>
            ${authBtn}
            <button class="btn-icon mobile-only" id="mobile-menu-btn" aria-label="Ouvrir le menu">
              <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
      </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
  },

  _injectFooter() {
    const existing = document.querySelector('[data-site-footer]');
    if (existing) return;

    const year = new Date().getFullYear();
    const footerHTML = `
      <footer class="site-footer" data-site-footer role="contentinfo">
        <div class="container footer-inner">
          <div class="footer-col">
            <a href="index.html" class="logo">
              <span class="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 21h18M3 7l9-4 9 4M5 21V11M9 21V11M15 21V11M19 21V11M3 11h18"/>
                </svg>
              </span>
              <span>Achetons Burkinabe</span>
            </a>
            <p class="text-sm text-doux">La vitrine du Made in Burkina Faso. Karite, sesame, miel, coton et artisanat, directement des producteurs.</p>
          </div>
          <div class="footer-col">
            <h4 class="footer-title">Navigation</h4>
            <ul>
              <li><a href="index.html">Accueil</a></li>
              <li><a href="produits.html">Produits</a></li>
              <li><a href="revendeur.html">Revendeurs</a></li>
              <li><a href="a-propos.html">A propos</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-title">Compte</h4>
            <ul>
              <li><a href="connexion.html">Connexion</a></li>
              <li><a href="dashboard-acheteur.html">Mon profil</a></li>
              <li><a href="historique.html">Mes achats</a></li>
              <li><a href="notifications.html">Notifications</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4 class="footer-title">Confiance</h4>
            <ul>
              <li><span class="badge badge-biospg">BioSPG</span></li>
              <li><span class="badge badge-abnorm">ABNORM</span></li>
              <li><span class="badge badge-made-in-bf">Made in BF</span></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <p class="text-caption">© ${year} Achetons Burkinabe · Projet etudiant · Burkina Institute of Technology</p>
          </div>
        </div>
      </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  },

  _initLayoutHandlers() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = Storage.getTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        Storage.setTheme(next);
        UI.applyTheme(next);
        UI._injectHeader_refresh();
      });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        UI.confirm('Voulez-vous vous deconnecter ?', () => {
          Auth.logout();
          window.location.href = 'index.html';
        }, { confirmText: 'Se deconnecter', danger: true });
      });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        const nav = document.querySelector('.nav-links');
        if (nav) nav.classList.toggle('mobile-open');
      });
    }

    // Add-to-cart delegation (global)
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.add-to-cart-btn');
      if (!btn) return;
      e.preventDefault();
      const productId = btn.dataset.productId;
      if (productId) {
        Cart.addItem(productId, 1);
      }
    });
  },

  _injectHeader_refresh() {
    // Refresh theme icon without full re-render
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      const theme = Storage.getTheme();
      const themeIcon = theme === 'dark'
        ? '<svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
        : '<svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
      toggle.innerHTML = themeIcon;
    }

    // Refresh auth button (login / logout / avatar) sans re-injection complete
    const headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;
    const session = Auth.current();
    // Localise le conteneur auth (soit .header-user, soit le bouton connexion direct)
    const existingUser = headerActions.querySelector('.header-user');
    const existingLoginBtn = headerActions.querySelector('a.btn[href="connexion.html"]');

    if (session) {
      const dashboardHref = session.user_type === 'vendeur'
        ? 'dashboard-vendeur.html'
        : (session.user_type === 'revendeur' ? 'revendeur.html' : 'dashboard-acheteur.html');
      const newAuthHTML = '<div class="header-user">' +
        '<a href="' + dashboardHref + '" class="nav-link">' +
          '<svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>' +
          '<span>' + Utils.escapeHtml(Utils.truncate(session.user_name, 18)) + '</span>' +
        '</a>' +
        '<button id="logout-btn" class="btn-icon" title="Se deconnecter" aria-label="Se deconnecter">' +
          '<svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M10 17l5-5-5-5M15 12H3"/></svg>' +
        '</button>' +
      '</div>';
      if (existingUser) {
        existingUser.outerHTML = newAuthHTML;
      } else if (existingLoginBtn) {
        existingLoginBtn.outerHTML = newAuthHTML;
      }
    } else {
      const loginHTML = '<a href="connexion.html" class="btn btn-primary btn-sm">' +
        '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>' +
        'Connexion</a>';
      if (existingUser) {
        existingUser.outerHTML = loginHTML;
      } else if (existingLoginBtn) {
        existingLoginBtn.outerHTML = loginHTML;
      }
    }

    // Re-init logout handler (le bouton a ete remplace)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        UI.confirm('Voulez-vous vous deconnecter ?', () => {
          Auth.logout();
          window.location.href = 'index.html';
        }, { confirmText: 'Se deconnecter', danger: true });
      };
    }
  },

  /* ================================================================ */
  /*  Helpers L5-L6 : stat cards modernes + activity feed              */
  /* ================================================================ */

  /* Stat card moderne - renvoie une string HTML
   * opts: { label, value, icon (svg string), trend ('up'|'down'|'neutral'),
   *         trendValue (string affichable), tone ('success'|'warning'|'error'|'info'|'') }
   */
  renderStatCard(opts) {
    opts = opts || {};
    const trend = opts.trend || 'neutral';
    const trendClass = 'stat-trend-' + trend;
    const trendIcon = trend === 'up'
      ? '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>'
      : trend === 'down'
        ? '<svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'
        : '';
    return '<div class="stat-card-modern">' +
      (opts.icon ? '<div class="stat-icon">' + opts.icon + '</div>' : '') +
      (opts.trendValue ? '<div class="stat-trend ' + trendClass + '">' + trendIcon + Utils.escapeHtml(opts.trendValue) + '</div>' : '') +
      '<div class="stat-value">' + Utils.escapeHtml(String(opts.value || '0')) + '</div>' +
      '<div class="stat-label">' + Utils.escapeHtml(opts.label || '') + '</div>' +
    '</div>';
  },

  /* Activity feed - renvoie une string HTML
   * activities: [{ type, detail, date }]
   * Map les types vers des classes d'icones CSS (.activity-icon-<type>)
   */
  renderActivityFeed(activities) {
    if (!activities || !activities.length) {
      return '<p class="text-doux text-center" style="padding:24px;">Aucune activite recente.</p>';
    }
    const items = activities.slice(0, 10).map(a => {
      const type = a.type || 'notification';
      // Mappe les types metier vers les classes d'icones definies dans design-system.css
      let iconClass = 'activity-icon-notification';
      let iconSymbol = 'i';
      if (/commande/.test(type)) { iconClass = 'activity-icon-commande'; iconSymbol = 'C'; }
      else if (/panier/.test(type)) { iconClass = 'activity-icon-panier'; iconSymbol = 'P'; }
      else if (/recherche/.test(type)) { iconClass = 'activity-icon-recherche'; iconSymbol = 'R'; }
      else if (/connexion|login/.test(type)) { iconClass = 'activity-icon-connexion'; iconSymbol = 'L'; }
      else if (/trust|vente/.test(type)) { iconClass = 'activity-icon-trust'; iconSymbol = 'T'; }
      let timeLabel = a.date || a.created_at || '';
      try {
        const d = new Date(timeLabel);
        if (!isNaN(d.getTime())) {
          const diff = (Date.now() - d.getTime()) / 1000;
          if (diff < 60) timeLabel = 'A l\'instant';
          else if (diff < 3600) timeLabel = Math.floor(diff / 60) + ' min';
          else if (diff < 86400) timeLabel = Math.floor(diff / 3600) + ' h';
          else if (diff < 604800) timeLabel = Math.floor(diff / 86400) + ' j';
          else timeLabel = Utils.formatDateShort(d.toISOString());
        }
      } catch (e) {}
      return '<li class="activity-item">' +
        '<div class="activity-icon ' + iconClass + '">' + iconSymbol + '</div>' +
        '<div class="activity-content">' +
          '<div class="activity-detail">' + Utils.escapeHtml(a.detail || '') + '</div>' +
          '<div class="activity-time">' + Utils.escapeHtml(String(timeLabel)) + '</div>' +
        '</div>' +
      '</li>';
    }).join('');
    return '<ul class="activity-feed">' + items + '</ul>';
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  },

  /* Update cart count badge dans header */
  updateCartCount() {
    const cart = Storage.getCart();
    const count = cart.items.reduce((sum, it) => sum + it.quantity, 0);
    document.querySelectorAll('.cart-count-badge').forEach(el => {
      if (count > 0) {
        el.textContent = count;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  },

  /* Update notifications badge */
  updateNotifBadge() {
    const session = Auth.current();
    if (!session) return;
    const notifs = Storage.getNotifications(session.user_id);
    const unread = notifs.filter(n => !n.read).length;
    document.querySelectorAll('.notif-count-badge').forEach(el => {
      if (unread > 0) {
        el.textContent = unread;
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  }
};

window.UI = UI;

/* js/products.js - Rendu liste produits + page detail */

const ProductsView = {
  /* Affiche la liste des produits dans un container */
  renderGrid(container, products) {
    if (!container) return;
    const safeProducts = Array.isArray(products) ? products : [];
    if (!safeProducts.length) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <h3>Aucun produit ne correspond</h3>
          <p>Essayez un autre terme de recherche, changez les filtres, ou consultez toutes les categories.</p>
        </div>
      `;
      return;
    }
    container.innerHTML = safeProducts.map(p => UI.productCardHTML(p)).join('');
  },

  /* Construit les filtres categories */
  renderCategoryFilters(container, active) {
    if (!container) return;
    const cats = [{ nom: 'toutes', description: 'Toutes les categories' }, ...Data.categories.map(c => ({ nom: c.nom, description: c.description }))];
    container.innerHTML = cats.map(c => `
      <button class="filter-chip ${active === c.nom ? 'active' : ''}" data-category="${Utils.escapeHtml(c.nom)}">
        ${Utils.escapeHtml(c.nom)}
      </button>
    `).join('');
  }
};

const ProductDetail = {
  /* Rendu page detail produit */
  async render(container, productId) {
    if (!container) return;
    const product = Data.getProduct(productId);
    if (!product) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>Produit introuvable</h3>
          <p>Ce produit n'existe pas ou a ete retire.</p>
          <a href="produits.html" class="btn btn-primary">Voir tous les produits</a>
        </div>
      `;
      return;
    }

    const seller = Data.getSeller(product.vendeur_id);
    const stock = Data.getEffectiveStock(product);
    const outOfStock = stock <= 0;
    const lowStock = stock > 0 && stock <= 5;
    const trustBadge = seller ? UI.trustBadgeHTML(seller.trust_level, seller.ventes_count) : '';
    const certBadges = UI.certBadgesHTML(product.certification);
    const reviews = Storage.getReviews(product.id);
    const avgRating = reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
      : product.average_rating;

    container.innerHTML = `
      <div class="container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <a href="index.html">Accueil</a> <span aria-hidden="true">›</span>
          <a href="produits.html">Produits</a> <span aria-hidden="true">›</span>
          <a href="produits.html?category=${encodeURIComponent(product.categorie)}">${Utils.escapeHtml(product.categorie)}</a> <span aria-hidden="true">›</span>
          <span aria-current="page">${Utils.escapeHtml(product.nom)}</span>
        </nav>

        <div class="product-detail-grid two-column-60-40">
          <div class="product-detail-left">
            <div class="product-detail-image">
              ${ProductImage.getHTML(product, { class: 'product-detail-img' })}
            </div>
            <div class="product-detail-thumbs">
              ${ProductImage.getThumbnailsHTML(product)}
            </div>
          </div>

          <div class="product-detail-right">
            <div class="product-detail-badges">
              <span class="badge badge-category">${Utils.escapeHtml(product.categorie)}</span>
              ${certBadges}
              ${product.made_in_bf ? '<span class="badge badge-made-in-bf">Made in BF</span>' : ''}
            </div>

            <h1>${Utils.escapeHtml(product.nom)}</h1>

            <div class="product-detail-rating">
              ${UI.starsHTML(avgRating)} <span class="text-caption">(${reviews.length || product.reviews_count} avis)</span>
            </div>

            <div class="product-detail-price">
              <span class="price-large">${Utils.formatPrice(product.prix)}</span>
              <span class="text-caption">/ ${Utils.escapeHtml(product.unite_prix)} · ${Utils.escapeHtml(product.poids_unitaire || '')}</span>
            </div>

            <p class="product-detail-desc">${Utils.escapeHtml(product.description)}</p>

            ${seller ? `
              <div class="seller-mini-card card">
                <div class="seller-mini-info">
                  <h4>${Utils.escapeHtml(seller.nom)}</h4>
                  <p class="text-caption">
                    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${Utils.escapeHtml(seller.ville)}, ${Utils.escapeHtml(seller.region)}
                  </p>
                  <div class="seller-mini-trust">${trustBadge}</div>
                </div>
                <div class="seller-mini-actions">
                  <a href="boutique-vendeur.html?id=${seller.id}" class="btn btn-ghost btn-sm">Voir boutique</a>
                  <a href="contact-vendeur.html?seller_id=${seller.id}&product_id=${product.id}" class="btn btn-secondary btn-sm">Contacter</a>
                </div>
              </div>
            ` : ''}

            <div class="product-detail-cart card">
              <div class="cart-form-row">
                <label for="qty-input" class="form-label">Quantite</label>
                <div class="stepper">
                  <button type="button" data-action="dec" aria-label="Diminuer">−</button>
                  <input type="number" id="qty-input" value="1" min="1" max="${stock}" ${outOfStock ? 'disabled' : ''}>
                  <button type="button" data-action="inc" aria-label="Augmenter">+</button>
                </div>
              </div>
              <div class="cart-form-info">
                ${outOfStock
                  ? '<span class="badge badge-error">Rupture de stock</span>'
                  : (lowStock ? `<span class="badge badge-warning">Stock limite: ${stock} ${Utils.escapeHtml(product.unite_quantite)}</span>` : `<span class="badge badge-success">En stock: ${stock} ${Utils.escapeHtml(product.unite_quantite)}</span>`)}
              </div>
              <button id="add-to-cart-detail" class="btn btn-primary btn-lg btn-block" ${outOfStock ? 'disabled' : ''}>
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>

        <section class="section">
          <h2>Tracabilite du produit</h2>
          <p class="eyebrow">Origine et certification</p>
          ${Traceability.renderHTML(product)}
        </section>

        <section class="section">
          <h2>Avis des acheteurs</h2>
          <div id="reviews-section">
            ${ProductDetail.renderReviews(reviews, avgRating)}
          </div>
        </section>

        <section class="section">
          <div class="section-header">
            <h2>Produits similaires</h2>
            <a href="produits.html?category=${encodeURIComponent(product.categorie)}" class="btn btn-ghost btn-sm">Voir tout</a>
          </div>
          <div class="products-grid" id="related-grid"></div>
        </section>
      </div>
    `;

    // Wire stepper
    const qtyInput = container.querySelector('#qty-input');
    container.querySelectorAll('.stepper button').forEach(btn => {
      btn.addEventListener('click', () => {
        const cur = parseInt(qtyInput.value, 10) || 1;
        const max = parseInt(qtyInput.max, 10) || 999;
        if (btn.dataset.action === 'inc' && cur < max) qtyInput.value = cur + 1;
        if (btn.dataset.action === 'dec' && cur > 1) qtyInput.value = cur - 1;
      });
    });

    container.querySelector('#add-to-cart-detail').addEventListener('click', () => {
      const qty = parseInt(qtyInput.value, 10) || 1;
      Cart.addItem(product.id, qty);
    });

    // Render related
    const related = Data.getRelated(product, 4);
    if (related.length) {
      const grid = container.querySelector('#related-grid');
      ProductsView.renderGrid(grid, related);
    }

    // Review form
    ProductDetail._wireReviewForm(container, product);
  },

  renderReviews(reviews, avgRating) {
    const session = Auth.current();
    const canReview = session && session.user_type === 'acheteur';

    const reviewsHTML = reviews.length
      ? reviews.map(r => `
        <div class="review-item card">
          <div class="review-header">
            <strong>${Utils.escapeHtml(r.author || 'Acheteur')}</strong>
            <span class="text-caption">${Utils.formatDate(r.created_at)}</span>
          </div>
          ${UI.starsHTML(r.rating)}
          <p>${Utils.escapeHtml(r.comment)}</p>
        </div>
      `).join('')
      : '<p class="text-doux">Aucun avis pour le moment. Soyez le premier a donner votre avis.</p>';

    return `
      <div class="reviews-summary card">
        <div class="reviews-avg">
          <span class="price-large">${avgRating.toFixed(1)}</span>
          ${UI.starsHTML(avgRating)}
          <span class="text-caption">Basé sur ${reviews.length} avis</span>
        </div>
        ${canReview ? `
          <button id="leave-review-btn" class="btn btn-secondary">
            <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Laisser un avis
          </button>
        ` : (session ? '' : '<a href="connexion.html" class="btn btn-ghost btn-sm">Connectez-vous pour laisser un avis</a>')}
      </div>
      <div class="reviews-list">${reviewsHTML}</div>
    `;
  },

  _wireReviewForm(container, product) {
    const btn = container.querySelector('#leave-review-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const formHTML = `
        <form id="review-form">
          <div class="form-group">
            <label class="form-label">Note</label>
            <div class="rating-input" id="rating-input">
              ${[5,4,3,2,1].map(n => `<button type="button" class="rating-star" data-value="${n}" aria-label="${n} etoile${n>1?'s':''}"><svg class="icon-lg" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></button>`).join('')}
            </div>
            <input type="hidden" id="rating-value" name="rating" value="0">
          </div>
          <div class="form-group">
            <label for="review-comment" class="form-label">Votre avis</label>
            <textarea id="review-comment" class="form-textarea" placeholder="Partagez votre experience avec ce produit" required minlength="10"></textarea>
          </div>
        </form>
      `;

      UI.modal({
        title: 'Laisser un avis',
        body: formHTML,
        actions: [
          { text: 'Annuler', style: 'btn-ghost', close: true },
          {
            text: 'Publier',
            style: 'btn-primary',
            onClick: (content) => {
              const rating = parseInt(content.querySelector('#rating-value').value, 10);
              const comment = content.querySelector('#review-comment').value.trim();
              if (!rating || rating < 1 || rating > 5) {
                UI.toast('Choisissez une note entre 1 et 5', 'warning');
                return false;
              }
              if (comment.length < 10) {
                UI.toast('Commentaire trop court (10 caracteres min)', 'warning');
                return false;
              }
              const session = Auth.current();
              Storage.addReview(product.id, {
                author: session.user_name,
                rating,
                comment
              });
              UI.toast('Avis publie, merci !', 'success');
              const reviews = Storage.getReviews(product.id);
              const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
              container.querySelector('#reviews-section').innerHTML = ProductDetail.renderReviews(reviews, avg);
              ProductDetail._wireReviewForm(container, product);
            }
          }
        ]
      });

      // Wire rating stars
      const stars = document.querySelectorAll('#rating-input .rating-star');
      const ratingInput = document.getElementById('rating-value');
      stars.forEach(s => {
        s.addEventListener('click', () => {
          const val = parseInt(s.dataset.value, 10);
          ratingInput.value = val;
          stars.forEach(s2 => {
            const v2 = parseInt(s2.dataset.value, 10);
            s2.classList.toggle('active', v2 <= val);
          });
        });
      });
    });
  }
};

/* Gestion images produits : SVG inline selon categorie + placeholder */
const ProductImage = {
  getHTML(product, opts = {}) {
    const cls = opts.class || '';
    const alt = Utils.escapeHtml(product.description_courte || product.nom);
    const svg = ProductImage._svgForCategory(product.categorie);
    return `<div class="${cls}" role="img" aria-label="${alt}">${svg}</div>`;
  },

  getThumbnailsHTML(product) {
    // Pour la demo on affiche juste l'icone de categorie
    return `<div class="thumb-strip">${ProductImage._svgForCategory(product.categorie, 'sm')}</div>`;
  },

  _svgForCategory(category, size = 'lg') {
    const sizeClass = size === 'sm' ? 'icon' : 'product-image-svg';
    const cats = {
      // Pot de karite avec couvercle + étiquette
      Karite: `<svg class="${sizeClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="8" fill="#F4E4C1"/>
        <rect x="28" y="30" width="44" height="6" rx="2" fill="#7A3B14"/>
        <path d="M 30 36 L 32 78 Q 32 82 36 82 L 64 82 Q 68 82 68 78 L 70 36 Z" fill="#E8A13A" stroke="#7A3B14" stroke-width="2"/>
        <rect x="36" y="50" width="28" height="20" rx="2" fill="#FFF8E8" stroke="#7A3B14" stroke-width="1.5"/>
        <text x="50" y="58" text-anchor="middle" font-family="Georgia" font-size="7" font-weight="bold" fill="#7A3B14">KARITE</text>
        <line x1="40" y1="62" x2="60" y2="62" stroke="#A8531F" stroke-width="0.8"/>
        <line x1="40" y1="65" x2="60" y2="65" stroke="#A8531F" stroke-width="0.8"/>
        <line x1="40" y1="68" x2="56" y2="68" stroke="#A8531F" stroke-width="0.8"/>
      </svg>`,
      // Tas de graines de sesame dans un bol
      Sesame: `<svg class="${sizeClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="8" fill="#FFF8E1"/>
        <path d="M 22 55 Q 22 78 50 78 Q 78 78 78 55 Z" fill="#A8531F" stroke="#7A3B14" stroke-width="2"/>
        <ellipse cx="50" cy="55" rx="28" ry="6" fill="#7A3B14"/>
        ${Array.from({length: 24}, (_, i) => {
          const angle = (i / 24) * Math.PI;
          const r = 8 + (i % 4) * 4;
          const x = 50 + Math.cos(angle) * r;
          const y = 50 - Math.sin(angle) * r * 0.7;
          return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2.2" ry="1.3" fill="#ECCF8A" stroke="#A8531F" stroke-width="0.5"/>`;
        }).join('')}
      </svg>`,
      // Pot de miel avec cuillère
      Miel: `<svg class="${sizeClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="8" fill="#FFF3D6"/>
        <rect x="34" y="28" width="32" height="5" rx="2" fill="#7A3B14"/>
        <path d="M 32 33 L 32 80 Q 32 84 36 84 L 64 84 Q 68 84 68 80 L 68 33 Z" fill="#E8A13A" stroke="#7A3B14" stroke-width="2"/>
        <rect x="36" y="48" width="28" height="30" fill="#F4C877"/>
        <text x="50" y="58" text-anchor="middle" font-family="Georgia" font-size="7" font-weight="bold" fill="#7A3B14">MIEL</text>
        <text x="50" y="68" text-anchor="middle" font-family="Georgia" font-size="5" fill="#7A3B14">PUR</text>
        <line x1="40" y1="73" x2="60" y2="73" stroke="#A8531F" stroke-width="0.8"/>
        <path d="M 70 35 L 78 25 L 80 27 L 72 37" fill="#CD7F32" stroke="#7A3B14" stroke-width="1.2"/>
        <circle cx="76" cy="30" r="1.5" fill="#E8A13A"/>
      </svg>`,
      // Pagne/tissu de coton plié
      Coton: `<svg class="${sizeClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="8" fill="#FAF6EE"/>
        <rect x="22" y="32" width="56" height="44" fill="#A8531F" stroke="#7A3B14" stroke-width="2"/>
        <rect x="22" y="32" width="56" height="8" fill="#7A3B14"/>
        ${Array.from({length: 4}, (_, i) =>
          `<line x1="22" y1="${44 + i*8}" x2="78" y2="${44 + i*8}" stroke="#E8A13A" stroke-width="1"/>`
        ).join('')}
        ${Array.from({length: 5}, (_, i) =>
          `<line x1="${28 + i*12}" y1="32" x2="${28 + i*12}" y2="76" stroke="#E8A13A" stroke-width="1"/>`
        ).join('')}
        <circle cx="34" cy="50" r="2.5" fill="#F4C877"/>
        <circle cx="58" cy="58" r="2.5" fill="#F4C877"/>
        <circle cx="46" cy="68" r="2.5" fill="#F4C877"/>
        <circle cx="70" cy="48" r="2.5" fill="#F4C877"/>
      </svg>`,
      // Masque d'artisanat africain - forme stylisée, pas de visage
      Artisanat: `<svg class="${sizeClass}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="8" fill="#F1E6D0"/>
        <path d="M 50 18 Q 26 22 26 52 Q 26 80 50 84 Q 74 80 74 52 Q 74 22 50 18 Z" fill="#A8531F" stroke="#7A3B14" stroke-width="2"/>
        <path d="M 50 26 Q 34 30 34 52 Q 34 72 50 76 Q 66 72 66 52 Q 66 30 50 26 Z" fill="#E8A13A" stroke="#7A3B14" stroke-width="1.5"/>
        <polygon points="50,38 56,48 50,58 44,48" fill="#7A3B14"/>
        <line x1="50" y1="38" x2="50" y2="58" stroke="#F4C877" stroke-width="1"/>
        <circle cx="50" cy="68" r="3" fill="#7A3B14"/>
        <line x1="50" y1="71" x2="50" y2="78" stroke="#7A3B14" stroke-width="1.5"/>
        ${Array.from({length: 6}, (_, i) =>
          `<line x1="${30 + i*8}" y1="22" x2="${30 + i*8}" y2="12" stroke="#7A3B14" stroke-width="1.5"/>`
        ).join('')}
        <circle cx="30" cy="14" r="2" fill="#E8A13A"/>
        <circle cx="70" cy="14" r="2" fill="#E8A13A"/>
      </svg>`
    };
    return cats[category] || cats.Artisanat;
  }
};

window.ProductsView = ProductsView;
window.ProductDetail = ProductDetail;
window.ProductImage = ProductImage;

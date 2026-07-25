/* js/seller.js - Gestion boutique vendeur, profil, produits */

const Seller = {
  /* Recupere tous les vendeurs */
  all() {
    return Data.sellers;
  },

  /* Recupere un vendeur */
  get(sellerId) {
    return Data.getSeller(sellerId);
  },

  /* Rendu page boutique vendeur */
  renderBoutique(container, sellerId) {
    const seller = Data.getSeller(sellerId);
    if (!seller) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>Vendeur introuvable</h3>
          <a href="produits.html" class="btn btn-primary">Voir les produits</a>
        </div>
      `;
      return;
    }

    const products = Data.getProductsBySeller(sellerId);
    const trustBadge = UI.trustBadgeHTML(seller.trust_level, seller.ventes_count);

    container.innerHTML = `
      <div class="container">
        <nav class="breadcrumb">
          <a href="index.html">Accueil</a> <span>›</span>
          <a href="produits.html">Produits</a> <span>›</span>
          <span>${Utils.escapeHtml(seller.nom)}</span>
        </nav>

        <div class="boutique-header card">
          <div class="boutique-avatar">
            <svg class="icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 7l9-4 9 4M5 21V11M9 21V11M15 21V11M19 21V11M3 11h18"/></svg>
          </div>
          <div class="boutique-info">
            <h1>${Utils.escapeHtml(seller.nom)}</h1>
            <p class="text-doux">${Utils.escapeHtml(seller.description)}</p>
            <div class="boutique-meta">
              <span class="text-caption">
                <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${Utils.escapeHtml(seller.ville)}, ${Utils.escapeHtml(seller.region)}
              </span>
              ${trustBadge}
              <span class="badge badge-neutral">${products.length} produit${products.length > 1 ? 's' : ''}</span>
            </div>
          </div>
          <div class="boutique-actions">
            <a href="contact-vendeur.html?seller_id=${seller.id}" class="btn btn-primary">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              Contacter
            </a>
          </div>
        </div>

        <section class="section">
          <h2>Produits de ${Utils.escapeHtml(seller.nom)}</h2>
          <div class="products-grid" id="boutique-products"></div>
        </section>
      </div>
    `;

    const grid = container.querySelector('#boutique-products');
    ProductsView.renderGrid(grid, products);
  }
};

window.Seller = Seller;

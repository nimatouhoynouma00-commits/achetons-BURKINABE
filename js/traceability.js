/* js/traceability.js - Tracabilite produits : origine, processus, certification */

const Traceability = {
  renderHTML(product) {
    const seller = Data.getSeller(product.vendeur_id);
    const certs = (product.certification || []).map(c => {
      const cert = Data.getCertification(c);
      return cert ? `
        <div class="trace-cert-item">
          <span class="badge ${Traceability._certBadgeClass(c)}">${cert.label}</span>
          <div>
            <strong>${cert.label}</strong>
            <p class="text-caption">${Utils.escapeHtml(cert.organisme)}</p>
          </div>
        </div>
      ` : '';
    }).join('');

    const expiryDays = Utils.daysUntil(product.date_peremption);
    let expiryBadge = '<span class="badge badge-success">Pas de peremption</span>';
    if (product.date_peremption && expiryDays !== null) {
      if (expiryDays < 0) expiryBadge = '<span class="badge badge-error">Perime</span>';
      else if (expiryDays < 7) expiryBadge = `<span class="badge badge-error">Peremption dans ${expiryDays} jours</span>`;
      else if (expiryDays < 30) expiryBadge = `<span class="badge badge-warning">Peremption dans ${expiryDays} jours</span>`;
      else expiryBadge = `<span class="badge badge-success">Peremption dans ${expiryDays} jours</span>`;
    }

    return `
      <div class="traceability-grid">
        <div class="card trace-card">
          <div class="trace-icon">
            <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h4>Origine geographique</h4>
          <ul class="trace-list">
            <li><strong>Region:</strong> ${Utils.escapeHtml(product.region)}</li>
            <li><strong>Ville:</strong> ${Utils.escapeHtml(product.ville)}</li>
            <li><strong>Cooperative:</strong> ${Utils.escapeHtml(product.origine_cooperative)}</li>
            ${seller ? `<li><strong>Vendeur:</strong> ${Utils.escapeHtml(seller.nom)}</li>` : ''}
          </ul>
        </div>

        <div class="card trace-card">
          <div class="trace-icon">
            <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20M4 22V8l8-6 8 6v14M9 22v-6h6v6"/></svg>
          </div>
          <h4>Processus de fabrication</h4>
          <p class="text-sm">${Utils.escapeHtml(product.processus_fabrication)}</p>
        </div>

        <div class="card trace-card">
          <div class="trace-icon">
            <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>
          </div>
          <h4>Certification</h4>
          ${certs || '<p class="text-doux text-sm">Aucune certification officielle</p>'}
        </div>

        <div class="card trace-card">
          <div class="trace-icon">
            <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <h4>Dates</h4>
          <ul class="trace-list">
            <li><strong>Production:</strong> ${Utils.formatDate(product.date_production)}</li>
            <li><strong>Peremption:</strong> ${product.date_peremption ? Utils.formatDate(product.date_peremption) : 'Non applicable'}</li>
            <li>${expiryBadge}</li>
          </ul>
        </div>

        <div class="card trace-card">
          <div class="trace-icon">
            <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22h20M6 18V8l6-4 6 4v10M6 14h12M10 18v-4h4v4"/></svg>
          </div>
          <h4>Conditions de stockage</h4>
          <p class="text-sm">${Utils.escapeHtml(product.conditions_stockage)}</p>
        </div>

        <div class="card trace-card">
          <div class="trace-icon">
            <svg class="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.91 8.84L8.56 21.18a4.25 4.25 0 01-6-6L14.91 3.16M16 8l4 4M4 16l4 4"/></svg>
          </div>
          <h4>Poids et unite</h4>
          <ul class="trace-list">
            <li><strong>Poids:</strong> ${Utils.escapeHtml(product.poids_unitaire || 'N/A')}</li>
            <li><strong>Unite:</strong> ${Utils.escapeHtml(product.unite_quantite)}</li>
            <li><strong>Prix unite:</strong> ${Utils.escapeHtml(product.unite_prix)}</li>
          </ul>
        </div>
      </div>
    `;
  },

  _certBadgeClass(certName) {
    return ({
      BioSPG: 'badge-biospg',
      ABNORM: 'badge-abnorm',
      Made_in_BF: 'badge-made-in-bf'
    })[certName] || 'badge-neutral';
  }
};

window.Traceability = Traceability;

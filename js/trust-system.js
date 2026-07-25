/* js/trust-system.js - Systeme de confiance bronze/argent/or
 *
 * Les upgrades (incrementSales) sont maintenant persistes via
 * Storage.setSellerOverride(sellerId, { ventes_count, trust_level })
 * afin de survivre a un rechargement de page ou un logout/login.
 * Au chargement de Data, Data._applySellerOverrides() reapplique ces
 * overrides sur Data.sellers.
 */

const TrustSystem = {
  /* Determine le trust level d'un vendeur a partir de ses ventes */
  computeLevel(ventesCount) {
    return Utils.getTrustLevel(ventesCount);
  },

  /* Verifie si un vendeur a ete upgrade */
  checkUpgrade(seller) {
    const newLevel = TrustSystem.computeLevel(seller.ventes_count);
    if (newLevel !== seller.trust_level) {
      return { upgraded: true, from: seller.trust_level, to: newLevel };
    }
    return { upgraded: false };
  },

  /* Incremente les ventes d'un vendeur, notifie si upgrade, et persiste
   * les modifications via Storage.setSellerOverride. */
  incrementSales(sellerId, count = 1) {
    const seller = Data.getSeller(sellerId);
    if (!seller) return null;

    const before = seller.trust_level;
    const beforeCount = seller.ventes_count || 0;
    seller.ventes_count = beforeCount + count;
    seller.trust_level = TrustSystem.computeLevel(seller.ventes_count);

    // Persistance : ventes_count + trust_level
    try {
      Storage.setSellerOverride(sellerId, {
        ventes_count: seller.ventes_count,
        trust_level: seller.trust_level
      });
    } catch (e) {
      console.warn('[TrustSystem.incrementSales] persistance echouee pour', sellerId, e);
    }

    // Notification d'upgrade si niveau change
    if (seller.trust_level !== before) {
      try {
        Storage.addNotification(sellerId, {
          type: 'trust_upgrade',
          title: 'Niveau de confiance augmente !',
          message: `Vous etes passe au niveau ${Utils.trustLabel(seller.trust_level)}. Felicitations !`,
          link: 'dashboard-vendeur.html'
        });
      } catch (e) {
        console.warn('[TrustSystem.incrementSales] notif echouee pour', sellerId, e);
      }

      // Log activite chez le vendeur
      try {
        Storage.addActivity(sellerId, {
          date: new Date().toISOString(),
          type: 'confiance_upgrade',
          detail: 'Niveau de confiance atteint: ' + Utils.trustLabel(seller.trust_level) +
                  ' (' + seller.ventes_count + ' ventes)'
        });
      } catch (e) {}
    }

    // Log activite vente (systematique)
    try {
      Storage.addActivity(sellerId, {
        date: new Date().toISOString(),
        type: 'vente',
        detail: 'Vente enregistree (' + count + ' article(s)) - total ventes: ' + seller.ventes_count
      });
    } catch (e) {}

    return seller;
  },

  /* Rendu explicatif du systeme de trust */
  renderExplainer() {
    const levels = Data.trustBadges;
    return `
      <div class="trust-explainer">
        ${levels.map(l => `
          <div class="card trust-level-card trust-${l.level}">
            <div class="trust-level-badge">
              ${UI.trustBadgeHTML(l.level, null)}
            </div>
            <h4>${Utils.trustLabel(l.level)}</h4>
            <p class="text-caption">${l.threshold_ventes.min}-${l.threshold_ventes.max || '∞'} ventes · ${l.threshold_avis_positifs}</p>
            <p class="text-sm">${Utils.escapeHtml(l.description)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }
};

window.TrustSystem = TrustSystem;

/* js/checkout.js - Validation achat, generation recu, historique, notifications vendeurs
 *
 * Apres Checkout.process() :
 *  - le stock de chaque produit est decremente via Storage.decrementStock
 *  - chaque vendeur + l'acheteur sont notifies
 *  - une entree d'activite est loggee pour l'acheteur ET chaque vendeur
 *  - un recu intelligent avec QR-code visuel (placeholder SVG) est genere
 */

const Checkout = {
  /* Genere le recu, decremente le stock, notifie et log l'activite */
  async process(formData) {
    const session = Auth.current();
    if (!session) {
      return { success: false, error: 'Vous devez etre connecte' };
    }

    const cart = Cart.computeTotals();
    if (!cart.items.length) {
      return { success: false, error: 'Votre panier est vide' };
    }

    // Verifie disponibilite - si echec, notifie l'acheteur et retourne erreur
    const unavailable = Cart.checkAvailability();
    if (unavailable.length) {
      // Notifie l'acheteur des ruptures pour chaque item indisponible
      unavailable.forEach(u => {
        const product = Data.getProduct(u.product_id);
        Storage.addNotification(session.user_id, {
          type: 'stock_low',
          title: 'Produit indisponible',
          message: (product ? product.nom : u.product_id) + ' - ' + u.reason,
          link: 'panier.html',
          product_id: u.product_id
        });
      });
      const details = unavailable.map(u => {
        const p = Data.getProduct(u.product_id);
        return (p ? p.nom : u.product_id) + ' (' + u.reason + ')';
      }).join(', ');
      return {
        success: false,
        error: 'Certains produits ne sont plus disponibles: ' + details
      };
    }

    const orderId = Utils.generateOrderId();
    const order = {
      order_id: orderId,
      buyer_id: session.user_id,
      buyer_name: formData.buyer_name,
      buyer_phone: formData.buyer_phone,
      buyer_address: formData.buyer_address,
      buyer_city: formData.buyer_city,
      items: cart.items.map(it => ({
        product_id: it.product_id,
        nom: it.product.nom,
        quantity: it.quantity,
        unit_price: it.unit_price,
        line_total: it.line_total,
        seller_id: it.product.vendeur_id,
        seller_name: Data.getSeller(it.product.vendeur_id)?.nom || 'Vendeur',
        bulk: it.bulk || false,
        remise_pct: it.remise_pct || 0
      })),
      subtotal: cart.subtotal,
      remise_total: cart.remise_total,
      total: cart.total,
      order_date: new Date().toISOString(),
      status: 'en_cours',
      seller_ids: [...new Set(cart.items.map(it => it.product.vendeur_id))],
      payment_method: formData.payment_method || 'cash',
      payment_note: Data.cartRules.payment_note || 'Paiement direct avec le vendeur'
    };

    // Sauvegarde dans l'historique acheteur
    Storage.addOrder(session.user_id, order);

    // Notifie chaque vendeur, incremente ventes, et log l'activite
    order.seller_ids.forEach(sellerId => {
      // 1) Notification
      Storage.addNotification(sellerId, {
        type: 'order_received',
        title: 'Nouvelle commande recue',
        message: `Commande ${orderId} de ${formData.buyer_name}`,
        link: 'dashboard-vendeur.html',
        order_id: orderId
      });

      // 2) Incremente ventes (peut declencher trust upgrade, notif + persistance)
      TrustSystem.incrementSales(sellerId, 1);

      // 3) Activite cote vendeur
      const sellerItems = order.items.filter(it => it.seller_id === sellerId);
      const sellerTotal = sellerItems.reduce((s, it) => s + (it.line_total || 0), 0);
      Storage.addActivity(sellerId, {
        date: order.order_date,
        type: 'commande_recue',
        detail: 'Commande ' + orderId + ' recue de ' + formData.buyer_name +
                ' (' + sellerItems.length + ' article(s), ' + Utils.formatPrice(sellerTotal) + ')'
      });

      // 4) Decrement stock pour chaque produit de ce vendeur
      sellerItems.forEach(it => {
        const newStock = Storage.decrementStock(sellerId, it.product_id, it.quantity);
        // Notifie le vendeur si stock descend sous le seuil d'alerte
        // (type 'stock_low' attendu par notifications.js)
        const product = Data.getProduct(it.product_id);
        const threshold = (product && product.stock_alerte) ? product.stock_alerte : 5;
        if (newStock !== false && newStock !== null && newStock <= threshold) {
          Storage.addNotification(sellerId, {
            type: 'stock_low',
            title: 'Stock bas - ' + it.nom,
            message: 'Stock restant: ' + newStock + ' (seuil: ' + threshold + ')',
            link: 'dashboard-vendeur.html',
            product_id: it.product_id
          });
        }
      });
    });

    // Notifie l'acheteur
    Storage.addNotification(session.user_id, {
      type: 'order_received',
      title: 'Commande confirmee',
      message: `Votre commande ${orderId} a ete transmise aux vendeurs. Total: ${Utils.formatPrice(order.total)}`,
      link: 'historique.html',
      order_id: orderId
    });

    // Log activite cote acheteur
    Storage.addActivity(session.user_id, {
      date: order.order_date,
      type: 'commande',
      detail: 'Commande ' + orderId + ' (' + Utils.formatPrice(order.total) +
              ') - ' + order.items.length + ' article(s) aupres de ' +
              order.seller_ids.length + ' vendeur(s)'
    });
    // Paiement (placeholder)
    Storage.addActivity(session.user_id, {
      date: order.order_date,
      type: 'paiement',
      detail: 'Paiement a regler avec le vendeur - ' + Utils.formatPrice(order.total) +
              ' (' + (order.payment_note || 'mobile money / cash') + ')'
    });

    // Vide le panier
    Cart.clear();

    return { success: true, order };
  },

  /* Genere un QR-code visuel placeholder (SVG inline).
   * Ce n'est PAS un vrai QR-code scannable, juste un pattern visuel
   * determineiste derive de l'order_id pour le rendu du recu. */
  _renderQRPlaceholder(orderId, size = 96) {
    // Hash simple de l'order_id -> grille 12x12
    const grid = 12;
    const cells = [];
    let hash = 0;
    for (let i = 0; i < (orderId || '').length; i++) {
      hash = ((hash << 5) - hash) + orderId.charCodeAt(i);
      hash |= 0;
    }
    let bits = Math.abs(hash);
    const rects = [];
    const cellSize = size / grid;
    for (let y = 0; y < grid; y++) {
      for (let x = 0; x < grid; x++) {
        bits = (bits * 1103515245 + 12345) & 0x7fffffff;
        const on = ((bits >> 16) & 1) === 1;
        // Pattern symetrique pour un visuel plus "QR-like"
        const symX = x < grid / 2 ? x : grid - 1 - x;
        if (on) {
          rects.push('<rect x="' + (symX * cellSize).toFixed(2) +
                     '" y="' + (y * cellSize).toFixed(2) +
                     '" width="' + cellSize.toFixed(2) +
                     '" height="' + cellSize.toFixed(2) + '" fill="#1a1a1a"/>');
        }
      }
    }
    // Marqueurs de coin (facon QR-code finder pattern)
    const finderPattern = (cx, cy) =>
      '<rect x="' + cx + '" y="' + cy + '" width="' + (cellSize * 3) +
      '" height="' + (cellSize * 3) + '" fill="#1a1a1a"/>' +
      '<rect x="' + (cx + cellSize) + '" y="' + (cy + cellSize) +
      '" width="' + cellSize + '" height="' + cellSize + '" fill="#ffffff"/>';
    rects.push(finderPattern(0, 0));
    rects.push(finderPattern(size - cellSize * 3, 0));
    rects.push(finderPattern(0, size - cellSize * 3));

    return '<svg class="receipt-qr" viewBox="0 0 ' + size + ' ' + size +
           '" width="' + size + '" height="' + size +
           '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QR-code de suivi">' +
           '<rect width="' + size + '" height="' + size + '" fill="#ffffff"/>' +
           rects.join('') + '</svg>';
  },

  /* Genere le HTML du recu imprimable */
  renderReceiptHTML(order) {
    return `
      <div class="receipt" id="receipt-${order.order_id}">
        <div class="receipt-header">
          <div class="receipt-logo">
            <span class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 21h18M3 7l9-4 9 4M5 21V11M9 21V11M15 21V11M19 21V11M3 11h18"/>
              </svg>
            </span>
            <div>
              <h2>Achetons Burkinabe</h2>
              <p class="text-caption">Recu de commande</p>
            </div>
          </div>
          <div class="receipt-meta">
            <p><strong>Numero:</strong> ${order.order_id}</p>
            <p><strong>Date:</strong> ${Utils.formatDate(order.order_date)}</p>
            <p><strong>Statut:</strong> <span class="badge badge-info">En cours</span></p>
          </div>
          <div class="receipt-qr-wrapper">
            ${Checkout._renderQRPlaceholder(order.order_id, 96)}
            <p class="text-caption text-center">Code de suivi</p>
          </div>
        </div>

        <div class="receipt-section">
          <h4>Informations acheteur</h4>
          <p>${Utils.escapeHtml(order.buyer_name)}</p>
          <p>${Utils.escapeHtml(order.buyer_phone)}</p>
          <p>${Utils.escapeHtml(order.buyer_address)}</p>
          <p>${Utils.escapeHtml(order.buyer_city)}</p>
        </div>

        <div class="receipt-section">
          <h4>Produits commandes</h4>
          <table class="receipt-table">
            <thead>
              <tr>
                <th>Produit</th>
                <th>Vendeur</th>
                <th class="text-right">Qte</th>
                <th class="text-right">Prix unit.</th>
                <th class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(it => `
                <tr>
                  <td>${Utils.escapeHtml(it.nom)}</td>
                  <td>${Utils.escapeHtml(it.seller_name)}</td>
                  <td class="text-right">${it.quantity}</td>
                  <td class="text-right">${Utils.formatPrice(it.unit_price)}</td>
                  <td class="text-right">${Utils.formatPrice(it.line_total)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              ${order.remise_total > 0 ? `
                <tr>
                  <td colspan="4" class="text-right">Remise revendeur</td>
                  <td class="text-right">- ${Utils.formatPrice(order.remise_total)}</td>
                </tr>
              ` : ''}
              <tr class="receipt-total-row">
                <td colspan="4" class="text-right"><strong>TOTAL</strong></td>
                <td class="text-right"><strong class="price-large">${Utils.formatPrice(order.total)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="receipt-section receipt-note">
          <h4>Paiement</h4>
          <p><strong>Mode :</strong> ${Utils.escapeHtml(Checkout._paymentLabel(order.payment_method))}</p>
          <p>${Utils.escapeHtml(order.payment_note)}</p>
          <p class="text-caption">Modes acceptes: cash, Wave, Orange Money, Mobile Money</p>
        </div>

        <div class="receipt-section">
          <h4>Contacts vendeurs</h4>
          ${order.seller_ids.map(sid => {
            const s = Data.getSeller(sid);
            if (!s) return '';
            const locParts = [s.ville, s.region].filter(Boolean);
            const loc = locParts.length ? ' · ' + Utils.escapeHtml(locParts.join(', ')) : '';
            return `<p><strong>${Utils.escapeHtml(s.nom)}</strong> · ${Utils.escapeHtml(s.telephone || '')} · ${Utils.escapeHtml(s.email || '')}${loc}</p>`;
          }).join('')}
        </div>

        <div class="receipt-footer">
          <p class="text-caption text-center">Merci pour votre achat ! Conservez ce recu pour le suivi de votre commande.</p>
          <p class="text-caption text-center">Achetons Burkinabe · Burkina Institute of Technology</p>
        </div>
      </div>
    `;
  },

  /* Libelle FR du mode de paiement */
  _paymentLabel(method) {
    const map = {
      wave: 'Wave',
      orange_money: 'Orange Money',
      moov_money: 'Moov Money',
      mobile_money: 'Mobile Money',
      cash: 'Cash a la livraison',
      virement: 'Virement bancaire'
    };
    return map[method] || (method || 'Cash a la livraison');
  },

  /* Statut commande FR */
  statusLabel(status) {
    const map = {
      en_cours: 'En cours',
      acceptee: 'Acceptee',
      livree: 'Livree',
      recu: 'Recue',
      refusee: 'Refusee',
      annulee: 'Annulee'
    };
    return map[status] || status;
  },

  statusBadgeClass(status) {
    const map = {
      en_cours: 'badge-info',
      acceptee: 'badge-success',
      livree: 'badge-info',
      recu: 'badge-success',
      refusee: 'badge-error',
      annulee: 'badge-error'
    };
    return map[status] || 'badge-neutral';
  }
};

window.Checkout = Checkout;

/* js/cart.js - Logique panier d'achat */

const Cart = {
  get() {
    return Storage.getCart();
  },

  /* Ajoute un produit au panier */
  addItem(productId, quantity = 1, options = {}) {
    const product = Data.getProduct(productId);
    if (!product) {
      UI.toast('Produit introuvable', 'error');
      return false;
    }

    const stock = Data.getEffectiveStock(product);
    const cart = Cart.get();
    const existing = cart.items.find(it => it.product_id === productId);

    const newQty = (existing ? existing.quantity : 0) + quantity;
    if (newQty > stock) {
      UI.toast(`Stock insuffisant. Disponible: ${stock}`, 'warning');
      return false;
    }

    if (existing) {
      existing.quantity = newQty;
      existing.added_date = existing.added_date || new Date().toISOString();
    } else {
      cart.items.push({
        product_id: productId,
        quantity: quantity,
        added_date: new Date().toISOString(),
        unit_price: product.prix,
        bulk: options.bulk || false,
        lot_size: options.lotSize || null,
        remise_pct: options.remisePct || 0
      });
    }

    Storage.setCart(cart);
    UI.updateCartCount();
    UI.toast(`"${product.nom}" ajoute au panier`, 'success');
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    return true;
  },

  /* Ajoute un item bulk (revendeur) */
  addBulkItem(productId, quantity, lotSize, remisePct) {
    return Cart.addItem(productId, quantity, { bulk: true, lotSize, remisePct });
  },

  updateQty(productId, quantity) {
    const cart = Cart.get();
    const item = cart.items.find(it => it.product_id === productId);
    if (!item) return false;
    const product = Data.getProduct(productId);
    if (!product) return false;
    const stock = Data.getEffectiveStock(product);
    if (quantity > stock) {
      UI.toast(`Stock insuffisant. Disponible: ${stock}`, 'warning');
      return false;
    }
    if (quantity <= 0) {
      return Cart.removeItem(productId);
    }
    item.quantity = quantity;
    Storage.setCart(cart);
    UI.updateCartCount();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    return true;
  },

  removeItem(productId) {
    const cart = Cart.get();
    cart.items = cart.items.filter(it => it.product_id !== productId);
    Storage.setCart(cart);
    UI.updateCartCount();
    UI.toast('Produit retire du panier', 'info');
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    return true;
  },

  clear() {
    Storage.setCart({ items: [], last_updated: null });
    UI.updateCartCount();
    document.dispatchEvent(new CustomEvent('cart:updated', { detail: { items: [] } }));
  },

  /* Calcule le total */
  computeTotals() {
    const cart = Cart.get();
    let subtotal = 0;
    let remiseTotal = 0;
    const items = cart.items.map(it => {
      const product = Data.getProduct(it.product_id);
      if (!product) return null;
      const unitPrice = it.unit_price || product.prix;
      const lineGross = unitPrice * it.quantity;
      const lineRemise = it.bulk ? lineGross * (it.remise_pct / 100) : 0;
      const lineTotal = lineGross - lineRemise;
      subtotal += lineTotal;
      remiseTotal += lineRemise;
      return {
        ...it,
        product,
        unit_price: unitPrice,
        line_gross: lineGross,
        line_remise: lineRemise,
        line_total: lineTotal
      };
    }).filter(Boolean);

    return {
      items,
      subtotal,
      remise_total: remiseTotal,
      gross_total: subtotal + remiseTotal,
      total: subtotal,
      item_count: items.reduce((sum, it) => sum + it.quantity, 0)
    };
  },

  /* Verifie que tous les items sont encore disponibles */
  checkAvailability() {
    const cart = Cart.get();
    const unavailable = [];
    cart.items.forEach(it => {
      const product = Data.getProduct(it.product_id);
      if (!product) {
        unavailable.push({ product_id: it.product_id, reason: 'Produit supprime' });
        return;
      }
      const stock = Data.getEffectiveStock(product);
      if (stock <= 0) {
        unavailable.push({ product_id: it.product_id, reason: 'Rupture de stock' });
      } else if (it.quantity > stock) {
        unavailable.push({ product_id: it.product_id, reason: `Stock disponible: ${stock}`, new_stock: stock });
      }
    });
    return unavailable;
  },

  /* Verifie que le panier n'est pas vide */
  isEmpty() {
    return Cart.get().items.length === 0;
  }
};

window.Cart = Cart;

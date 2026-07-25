/* js/app.js - Initialisation globale, theme, layout injection */

const App = {
  async init() {
    // Applique le theme AVANT le render pour eviter le flash
    const theme = Storage.getTheme();
    UI.applyTheme(theme);

    // Charge les donnees
    await Data.loadAll();

    // Determine la page courante
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const page = path.replace('.html', '');

    // Injecte header/footer
    UI.injectLayout(page);

    // Update cart/notif badges
    UI.updateCartCount();
    UI.updateNotifBadge();

    // Message de redirection connexion
    const msg = Utils.getQueryParam('message');
    if (msg) {
      UI.toast(decodeURIComponent(msg), 'info', 5000);
    }

    // Dispatch ready event
    document.dispatchEvent(new CustomEvent('app:ready', { detail: { page } }));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init().catch(err => {
    console.error('App init failed:', err);
    UI.toast('Erreur de chargement. Rechargez la page.', 'error');
  });
});

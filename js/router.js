/* js/router.js - Helper URL/route (multi-page, pas de SPA) */

const Router = {
  navigate(page, params = {}) {
    const url = page + '.html' + (Object.keys(params).length ? '?' + new URLSearchParams(params).toString() : '');
    window.location.href = url;
  },

  back() {
    history.back();
  },

  current() {
    return window.location.pathname.split('/').pop().replace('.html', '');
  },

  params() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
  }
};

window.Router = Router;

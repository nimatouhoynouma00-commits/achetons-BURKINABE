/* js/utils.js - Fonctions utilitaires (formatage, validation, calculs) */

const Utils = {
  /* Formatage prix FCFA */
  formatPrice(amount) {
    if (typeof amount !== 'number') amount = parseFloat(amount) || 0;
    return amount.toLocaleString('fr-FR') + ' FCFA';
  },

  formatPriceShort(amount) {
    if (typeof amount !== 'number') amount = parseFloat(amount) || 0;
    return amount.toLocaleString('fr-FR');
  },

  /* Parse un prix depuis une string ("2 500 FCFA" -> 2500) */
  parsePrice(str) {
    if (typeof str === 'number') return str;
    if (!str) return 0;
    const cleaned = String(str).replace(/[^\d]/g, '');
    return parseInt(cleaned, 10) || 0;
  },

  /* Formatage date FR */
  formatDate(isoDate) {
    if (!isoDate) return 'Date non disponible';
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  },

  formatDateShort(isoDate) {
    if (!isoDate) return 'N/A';
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  },

  /* Nombre de jours entre aujourd'hui et une date */
  daysUntil(isoDate) {
    if (!isoDate) return null;
    const target = new Date(isoDate);
    if (isNaN(target.getTime())) return null;
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  },

  /* Generation ID recu : BF-YYYYMMDD-XXXXX */
  generateOrderId() {
    const d = new Date();
    const ymd = d.getFullYear().toString() +
      String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0');
    const random = Math.floor(10000 + Math.random() * 90000);
    return `BF-${ymd}-${random}`;
  },

  /* Validation email */
  isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  },

  /* Validation telephone Burkina (8 chiffres, espaces optionnels) */
  isValidPhone(str) {
    if (!str) return false;
    const cleaned = str.replace(/[\s+]/g, '');
    return /^[0-9]{8,}$/.test(cleaned);
  },

  /* Email ou telephone */
  isValidEmailOrPhone(str) {
    return Utils.isValidEmail(str) || Utils.isValidPhone(str);
  },

  /* Validation carte vendeur trust level.
   * 50+ ventes -> argent ; 200+ ventes -> or. 
   * Les vendeurs avec 0 ventes reçoivent null (pas de badge). */
  getTrustLevel(ventesCount) {
    if (ventesCount >= 200) return 'or';
    if (ventesCount >= 50) return 'argent';
    return null;
  },

  /* Trust label FR */
  trustLabel(level) {
    const map = { bronze: 'Bronze', argent: 'Argent', or: 'Or' };
    return map[level] || 'Non classe';
  },

  /* Debounce */
  debounce(fn, wait) {
    let t;
    return function(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  },

  /* Echappe HTML pour injection sure */
  escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  /* Recupere parametre URL */
  getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  },

  /* Couper texte avec ellipsis */
  truncate(str, max) {
    if (!str) return '';
    if (str.length <= max) return str;
    return str.slice(0, max - 1).trim() + '…';
  },

  /* Convertit un niveau de confiance en classe CSS */
  trustClass(level) {
    return `trust-badge ${level || ''}`.trim();
  },

  /* Fuzzy match : Levenshtein simplifie */
  fuzzyScore(query, target) {
    if (!query || !target) return 0;
    query = query.toLowerCase().trim();
    target = target.toLowerCase();
    if (target.includes(query)) {
      // Plus la position est tot, meilleur est le score
      const pos = target.indexOf(query);
      return Math.max(0.6, 1 - (pos * 0.05));
    }
    // Levenshtein partiel
    const dist = Utils._levenshtein(query, target);
    const maxLen = Math.max(query.length, target.length);
    if (maxLen === 0) return 0;
    return Math.max(0, 1 - (dist / maxLen));
  },

  _levenshtein(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = [];
    for (let i = 0; i <= m; i++) {
      dp[i] = [i];
      for (let j = 1; j <= n; j++) {
        if (i === 0) { dp[i][j] = j; continue; }
        const cost = a[i-1] === b[j-1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i-1][j] + 1,
          dp[i][j-1] + 1,
          dp[i-1][j-1] + cost
        );
      }
    }
    return dp[m][n];
  },

  /* Calcule remise revendeur */
  computeBulkPrice(unitPrice, qty, remisePct) {
    const gross = unitPrice * qty;
    const remise = gross * (remisePct / 100);
    return {
      gross,
      remise,
      total: gross - remise
    };
  },

  /* Genere un UUID local simple */
  uuid() {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }
};

window.Utils = Utils;

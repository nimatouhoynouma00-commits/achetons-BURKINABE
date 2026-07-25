/* js/expert-systems.js - 6 modules experts pour dashboard vendeur (Task L1c)
 *
 * Squelette initial - a completer dans les taches ulterieures (L1d+).
 *
 * Architecture:
 *   - window.ExpertSystems                  : namespace racine
 *   - ExpertSystems.REFERENCE               : donnees de reference chargees depuis json/expert-modules.json
 *   - ExpertSystems.utils                   : helpers de calcul (FCFA, dates, ratios)
 *   - ExpertSystems.comptable               : Expert Comptable (marge, point mort, TVA BF, ABC)
 *   - ExpertSystems.financier               : Expert Financier (cash flow, BFR, DSO, ROI)
 *   - ExpertSystems.marketing               : Expert Marketing (BCG, saisonnalite, pricing)
 *   - ExpertSystems.secretaire              : Secretaire (messages templates, rappels)
 *   - ExpertSystems.stock                   : Stock Manager (rotation, ABC, peremption, reappro)
 *   - ExpertSystems.conseiller              : Conseiller Ventes (cross-sell, upsell, lots)
 *   - ExpertSystems.renderAll(container, sellerData) : rendu onglets
 *
 * Chaque module expose:
 *   - compute(sellerData, inputs) -> objet de metriques
 *   - render(sellerData, inputs)  -> string HTML
 *   - getRecommendations(sellerData, inputs) -> [{id, priorite, action}]
 *
 * Source des specs: /home/z/my-project/workspace/prod/json/expert-modules.json
 */

window.ExpertSystems = (function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Reference data (sera surcharge par loadReference)                  */
  /* ------------------------------------------------------------------ */
  let REFERENCE = {
    ratios_sains: {
      marge_brute_min: 0.30,
      rotation_stock_min: 4,
      tresorerie_charges_min: 3,
      dso_max_jours: 30,
      tva_bf: 0.18
    },
    prix_moyens_marche: {},
    saissonalite: {},
    bcg_matrix_rules: {},
    abc_classification_rules: {},
    messages_templates: {},
    coefficient_saisonnier: {},
    couleurs_alertes: {}
  };

  let REFERENCE_LOADED = false;

  /* ------------------------------------------------------------------ */
  /* Utilitaires partages                                              */
  /* ------------------------------------------------------------------ */
  const utils = {
    /* Formate un montant en FCFA (delegue a Utils.formatPrice si dispo) */
    formatFCFA(amount) {
      if (typeof amount !== 'number') amount = parseFloat(amount) || 0;
      if (window.Utils && typeof Utils.formatPrice === 'function') {
        return Utils.formatPrice(amount);
      }
      return amount.toLocaleString('fr-FR') + ' FCFA';
    },

    /* Formate un pourcentage */
    formatPct(ratio, digits) {
      digits = digits || 1;
      return (ratio * 100).toFixed(digits) + '%';
    },

    /* Calcule le CA HT a partir d'un montant TTC */
    ttcToHtt(ttc, tvaRate) {
      tvaRate = tvaRate || 0.18;
      return ttc / (1 + tvaRate);
    },

    /* Calcule la TVA a partir du TTC */
    tvaFromTtc(ttc, tvaRate) {
      tvaRate = tvaRate || 0.18;
      return ttc - ttc / (1 + tvaRate);
    },

    /* Calcule le CA par mois a partir des commandes */
    caByMonth(orders, sellerId) {
      const map = {};
      orders.forEach(o => {
        if (!['acceptee', 'livree', 'recu'].includes(o.status)) return;
        const d = new Date(o.order_date);
        if (isNaN(d.getTime())) return;
        const key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        const amount = sellerId
          ? o.items.filter(it => it.seller_id === sellerId)
                    .reduce((s, it) => s + it.line_total, 0)
          : o.items.reduce((s, it) => s + it.line_total, 0);
        map[key] = (map[key] || 0) + amount;
      });
      return map;
    },

    /* Pente (regression lineaire) sur une serie temporelle */
    linearTrend(values) {
      const n = values.length;
      if (n < 2) return 0;
      const xs = values.map((_, i) => i);
      const meanX = xs.reduce((a, b) => a + b, 0) / n;
      const meanY = values.reduce((a, b) => a + b, 0) / n;
      let num = 0, den = 0;
      for (let i = 0; i < n; i++) {
        num += (xs[i] - meanX) * (values[i] - meanY);
        den += (xs[i] - meanX) ** 2;
      }
      return den === 0 ? 0 : num / den;
    },

    /* Charge les donnees de reference depuis le JSON */
    loadReference(callback) {
      if (REFERENCE_LOADED) {
        if (callback) callback(REFERENCE);
        return;
      }
      fetch('json/expert-modules.json')
        .then(r => r.json())
        .then(data => {
          REFERENCE = Object.assign(REFERENCE, data.reference_data || {});
          REFERENCE._meta = data.meta || {};
          REFERENCE_LOADED = true;
          if (callback) callback(REFERENCE);
        })
        .catch(err => {
          console.warn('[ExpertSystems] Impossible de charger json/expert-modules.json:', err);
          if (callback) callback(REFERENCE);
        });
    },

    /* Recupere les inputs persistes (localStorage) */
    loadInputs(sellerId) {
      try {
        const key = 'expert_modules_inputs_' + sellerId;
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : {};
      } catch (e) { return {}; }
    },

    /* Sauvegarde les inputs persistes */
    saveInputs(sellerId, inputs) {
      try {
        localStorage.setItem('expert_modules_inputs_' + sellerId, JSON.stringify(inputs));
      } catch (e) {}
    },

    /* Echappe le HTML */
    escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },

    /* Rendu d'un badge couleur selon seuil */
    badge(level, text) {
      const colors = REFERENCE.couleurs_alertes || {
        rouge: '#dc3545', orange: '#fd7e14', jaune: '#ffc107',
        vert: '#28a745', bleu: '#007bff', violet: '#6f42c1'
      };
      const color = colors[level] || colors.bleu;
      return `<span class="expert-badge" style="background:${color};color:#fff;padding:2px 8px;border-radius:4px;font-size:0.85em;">${text}</span>`;
    },

    /* Applique un template de message avec variables */
    applyTemplate(templateKey, vars) {
      const tpl = REFERENCE.messages_templates && REFERENCE.messages_templates[templateKey];
      if (!tpl) return '';
      let out = tpl;
      Object.keys(vars || {}).forEach(k => {
        const re = new RegExp('\\{' + k + '\\}', 'g');
        out = out.replace(re, vars[k]);
      });
      return out;
    },

    /* Coefficient saisonnier pour un mois donne (1-12) */
    seasonalCoefficient(month, categorie) {
      // Si categorie specifique, utiliser sa saisonnalite
      if (categorie && REFERENCE.saisonnalite && REFERENCE.saisonnalite[categorie]) {
        const s = REFERENCE.saisonnalite[categorie];
        if (s.pic && s.pic.includes(month)) return 1.3;
        if (s.creux && s.creux.includes(month)) return 0.75;
      }
      // Sinon coefficient general BF
      const coef = REFERENCE.coefficient_saisonnier || {};
      return coef[String(month)] || 1.0;
    },

    /* ----------------------------------------------------------------
     * HELPERS DE RENDU HTML (classes design-system.css)               
     * ---------------------------------------------------------------- */

    /* Rendu d'une grille de KPIs (.expert-kpis > .expert-kpi) */
    renderKpis(kpis) {
      if (!Array.isArray(kpis) || kpis.length === 0) return '';
      return '<div class="expert-kpis">' +
        kpis.map(function (k) {
          return '<div class="expert-kpi">' +
            '<div class="expert-kpi-label">' + utils.escapeHtml(k.label || '') + '</div>' +
            '<div class="expert-kpi-value">' + utils.escapeHtml(k.value != null ? String(k.value) : '—') + '</div>' +
            (k.detail ? '<div class="expert-kpi-detail">' + utils.escapeHtml(k.detail) + '</div>' : '') +
          '</div>';
        }).join('') +
      '</div>';
    },

    /* Rendu d'une liste de recommandations (.recommendation.recommendation-*) */
    renderRecommendations(recs) {
      if (!Array.isArray(recs) || recs.length === 0) {
        return '<div class="card-modern"><p class="text-doux">Aucune recommandation pour le moment.</p></div>';
      }
      const icons = { haute: '!', moyenne: 'i', basse: '\u2713' };
      return '<div class="recommendations">' +
        recs.map(function (r) {
          const prio = r.priorite || 'moyenne';
          const icon = icons[prio] || 'i';
          const title = r.title || r.action || '';
          const detail = r.detail || '';
          return '<div class="recommendation recommendation-' + prio + '">' +
            '<div class="recommendation-icon">' + icon + '</div>' +
            '<div class="recommendation-content">' +
              '<div class="recommendation-title">' + utils.escapeHtml(title) + '</div>' +
              (detail ? '<div class="recommendation-detail">' + utils.escapeHtml(detail) + '</div>' : '') +
            '</div>' +
          '</div>';
        }).join('') +
      '</div>';
    },

    /* Rendu d'une card moderne avec titre optionnel */
    renderCard(title, body, opts) {
      opts = opts || {};
      const iconHtml = opts.icon ? '<span class="card-modern-icon" aria-hidden="true">' + opts.icon + '</span> ' : '';
      const titleHtml = title ? '<h4 class="card-modern-title">' + iconHtml + utils.escapeHtml(title) + '</h4>' : '';
      return '<div class="card-modern' + (opts.elevated ? ' card-modern-elevated' : '') + '">' +
        titleHtml +
        (body || '') +
      '</div>';
    },

    /* Rendu d'un tableau moderne (.table-modern) */
    renderTable(headers, rows, opts) {
      opts = opts || {};
      if (!Array.isArray(rows) || rows.length === 0) {
        return '<p class="text-doux">' + utils.escapeHtml(opts.empty || 'Aucune donnée.') + '</p>';
      }
      return '<div class="table-modern-wrapper">' +
        '<table class="table-modern">' +
          '<thead><tr>' +
            headers.map(function (h) { return '<th>' + utils.escapeHtml(h) + '</th>'; }).join('') +
          '</tr></thead>' +
          '<tbody>' +
            rows.map(function (r) {
              return '<tr>' + r.map(function (c) {
                return '<td>' + (c == null ? '' : c) + '</td>';
              }).join('') + '</tr>';
            }).join('') +
          '</tbody>' +
        '</table>' +
      '</div>';
    },

    /* Rendu d'une barre de progression (.progress-modern > .progress-modern-fill) */
    renderProgress(value, max, opts) {
      opts = opts || {};
      const m = max > 0 ? max : 1;
      const pct = Math.min(100, Math.max(0, (value / m) * 100));
      const colorClass = opts.colorClass || '';
      return '<div class="progress-modern"' +
        (opts.title ? ' title="' + utils.escapeHtml(opts.title) + '"' : '') + '>' +
        '<div class="progress-modern-fill ' + colorClass + '" style="width:' + pct.toFixed(1) + '%"></div>' +
      '</div>';
    },

    /* Rendu d'un badge moderne */
    renderBadge(level, text) {
      const classes = {
        haute: 'badge-modern-error',
        critique: 'badge-modern-error',
        moyenne: 'badge-modern-warning',
        basse: 'badge-modern-info',
        ok: 'badge-modern-success',
        info: 'badge-modern-info'
      };
      const cls = classes[level] || 'badge-modern-info';
      return '<span class="badge-modern ' + cls + '">' + utils.escapeHtml(text) + '</span>';
    }
  };

  /* ================================================================== */
  /* MODULE 1: EXPERT COMPTABLE                                        */
  /* ================================================================== */
  const comptable = {
    id: 'comptable',
    nom: 'Expert Comptable',
    icon: 'calculator',

    compute(sellerData, inputs) {
      inputs = inputs || {};
      const tva = (REFERENCE.ratios_sains && REFERENCE.ratios_sains.tva_bf) || 0.18;
      const tauxMargeNette = (inputs.taux_marge_nette || 40) / 100;
      const chargesFixes = inputs.charges_fixes_mensuelles || 50000;
      const chargesVariablesPct = (inputs.charges_variables_pct || 30) / 100;

      const caTtc = sellerData.total_revenue || 0;
      const caHt = utils.ttcToHtt(caTtc, tva);
      const tvaCollectee = utils.tvaFromTtc(caTtc, tva);

      // Estimation cout d'achat (si non fourni, on estime a 60% du HT)
      const coutAchat = inputs.cout_achat_moyen
        ? sellerData.stock_items.reduce((s, it) => s + (it.effective_stock || 0) * inputs.cout_achat_moyen, 0)
        : caHt * 0.60;
      const margeBrute = caHt - coutAchat;
      const margeBrutePct = caHt > 0 ? margeBrute / caHt : 0;

      const chargesVariables = caHt * chargesVariablesPct;
      const tmcv = caHt > 0 ? (caHt - chargesVariables) / caHt : 0;
      const seuilRentabilite = tmcv > 0 ? chargesFixes / tmcv : Infinity;
      const beneficeNet = caHt * tauxMargeNette;
      const margeNettePct = tauxMargeNette;

      // Point mort en jours
      const caAnnuel = caHt * 12;
      const pointMortJours = caAnnuel > 0 ? (seuilRentabilite / caAnnuel) * 360 : Infinity;

      // Top 5 produits par rentabilite
      const produitRenta = (sellerData.stock_items || []).map(p => {
        const ventes = (sellerData.orders || []).reduce((s, o) => {
          return s + o.items.filter(it => it.product_id === p.id || it.nom === p.nom)
                            .reduce((ss, it) => ss + (it.line_total || 0), 0);
        }, 0);
        const marge = ventes * margeBrutePct;
        return { id: p.id, nom: p.nom, ventes, marge };
      }).sort((a, b) => b.marge - a.marge).slice(0, 5);

      return {
        ca_ttc: caTtc,
        ca_ht: caHt,
        tva_collectee: tvaCollectee,
        cout_achat: coutAchat,
        marge_brute: margeBrute,
        marge_brute_pct: margeBrutePct,
        marge_nette: beneficeNet,
        marge_nette_pct: margeNettePct,
        charges_variables: chargesVariables,
        charges_fixes: chargesFixes,
        tmcv: tmcv,
        seuil_rentabilite: seuilRentabilite,
        point_mort_jours: pointMortJours,
        top5_rentabilite: produitRenta,
        tva_applicable: caHt * 12 < 50000000 ? false : true
      };
    },

    getRecommendations(sellerData, inputs) {
      const c = this.compute(sellerData, inputs);
      const ratios = REFERENCE.ratios_sains || {};
      const recs = [];

      if (c.marge_brute_pct < ratios.marge_brute_min) {
        recs.push({ id: 'rec_marge_faible', priorite: 'haute',
          action: 'Marge brute faible (' + utils.formatPct(c.marge_brute_pct) + '). Negocier prix d\'achat, augmenter prix de vente 10-15% ou reduire couts transport.' });
      }
      if (isFinite(c.seuil_rentabilite) && c.seuil_rentabilite > 0.8 * c.ca_ht) {
        recs.push({ id: 'rec_point_mort_proche', priorite: 'haute',
          action: 'Seuil de rentabilite (' + utils.formatFCFA(c.seuil_rentabilite) + ') proche du CA. Augmenter le CA ou reduire les charges fixes.' });
      }
      if (c.marge_nette_pct > 0.25) {
        recs.push({ id: 'rec_marge_excellente', priorite: 'moyenne',
          action: 'Marge nette excellente (' + utils.formatPct(c.marge_nette_pct) + '). Reinvestir 30% dans le stock classe A.' });
      }
      if (!c.tva_applicable) {
        recs.push({ id: 'rec_tva_franchise', priorite: 'basse',
          action: 'Regime de franchise TVA applicable (CA < 50M FCFA/an). Mentionner "TVA non applicable, art. 305 CGI" sur vos factures.' });
      }
      if (c.top5_rentabilite[0] && c.top5_rentabilite[0].marge > 0.5 * c.ca_ht) {
        recs.push({ id: 'rec_top_concentration', priorite: 'moyenne',
          action: 'Concentration excessive sur ' + c.top5_rentabilite[0].nom + '. Diversifier l\'offre pour reduire le risque.' });
      }
      return recs;
    },

    render(sellerData, inputs) {
      const c = this.compute(sellerData, inputs);
      const recs = this.getRecommendations(sellerData, inputs);
      const ratios = REFERENCE.ratios_sains || {};

      const kpis = [
        { label: 'CA HT mensuel', value: utils.formatFCFA(c.ca_ht),
          detail: 'TTC : ' + utils.formatFCFA(c.ca_ttc) },
        { label: 'Marge brute', value: utils.formatFCFA(c.marge_brute),
          detail: utils.formatPct(c.marge_brute_pct) + ' (min sain ' + utils.formatPct(ratios.marge_brute_min || 0.30) + ')' },
        { label: 'Benefice net', value: utils.formatFCFA(c.marge_nette),
          detail: utils.formatPct(c.marge_nette_pct) + ' de marge nette' },
        { label: 'Seuil de rentabilite', value: isFinite(c.seuil_rentabilite) ? utils.formatFCFA(c.seuil_rentabilite) : 'N/A',
          detail: 'Point mort : ' + (isFinite(c.point_mort_jours) ? Math.round(c.point_mort_jours) + ' jours' : 'N/A') }
      ];

      const margeBrutePct = Math.min(100, c.marge_brute_pct * 100);
      const margeColorClass = c.marge_brute_pct >= (ratios.marge_brute_min || 0.30) ? 'success' : 'error';
      const margeProgress = utils.renderProgress(margeBrutePct, 100, {
        colorClass: margeColorClass,
        title: 'Marge brute ' + utils.formatPct(c.marge_brute_pct)
      });

      const monthlyCard = utils.renderCard('Synthese comptable mensuelle',
        '<div class="expert-kpis">' +
          '<div class="expert-kpi"><div class="expert-kpi-label">CA HT</div><div class="expert-kpi-value">' + utils.formatFCFA(c.ca_ht) + '</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">Cout d\'achat</div><div class="expert-kpi-value">' + utils.formatFCFA(c.cout_achat) + '</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">Charges fixes</div><div class="expert-kpi-value">' + utils.formatFCFA(c.charges_fixes) + '</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">Charges variables</div><div class="expert-kpi-value">' + utils.formatFCFA(c.charges_variables) + '</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">TVA collectee (18%)</div><div class="expert-kpi-value">' + utils.formatFCFA(c.tva_collectee) + '</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">TMCV</div><div class="expert-kpi-value">' + utils.formatPct(c.tmcv) + '</div></div>' +
        '</div>' +
        '<div style="margin-top:12px"><div class="expert-kpi-label">Marge brute vs seuil sain</div>' + margeProgress + '</div>' +
        '<p class="text-doux" style="margin-top:8px">' + (c.tva_applicable
          ? 'Vous etes assujetti a la TVA BF (18%) - declarations mensuelles obligatoires.'
          : 'Franchise TVA applicable (CA &lt; 50M FCFA/an) - mention \"TVA non applicable, art. 305 CGI\" a porter sur vos factures.') + '</p>'
      );

      const top5Rows = c.top5_rentabilite.map(p => [
        utils.escapeHtml(p.nom),
        utils.formatFCFA(p.ventes),
        utils.formatFCFA(p.marge)
      ]);
      const top5Card = utils.renderCard('Top 5 produits par rentabilite',
        utils.renderTable(['Produit', 'CA genere', 'Marge estimee'], top5Rows, { empty: 'Aucune vente enregistree.' })
      );

      const recsCard = utils.renderCard('Recommandations (' + recs.length + ')',
        utils.renderRecommendations(recs)
      );

      return '<div class="expert-module" data-module="comptable">' +
        '<div class="expert-module-header">' +
          '<h3 class="expert-module-title">\uD83E\uDDA9 Expert Comptable</h3>' +
          '<p class="text-doux">Analyse comptable OHADA adaptee au BF - marges, seuil de rentabilite, TVA 18%.</p>' +
        '</div>' +
        utils.renderKpis(kpis) +
        monthlyCard +
        top5Card +
        recsCard +
      '</div>';
    }
  };

  /* ================================================================== */
  /* MODULE 2: EXPERT FINANCIER                                        */
  /* ================================================================== */
  const financier = {
    id: 'financier',
    nom: 'Expert Financier',
    icon: 'trending-up',

    compute(sellerData, inputs) {
      inputs = inputs || {};
      const tresorerie = inputs.tresorerie_initiale || 100000;
      const creancesClients = inputs.creances_clients || 0;
      const dettesFournisseurs = inputs.dettes_fournisseurs || 0;
      const delaiPaiement = inputs.delai_paiement_client_jours || 0;

      const caMensuel = (sellerData.total_revenue || 0) / Math.max(1, (sellerData.orders || []).length > 0 ? 3 : 1);
      const chargesMensuelles = (inputs.charges_fixes_mensuelles || 50000) + caMensuel * 0.30;
      const cashFlow = caMensuel - chargesMensuelles;
      const ratioTresorerie = chargesMensuelles > 0 ? tresorerie / chargesMensuelles : Infinity;

      // Projection 3 mois (trend lineaire)
      const caByMonth = utils.caByMonth(sellerData.orders || [], sellerData.seller_id);
      const monthlyValues = Object.keys(caByMonth).sort().map(k => caByMonth[k]);
      const trend = utils.linearTrend(monthlyValues.slice(-6));
      const projection = [0, 1, 2].map(i => caMensuel + trend * (i + 1));

      // DSO
      const dso = caMensuel > 0 ? (creancesClients / (caMensuel * 1.18)) * 30 : delaiPaiement;

      // BFR
      const valeurStock = (sellerData.stock_items || []).reduce((s, it) => s + (it.effective_stock || 0) * (it.prix || 0) * 0.6, 0);
      const bfr = (valeurStock + creancesClients) - dettesFournisseurs;
      const bfrMoisCa = caMensuel > 0 ? bfr / caMensuel : 0;

      // ROI moyen
      const beneficeNet = caMensuel * 0.40;
      const investissement = valeurStock;
      const roi = investissement > 0 ? (beneficeNet * 12 - investissement) / investissement : 0;

      // Conseil investissement
      let conseil = 'ajuster';
      if (sellerData.marge_moyenne > 30 && ratioTresorerie > 2) conseil = 'reinvestir';
      else if (sellerData.marge_moyenne > 30 && ratioTresorerie <= 2) conseil = 'epargner';

      return {
        tresorerie, ca_mensuel: caMensuel, charges_mensuelles: chargesMensuelles,
        cash_flow: cashFlow, ratio_tresorerie: ratioTresorerie,
        projection_3_mois: projection, trend: trend,
        dso: dso, bfr: bfr, bfr_mois_ca: bfrMoisCa,
        valeur_stock: valeurStock, roi: roi,
        conseil_investissement: conseil,
        creances_clients: creancesClients, dettes_fournisseurs: dettesFournisseurs
      };
    },

    getRecommendations(sellerData, inputs) {
      const f = this.compute(sellerData, inputs);
      const ratios = REFERENCE.ratios_sains || {};
      const recs = [];

      if (f.ratio_tresorerie < (ratios.tresorerie_charges_critique || 1)) {
        recs.push({ id: 'rec_tresorerie_critique', priorite: 'haute',
          title: 'Tresorerie critique (' + f.ratio_tresorerie.toFixed(2) + ' mois de charges)',
          detail: 'URGENT : ratio tresorerie/charges < 1 mois. Relancer impayes, negocier delais fournisseurs.',
          action: 'URGENT: ratio tresorerie/charges = ' + f.ratio_tresorerie.toFixed(2) + ' (< 1 mois). Relancer impayes, negocier delais fournisseurs.' });
      }
      if (f.dso > (ratios.dso_max_jours || 30)) {
        recs.push({ id: 'rec_dso_eleve', priorite: 'haute',
          title: 'DSO eleve (' + Math.round(f.dso) + ' jours)',
          detail: 'Exiger acompte 30% a la commande. Limiter credit client a 30j max.',
          action: 'DSO = ' + Math.round(f.dso) + ' jours (>' + ratios.dso_max_jours + '). Exiger acompte 30% a la commande. Limiter credit a 30j.' });
      }
      if (f.bfr_mois_ca > (ratios.bfr_max_mois_ca || 3)) {
        recs.push({ id: 'rec_bfr_eleve', priorite: 'moyenne',
          title: 'BFR eleve (' + f.bfr_mois_ca.toFixed(1) + ' mois de CA)',
          detail: 'Reducer stock dormant, ecouler invendus, etendre delais fournisseurs.',
          action: 'BFR = ' + f.bfr_mois_ca.toFixed(1) + ' mois de CA. Reduire stock dormant, ecouler invendus, etendre delais fournisseurs.' });
      }
      if (f.conseil_investissement === 'reinvestir') {
        recs.push({ id: 'rec_reinvestir', priorite: 'moyenne',
          title: 'Fenetre de reinvestissement favorable',
          detail: 'Marge > 30% et tresorerie solide. Reinvestir 30% du benefice dans le stock classe A.',
          action: 'Conditions reunies pour reinvestir 30% du benefice dans le stock classe A.' });
      }
      if (f.roi < (ratios.roi_min_pct || 30) / 100) {
        recs.push({ id: 'rec_roi_faible', priorite: 'moyenne',
          title: 'ROI faible (' + utils.formatPct(f.roi) + ')',
          detail: 'Augmenter prix 15%, negocier cout achat ou arreter le produit non rentable.',
          action: 'ROI = ' + utils.formatPct(f.roi) + ' (< 30%). Augmenter prix 15%, negocier cout achat ou arreter le produit.' });
      }
      return recs;
    },

    render(sellerData, inputs) {
      const f = this.compute(sellerData, inputs);
      const recs = this.getRecommendations(sellerData, inputs);
      const ratios = REFERENCE.ratios_sains || {};

      const kpis = [
        { label: 'Tresorerie', value: utils.formatFCFA(f.tresorerie),
          detail: 'Disponible immediat' },
        { label: 'Cash flow mensuel', value: utils.formatFCFA(f.cash_flow),
          detail: f.cash_flow >= 0 ? 'Positif' : 'Negatif - vigilance' },
        { label: 'Ratio tresorerie', value: f.ratio_tresorerie.toFixed(2) + ' mois',
          detail: 'Min sain : ' + (ratios.tresorerie_charges_min || 3) + ' mois' },
        { label: 'DSO', value: Math.round(f.dso) + ' jours',
          detail: 'Max conseille : ' + (ratios.dso_max_jours || 30) + ' jours' }
      ];

      // Ratio tresorerie progress bar
      const ratioTresoPct = Math.min(100, (f.ratio_tresorerie / (ratios.tresorerie_charges_min || 3)) * 100);
      const ratioColorClass = f.ratio_tresorerie >= (ratios.tresorerie_charges_min || 3)
        ? 'success'
        : (f.ratio_tresorerie >= (ratios.tresorerie_charges_critique || 1) ? 'warning' : 'error');
      const ratioProgress = utils.renderProgress(ratioTresoPct, 100, {
        colorClass: ratioColorClass,
        title: 'Ratio tresorerie/charges mensuelles'
      });

      const ratiosCard = utils.renderCard('Ratios financiers cles',
        '<div class="expert-kpis">' +
          '<div class="expert-kpi"><div class="expert-kpi-label">BFR</div><div class="expert-kpi-value">' + utils.formatFCFA(f.bfr) + '</div><div class="expert-kpi-detail">' + f.bfr_mois_ca.toFixed(1) + ' mois de CA</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">Valeur stock</div><div class="expert-kpi-value">' + utils.formatFCFA(f.valeur_stock) + '</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">ROI annuel</div><div class="expert-kpi-value">' + utils.formatPct(f.roi) + '</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">Creances clients</div><div class="expert-kpi-value">' + utils.formatFCFA(f.creances_clients) + '</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">Dettes fournisseurs</div><div class="expert-kpi-value">' + utils.formatFCFA(f.dettes_fournisseurs) + '</div></div>' +
          '<div class="expert-kpi"><div class="expert-kpi-label">CA mensuel</div><div class="expert-kpi-value">' + utils.formatFCFA(f.ca_mensuel) + '</div></div>' +
        '</div>' +
        '<div style="margin-top:12px"><div class="expert-kpi-label">Tresorerie / 3 mois de charges (objectif 100%)</div>' + ratioProgress + '</div>'
      );

      // Projection 3 mois (table)
      const trendArrow = f.trend >= 0 ? '\u2197' : '\u2198';
      const projRows = f.projection_3_mois.map((v, i) => [
        'M+' + (i + 1),
        utils.formatFCFA(Math.round(v)),
        (i > 0 ? utils.formatFCFA(Math.round(v - f.projection_3_mois[i - 1])) : '—')
      ]);
      const projCard = utils.renderCard('Projection 3 mois (tendance ' + trendArrow + ' ' + utils.formatPct(f.trend / Math.max(1, f.ca_mensuel)) + ')',
        utils.renderTable(['Periode', 'CA projete', 'Variation'], projRows, { empty: 'Pas assez d\'historique.' }) +
        '<p class="text-doux" style="margin-top:8px">Tendance calculee par regression lineaire sur les 6 derniers mois de CA.</p>'
      );

      const conseilLabels = {
        reinvestir: { level: 'ok', text: 'Reinvestir' },
        epargner: { level: 'info', text: 'Epargner' },
        ajuster: { level: 'moyenne', text: 'Ajuster' }
      };
      const conseilInfo = conseilLabels[f.conseil_investissement] || conseilLabels.ajuster;

      const recsCard = utils.renderCard(
        'Recommandations (' + recs.length + ') - Conseil ' + utils.renderBadge(conseilInfo.level, conseilInfo.text),
        utils.renderRecommendations(recs)
      );

      return '<div class="expert-module" data-module="financier">' +
        '<div class="expert-module-header">' +
          '<h3 class="expert-module-title">\uD83D\uDCC8 Expert Financier</h3>' +
          '<p class="text-doux">Tresorerie, cash flow, BFR, DSO, ROI et projection 3 mois.</p>' +
        '</div>' +
        utils.renderKpis(kpis) +
        ratiosCard +
        projCard +
        recsCard +
      '</div>';
    }
  };

  /* ================================================================== */
  /* MODULE 3: EXPERT MARKETING                                        */
  /* ================================================================== */
  const marketing = {
    id: 'marketing',
    nom: 'Expert Marketing',
    icon: 'megaphone',

    compute(sellerData, inputs) {
      const now = new Date();
      const moisActuel = now.getMonth() + 1;
      const stockItems = sellerData.stock_items || [];

      // Saisonnalite par categorie
      const saisonnalite = {};
      const categories = {};
      stockItems.forEach(p => {
        const cat = p.categorie || 'Autre';
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(p);
      });
      Object.keys(categories).forEach(cat => {
        const s = REFERENCE.saisonnalite && REFERENCE.saisonnalite[cat];
        saisonnalite[cat] = {
          pic_mois: s ? s.pic : [],
          creux_mois: s ? s.creux : [],
          coefficient_actuel: utils.seasonalCoefficient(moisActuel, cat),
          nb_produits: categories[cat].length,
          statut: s && s.pic && s.pic.includes(moisActuel) ? 'pic'
                 : s && s.creux && s.creux.includes(moisActuel) ? 'creux'
                 : 'normal'
        };
      });

      // Suggestions de prix par produit
      const suggestions = stockItems.map(p => {
        const refPrix = REFERENCE.prix_moyens_marche && REFERENCE.prix_moyens_marche[p.categorie];
        if (!refPrix) return { id: p.id, nom: p.nom, prix_actuel: p.prix, prix_suggere: null, statut: 'inconnu' };
        const prixSuggere = Math.round((refPrix.min + refPrix.max) / 2);
        const ratio = p.prix / prixSuggere;
        let statut = 'optimal';
        if (ratio < 0.8) statut = 'sous_price';
        else if (ratio > 1.2) statut = 'sur_price';
        return {
          id: p.id, nom: p.nom, prix_actuel: p.prix,
          prix_marche: refPrix.moyenne, prix_suggere: prixSuggere,
          ratio: ratio, statut: statut
        };
      });

      // BCG matrix basee sur le CA reel et la croissance recente
      // - part_marche = CA produit / CA total du vendeur (proxy de part relative)
      // - croissance = pente lineaire du CA mensuel sur 6 derniers mois (proxy de croissance marche)
      const orders = sellerData.orders || [];
      const caByProductMonth = {};
      const caByProductTotal = {};
      orders.forEach(o => {
        if (!['acceptee', 'livree', 'recu'].includes(o.status)) return;
        const d = new Date(o.order_date);
        if (isNaN(d.getTime())) return;
        const monthKey = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
        (o.items || []).forEach(it => {
          const pid = it.product_id || it.nom;
          if (!pid) return;
          caByProductTotal[pid] = (caByProductTotal[pid] || 0) + (it.line_total || 0);
          if (!caByProductMonth[pid]) caByProductMonth[pid] = {};
          caByProductMonth[pid][monthKey] = (caByProductMonth[pid][monthKey] || 0) + (it.line_total || 0);
        });
      });
      const totalCaProduits = Object.keys(caByProductTotal).reduce((s, k) => s + caByProductTotal[k], 0);
      const allMonths = Array.from(new Set(Object.values(caByProductMonth).reduce((arr, m) => arr.concat(Object.keys(m)), []))).sort();
      const bcg = stockItems.map(p => {
        const pid = p.id || p.nom;
        const caProduit = caByProductTotal[pid] || 0;
        const part = totalCaProduits > 0 ? caProduit / totalCaProduits : 0;
        const monthlyValues = allMonths.map(k => caByProductMonth[pid] ? (caByProductMonth[pid][k] || 0) : 0);
        const trend = utils.linearTrend(monthlyValues.slice(-6));
        const moyenne = monthlyValues.reduce((a, b) => a + b, 0) / Math.max(1, monthlyValues.length);
        const croissancePct = moyenne > 0 ? (trend / moyenne) * 100 : 0;
        let classification = 'poids_mort';
        if (croissancePct > 10 && part > 0.15) classification = 'etoile';
        else if (croissancePct <= 10 && part > 0.15) classification = 'vache_lait';
        else if (croissancePct > 10 && part <= 0.15) classification = 'dilemme';
        else classification = 'poids_mort';
        return {
          id: p.id, nom: p.nom, categorie: p.categorie,
          classification: classification,
          croissance: croissancePct, part: part, ca: caProduit
        };
      });

      // Best timing relance (Vendredi 14h-16h optimal selon reference_data)
      const isVendrediApresMidi = now.getDay() === 5 && now.getHours() >= 14 && now.getHours() < 16;
      const bestTimingSlots = (REFERENCE.heurures_optimales_relance && REFERENCE.heurures_optimales_relance.optimal) || [
        { jour: 'vendredi', debut: 14, fin: 16 }
      ];

      return {
        saisonnalite: saisonnalite, suggestions_prix: suggestions, bcg_matrix: bcg,
        mois_actuel: moisActuel,
        best_timing_relance_actif: isVendrediApresMidi,
        best_timing_label: 'Vendredi 14h-16h',
        best_timing_slots: bestTimingSlots,
        nb_produits: stockItems.length
      };
    },

    getRecommendations(sellerData, inputs) {
      const m = this.compute(sellerData, inputs);
      const recs = [];

      Object.keys(m.saisonnalite || {}).forEach(cat => {
        const s = m.saisonnalite[cat];
        if (!s) return;
        if (s.statut === 'pic') {
          recs.push({ id: 'rec_saison_pic_' + cat, priorite: 'haute',
            title: cat + ' : pleine saison detectee',
            detail: 'Maximiser la marge, pas de promo. Renforcer le stock (' + s.nb_produits + ' produit(s) concerne(s)).',
            action: cat + ': pleine saison. Maximiser la marge, pas de promo. Renforcer le stock.' });
        } else if (s.statut === 'creux') {
          recs.push({ id: 'rec_saison_creux_' + cat, priorite: 'moyenne',
            title: cat + ' : saison creuse',
            detail: 'Lancer promo 15-20% pour stimuler la demande (' + s.nb_produits + ' produit(s)).',
            action: cat + ': saison creuse. Lancer promo 15-20% pour stimuler la demande.' });
        }
      });

      m.suggestions_prix.forEach(sp => {
        if (sp.statut === 'sous_price' && sp.prix_suggere) {
          recs.push({ id: 'rec_sous_price_' + sp.id, priorite: 'moyenne',
            title: sp.nom + ' : prix sous-estime',
            detail: 'Prix actuel ' + utils.formatFCFA(sp.prix_actuel) + ' vs marche ' + utils.formatFCFA(sp.prix_marche) + '. Augmenter vers ' + utils.formatFCFA(sp.prix_suggere) + '.',
            action: sp.nom + ': prix sous-estime (' + utils.formatFCFA(sp.prix_actuel) + ' vs marche ' + utils.formatFCFA(sp.prix_marche) + '). Augmenter.' });
        } else if (sp.statut === 'sur_price' && sp.prix_suggere) {
          recs.push({ id: 'rec_sur_price_' + sp.id, priorite: 'moyenne',
            title: sp.nom + ' : prix au-dessus du marche',
            detail: 'Prix ' + utils.formatFCFA(sp.prix_actuel) + ' vs marche ' + utils.formatFCFA(sp.prix_marche) + '. Justifier (qualite, origine) ou ajuster.',
            action: sp.nom + ': prix au-dessus du marche. Justifier (qualite, origine) ou ajuster.' });
        }
      });

      (m.bcg_matrix || []).forEach(p => {
        if (p.classification === 'poids_mort') {
          recs.push({ id: 'rec_poids_mort_' + p.id, priorite: 'moyenne',
            title: p.nom + ' : poids mort BCG',
            detail: 'Croissance ' + p.croissance.toFixed(1) + '% / part ' + utils.formatPct(p.part) + '. Envisager abandon ou repositionnement.',
            action: p.nom + ': poids mort BCG. Envisager abandon ou repositionnement.' });
        } else if (p.classification === 'etoile') {
          recs.push({ id: 'rec_etoile_' + p.id, priorite: 'haute',
            title: p.nom + ' : etoile montante BCG',
            detail: 'Croissance ' + p.croissance.toFixed(1) + '% / part ' + utils.formatPct(p.part) + '. Investir pour conquerir le marche.',
            action: p.nom + ': etoile BCG. Investir pour conquerir le marche.' });
        }
      });

      return recs;
    },

    render(sellerData, inputs) {
      const m = this.compute(sellerData, inputs);
      const recs = this.getRecommendations(sellerData, inputs);

      // KPIs principaux
      const nbProduits = m.nb_produits || (m.bcg_matrix || []).length;
      const nbEtoiles = (m.bcg_matrix || []).filter(p => p.classification === 'etoile').length;
      const nbVachesLait = (m.bcg_matrix || []).filter(p => p.classification === 'vache_lait').length;
      const nbPoidsMort = (m.bcg_matrix || []).filter(p => p.classification === 'poids_mort').length;
      const kpis = [
        { label: 'Produits analyses', value: nbProduits, detail: 'Catalogue complet' },
        { label: 'Etoiles BCG', value: nbEtoiles, detail: 'A investir' },
        { label: 'Vaches a lait', value: nbVachesLait, detail: 'Rentabilite max' },
        { label: 'Poids morts', value: nbPoidsMort, detail: 'A desinvestir' }
      ];

      // Matrice BCG (4 quadrants)
      const bcgCells = [
        { cls: 'etoile', label: 'Etoiles', desc: 'Croissance > 10% ET part > 15%. Investir pour conquerir.' },
        { cls: 'vache_lait', label: 'Vaches a lait', desc: 'Croissance < 10% ET part > 15%. Rentabiliser.' },
        { cls: 'dilemme', label: 'Dilemmes', desc: 'Croissance > 10% ET part < 15%. Investir selectivement.' },
        { cls: 'poids_mort', label: 'Poids morts', desc: 'Croissance < 10% ET part < 15%. Desinvestir.' }
      ];
      const bcgMatrixHtml = '<div class="bcg-matrix">' +
        bcgCells.map(cell => {
          const produits = (m.bcg_matrix || []).filter(p => p.classification === cell.cls);
          const produitsHtml = produits.length > 0
            ? produits.map(p => '<div class="bcg-cell-title">' + utils.escapeHtml(p.nom) +
                ' <small>(' + p.croissance.toFixed(1) + '% / ' + utils.formatPct(p.part) + ')</small></div>').join('')
            : '<div class="text-doux">Aucun</div>';
          return '<div class="bcg-cell bcg-' + cell.cls + '">' +
            '<div class="bcg-cell-title">' + cell.label + ' (' + produits.length + ')</div>' +
            '<div class="bcg-cell-desc">' + cell.desc + '</div>' +
            '<div class="bcg-cell-items">' + produitsHtml + '</div>' +
          '</div>';
        }).join('') +
      '</div>';
      const bcgCard = utils.renderCard('Matrice BCG (Boston Consulting Group)',
        bcgMatrixHtml +
        '<p class="text-doux" style="margin-top:8px">Classification basee sur la croissance (tendance CA mensuel 6 mois) et la part relative (CA produit / CA total).</p>'
      );

      // Saisonnalite par categorie (table)
      const saisonRows = Object.keys(m.saisonnalite || {}).map(cat => {
        const s = m.saisonnalite[cat];
        const statutBadge = s.statut === 'pic' ? utils.renderBadge('haute', 'PIC')
          : s.statut === 'creux' ? utils.renderBadge('moyenne', 'CREUX')
          : utils.renderBadge('info', 'Normal');
        return [
          utils.escapeHtml(cat),
          s.nb_produits,
          (s.pic_mois || []).join(', ') || '—',
          (s.creux_mois || []).join(', ') || '—',
          s.coefficient_actuel.toFixed(2),
          statutBadge
        ];
      });
      const saisonCard = utils.renderCard('Saisonnalite par categorie (mois actuel : ' + m.mois_actuel + ')',
        utils.renderTable(['Categorie', 'Produits', 'Mois pic', 'Mois creux', 'Coef. actuel', 'Statut'], saisonRows,
          { empty: 'Aucune categorie detectee.' })
      );

      // Suggestions de prix
      const prixRows = m.suggestions_prix.filter(sp => sp.prix_suggere).map(sp => {
        const statutBadge = sp.statut === 'sous_price' ? utils.renderBadge('moyenne', 'Sous-price')
          : sp.statut === 'sur_price' ? utils.renderBadge('moyenne', 'Sur-price')
          : utils.renderBadge('ok', 'Optimal');
        return [
          utils.escapeHtml(sp.nom),
          utils.formatFCFA(sp.prix_actuel),
          utils.formatFCFA(sp.prix_marche),
          utils.formatFCFA(sp.prix_suggere),
          statutBadge
        ];
      });
      const prixCard = utils.renderCard('Suggestions de prix vs marche',
        utils.renderTable(['Produit', 'Prix actuel', 'Prix marche', 'Prix suggere', 'Statut'], prixRows,
          { empty: 'Aucune reference de prix disponible pour vos categories.' })
      );

      // Best timing relance
      const timingCard = utils.renderCard('Meilleur moment pour relancer les clients',
        '<p class="text-doux">Creneau optimal : <strong>' + utils.escapeHtml(m.best_timing_label) + '</strong>' +
        (m.best_timing_relance_actif
          ? ' <span class="badge-modern badge-modern-success">Actif maintenant</span>'
          : ' <span class="badge-modern badge-modern-info">Hors creneau</span>') +
        '</p>' +
        '<p class="text-doux">Les relances clients sont plus efficaces le vendredi apres-midi (taux de reponse +35% vs moyenne).</p>'
      );

      const recsCard = utils.renderCard('Recommandations (' + recs.length + ')',
        utils.renderRecommendations(recs)
      );

      return '<div class="expert-module" data-module="marketing">' +
        '<div class="expert-module-header">' +
          '<h3 class="expert-module-title">\uD83D\uDCE3 Expert Marketing</h3>' +
          '<p class="text-doux">Matrice BCG, saisonnalite BF, pricing vs marche et timing de relance.</p>' +
        '</div>' +
        utils.renderKpis(kpis) +
        bcgCard +
        saisonCard +
        prixCard +
        timingCard +
        recsCard +
      '</div>';
    }
  };

  /* ================================================================== */
  /* MODULE 4: SECRETAIRE (ASSISTANT)                                  */
  /* ================================================================== */
  const secretaire = {
    id: 'secretaire',
    nom: 'Secretaire (Assistant)',
    icon: 'mail',

    compute(sellerData, inputs) {
      const now = Date.now();
      const orders = sellerData.orders || [];
      const stockItems = sellerData.stock_items || [];

      // Rappels commandes en attente > 48h
      const commandesAttente = orders.filter(o => {
        if (o.status !== 'en_cours') return false;
        const created = new Date(o.order_date).getTime();
        return (now - created) > 48 * 3600 * 1000;
      });

      // Rappels stock bas
      const seuilReappro = inputs.delai_reappro_jours || 14;
      const stockSecurite = inputs.stock_securite_jours || 7;
      const stockBas = stockItems.filter(p => {
        // Estimation vente journaliere (placeholder: 1/jour)
        const venteJournaliere = 1;
        const seuil = venteJournaliere * seuilReappro + venteJournaliere * stockSecurite;
        return (p.effective_stock || 0) < seuil;
      });

      // Rappels peremption
      const peremptionAlertes = stockItems
        .filter(p => p.date_peremption)
        .map(p => ({
          ...p,
          days_left: window.Utils ? Utils.daysUntil(p.date_peremption) : null
        }))
        .filter(p => p.days_left !== null && p.days_left < 90)
        .map(p => ({
          ...p,
          niveau: p.days_left < 30 ? 'rouge' : 'orange'
        }))
        .sort((a, b) => a.days_left - b.days_left);

      // Livraisons recentes (pour remerciement avis)
      const livraisonsRecentes = orders.filter(o => {
        if (!['livree', 'recu'].includes(o.status)) return false;
        const d = new Date(o.order_date).getTime();
        return (now - d) <= 3 * 24 * 3600 * 1000;
      });

      // Factures impayees > 7j (placeholder - besoin statut paiement)
      const facturesImpayees = orders.filter(o => {
        if (!['acceptee', 'livree'].includes(o.status)) return false;
        const d = new Date(o.order_date).getTime();
        return (now - d) > 7 * 24 * 3600 * 1000;
      });

      // Agenda livraisons prevues
      const agendaLivraisons = orders
        .filter(o => o.status === 'acceptee' && o.livraison_date)
        .map(o => ({ id: o.id, date: o.livraison_date, client: o.client_name }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      return {
        commandes_attente_48h: commandesAttente,
        stock_bas: stockBas,
        peremption_alertes: peremptionAlertes,
        livraisons_recentes_3j: livraisonsRecentes,
        factures_impayees_7j: facturesImpayees,
        agenda_livraisons: agendaLivraisons
      };
    },

    getRecommendations(sellerData, inputs) {
      const s = this.compute(sellerData, inputs);
      const recs = [];

      if (s.commandes_attente_48h.length > 0) {
        recs.push({ id: 'rec_traiter_urgence_48h', priorite: 'haute',
          title: s.commandes_attente_48h.length + ' commande(s) en attente > 48h',
          detail: 'Traiter en priorite aujourd\'hui. Risque d\'annulation client eleve au-dela de 72h.',
          action: s.commandes_attente_48h.length + ' commande(s) en attente > 48h. Traiter en priorite aujourd\'hui.' });
      }
      if (s.stock_bas.length > 0) {
        recs.push({ id: 'rec_commander_stock_bas', priorite: 'haute',
          title: s.stock_bas.length + ' produit(s) en rupture imminente',
          detail: 'Lancer commande fournisseur pour eviter la rupture. Delai de reappro moyen : 14 jours.',
          action: s.stock_bas.length + ' produit(s) en rupture imminente. Lancer commande fournisseur.' });
      }
      if (s.peremption_alertes.filter(p => p.niveau === 'rouge').length > 0) {
        recs.push({ id: 'rec_promo_peremption', priorite: 'haute',
          title: s.peremption_alertes.filter(p => p.niveau === 'rouge').length + ' produit(s) perempt(s) dans < 30j',
          detail: 'Lancer promo -25% immediatement pour ecouler le stock avant peremption.',
          action: s.peremption_alertes.filter(p => p.niveau === 'rouge').length + ' produit(s) perempt(s) dans < 30j. Lancer promo -25%.' });
      }
      if (s.factures_impayees_7j.length > 0) {
        recs.push({ id: 'rec_relance_paiement', priorite: 'moyenne',
          title: s.factures_impayees_7j.length + ' facture(s) impayee(s) > 7j',
          detail: 'Envoyer le message template \"relance_paiement\" aux clients concernes.',
          action: s.factures_impayees_7j.length + ' facture(s) impayee(s) > 7j. Envoyer message \"relance_paiement\".' });
      }
      if (s.livraisons_recentes_3j.length > 0) {
        recs.push({ id: 'rec_remerciement_avis', priorite: 'basse',
          title: s.livraisons_recentes_3j.length + ' livraison(s) recente(s)',
          detail: 'Envoyer le message \"remerciement_avis\" pour solliciter un avis client (boost trust).',
          action: s.livraisons_recentes_3j.length + ' livraison(s) recente(s): envoyer message \"remerciement_avis\".' });
      }
      return recs;
    },

    /* Genere un message pre-redige a partir d'un template et de variables */
    generateMessage(templateKey, vars) {
      return utils.applyTemplate(templateKey, vars);
    },

    render(sellerData, inputs) {
      const s = this.compute(sellerData, inputs);
      const recs = this.getRecommendations(sellerData, inputs);

      const nbPeremptionRouge = s.peremption_alertes.filter(p => p.niveau === 'rouge').length;
      const kpis = [
        { label: 'Commandes > 48h', value: s.commandes_attente_48h.length,
          detail: 'A traiter en urgence' },
        { label: 'Stock bas', value: s.stock_bas.length,
          detail: 'Reappro a lancer' },
        { label: 'Peremption < 30j', value: nbPeremptionRouge,
          detail: 'Promo -25% conseillee' },
        { label: 'Factures impayees > 7j', value: s.factures_impayees_7j.length,
          detail: 'Relance a envoyer' }
      ];

      // Alertes detaillees (table)
      const alertesRows = []
        .concat(s.commandes_attente_48h.map(o => [
          utils.escapeHtml(o.id || '—'),
          'Commande > 48h',
          utils.escapeHtml(o.client_name || 'Client'),
          utils.renderBadge('haute', 'URGENT')
        ]))
        .concat(s.stock_bas.map(p => [
          utils.escapeHtml(p.nom),
          'Stock bas',
          'Stock : ' + (p.effective_stock || 0),
          utils.renderBadge('haute', 'RUPTURE')
        ]))
        .concat(s.peremption_alertes.map(p => [
          utils.escapeHtml(p.nom),
          'Peremption',
          'Dans ' + p.days_left + ' jours',
          utils.renderBadge(p.niveau === 'rouge' ? 'haute' : 'moyenne',
            p.niveau === 'rouge' ? '< 30j' : '< 90j')
        ]))
        .concat(s.factures_impayees_7j.map(o => [
          utils.escapeHtml(o.id || '—'),
          'Facture impayee',
          utils.escapeHtml(o.client_name || 'Client'),
          utils.renderBadge('moyenne', '> 7j')
        ]));
      const alertesCard = utils.renderCard('Alertes et rappels (' + alertesRows.length + ')',
        utils.renderTable(['Element', 'Type', 'Detail', 'Niveau'], alertesRows,
          { empty: 'Aucune alerte active. Tout est a jour !' })
      );

      // Agenda livraisons
      const agendaRows = s.agenda_livraisons.map(o => [
        utils.escapeHtml(o.id || '—'),
        utils.escapeHtml(o.date || '—'),
        utils.escapeHtml(o.client || '—')
      ]);
      const agendaCard = utils.renderCard('Agenda des livraisons prevues',
        utils.renderTable(['Commande', 'Date prevue', 'Client'], agendaRows,
          { empty: 'Aucune livraison planifiee.' })
      );

      // Templates de messages
      const templatesDispos = Object.keys(REFERENCE.messages_templates || {});
      const apercu = templatesDispos.map(function (t) {
        const msg = utils.applyTemplate(t, {
          client: '[Client]', commande_id: 'BF-XXXXX', montant: '0',
          produit: '[Produit]', vendeur: '[Vendeur]', delai: '7'
        });
        return '<div class="msg-template" style="margin-bottom:12px;padding:8px;background:var(--surface-2);border-radius:6px;">' +
          '<strong style="display:block;margin-bottom:4px">' + utils.escapeHtml(t) + '</strong>' +
          '<pre style="white-space:pre-wrap;font-family:inherit;margin:0;font-size:0.85em;color:var(--texte-doux)">' + utils.escapeHtml(msg) + '</pre>' +
        '</div>';
      }).join('');
      const templatesCard = utils.renderCard('Messages pre-rediges (' + templatesDispos.length + ')',
        apercu || '<p class="text-doux">Aucun template disponible.</p>'
      );

      const recsCard = utils.renderCard('Recommandations (' + recs.length + ')',
        utils.renderRecommendations(recs)
      );

      return '<div class="expert-module" data-module="secretaire">' +
        '<div class="expert-module-header">' +
          '<h3 class="expert-module-title">\uD83D\uDCE7 Secretaire (Assistant)</h3>' +
          '<p class="text-doux">Rappels automatiques, alertes et modeles de messages pre-rediges.</p>' +
        '</div>' +
        utils.renderKpis(kpis) +
        alertesCard +
        agendaCard +
        templatesCard +
        recsCard +
      '</div>';
    }
  };

  /* ================================================================== */
  /* MODULE 5: STOCK MANAGER                                           */
  /* ================================================================== */
  const stock = {
    id: 'stock',
    nom: 'Stock Manager',
    icon: 'package',

    compute(sellerData, inputs) {
      inputs = inputs || {};
      const delaiReappro = inputs.delai_reappro_jours || 14;
      const stockSecuriteJours = inputs.stock_securite_jours || 7;
      const coutPossessionPct = (inputs.cout_possession_pct || 22) / 100;

      const stockItems = sellerData.stock_items || [];
      const orders = sellerData.orders || [];
      const now = Date.now();

      // Valeur du stock
      const valeurStock = stockItems.reduce((s, it) => {
        return s + (it.effective_stock || 0) * (it.prix || 0) * 0.6; // 60% du prix vente = cout achat estime
      }, 0);
      const coutPossessionAnnuel = valeurStock * coutPossessionPct;

      // Taux de rotation (placeholder: besoins 12 mois d'historique)
      const ventes30j = orders.filter(o => {
        const d = new Date(o.order_date).getTime();
        return (now - d) < 30 * 24 * 3600 * 1000;
      }).reduce((s, o) => s + o.items.reduce((ss, it) => ss + it.quantite, 0), 0);
      const stockMoyen = stockItems.reduce((s, it) => s + (it.effective_stock || 0), 0);
      const tauxRotationAnnuel = stockMoyen > 0 ? (ventes30j * 12) / stockMoyen : 0;

      // ABC analysis
      const caParProduit = stockItems.map(p => {
        const ca = orders.reduce((s, o) => {
          return s + o.items.filter(it => it.product_id === p.id || it.nom === p.nom)
                          .reduce((ss, it) => ss + (it.line_total || 0), 0);
        }, 0);
        return { id: p.id, nom: p.nom, categorie: p.categorie, ca: ca, stock: p.effective_stock || 0 };
      }).filter(p => p.ca > 0).sort((a, b) => b.ca - a.ca);

      const totalCa = caParProduit.reduce((s, p) => s + p.ca, 0);
      let cumul = 0;
      caParProduit.forEach(p => {
        cumul += p.ca;
        const cumulPct = totalCa > 0 ? cumul / totalCa : 0;
        p.classe = cumulPct <= 0.80 ? 'A' : cumulPct <= 0.95 ? 'B' : 'C';
      });

      // Dead stock (pas de vente > 60j)
      const deadStock = stockItems.filter(p => {
        const ventesProduit = orders.filter(o => {
          const d = new Date(o.order_date).getTime();
          return (now - d) < 60 * 24 * 3600 * 1000;
        }).some(o => o.items.some(it => it.product_id === p.id || it.nom === p.nom));
        return !ventesProduit;
      });

      // Alertes peremption
      const peremption = stockItems
        .filter(p => p.date_peremption)
        .map(p => ({
          id: p.id, nom: p.nom, date_peremption: p.date_peremption,
          days_left: window.Utils ? Utils.daysUntil(p.date_peremption) : null
        }))
        .filter(p => p.days_left !== null && p.days_left < 90)
        .map(p => ({ ...p, niveau: p.days_left < 30 ? 'rouge' : 'orange' }))
        .sort((a, b) => a.days_left - b.days_left);

      // Suggestions reappro
      const suggestionsReappro = stockItems.map(p => {
        const ventesProduit30j = orders.filter(o => {
          const d = new Date(o.order_date).getTime();
          return (now - d) < 30 * 24 * 3600 * 1000;
        }).reduce((s, o) => {
          return s + o.items.filter(it => it.product_id === p.id || it.nom === p.nom)
                          .reduce((ss, it) => ss + it.quantite, 0);
        }, 0);
        const venteJournaliere = ventesProduit30j / 30;
        const stockOptimal = (venteJournaliere * delaiReappro) + (venteJournaliere * stockSecuriteJours);
        const qteCommander = Math.max(0, Math.ceil(stockOptimal - (p.effective_stock || 0)));
        return {
          id: p.id, nom: p.nom, stock_actuel: p.effective_stock || 0,
          vente_journaliere: venteJournaliere, stock_optimal: stockOptimal,
          qte_commander: qteCommander
        };
      }).filter(s => s.qte_commander > 0);

      return {
        valeur_stock: valeurStock,
        cout_possession_annuel: coutPossessionAnnuel,
        taux_rotation: tauxRotationAnnuel,
        abc: caParProduit,
        dead_stock: deadStock,
        peremption: peremption,
        suggestions_reappro: suggestionsReappro
      };
    },

    getRecommendations(sellerData, inputs) {
      const s = this.compute(sellerData, inputs);
      const ratios = REFERENCE.ratios_sains || {};
      const recs = [];

      s.peremption.filter(p => p.niveau === 'rouge').forEach(p => {
        recs.push({ id: 'rec_peremption_rouge_' + p.id, priorite: 'haute',
          title: p.nom + ' expire dans ' + p.days_left + ' jours',
          detail: 'Lancer promo -25% immediatement pour ecouler le stock avant peremption.',
          action: p.nom + ' expire dans ' + p.days_left + ' jours. Lancer promo -25% immediatement.' });
      });

      const classeA = s.abc.filter(p => p.classe === 'A');
      if (classeA.length > 0) {
        const rupturesClasseA = classeA.filter(p => p.stock < 5);
        rupturesClasseA.forEach(p => {
          recs.push({ id: 'rec_reappro_classe_a_' + p.id, priorite: 'haute',
            title: 'URGENT classe A : ' + p.nom + ' en rupture imminente',
            detail: 'Stock restant : ' + p.stock + '. CA a risque si rupture - reapprovisionner immediatement.',
            action: 'URGENT (classe A): reappro ' + p.nom + '. CA a risque si rupture.' });
        });
      }

      s.dead_stock.forEach(p => {
        recs.push({ id: 'rec_dead_stock_' + p.id, priorite: 'moyenne',
          title: p.nom + ' : stock dormant > 60 jours',
          detail: 'Lancer promo -20% ou repositionner. Sinon envisager abandon.',
          action: p.nom + ' dormant > 60 jours. Lancer promo -20% ou repositionner.' });
      });

      if (s.taux_rotation < (ratios.rotation_stock_min || 4)) {
        recs.push({ id: 'rec_rotation_faible', priorite: 'moyenne',
          title: 'Taux de rotation faible (' + s.taux_rotation.toFixed(1) + '/an)',
          detail: 'Min sain : ' + (ratios.rotation_stock_min || 4) + '/an. Reduire quantites commandees, passer en flux tendu.',
          action: 'Taux rotation = ' + s.taux_rotation.toFixed(1) + '/an (< 4). Reduire quantites commandees, flux tendu.' });
      }

      return recs;
    },

    render(sellerData, inputs) {
      const s = this.compute(sellerData, inputs);
      const recs = this.getRecommendations(sellerData, inputs);
      const ratios = REFERENCE.ratios_sains || {};

      const kpis = [
        { label: 'Valeur stock', value: utils.formatFCFA(s.valeur_stock),
          detail: 'Cout d\'achat estime (60% prix vente)' },
        { label: 'Rotation annuelle', value: s.taux_rotation.toFixed(1) + '/an',
          detail: 'Min sain : ' + (ratios.rotation_stock_min || 4) + '/an' },
        { label: 'Cout possession/an', value: utils.formatFCFA(s.cout_possession_annuel),
          detail: '~22% de la valeur stock' },
        { label: 'Dead stock', value: s.dead_stock.length,
          detail: 'Sans vente > 60 jours' }
      ];

      // Rotation progress bar
      const rotPct = Math.min(100, (s.taux_rotation / (ratios.rotation_stock_excellent || 8)) * 100);
      const rotColorClass = s.taux_rotation >= (ratios.rotation_stock_min || 4) ? 'success' : 'warning';
      const rotProgress = utils.renderProgress(rotPct, 100, {
        colorClass: rotColorClass,
        title: 'Rotation annuelle vs objectif 8/an'
      });

      // ABC Analysis table
      const abcRows = s.abc.map(p => {
        const cls = p.classe === 'A' ? utils.renderBadge('haute', 'A')
          : p.classe === 'B' ? utils.renderBadge('moyenne', 'B')
          : utils.renderBadge('info', 'C');
        return [
          utils.escapeHtml(p.nom),
          utils.escapeHtml(p.categorie || '—'),
          utils.formatFCFA(p.ca),
          p.stock,
          cls
        ];
      });
      const abcCard = utils.renderCard('ABC Analysis (Pareto 80/20)',
        utils.renderTable(['Produit', 'Categorie', 'CA genere', 'Stock', 'Classe'], abcRows,
          { empty: 'Aucun produit vendu - pas encore de classification ABC.' }) +
        '<div style="margin-top:12px"><div class="expert-kpi-label">Rotation annuelle vs objectif excellent (8/an)</div>' + rotProgress + '</div>' +
        '<p class="text-doux" style="margin-top:8px">A : 20% produits / 80% CA (surveillance stricte). B : 30% / 15% CA. C : 50% / 5% CA.</p>'
      );

      // Dead stock table
      const deadRows = s.dead_stock.map(p => [
        utils.escapeHtml(p.nom),
        utils.escapeHtml(p.categorie || '—'),
        (p.effective_stock || 0),
        utils.renderBadge('moyenne', '> 60j')
      ]);
      const deadCard = utils.renderCard('Stock dormant (' + s.dead_stock.length + ')',
        utils.renderTable(['Produit', 'Categorie', 'Stock', 'Derniere vente'], deadRows,
          { empty: 'Aucun stock dormant - bonne rotation !' })
      );

      // Peremption
      const perempRows = s.peremption.map(p => [
        utils.escapeHtml(p.nom),
        utils.escapeHtml(p.date_peremption),
        p.days_left + ' jours',
        utils.renderBadge(p.niveau === 'rouge' ? 'haute' : 'moyenne',
          p.niveau === 'rouge' ? '< 30j' : '< 90j')
      ]);
      const perempCard = utils.renderCard('Alertes peremption (' + s.peremption.length + ')',
        utils.renderTable(['Produit', 'Date peremption', 'Reste', 'Niveau'], perempRows,
          { empty: 'Aucun produit perissable en alerte.' })
      );

      // Reappro
      const reapproRows = s.suggestions_reappro.map(r => [
        utils.escapeHtml(r.nom),
        r.stock_actuel,
        r.vente_journaliere.toFixed(1),
        Math.round(r.stock_optimal),
        utils.renderBadge('moyenne', r.qte_commander + ' u')
      ]);
      const reapproCard = utils.renderCard('Suggestions de reappro (' + s.suggestions_reappro.length + ')',
        utils.renderTable(['Produit', 'Stock actuel', 'Vente/jour', 'Stock optimal', 'A commander'], reapproRows,
          { empty: 'Aucun reappro necessaire - stocks optimaux.' })
      );

      const recsCard = utils.renderCard('Recommandations (' + recs.length + ')',
        utils.renderRecommendations(recs)
      );

      return '<div class="expert-module" data-module="stock">' +
        '<div class="expert-module-header">' +
          '<h3 class="expert-module-title">\uD83D\uDCE6 Stock Manager</h3>' +
          '<p class="text-doux">Rotation, ABC analysis, dead stock, peremption et reappro automatique.</p>' +
        '</div>' +
        utils.renderKpis(kpis) +
        abcCard +
        deadCard +
        perempCard +
        reapproCard +
        recsCard +
      '</div>';
    }
  };

  /* ================================================================== */
  /* MODULE 6: CONSEILLER VENTES                                       */
  /* ================================================================== */
  const conseiller = {
    id: 'conseiller',
    nom: 'Conseiller Ventes',
    icon: 'lightbulb',

    compute(sellerData, inputs) {
      const orders = sellerData.orders || [];
      const stockItems = sellerData.stock_items || [];
      const now = Date.now();

      // Panier moyen
      const caTotal = sellerData.total_revenue || 0;
      const nbCommandes = orders.length;
      const panierMoyen = nbCommandes > 0 ? caTotal / nbCommandes : 0;

      // Cross-sell: co-occurrence dans paniers
      const coOccurrence = {};
      orders.forEach(o => {
        const produits = o.items.map(it => it.product_id || it.nom).filter(Boolean);
        for (let i = 0; i < produits.length; i++) {
          for (let j = i + 1; j < produits.length; j++) {
            const key = produits[i] + '||' + produits[j];
            coOccurrence[key] = (coOccurrence[key] || 0) + 1;
          }
        }
      });
      const crossSell = Object.keys(coOccurrence)
        .map(k => {
          const [x, y] = k.split('||');
          const totalX = orders.filter(o => o.items.some(it => (it.product_id || it.nom) === x)).length;
          return { x: x, y: y, co_occurrence: coOccurrence[k], confiance: totalX > 0 ? coOccurrence[k] / totalX : 0 };
        })
        .filter(c => c.confiance >= 0.30)
        .sort((a, b) => b.confiance - a.confiance);

      // Upsell: identifier version premium (placeholder: meme categorie, prix +30%)
      const upsellSuggestions = stockItems.map(p => {
        const memesCat = stockItems.filter(q => q.categorie === p.categorie && q.id !== p.id && q.prix > p.prix * 1.3);
        return { id: p.id, nom: p.nom, prix_actuel: p.prix,
                 premium: memesCat.length > 0 ? memesCat[0] : null };
      }).filter(u => u.premium);

      // Score popularite (placeholder: vues = reviews_count, paniers/achats = orders)
      const scores = stockItems.map(p => {
        const ventes = orders.reduce((s, o) => {
          return s + o.items.filter(it => it.product_id === p.id || it.nom === p.nom).reduce((ss, it) => ss + it.quantite, 0);
        }, 0);
        const paniers = orders.filter(o => o.items.some(it => it.product_id === p.id || it.nom === p.nom)).length;
        const vues = p.reviews_count || 0;
        const score = (vues * 0.3 + paniers * 0.5 + ventes * 1.0) / 30;
        return { id: p.id, nom: p.nom, score: score, ventes: ventes };
      }).sort((a, b) => b.score - a.score);

      // Periodes optimales par produit (base sur saisonnalite categorie)
      const periodes = stockItems.map(p => {
        const s = REFERENCE.saisonnalite && REFERENCE.saisonnalite[p.categorie];
        return { id: p.id, nom: p.nom, pic_mois: s ? s.pic : [], creux_mois: s ? s.creux : [] };
      });

      // Suggestions de lots (cross-sell > 40%)
      const lots = crossSell.filter(c => c.confiance >= 0.40).map(c => {
        const p1 = stockItems.find(p => p.id === c.x || p.nom === c.x);
        const p2 = stockItems.find(p => p.id === c.y || p.nom === c.y);
        if (!p1 || !p2) return null;
        const remise = (REFERENCE.ratios_sains && REFERENCE.ratios_sains.remise_lot_default_pct) || 12;
        const prixLot = Math.round((p1.prix + p2.prix) * (1 - remise / 100));
        return { produit1: p1.nom, produit2: p2.nom, prix_indiv: p1.prix + p2.prix, prix_lot: prixLot, remise: remise };
      }).filter(Boolean);

      // Taux conversion (placeholder sans donnees trafic)
      const tauxConversion = null; // Necessite donnees visiteurs non disponibles

      return {
        panier_moyen: panierMoyen,
        cross_sell: crossSell,
        upsell_suggestions: upsellSuggestions,
        scores_popularite: scores,
        periodes_optimales: periodes,
        lots: lots,
        taux_conversion: tauxConversion
      };
    },

    getRecommendations(sellerData, inputs) {
      const c = this.compute(sellerData, inputs);
      const recs = [];

      c.cross_sell.forEach(cs => {
        recs.push({ id: 'rec_cross_sell_' + cs.x + '_' + cs.y, priorite: 'moyenne',
          title: 'Cross-sell : ' + cs.x + ' + ' + cs.y,
          detail: Math.round(cs.confiance * 100) + '% des acheteurs de ' + cs.x + ' prendent aussi ' + cs.y + '.',
          action: 'Aux acheteurs de ' + cs.x + ', recommander aussi ' + cs.y + ' (' + Math.round(cs.confiance * 100) + '% ont les 2).' });
      });

      c.upsell_suggestions.forEach(u => {
        if (u.premium) {
          recs.push({ id: 'rec_upsell_premium_' + u.id, priorite: 'moyenne',
            title: 'Upsell : ' + u.nom + ' -> ' + u.premium.nom,
            detail: 'Proposer la version premium (' + utils.formatFCFA(u.premium.prix) + ') aux acheteurs de ' + u.nom + ' (' + utils.formatFCFA(u.prix_actuel) + ').',
            action: 'Proposer version premium ' + u.premium.nom + ' (' + utils.formatFCFA(u.premium.prix) + ') aux acheteurs de ' + u.nom + '.' });
        }
      });

      c.lots.forEach(l => {
        recs.push({ id: 'rec_lot_' + l.produit1 + '_' + l.produit2, priorite: 'haute',
          title: 'Lot complementaire : ' + l.produit1 + ' + ' + l.produit2,
          detail: 'Prix indiv : ' + utils.formatFCFA(l.prix_indiv) + ' - Prix lot : ' + utils.formatFCFA(l.prix_lot) + ' (remise ' + l.remise + '%).',
          action: 'Creer un lot ' + l.produit1 + ' + ' + l.produit2 + ' a ' + utils.formatFCFA(l.prix_lot) + ' (remise ' + l.remise + '%).' });
      });

      const emergents = c.scores_popularite.filter(s => s.score > 5 && s.ventes < 5);
      emergents.forEach(e => {
        recs.push({ id: 'rec_emergent_' + e.id, priorite: 'moyenne',
          title: e.nom + ' : produit emergent (score ' + e.score.toFixed(1) + ')',
          detail: 'Score de popularite eleve mais peu de ventes (' + e.ventes + '). Pousser en promo decouverte.',
          action: e.nom + ' emerge (score ' + e.score.toFixed(1) + ') mais peu de ventes. Pousser en promo decouverte.' });
      });

      const ratios = REFERENCE.ratios_sains || {};
      if (c.panier_moyen > 0 && c.panier_moyen < (ratios.panier_moyen_objectif_fcfa || 15000)) {
        recs.push({ id: 'rec_panier_faible', priorite: 'moyenne',
          title: 'Panier moyen faible (' + utils.formatFCFA(c.panier_moyen) + ')',
          detail: 'Objectif : ' + utils.formatFCFA(ratios.panier_moyen_objectif_fcfa || 15000) + '. Former des lots complementaires pour augmenter la valeur moyenne.',
          action: 'Panier moyen faible (' + utils.formatFCFA(c.panier_moyen) + '). Former un lot pour augmenter la valeur.' });
      }
      return recs;
    },

    render(sellerData, inputs) {
      const c = this.compute(sellerData, inputs);
      const recs = this.getRecommendations(sellerData, inputs);
      const ratios = REFERENCE.ratios_sains || {};

      const kpis = [
        { label: 'Panier moyen', value: utils.formatFCFA(c.panier_moyen),
          detail: 'Objectif : ' + utils.formatFCFA(ratios.panier_moyen_objectif_fcfa || 15000) },
        { label: 'Cross-sell', value: c.cross_sell.length + ' paire(s)',
          detail: 'Confiance >= 30%' },
        { label: 'Lots suggérés', value: c.lots.length,
          detail: 'Confiance >= 40%' },
        { label: 'Upsell', value: c.upsell_suggestions.length,
          detail: 'Versions premium disponibles' }
      ];

      // Lots complementaires
      const lotsRows = c.lots.map(l => [
        utils.escapeHtml(l.produit1) + ' + ' + utils.escapeHtml(l.produit2),
        utils.formatFCFA(l.prix_indiv),
        utils.formatFCFA(l.prix_lot),
        '-' + l.remise + '%',
        utils.renderBadge('ok', 'Lot')
      ]);
      const lotsCard = utils.renderCard('Lots complementaires suggérés (' + c.lots.length + ')',
        utils.renderTable(['Combinaison', 'Prix indiv.', 'Prix lot', 'Remise', 'Statut'], lotsRows,
          { empty: 'Pas assez d\'historique commandes pour suggerer des lots.' })
      );

      // Cross-sell
      const crossRows = c.cross_sell.slice(0, 10).map(cs => [
        utils.escapeHtml(cs.x),
        utils.escapeHtml(cs.y),
        cs.co_occurrence,
        Math.round(cs.confiance * 100) + '%',
        utils.renderProgress(cs.confiance * 100, 100, { colorClass: 'success' })
      ]);
      const crossCard = utils.renderCard('Cross-sell : produits souvent achetes ensemble',
        utils.renderTable(['Produit A', 'Produit B', 'Co-occurrence', 'Confiance', 'Niveau'], crossRows,
          { empty: 'Aucune co-occurrence significative (minimum 30% confiance).' })
      );

      // Upsell
      const upsellRows = c.upsell_suggestions.map(u => [
        utils.escapeHtml(u.nom),
        utils.formatFCFA(u.prix_actuel),
        utils.escapeHtml(u.premium.nom),
        utils.formatFCFA(u.premium.prix),
        utils.renderBadge('info', '+' + Math.round((u.premium.prix / u.prix_actuel - 1) * 100) + '%')
      ]);
      const upsellCard = utils.renderCard('Upsell : versions premium disponibles',
        utils.renderTable(['Produit', 'Prix actuel', 'Premium', 'Prix premium', 'Delta'], upsellRows,
          { empty: 'Aucun produit premium a proposer en upsell.' })
      );

      // Top popularite
      const popRows = c.scores_popularite.slice(0, 5).map((p, i) => [
        '#' + (i + 1),
        utils.escapeHtml(p.nom),
        p.score.toFixed(1),
        p.ventes,
        utils.renderProgress(p.score, 30, { colorClass: 'success' })
      ]);
      const popCard = utils.renderCard('Top 5 produits par score de popularite',
        utils.renderTable(['Rang', 'Produit', 'Score', 'Ventes', 'Niveau'], popRows,
          { empty: 'Pas encore assez de donnees de vente.' })
      );

      const recsCard = utils.renderCard('Recommandations (' + recs.length + ')',
        utils.renderRecommendations(recs)
      );

      return '<div class="expert-module" data-module="conseiller">' +
        '<div class="expert-module-header">' +
          '<h3 class="expert-module-title">\uD83D\uDCA1 Conseiller Ventes</h3>' +
          '<p class="text-doux">Cross-sell, upsell, lots complementaires et scoring de popularite.</p>' +
        '</div>' +
        utils.renderKpis(kpis) +
        lotsCard +
        crossCard +
        upsellCard +
        popCard +
        recsCard +
      '</div>';
    }
  };

  /* ================================================================== */
  /* RENDU GLOBAL (ONGLETS)                                            */
  /* ================================================================== */
  const MODULES = [comptable, financier, marketing, secretaire, stock, conseiller];

  /* Mapping icon -> emoji pour onglets (les vraies icones SVG sont normalement
   * injectees par ui-components ; fallback emoji pour compatibilite. */
  const ICONS = {
    calculator: '\uD83E\uDDA9',
    'trending-up': '\uD83D\uDCC8',
    megaphone: '\uD83D\uDCE3',
    mail: '\uD83D\uDCE7',
    package: '\uD83D\uDCE6',
    lightbulb: '\uD83D\uDCA1'
  };

  function _storageKey(sellerData) {
    const sid = sellerData && sellerData.seller_id ? String(sellerData.seller_id) : '';
    if (sid) return 'achetons_bf_expert_tab_' + sid;
    return 'expert_modules_last_tab'; /* legacy fallback */
  }

  function _readLastTab(sellerData) {
    try {
      const sid = sellerData && sellerData.seller_id ? String(sellerData.seller_id) : '';
      if (sid) {
        const v = localStorage.getItem('achetons_bf_expert_tab_' + sid);
        if (v) return v;
      }
      return localStorage.getItem('expert_modules_last_tab') || 'comptable';
    } catch (e) { return 'comptable'; }
  }

  function _writeLastTab(sellerData, moduleId) {
    try {
      const sid = sellerData && sellerData.seller_id ? String(sellerData.seller_id) : '';
      if (sid) localStorage.setItem('achetons_bf_expert_tab_' + sid, moduleId);
      /* Legacy conservé pour retro-compat */
      localStorage.setItem('expert_modules_last_tab', moduleId);
    } catch (e) {}
  }

  function renderAll(container, sellerData, inputs) {
    inputs = inputs || {};
    if (!container) return;
    sellerData = sellerData || {};

    function _render() {
      const lastTab = _readLastTab(sellerData);
      const validIds = MODULES.map(m => m.id);
      const initialTab = validIds.indexOf(lastTab) >= 0 ? lastTab : 'comptable';

      const tabs = MODULES.map(m => {
        const icon = ICONS[m.icon] || '';
        return '<button class="expert-tab' + (m.id === initialTab ? ' active' : '') + '" data-module="' + m.id + '" type="button">' +
          '<span class="expert-tab-icon" aria-hidden="true">' + icon + '</span>' +
          '<span class="expert-tab-name">' + utils.escapeHtml(m.nom) + '</span>' +
        '</button>';
      }).join('');

      container.innerHTML =
        '<div class="expert-tabs" role="tablist">' + tabs + '</div>' +
        '<div class="expert-tab-content" id="expert-tab-content"></div>';

      const contentEl = container.querySelector('#expert-tab-content');
      const tabBtns = container.querySelectorAll('.expert-tab');

      function activate(moduleId) {
        if (validIds.indexOf(moduleId) < 0) moduleId = 'comptable';
        tabBtns.forEach(b => b.classList.remove('active'));
        const btn = container.querySelector('.expert-tab[data-module="' + moduleId + '"]');
        if (btn) btn.classList.add('active');
        const mod = MODULES.find(m => m.id === moduleId);
        if (mod) {
          let html;
          try {
            html = mod.render(sellerData, inputs);
          } catch (e) {
            console.error('[ExpertSystems] Erreur render module ' + moduleId + ':', e);
            html = utils.renderCard('Erreur de rendu',
              '<p class="text-doux">Le module \"' + utils.escapeHtml(mod.nom) + '\" a leve une erreur : ' +
              utils.escapeHtml(String(e && e.message || e)) + '</p>');
          }
          contentEl.innerHTML = html;
          _writeLastTab(sellerData, moduleId);
          /* Dispatch un event pour allow hooks externes (ex: dashboard re-init tooltips) */
          try {
            const ev = new CustomEvent('expert:tabchange', { detail: { moduleId: moduleId, container: container } });
            container.dispatchEvent(ev);
          } catch (e) {}
        }
      }

      tabBtns.forEach(b => {
        b.addEventListener('click', function () {
          activate(b.getAttribute('data-module'));
        });
      });

      activate(initialTab);
    }

    /* Charge reference puis rend. Si fetch non disponible (Node tests),
     * la callback est tout de meme appelee avec REFERENCE par defaut. */
    if (typeof utils.loadReference === 'function') {
      utils.loadReference(_render);
    } else {
      _render();
    }
  }

  /* API publique */
  return {
    utils: utils,
    comptable: comptable,
    financier: financier,
    marketing: marketing,
    secretaire: secretaire,
    stock: stock,
    conseiller: conseiller,
    renderAll: renderAll,
    loadReference: utils.loadReference,
    getReference: function () { return REFERENCE; },
    setReference: function (data) { REFERENCE = Object.assign(REFERENCE, data || {}); REFERENCE_LOADED = true; },
    MODULES: MODULES
  };
})();

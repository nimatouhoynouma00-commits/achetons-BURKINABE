/* js/search.js - Recherche intelligente avec fuzzy + synonymes + autocomplete */

const Search = {
  /* Recherche fuzzy sur products.json avec poids par champ */
  fuzzySearch(query, options = {}) {
    const products = Array.isArray(Data.products) ? Data.products : [];
    const searchConfig = Data.searchConfig || {};

    if (!query || query.length < (searchConfig.min_query_length || 2)) {
      return products.slice();
    }

    query = String(query).toLowerCase().trim();
    const synonyms = searchConfig.synonyms || {};
    const fields = Array.isArray(searchConfig.fields) ? searchConfig.fields : [];
    const threshold = searchConfig.fuzzy_threshold || 0.6;

    // Etend la requete avec les synonymes
    const queries = [query];
    Object.entries(synonyms).forEach(([key, syns]) => {
      if (query.includes(key)) {
        syns.forEach(s => queries.push(s.toLowerCase()));
      } else if (syns.some(s => query.includes(s.toLowerCase()))) {
        queries.push(key.toLowerCase());
      }
    });

    const results = products.map(product => {
      let bestScore = 0;
      let matchedField = null;

      fields.forEach(field => {
        const fieldName = field.name;
        const weight = field.weight || 1;
        let value;

        // Mapping special vendeur_nom -> seller.nom
        if (fieldName === 'vendeur_nom') {
          const seller = Data.getSeller(product.vendeur_id);
          value = seller ? seller.nom : '';
        } else if (fieldName === 'certification') {
          value = (product.certification || []).join(' ');
        } else if (fieldName === 'tags') {
          value = (product.tags || []).join(' ');
        } else {
          value = product[fieldName];
        }

        if (!value) return;
        value = String(value).toLowerCase();

        queries.forEach(q => {
          let score = 0;
          if (field.search_mode === 'exact' && value === q) {
            score = 1;
          } else if (field.search_mode === 'exact_then_contains') {
            if (value === q) score = 1;
            else if (value.includes(q)) score = 0.8;
          } else if (field.search_mode === 'contains_any' && Array.isArray(product[fieldName])) {
            score = product[fieldName].some(t => String(t).toLowerCase().includes(q)) ? 0.7 : 0;
          } else {
            // contains ou default
            if (value.includes(q)) {
              score = 1 - (value.indexOf(q) / value.length) * 0.3;
            } else if (field.search_mode !== 'exact') {
              // Fuzzy fallback
              score = Utils.fuzzyScore(q, value);
            }
          }

          score *= weight;
          if (score > bestScore) {
            bestScore = score;
            matchedField = fieldName;
          }
        });
      });

      return { product, score: bestScore, matched_field: matchedField };
    }).filter(r => r.score >= threshold);

    results.sort((a, b) => b.score - a.score);
    return results.map(r => r.product);
  },

  /* Quick search : retourne les N premiers resultats */
  quickSearch(query, limit = 5) {
    const results = Search.fuzzySearch(query);
    return Array.isArray(results) ? results.slice(0, limit) : [];
  },

  /* Autocomplete : suggestions de noms */
  autocomplete(query, max = 8) {
    const searchConfig = Data.searchConfig || {};
    if (!query || query.length < (searchConfig.min_query_length || 2)) return [];
    const q = String(query).toLowerCase().trim();
    const names = Array.isArray(Data.products) ? Data.products.map(p => p.nom) : [];
    const categories = Array.isArray(Data.categories) ? Data.categories.map(c => c.nom) : [];
    const sellers = Array.isArray(Data.sellers) ? Data.sellers.map(s => s.nom) : [];

    const all = [...names, ...categories, ...sellers];
    const matches = all.filter(s => s.toLowerCase().includes(q));
    return [...new Set(matches)].slice(0, max);
  },

  /* Filtre une liste de produits par categorie/certification/trust */
  filterProducts(products, { category, certifications, trustLevels, region } = {}) {
    let result = products.slice();

    if (category && category !== 'toutes') {
      result = result.filter(p => p.categorie === category);
    }
    if (certifications && certifications.length) {
      result = result.filter(p =>
        certifications.some(c => (p.certification || []).includes(c))
      );
    }
    if (trustLevels && trustLevels.length) {
      result = result.filter(p => {
        const seller = Data.getSeller(p.vendeur_id);
        return seller && trustLevels.includes(seller.trust_level);
      });
    }
    if (region) {
      result = result.filter(p => p.region === region);
    }
    return result;
  },

  /* Trie une liste de produits */
  sortProducts(products, mode = 'plus_recent') {
    const sorted = products.slice();
    switch (mode) {
      case 'prix_asc':
        sorted.sort((a, b) => a.prix - b.prix);
        break;
      case 'prix_desc':
        sorted.sort((a, b) => b.prix - a.prix);
        break;
      case 'meilleures_avis':
        sorted.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0));
        break;
      case 'plus_recent':
        sorted.sort((a, b) => new Date(b.date_production || 0) - new Date(a.date_production || 0));
        break;
      case 'populaire':
        sorted.sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0));
        break;
    }
    return sorted;
  }
};

window.Search = Search;

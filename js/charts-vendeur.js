/* js/charts-vendeur.js - Mini graphiques dashboard vendeur (CSS only) */

const Charts = {
  bar(values, labels, options = {}) {
    const max = Math.max(...values, 1);
    const color = options.color || 'var(--terre)';
    return `
      <div class="chart-bars" role="img" aria-label="Graphique en barres">
        ${values.map((v, i) => `
          <div class="chart-bar-item">
            <div class="chart-bar-track">
              <div class="chart-bar-fill" style="height: ${(v / max * 100)}%; background: ${color}"></div>
            </div>
            <span class="chart-bar-label">${labels[i] || ''}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
};

window.Charts = Charts;

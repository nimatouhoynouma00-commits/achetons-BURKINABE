const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html')).sort();
const hrefRegex = /href=["']([^"']+)["']/g;
const missing = [];
for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  let m;
  while ((m = hrefRegex.exec(content))) {
    const href = m[1];
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    const target = href.split('?')[0].split('#')[0];
    if (!target) continue;
    const candidatePaths = [
      path.join(root, target),
      path.join(root, path.dirname(file), target)
    ];
    const exists = candidatePaths.some(p => fs.existsSync(p));
    if (!exists) {
      missing.push({ from: file, to: href });
    }
  }
}
console.log(JSON.stringify(missing, null, 2));

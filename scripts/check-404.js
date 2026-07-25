#!/usr/bin/env node
// check-404.js - Vérifie les 404 sur toutes les pages
const http = require('http');
const fs = require('fs');
const path = require('path');

const PROJ = '/home/z/my-project/workspace/prod';
const BASE = 'http://localhost:8088';

function httpGet(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', e => resolve({ status: 0, error: e.message }));
  });
}

async function checkPage(pageName) {
  const res = await httpGet(`${BASE}/${pageName}.html`);
  if (res.status !== 200) {
    console.log(`✗ ${pageName}.html: HTTP ${res.status}`);
    return;
  }
  
  // Extract CSS and JS links
  const cssLinks = [...res.body.matchAll(/<link[^>]+href="([^"]+\.css)"/g)].map(m => m[1]);
  const jsLinks = [...res.body.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map(m => m[1]);
  
  const issues = [];
  for (const css of cssLinks) {
    const r = await httpGet(`${BASE}/${css}`);
    if (r.status !== 200) issues.push(`CSS 404: ${css}`);
  }
  for (const js of jsLinks) {
    const r = await httpGet(`${BASE}/${js}`);
    if (r.status !== 200) issues.push(`JS 404: ${js}`);
  }
  
  if (issues.length === 0) {
    console.log(`✓ ${pageName}.html: ${cssLinks.length} CSS + ${jsLinks.length} JS OK`);
  } else {
    console.log(`✗ ${pageName}.html: ${issues.length} problèmes`);
    issues.forEach(i => console.log(`    - ${i}`));
  }
}

async function main() {
  console.log('=== Vérification 404 sur toutes les pages ===\n');
  const pages = ['index', 'connexion', 'produits', 'produit-detail', 'panier', 'checkout',
                 'dashboard-acheteur', 'dashboard-vendeur', 'historique', 'notifications',
                 'revendeur', 'boutique-vendeur', 'contact-vendeur', 'a-propos'];
  for (const p of pages) await checkPage(p);
  console.log('\n=== Fin ===');
}

main().catch(console.error);

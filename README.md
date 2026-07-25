# 🇧🇫 Achetons Burkinabè

> Plateforme e-commerce pour valoriser la production locale du Burkina Faso.
> Vanilla HTML5 / CSS3 / JavaScript ES6+ — sans framework, sans backend, sans build step.

![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![Storage](https://img.shields.io/badge/Persistence-localStorage-2962FF?logo=googlechrome&logoColor=white)
![No-Build](https://img.shields.io/badge/Build-None-success)
![Beta](https://img.shields.io/badge/Status-Beta_Testing-orange)
![License](https://img.shields.io/badge/License-MIT-1F7A3D)
![Tests](https://img.shields.io/badge/Tests-63%2F63-brightgreen)
![Made in BF](https://img.shields.io/badge/Made_in-Burkina_Faso-A8531F)

---

## 📋 Table des matières

1. [Aperçu](#-aperçu)
2. [Fonctionnalités](#-fonctionnalités)
3. [Acteurs et rôles](#-acteurs-et-rôles)
4. [Démarrage rapide](#-démarrage-rapide)
5. [Comptes beta testeurs](#-comptes-beta-testeurs)
6. [Architecture](#-architecture)
7. [Structure des fichiers](#-structure-des-fichiers)
8. [Données et persistance](#-données-et-persistance)
9. [Design system](#-design-system)
10. [Modules experts (dashboard vendeur)](#-modules-experts)
11. [Workflow utilisateur](#-workflow-utilisateur)
12. [Tests](#-tests)
13. [Accessibilité](#-accessibilité)
14. [Roadmap](#-roadmap)
15. [Contribution](#-contribution)
16. [Licence](#-licence)
17. [Crédits](#-crédits)

---

## 🎯 Aperçu

**Achetons Burkinabè** est une plateforme e-commerce pédagogique conçue pour valoriser la production locale du Burkina Faso. Elle connecte les producteurs, artisans et coopératives burkinabè directement avec les acheteurs nationaux et les revendeurs, en mettant en avant la traçabilité, les certifications locales et le système de confiance.

Le projet couvre **5 filières stratégiques** de l'économie burkinabè :

- 🌰 **Karité** — 12 produits (beurre brut, raffiné, savons, cosmétiques)
- 🌾 **Sésame** — 8 produits (graines dorées, huile pressée à froid, pâtes)
- 🍯 **Miel** — 8 produits (miel cru, monofloral, gelée royale, propolis)
- 🧵 **Coton** — 10 produits (Faso Dan Fani, bazin, bogolan, fils tissés)
- 🏺 **Artisanat** — 12 produits (bronze cire perdue, djembés, masques, cuirs)

La plateforme a une triple mission :

1. **Économique** — offrir un canal de vente direct aux producteurs burkinabè, sans intermédiaires, avec une visibilité sur les marges, le stock et la rentabilité.
2. **Pédagogique** — servir de support d'apprentissage au développement web front-end (HTML, CSS, JS vanilla) et à la gestion d'un projet e-commerce complet.
3. **Culturelle** — promouvoir le label *Made in Burkina Faso*, les certifications BioSPG et ABNORM, et le savoir-faire des 12 régions du pays.

Le projet est volontairement **sans framework, sans backend et sans build step**. Toute la logique tourne dans le navigateur : les données sont servies en JSON puis mises en cache dans `localStorage`. Cette architecture statique rend la plateforme déployable sur n'importe quel hébergeur statique (GitHub Pages, Netlify, Vercel, OVH) et garantit une reproductibilité totale pour un usage pédagogique.

> ⚠️ **Mode bêta** : la plateforme est en phase de test. Aucun paiement réel n'est traité, aucun produit n'est réellement expédié. Les commandes servent à valider les parcours utilisateurs, les calculs et les notifications.

---

## ✨ Fonctionnalités

| Catégorie | Fonctionnalité | Statut |
|-----------|----------------|--------|
| **Acheteur** | Recherche fuzzy avec synonymes (karité = shea = beurre) | ✅ |
| | Filtres multi-critères (catégorie, certification, région, trust) | ✅ |
| | Fiche produit avec traçabilité complète (coopérative, processus) | ✅ |
| | Panier avec vérification stock en temps réel | ✅ |
| | Checkout avec génération de reçu imprimable (QR code SVG) | ✅ |
| | Historique d'achats avec suivi de statut | ✅ |
| | Avis vérifiés sur les produits | ✅ |
| | Favoris et préférences par catégorie | ✅ |
| **Vendeur** | Dashboard avec KPIs (ventes, revenus, stock, bénéfice) | ✅ |
| | Gestion des commandes (accepter / refuser / livrer) | ✅ |
| | Gestion du stock (édition quantités, alertes seuil) | ✅ |
| | Alertes de péremption (urgent < 7j, attention < 30j) | ✅ |
| | 6 modules experts intégrés (compta, finance, marketing, etc.) | ✅ |
| | Système de confiance Bronze / Argent / Or automatique | ✅ |
| | Messagerie avec les acheteurs | ✅ |
| **Revendeur** | Choix du type de boutique (grande -15% / petite -8%) | ✅ |
| | Calculateur de lot avec économie estimée | ✅ |
| | Achats en gros avec remise automatique | ✅ |
| | Historique des transactions B2B | ✅ |
| **Transverse** | Mode sombre (dark mode) | ✅ |
| | Design responsive (mobile / tablette / desktop) | ✅ |
| | Icônes SVG inline (pas d'icon font, pas d'emoji) | ✅ |
| | Skip-link, ARIA labels, contrastes WCAG AA | ✅ |
| | Données embarquées (fallback si fetch JSON échoue) | ✅ |
| | Notifications in-app avec filtres par type | ✅ |

---

## 👥 Acteurs et rôles

La plateforme définit **3 rôles utilisateurs** distincts, chacun avec son propre espace et ses permissions.

### 🛒 Acheteur

> L'utilisateur final qui achète des produits pour sa consommation personnelle ou familiale.

| Permission | Détail |
|------------|--------|
| Parcourir le catalogue | Recherche, filtres, fiches produits |
| Ajouter au panier | Vérification stock automatique |
| Passer commande | Checkout, choix du mode de paiement |
| Marquer commande reçue | Déclenche la mise à jour du trust vendeur |
| Laisser des avis | Sur les produits achetés |
| Gérer ses favoris | Préférences par catégorie |
| Historique d'achats | Suivi des statuts et reçus |

### 🏪 Vendeur

> Producteur, coopérative ou artisan qui propose ses produits sur la plateforme.

| Permission | Détail |
|------------|--------|
| Gérer son catalogue | Modification du stock, prix, dates de péremption |
| Traiter les commandes | Accepter / refuser / marquer comme livrée |
| Accéder au dashboard | KPIs, graphiques, top ventes |
| Utiliser les 6 modules experts | Compta, finance, marketing, secrétaire, stock, conseiller |
| Messagerie acheteurs | Réponses aux questions, support |
| Monter en trust | Bronze → Argent (50 ventes) → Or (200 ventes) |

### 🔁 Revendeur

> Boutique ou distributeur qui achète en gros pour revendre localement.

| Permission | Détail |
|------------|--------|
| Choisir un type de boutique | `grande_boutique` (-15%, min 50 unités) ou `petite_boutique` (-8%, min 10 unités) |
| Calculateur de lot | Estimation de l'économie en temps réel |
| Achats en gros | Remise automatique appliquée au panier |
| Historique B2B | Suivi des transactions et des fournisseurs |
| Messagerie vendeurs | Négociation des prix et des délais |

---

## 🚀 Démarrage rapide

Le projet est 100 % statique. Aucune installation de dépendances n'est requise.

### Prérequis

- Python 3.8+ **ou** Node.js 18+ (pour servir les fichiers en local)
- Un navigateur moderne (Chrome, Firefox, Edge, Safari)

### Lancement

```bash
# 1. Cloner ou extraire le projet
cd achetons-burkinabe

# 2. Démarrer un serveur HTTP local
python3 -m http.server 8088
# OU (alternative Node.js)
npx serve -p 8088

# 3. Ouvrir dans le navigateur
#    http://localhost:8088/
```

> 💡 **Astuce** : il est possible d'ouvrir directement `index.html` en `file://`, mais certaines fonctionnalités (fetch JSON, mode sombre au rechargement) peuvent ne pas marcher correctement. Le serveur HTTP local est fortement recommandé.

### Première visite

1. Atterrissez sur `index.html` (page d'accueil avec produits vedettes).
2. Cliquez sur **Connexion** dans le header.
3. Sur `connexion.html`, cliquez sur l'un des **12 comptes beta** pour vous connecter instantanément.
4. Naviguez vers `produits.html` pour parcourir le catalogue.
5. Ajoutez des produits au panier, puis ouvrez `panier.html` et `checkout.html`.

### Lancer la batterie de tests

```bash
# Démarrer d'abord le serveur HTTP (les tests HTTP vérifient les routes)
python3 -m http.server 8088 &

# Lancer les 63 tests
node /home/z/my-project/scripts/test-battery.js
```

Résultat attendu : `63/63 passé (100 %)`.

---

## 🔐 Comptes beta testeurs

La page `connexion.html` expose **12 comptes pré-configurés** avec historique complet, notifications et activités. Un clic suffit pour se connecter — pas de mot de passe à saisir.

> En mode bêta, **tout identifiant** (email ou téléphone valide) + **tout mot de passe** (4+ caractères) fonctionne également. Les comptes ci-dessous servent juste à tester des profils types avec données réalistes.

### Acheteurs (4)

| ID | Nom | Email | Téléphone | Ville | Trust | Achats |
|----|-----|-------|-----------|-------|-------|--------|
| `beta_acheteur_1` | Amadou Diallo | amadou.diallo@test.bf | 70 25 36 48 | Ouagadougou | 🥉 Bronze | 5 |
| `beta_acheteur_2` | Fatimata Ouedraogo | fatimata.ouedraogo@test.bf | 70 67 89 01 | Bobo-Dioulasso | 🥈 Argent | 32 |
| `beta_acheteur_3` | Ibrahim Kabore | ibrahim.kabore@test.bf | 70 78 90 12 | Koudougou | 🥇 Or | 85 |
| `beta_acheteur_4` | Aïssata Traoré | aissata.traore@test.bf | 70 33 44 55 | Ouahigouya | 🥉 Bronze | 8 |

### Vendeurs (4)

| ID | Nom | Email | Téléphone | Ville | Trust | Ventes |
|----|-----|-------|-----------|-------|-------|--------|
| `beta_vendeur_1` | Coopérative Femmes de Léo | femmesleo@test.bf | 70 50 60 70 | Léo | 🥈 Argent | 87 |
| `beta_vendeur_2` | Fondeurs de Ouagadougou | fondeurs@test.bf | 70 01 23 45 | Ouagadougou | 🥇 Or | 230 |
| `beta_vendeur_3` | Apiculteur de Banfora | apiculteur.banfora@test.bf | 70 24 68 13 | Banfora | 🥈 Argent | 65 |
| `beta_vendeur_4` | Tisserands de Koudougou | tisserands.koudougou@test.bf | 70 79 13 57 | Koudougou | 🥉 Bronze | 28 |

### Revendeurs (4)

| ID | Nom | Email | Téléphone | Ville | Type boutique | Trust | Transactions |
|----|-----|-------|-----------|-------|---------------|-------|--------------|
| `beta_revendeur_1` | Boutique Sahel Commerce | sahel.commerce@test.bf | 70 34 56 78 | Ouagadougou | Grande (-15 %) | 🥇 Or | 156 |
| `beta_revendeur_2` | Petite Boutique Bobo | petite.bobo@test.bf | 70 45 67 89 | Bobo-Dioulasso | Petite (-8 %) | 🥈 Argent | 43 |
| `beta_revendeur_3` | Distrib Plus Centre | distrib.plus@test.bf | 70 88 77 66 | Ouagadougou | Grande (-15 %) | 🥇 Or | 280 |
| `beta_revendeur_4` | Artisan Market Tenkodogo | artisan.tenkodogo@test.bf | 70 99 88 77 | Tenkodogo | Petite (-8 %) | 🥈 Argent | 67 |

### Comment se connecter

1. Ouvrez `connexion.html`.
2. Dans la section **Comptes beta**, cliquez sur la carte du compte souhaité.
3. Vous êtes immédiatement redirigé vers le dashboard correspondant à votre rôle.

---

## 🏗 Architecture

### Vue d'ensemble

La plateforme suit une **architecture statique 3 couches** : présentation (HTML/CSS), logique (JS modulaire), persistance (localStorage). Aucune donnée n'est perdue au rechargement : tout est synchronisé entre la mémoire (`Data`), le `localStorage` et le DOM.

```
┌─────────────────────────────────────────────────────────────────┐
│                      Navigateur (client)                        │
├─────────────────────────────────────────────────────────────────┤
│  Couche présentation            Couche logique                  │
│  ┌────────────────────┐         ┌─────────────────────────┐    │
│  │  14 pages HTML5    │ ←─────→ │  22 modules JS ES6+     │    │
│  │  17 feuilles CSS3  │         │  (utils, storage, auth, │    │
│  │  (design tokens)   │         │   cart, checkout,       │    │
│  └────────────────────┘         │   expert-systems, etc.) │    │
│                                 └────────────┬────────────┘    │
│                                              │                  │
│  Couche données                              ▼                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  17 fichiers JSON  ──fetch──→  EmbeddedData (fallback)  │   │
│  │  (products, sellers,      ↑           (embedded-data.js)│   │
│  │   beta-accounts, regions, │                              │   │
│  │   expert-modules, etc.)   └──cache──  Data (objet global)│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                              │                  │
│                                              ▼                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │      localStorage (prefixe: achetons_bf_)               │   │
│  │  cart, session, orders_<uid>, notifications_<uid>,      │   │
│  │  activity_<uid>, favorites_<uid>, seller_overrides,     │   │
│  │  stock_<sid>, prefs_<uid>, expert_inputs_<sid>, ...     │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Stratégie de chargement dual-load

Chaque page tente d'abord un `fetch()` sur le fichier JSON correspondant. Si le fetch échoue (mode `file://`, réseau coupé, CORS), elle bascule sur **EmbeddedData** — une copie en dur des JSON dans `js/embedded-data.js`. Cette stratégie garantit que la plateforme fonctionne toujours, même hors-ligne.

```js
// js/storage.js (simplifié)
async loadProducts() {
  try {
    const res = await fetch('json/products.json');
    if (res.ok) return await res.json();
  } catch (e) { /* silencieux */ }
  return EmbeddedData.products;  // fallback
}
```

### Système d'événements

La communication inter-modules s'appuie sur des `CustomEvent` dispatchés sur `document`. Cela permet une architecture faiblement couplée : aucun module ne connaît les autres, ils écoutent juste les événements.

| Événement | Émis par | Payload | Écouté par |
|-----------|----------|---------|------------|
| `app:ready` | `app.js` | `{ page }` | UI components, dashboards |
| `cart:updated` | `cart.js` | `cart` complet | Header (badge panier), `panier.html` |
| `cart:cleared` | `cart.js` | `{ items: [] }` | Header, panier |
| `storage:seeded` | `data-seed.js` | `{ userIds: [] }` | Auth (post-init) |
| `theme:changed` | `UI.toggleTheme` | `'dark' \| 'light'` | Toutes les pages |

### Cycle de vie d'une page

```
1. <script> chargent dans l'ordre :
   utils → embedded-data → storage → data-seed → auth → cart → app → page-specific

2. DOMContentLoaded →
   app.js appelle App.init(page) →
     - hydrate Data (fetch JSON || EmbeddedData)
     - restaure la session (Storage.getSession)
     - met à jour le header (cart count, notif badge, avatar)
     - déclenche 'app:ready' avec le nom de la page

3. La page écoute 'app:ready' et démarre son rendu :
   produits.html → Search.fuzzySearch + UI.renderProductGrid
   dashboard-vendeur.html → DashboardVendeur.render + ExpertSystems.mount
   checkout.html → Checkout.render + Cart.computeTotals
```

---

## 📁 Structure des fichiers

```
achetons-burkinabe/
├── index.html              # Page d'accueil (hero, produits vedettes, vendeurs)
├── connexion.html          # Connexion / inscription (3 rôles + 12 comptes beta)
├── produits.html           # Catalogue avec recherche fuzzy et filtres
├── produit-detail.html     # Fiche produit (traçabilité, certification, avis)
├── panier.html             # Panier d'achat avec calcul des totaux
├── checkout.html           # Validation achat + reçu imprimable (QR SVG)
├── historique.html         # Historique des achats + marquer reçu
├── dashboard-vendeur.html  # Tableau de bord vendeur + 6 modules experts
├── dashboard-acheteur.html # Profil acheteur + favoris + préférences
├── boutique-vendeur.html   # Boutique publique d'un vendeur
├── contact-vendeur.html    # Messagerie avec un vendeur
├── notifications.html      # Centre de notifications avec filtres
├── revendeur.html          # Espace revendeurs (achats en gros, lots)
├── a-propos.html           # Présentation du projet et de la mission
│
├── css/                    # 17 feuilles de style
│   ├── design-system.css   #   - Design tokens (couleurs, radius, shadows)
│   ├── typography.css      #   - Échelle typographique (xs → 5xl)
│   ├── style.css           #   - Styles globaux et layout
│   ├── components.css      #   - Composants UI (cards, buttons, badges)
│   ├── dark-mode.css       #   - Mode sombre (variables + media query)
│   ├── responsive.css      #   - Media queries (mobile-first)
│   ├── animations.css      #   - Keyframes et transitions
│   ├── icons.css           #   - Sprites SVG inline
│   ├── home.css            #   - Page d'accueil
│   ├── connexion.css       #   - Page connexion
│   ├── checkout.css        #   - Page checkout + reçu
│   ├── dashboard.css       #   - Dashboards vendeur & acheteur
│   ├── boutique.css        #   - Page boutique-vendeur
│   ├── revendeur.css       #   - Page revendeur
│   ├── notifications.css   #   - Page notifications
│   ├── historique.css      #   - Page historique
│   └── contact.css         #   - Page contact-vendeur
│
├── js/                     # 22 modules JavaScript
│   ├── utils.js            #   - Helpers (formatPrice, generateOrderId, etc.)
│   ├── embedded-data.js    #   - Données JSON en dur (fallback fetch)
│   ├── storage.js          #   - Couche localStorage (cart, session, orders)
│   ├── data-seed.js        #   - Initialisation des données beta
│   ├── auth.js             #   - Authentification (betaLogin, register)
│   ├── app.js              #   - Bootstrap global (App.init)
│   ├── cart.js             #   - Panier (addItem, computeTotals, checkout)
│   ├── checkout.js         #   - Validation commande + génération reçu
│   ├── search.js           #   - Recherche fuzzy + filtres
│   ├── products.js         #   - Rendu catalogue et fiches produit
│   ├── seller.js           #   - Logique vendeur (boutique publique)
│   ├── reseller.js         #   - Logique revendeur (lots, remises)
│   ├── trust-system.js     #   - Système de confiance Bronze/Argent/Or
│   ├── notifications.js    #   - Centre de notifications + filtres
│   ├── traceability.js     #   - Affichage traçabilité produit
│   ├── expert-systems.js   #   - 6 modules experts (compute + render)
│   ├── charts-vendeur.js   #   - Graphiques dashboard vendeur (SVG natif)
│   ├── ui-components.js    #   - Composants UI réutilisables (toast, modal)
│   ├── form-validation.js  #   - Validation formulaires (schémas JSON)
│   ├── router.js           #   - Mini routeur pour navigation
│   ├── dashboard-vendeur.js#   - Tableau de bord vendeur (1392 lignes)
│   └── dashboard-acheteur.js#  - Tableau de bord acheteur (598 lignes)
│
├── json/                   # 17 fichiers de données
│   ├── products.json       #   - 50 produits (5 catégories, 11 vendeurs)
│   ├── sellers.json        #   - 11 vendeurs (SEL001 à SEL011)
│   ├── categories.json     #   - 5 catégories (Karité, Sésame, Miel, Coton, Artisanat)
│   ├── regions.json        #   - 12 régions du Burkina Faso
│   ├── certifications.json #   - 3 certifications (BioSPG, ABNORM, Made in BF)
│   ├── trust-badges.json   #   - 3 niveaux (Bronze, Argent, Or) + seuils
│   ├── beta-accounts.json  #   - 12 comptes beta testeurs + historique
│   ├── beta-activity.json  #   - Activités simulées pour chaque compte beta
│   ├── expert-modules.json #   - Spec des 6 modules experts (47 calculs)
│   ├── reseller-rules.json #   - Règles revendeurs (remises, lots minimaux)
│   ├── cart-rules.json     #   - Règles panier (stock, quantité max)
│   ├── search-config.json  #   - Synonymes et pondérations de recherche
│   ├── form-schemas.json   #   - Schémas de validation des formulaires
│   ├── user-flows.json     #   - Parcours utilisateurs documentés
│   ├── personas.json       #   - Personas UX (acheteur, vendeur, revendeur)
│   ├── loops-checklist.json#   - Checklist d'amélioration continue
│   └── mcp-skills.json     #   - Déclaration des skills MCP (usage agent)
│
├── images/                 # Logos, icônes SVG, illustrations
│   └── logo/favicon.svg
│
└── README.md               # Ce fichier
```

---

## 💾 Données et persistance

### Couche localStorage

Toutes les données dynamiques sont persistées dans `localStorage` sous le préfixe `achetons_bf_`. Ce préfixe évite les collisions avec d'autres applications sur le même domaine.

| Clé (préfixe `achetons_bf_`) | Type | Description | Écrit par |
|------------------------------|------|-------------|-----------|
| `cart` | `Object` | Panier courant (`items`, `last_updated`) | `Cart.addItem`, `Cart.clear` |
| `session` | `Object\|null` | Session utilisateur (`user_id`, `type`, `nom`) | `Auth.login`, `Auth.logout` |
| `orders_<userId>` | `Array` | Commandes de l'utilisateur | `Storage.addOrder` |
| `notifications_<userId>` | `Array` | Notifications de l'utilisateur | `Storage.addNotification` |
| `activity_<userId>` | `Array` | Journal d'activité (commandes, paiements) | `Storage.addActivity` |
| `favorites_<userId>` | `Array` | IDs produits favoris (acheteur) | `DashboardAcheteur.toggleFavorite` |
| `messages_<userId>` | `Array` | Messages de messagerie | `contact-vendeur.js` |
| `reviews_<productId>` | `Array` | Avis sur un produit | `produit-detail.js` |
| `seller_overrides` | `Object` | Overrides `ventes_count` + `trust_level` par vendeur | `TrustSystem.incrementSales` |
| `stock_<sellerId>` | `Object` | Overrides de stock par produit | `DashboardVendeur.setStockOverride` |
| `boutique_info_<sellerId>` | `Object` | Infos boutique (revendeur) | `DashboardVendeur.saveBoutique` |
| `prefs_<sellerId>` | `Object` | Préférences vendeur (`notifications`, `dark_mode`) | `DashboardVendeur.savePrefs` |
| `prefs_acheteur_<userId>` | `Object` | Préférences acheteur (`categories[]`) | `DashboardAcheteur.savePrefs` |
| `expert_inputs_<sellerId>` | `Object` | Inputs modules experts (charges, etc.) | `ExpertSystems.saveInputs` |
| `seeded` | `boolean` | Flag d'initialisation des données beta | `DataSeed.run` |
| `mode_sombre` | `'dark'\|'light'` | Préférence de thème | `UI.toggleTheme` |

### Schéma dual-load

```js
// js/storage.js (extrait)
const Storage = {
  PREFIX: 'achetons_bf_',

  get(name, defaultValue = null) {
    try {
      const raw = localStorage.getItem(this.PREFIX + name);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch { return defaultValue; }
  },

  set(name, value) {
    localStorage.setItem(this.PREFIX + name, JSON.stringify(value));
    return value;
  }
};
```

### Données produit (exemple)

```json
{
  "id": "PRD001",
  "nom": "Beurre de karité pur",
  "categorie": "Karite",
  "prix": 1500,
  "devise": "FCFA",
  "unite_prix": "250g",
  "vendeur_id": "SEL001",
  "region": "Sud-Ouest",
  "ville": "Léo",
  "origine_cooperative": "Coopérative Femmes de Léo",
  "certification": "BioSPG",
  "made_in_bf": true,
  "quantite_disponible": 150,
  "unite_quantite": "pieces",
  "date_production": "2025-03-15",
  "date_peremption": "2027-03-15",
  "conditions_stockage": "Température ambiante, à l'abri de la lumière",
  "processus_fabrication": "Cueillette des noix → ébullition → concassage → pilage → barattage → lavage → chauffage → conditionnement",
  "poids_unitaire": "0.25 kg",
  "en_stock": true,
  "stock_alerte": 20,
  "reviews_count": 18,
  "average_rating": 4.7,
  "tags": ["cosmetique", "naturel", "bio", "peau", "cheveux"]
}
```

### Système de confiance (trust)

Le trust level du vendeur est calculé automatiquement à chaque vente complétée.

| Niveau | Seuil (ventes) | Couleur | Avis positifs min. | Description |
|--------|----------------|---------|---------------------|-------------|
| 🥉 Bronze | 1 – 49 | `#CD7F32` | 60 % | Vendeur débutant avec confiance initiale |
| 🥈 Argent | 50 – 199 | `#C0C0C0` | 75 % | Vendeur établi avec réputation solide |
| 🥇 Or | 200+ | `#FFD700` | 90 % | Vendeur premium, distinction suprême |

```js
// js/utils.js
function getTrustLevel(ventesCount) {
  if (ventesCount >= 200) return 'or';
  if (ventesCount >= 50)  return 'argent';
  if (ventesCount >= 0)   return 'bronze';
  return null;
}
```

---

## 🎨 Design system

Le projet embarque un design system complet basé sur des **custom properties CSS** (variables). Toutes les couleurs, tailles, radius et shadows sont définis dans `css/design-system.css` et réutilisés sur l'ensemble des pages.

### Palette de couleurs

| Token | Hex | Usage |
|-------|-----|-------|
| `--terre` | `#A8531F` | Couleur de marque, CTAs primaires, liens |
| `--miel` | `#E8A13A` | Highlights, badges, accents |
| `--vert-bf` | `#1F7A3D` | Certifications bio, succès, trust Or |
| `--nuit` | `#241A12` | Header, footer, dark mode background |
| `--surface-1` | `#FFFFFF` | Fond blanc principal |
| `--surface-2` | `#FBF6EE` | Fond beige clair (cards, sections) |
| `--surface-3` | `#F4EDDD` | Fond beige saturé (hover, inputs) |
| `--success` | `#2ECC71` | Validation, confirmations |
| `--error` | `#E74C3C` | Erreurs, alertes critiques |
| `--warning` | `#F39C12` | Avertissements (stock bas, péremption) |
| `--info` | `#3498DB` | Informations neutres |
| `--bronze` | `#CD7F32` | Badge trust Bronze |
| `--argent` | `#C0C0C0` | Badge trust Argent |
| `--or` | `#FFD700` | Badge trust Or |

### Dégradés

```css
--gradient-terre:    linear-gradient(135deg, #C0651F 0%, #7A3B14 100%);
--gradient-miel:     linear-gradient(135deg, #F4C877 0%, #E8A13A 100%);
--gradient-success:  linear-gradient(135deg, #2ECC71 0%, #1F7A3D 100%);
--gradient-hero:     linear-gradient(135deg, #7A3B14 0%, #A8531F 50%, #E8A13A 100%);
--gradient-motif:    linear-gradient(90deg, terre 0%, miel 50%, vert-bf 100%);
```

### Typographie

| Token | Taille | Usage |
|-------|--------|-------|
| `--text-xs` | 0.75 rem | Légendes, métadonnées |
| `--text-sm` | 0.875 rem | Labels, hints |
| `--text-base` | 1 rem | Corps de texte |
| `--text-lg` | 1.125 rem | Sous-titres |
| `--text-xl` | 1.25 rem | Titres de section |
| `--text-2xl` | 1.5 rem | Titres de page |
| `--text-3xl` | 1.875 rem | Hero (mobile) |
| `--text-4xl` | 2.25 rem | Hero (desktop) |
| `--text-5xl` | 3 rem | Hero (xl) |

**Familles :**

- `--font-body` : `Noto Sans` (texte courant)
- `--font-heading` : `Georgia, serif` (titres)
- `--font-mono` : `JetBrains Mono, monospace` (prix, codes, IDs)

### Espacement et radius

```css
/* Radius */
--radius-xs:    4px;
--radius-sm:    8px;
--radius-md:    12px;
--radius-lg:    16px;
--radius-xl:    24px;
--radius-2xl:   32px;
--radius-pill:  999px;

/* Shadows (multicouches, douces) */
--shadow-sm:  0 2px 4px rgba(36,26,18,0.06), 0 1px 2px rgba(36,26,18,0.04);
--shadow-md:  0 4px 8px rgba(36,26,18,0.06), 0 2px 4px rgba(36,26,18,0.04);
--shadow-lg:  0 12px 24px rgba(36,26,18,0.08), 0 4px 8px rgba(36,26,18,0.04);
--shadow-xl:  0 24px 48px rgba(36,26,18,0.12), 0 8px 16px rgba(36,26,18,0.06);
--shadow-glow: 0 0 0 4px rgba(232,161,58,0.15);  /* focus ring */
```

### Transitions

```css
--transition-fast:    0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base:    0.25s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow:    0.4s  cubic-bezier(0.16, 1, 0.3, 1);
--transition-bounce:  0.5s  cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## 🧠 Modules experts

Le dashboard vendeur intègre **6 modules experts** qui transforment la plateforme en outil d'aide à la décision. Chaque module s'appuie sur des **théories managériales reconnues** (BCG, ABC, point mort, BFR, Apriori) adaptées au contexte burkinabè.

> 📚 **Spécification complète** : `json/expert-modules.json` (47 calculs au total, théorie sourcée pour chacun).

### Vue d'ensemble

| Module | Icône | Théorie principale | Calculs | Objectif |
|--------|-------|--------------------|---------|----------|
| **Comptable** | 🧮 | ABC costing, seuil de rentabilité, PFC | 12 | Vision comptable (CA, charges, bénéfice, point mort) |
| **Financier** | 📈 | BFR, DSO, ROI, projection linéaire | 8 | Vision prospective trésorerie et alertes déséquilibres |
| **Marketing** | 📣 | BCG matrix, saisonnalité, pricing stratégique | 6 | Décisions commerciales (quoi, quand, à qui, à quel prix) |
| **Secrétaire** | 📧 | Templates, règle des 48h | 5 | Automatisation communications et rappels |
| **Stock** | 📦 | Rotation, ABC, Wilson, FIFO | 8 | Optimisation couple service-coût du stock |
| **Conseiller** | 💡 | Apriori, cross-sell, upsell, scoring | 8 | Augmentation panier moyen et fréquence d'achat |

### 1. Module Comptable (12 calculs)

> Objectif : fournir au vendeur la vision comptable exacte de son activité, sans logiciels complexes, en s'appuyant sur les principes de comptabilité générale OHADA adaptés au contexte BF.

| Calcul | Théorie |
|--------|---------|
| Marge brute | CA − CAMV (coût d'achat des marchandises vendues) |
| Marge nette | Bénéfice final après toutes les charges |
| Bénéfice estimé | CA − charges variables − charges fixes |
| Charges variables | Varient proportionnellement au volume |
| Charges fixes | Stables quel que soit le volume (loyer, salaires) |
| Taux de marge sur coût variable (TMCV) | (Marge sur CV / CA) × 100 |
| **Seuil de rentabilité (point mort)** | Charges fixes / TMCV — *Rostagny & Lavergne* |
| **TVA BF (18 %)** | Calcul de la TVA collectée et déductible |
| Top 5 produits par rentabilité | Tri par marge nette unitaire |
| Tableau de bord mensuel | CA, charges, bénéfice, ratios |
| **Pricing PFC** | Price-Function-Cost — modèle de pricing stratégique |
| **ABC costing simplifié** | Activity-Based Costing — *Cooper & Kaplan, HBS 1988* |

### 2. Module Financier (8 calculs)

> Objectif : donner au vendeur une vision prospective de sa trésorerie et alerter sur les déséquilibres (BFR trop élevé, DSO qui s'allonge, ratio trésorerie insuffisant).

| Calcul | Théorie |
|--------|---------|
| Cash flow mensuel | Variation de trésorerie nette sur la période |
| **Projection 3 mois** | Régression linéaire (moindres carrés) |
| Ratio trésorerie / charges | Capacité à couvrir les charges courantes |
| Conseil d'investissement | Recommandations basées sur les ratios |
| **DSO** (Days Sales Outstanding) | Délai moyen de paiement client — *credit management* |
| **BFR** (Besoin en Fonds de Roulement) | Stocks + créances − dettes fournisseurs — *Michel Sion* |
| **ROI par produit** | Return On Investment = (Gain − Invest) / Invest |
| **FRNG** (Fonds de Roulement Net Global) | Capitaux permanents − actif immobilisé |

### 3. Module Marketing (6 calculs)

> Objectif : orienter les décisions commerciales (quoi vendre, quand, à qui, à quel prix) grâce aux outils de marketing stratégique.

| Calcul | Théorie |
|--------|---------|
| **Saisonnalité par catégorie** | Cycles culturaux BF — *INSD & ONAC* |
| Suggestion de prix optimale | Cost-plus + value-based + competitive pricing |
| **Matrice BCG** | Boston Consulting Group — *Bruce Henderson, 1968* |
| Recommandations de promotions | Basées sur les élasticités prix |
| Segmentation clients | Ciblage RFM (Recency, Frequency, Monetary) |
| Best timing pour relances | Heures et jours optimaux par segment |

### 4. Module Secrétaire (5 calculs)

> Objectif : automatiser les communications routine (confirmations, relances, remerciements) et les rappels (stock, péremption, commandes en attente).

| Calcul | Théorie |
|--------|---------|
| Messages pré-rédigés | Template-based communication (-70 % temps rédaction) |
| **Rappels commandes en attente > 48h** | Règle des 48h — *E-commerce Europe* |
| Rappels stock bas | Seuil configurable par produit |
| Rappels péremptions proches | Alerte < 30 jours, critique < 7 jours |
| Agenda livraisons et RDV | Synchronisation avec le calendrier des commandes |

### 5. Module Stock (8 calculs)

> Objectif : optimiser le couple service-coût du stock — ni rupture (perte de vente), ni surstock (capital immobilisé + risque péremption).

| Calcul | Théorie |
|--------|---------|
| Alerte péremption | Principe FIFO (First In First Out) |
| **Taux de rotation du stock** | Inventory turnover — *norme IAS 2* (4/an au BF) |
| **Analyse ABC** | Loi de Pareto 80/20 appliquée au stock |
| Suggestion de réappro | Modèle de Wilson (formule économique de commande) |
| Stock optimal | Quantité qui minimise le coût total de possession |
| Dead stock (stock dormant) | Produits sans vente sur 90 jours |
| Valeur du stock | Valorisation au coût d'achat |
| Coût annuel de possession | 20–25 % de la valeur du stock (entreposage, obsolescence) |

### 6. Module Conseiller Ventes (8 calculs)

> Objectif : augmenter le panier moyen et la fréquence d'achat grâce aux techniques de vente additionnelle et au scoring de popularité.

| Calcul | Théorie |
|--------|---------|
| **Cross-sell** (panier X → Y) | Market basket analysis — *Apriori, Agrawal & Srikant 1994* |
| Upsell (version premium/bulk) | Suggestion version à marge supérieure |
| Recommandations basées sur l'historique | Filtrage collaboratif simplifié |
| Périodes optimales par produit | Couplage avec la saisonnalité |
| Suggestion de lots complémentaires | Bundling de produits complémentaires |
| Score de popularité (30 jours) | Tendance de ventes récentes |
| Panier moyen | CA / nombre de commandes |
| Taux de conversion | Visiteurs → acheteurs |

### Usage dans le dashboard

```js
// js/expert-systems.js (extrait)
ExpertSystems.setReference(Data.expertModules);  // injection de la spec

const result = ExpertSystems.comptable.compute({
  ca: 850000,            // chiffre d'affaires (FCFA)
  charges_variables: 420000,
  charges_fixes: 180000
});

// result.benefice_estime === 250000
// result.seuil_rentabilite === 360000
// result.tva_bf === 153000  (18% du CA)
```

---

## 🔄 Workflow utilisateur

### Workflow achat (acheteur → vendeur → acheteur)

```
┌──────────┐    1. Ajout panier     ┌──────────┐    2. Checkout       ┌──────────┐
│ Acheteur │ ─────────────────────→ │  Panier  │ ───────────────────→ │ Checkout │
└──────────┘                        └──────────┘                       └────┬─────┘
      ↑                                                                   │
      │ 8. Notif "commande livrée"                                       │ 3. Process commande
      │                                                                   │    (génère order_id
      │                                                                   │     BF-YYYYMMDD-XXXXX)
      │                                                                   ▼
┌──────────┐    7. Marquer reçu         ┌──────────┐    6. Marquer livrée ┌──────────┐
│  Notifs  │ ←───────────────────────── │ Acheteur │ ←─────────────────── │  Vendeur │
└──────────┘                            └──────────┘                      └────┬─────┘
      ↑                                                                       │
      │ 5. Notif "commande acceptée"                                         │ 4. Notif "nouvelle commande"
      │                                                                       │    + TrustSystem.incrementSales
      └───────────────────────────────────────────────────────────────────────┘
```

### Étapes détaillées

| # | Acteur | Action | Effet système |
|---|--------|--------|---------------|
| 1 | Acheteur | Clique « Ajouter au panier » sur `produit-detail.html` | `Cart.addItem` vérifie stock, émet `cart:updated`, met à jour le badge |
| 2 | Acheteur | Ouvre `panier.html`, ajuste quantités, clique « Commander » | `Cart.computeTotals` calcule subtotal, remise, total |
| 3 | Acheteur | Remplit le formulaire sur `checkout.html`, valide | `Checkout.process` génère `order_id`, décrémente stock, vide le panier |
| 4 | Système | Notifie le vendeur (`order_received`) + activité acheteur (commande + paiement) | `Storage.addNotification`, `Storage.addActivity` |
| 5 | Vendeur | Ouvre `dashboard-vendeur.html`, voit la commande, clique « Accepter » | Statut → `acceptee`, notif `order_accepted` à l'acheteur |
| 6 | Vendeur | Prépare et clique « Marquer livrée » | Statut → `livree`, notif `order_delivered` à l'acheteur |
| 7 | Acheteur | Ouvre `historique.html`, clique « Marquer reçu » | Statut → `recu`, notif `order_delivered` au vendeur, activité `vente_confirmée` |
| 8 | Système | `TrustSystem.incrementSales(vendeurId)` | Si palier franchi (50 → Argent, 200 → Or) → notif `trust_upgrade` |

### Workflow revendeur

```
┌───────────┐   1. Choix type boutique    ┌─────────────┐
│ Revendeur │ ──────────────────────────→ │ revendeur.html │
└───────────┘                              └──────┬──────┘
       ↑                                          │ 2. Calculateur de lot
       │ 5. Reçu avec détail remise              │    (grand: -15%, min 50 / petit: -8%, min 10)
       │                                          ▼
┌───────────┐   4. Checkout (lot appliqué)  ┌──────────┐   3. Panier avec remise auto
│  Reçu B2B │ ←───────────────────────────  │ Checkout │ ←────────────────────────
└───────────┘                                └──────────┘
```

---

## 🧪 Tests

La plateforme dispose d'une **batterie de 63 tests** organisés en 8 catégories, couvrant la structure, les données, la logique métier, l'intégration, le HTTP, le visuel, l'accessibilité et la performance.

### Lancer les tests

```bash
# 1. Démarrer le serveur HTTP (nécessaire pour la catégorie E. HTTP)
python3 -m http.server 8088 &

# 2. Lancer la batterie
node /home/z/my-project/scripts/test-battery.js
```

### Répartition des tests

| Catégorie | Code | # | Description |
|-----------|------|---|-------------|
| **A. Structure** | A1–A10 | 10 | Fichiers présents (14 HTML / 22 JS / 17 CSS / 17 JSON), liens non morts, `<meta description>`, skip-link |
| **B. Données** | B11–B20 | 10 | 12 comptes beta, phones/emails uniques, 11 vendeurs, 12 régions, 3 certifications, 5 catégories, 3 trust levels, 6 modules experts |
| **C. Logique JS** | C21–C35 | 15 | `formatPrice`, `isValidEmail`, `isValidPhone`, `getTrustLevel(0,50,200)`, `fuzzyScore`, `computeBulkPrice`, `generateOrderId`, Storage round-trips, `Cart.addItem + computeTotals`, `Search.fuzzySearch` |
| **D. Intégration** | D36–D45 | 10 | `Auth.betaLogin` (success + type mismatch), `Auth.register` (acheteur/vendeur/revendeur), `Checkout.process` (order_id + stock + notifications), `TrustSystem.incrementSales` persistance, `ExpertSystems.comptable.compute` |
| **E. HTTP** | E46–E50 | 5 | `GET /`, `/connexion.html`, `/produits.html`, `/json/products.json`, `/js/app.js` |
| **F. Visuel** | F51–F55 | 5 | IDs critiques dans HTML (`categories-grid`, `featured-grid`, etc.), 3 types dans `connexion.html`, sidebar filtres, formulaire checkout |
| **G. Accessibilité** | G56–G60 | 5 | `lang="fr"`, `main#main`, boutons avec texte/aria-label, images avec alt, inputs avec label |
| **H. Performance** | H61–H63 | 3 | `embedded-data.js < 20 000 lignes`, aucun JS `> 3 000 lignes`, total fichiers statiques `< 80` |

### Architecture du test runner

Le script `test-battery.js` (857 lignes) met en place un **environnement mock Node.js** qui simule le navigateur :

```js
// Setup minimal (extrait)
global.window = global;
global.localStorage = createInMemoryLocalStorage();
global.document = createMinimalDocument();
global.fetch = () => Promise.reject(new Error('mock'));  // force EmbeddedData fallback
global.CustomEvent = class { constructor(name, opts) { this.name = name; Object.assign(this, opts); } };
global.UI = { toast() {}, updateCartCount() {}, updateNotifBadge() {} };
```

Puis il **hydrate les modules JS** via `vm.runInThisContext` (wrappés en IIFE pour éviter les conflits de `const`) et les **données JSON** directement via `Data._hydrate` (sans fetch).

### Résultat attendu

```
A. Structure        ✓ 10/10
B. Données          ✓ 10/10
C. Logique JS       ✓ 15/15
D. Intégration      ✓ 10/10
E. HTTP             ✓ 5/5
F. Visuel           ✓ 5/5
G. Accessibilité    ✓ 5/5
H. Performance      ✓ 3/3

Total: 63/63 (100 %)
```

### Tests complémentaires

| Script | Rôle | Tests |
|--------|------|-------|
| `scripts/test-expert-systems.js` | Validation des 6 modules experts | 78 |
| `scripts/test-e2e-workflow.js` | Workflow E2E acheteur → vendeur | 85 |
| `scripts/check-404.js` | Détection de liens morts | scan |

---

## ♿ Accessibilité

L'accessibilité est une priorité du projet, conforme aux recommandations **WCAG 2.1 AA**.

| Critère | Implémentation |
|---------|----------------|
| **Langue** | `lang="fr"` sur tous les `<html>` |
| **Skip-link** | Lien « Aller au contenu » présent sur chaque page (premier élément focusable) |
| **Structure sémantique** | `<header>`, `<main id="main">`, `<nav>`, `<footer>` sur toutes les pages |
| **Hiérarchie des titres** | Un seul `<h1>` par page, puis `<h2>` pour les sections |
| **Labels de formulaire** | Chaque `<input>` a un `<label for>` explicite (radio/checkbox exclus : labels implicites) |
| **ARIA labels** | Boutons icônes ont un `aria-label`, icônes décoratives ont `aria-hidden="true"` |
| **Focus visible** | `:focus-visible` avec outline miel `#E8A13A` et glow ring |
| **Contrastes** | Vérifiés AA sur tous les textes (terre sur blanc = 5.2:1, miel sur nuit = 8.7:1) |
| **Mode sombre** | Préférence persistée dans `localStorage`, respecte `prefers-color-scheme` au premier chargement |
| **Reduced motion** | `@media (prefers-reduced-motion: reduce)` désactive les animations |
| **Navigation clavier** | Tous les éléments interactifs sont accessibles au clavier (tabindex = 0) |
| **Textes alternatifs** | Toutes les `<img>` ont un `alt` descriptif ou `alt=""` si décoratives |
| **Icônes SVG** | Inline avec `<title>` et `role="img"`, pas d'icon font |

### Vérification

```bash
# Les tests G56-G60 vérifient automatiquement :
#   - lang="fr" présent
#   - main#main présent
#   - boutons avec texte ou aria-label
#   - images avec alt ou aria-hidden
#   - inputs avec label for (radio/checkbox exclus)
```

---

## 🗺 Roadmap

Le projet est volontairement limité au périmètre bêta. Voici les pistes d'évolution identifiées, classées par priorité.

### Court terme (P1)

- [ ] **Paiement en ligne** — intégration Wave, Orange Money, Moov Money via API réelle
- [ ] **Backend léger** — migration des données vers Supabase ou Firebase (sync multi-appareils)
- [ ] **Photos produits réelles** — remplacement des illustrations SVG par photos des producteurs
- [ ] **Multi-langue** — ajout de l'anglais et du Mooré (i18n)
- [ ] **PWA** — manifest + service worker pour usage hors-ligne

### Moyen terme (P2)

- [ ] **Messagerie temps réel** — WebSocket ou polling pour chat acheteur ↔ vendeur
- [ ] **Livraison** — intégration avec des transporteurs locaux (tracking, estimation délai)
- [ ] **Recherche améliorée** — embedding sémantique (TF-IDF ou mini-transformer)
- [ ] **Module comptable complet** — bilan, compte de résultat, génération PDF OHADA
- [ ] **API publique** — exposition du catalogue pour applications tierces

### Long terme (P3)

- [ ] **Application mobile** — React Native ou Flutter réutilisant les JSON existants
- [ ] **Marketplace multi-pays** — extension aux autres pays de l'UEMOA
- [ ] **Blockchain traçabilité** — traçabilité immuable du karité et du coton
- [ ] **IA recommandations** — modèle de recommandation basé sur l'historique d'achats
- [ ] **Modules experts avancés** — scoring client ML, détection de fraude

### Limitations actuelles

| Limitation | Détail |
|------------|--------|
| Mode bêta uniquement | Pas de serveur backend, tout dans `localStorage` |
| Images illustratives | SVG, pas de photos réelles |
| Pas de paiement en ligne | Paiement direct avec le vendeur (cash, Wave, Orange Money) |
| Pas de gestion réelle des livraisons | À confirmer avec chaque vendeur |
| Données non synchronisées | Un seul navigateur = un seul état (pas de multi-appareil) |

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Le projet est pédagogique : toute amélioration de code, de documentation ou de tests est appréciée.

### Workflow

1. **Forkez** le dépôt.
2. Créez une branche : `git checkout -b feature/ma-nouvelle-fonctionnalite`.
3. Commitez vos changements : `git commit -m "feat: ajout de X"`.
4. Pushez : `git push origin feature/ma-nouvelle-fonctionnalite`.
5. Ouvrez une **Pull Request** décrivant vos changements.

### Conventions de code

| Élément | Convention |
|---------|------------|
| **HTML** | Indentation 2 espaces, attributs entre guillemets doubles, `lang="fr"` obligatoire |
| **CSS** | BEM-lite (`.block__element--modifier`), custom properties pour toute valeur réutilisée |
| **JS** | `const` par défaut, `let` si réassignation, jamais `var`. Fonctions fléchées pour callbacks |
| **Nommage** | `camelCase` pour variables/fonctions JS, `kebab-case` pour classes CSS, `snake_case` pour clés JSON |
| **Commentaires** | En français, explicatifs pour la logique métier, JSDoc pour les fonctions publiques |
| **Commit messages** | Convention Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`) |

### Avant de soumettre une PR

```bash
# 1. Vérifier la syntaxe de tous les fichiers JS modifiés
node --check js/mon-fichier.js

# 2. Démarrer le serveur HTTP
python3 -m http.server 8088 &

# 3. Lancer la batterie de tests (doit rester à 63/63)
node /home/z/my-project/scripts/test-battery.js

# 4. Vérifier les liens morts
node /home/z/my-project/scripts/check-404.js
```

### Ajouter un produit

1. Éditez `json/products.json` (+ `js/embedded-data.js` pour le fallback).
2. Respectez le schéma existant (voir [Données produit](#données-produit-exemple)).
3. Utilisez un `vendeur_id` existant (SEL001 à SEL011).
4. Ajoutez au moins 3 `tags` pour la recherche fuzzy.
5. Vérifiez que `quantite_disponible > stock_alerte`.

### Ajouter un module expert

1. Éditez `json/expert-modules.json` (+ `js/embedded-data.js`).
2. Déclarez le calcul avec `id`, `label`, `formula`, `theorie`.
3. Implémentez la fonction dans `js/expert-systems.js` (méthode `compute` + `render`).
4. Ajoutez le bouton dans `dashboard-vendeur.html` (sidebar `.expert-module-btn`).
5. Ajoutez un test dans `scripts/test-expert-systems.js`.

---

## 📄 Licence

Distribué sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

```
MIT License

Copyright (c) 2025 Achetons Burkinabè - Burkina Institute of Technology

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

> 📚 **Note pédagogique** : ce projet est avant tout un support d'apprentissage. Vous êtes libre de le cloner, l'étudier, le modifier et le redistribuer dans un cadre éducatif.

---

## 🙏 Crédits

### Institution

- **Burkina Institute of Technology (BIT)** — cadre pédagogique du projet
- Formateurs et encadrants du module de développement web

### Sources de données

Les données produits, vendeurs et prix sont inspirées de sources officielles et de rapports de filières du Burkina Faso :

| Source | Type | Usage |
|--------|------|-------|
| **ONAC-BF** (Office National du Commerce Extérieur) | Institutionnel | Prix de référence, filières d'export |
| **FAO Burkina Faso** | Organisation internationale | Données agricoles, volumes de production |
| **INSD** (Institut National de la Statistique et de la Démographie) | Statistiques | Données démographiques, consommation, saisons |
| **CNABio** (Conseil National de l'Agriculture Biologique) | Certification | Label BioSPG, exigences et organismes |
| **ABNORM** (Agence Burkinabè de Normalisation, Qualité, Métrologie et Certification) | Normalisation | Normes produits, attestations de conformité |
| **Nitidae** | ONG de recherche | Rapports filière sésame, prix marché |
| **Table filière karité du Burkina Faso** | Recherche filière | Prix beurre brut/raffiné, coopératives |
| **Ministère de l'Industrie, du Commerce et de l'Artisanat** | Gouvernement | Label *Made in Burkina Faso*, politiques locales |
| **FASONORM / ABNORM** | Normalisation | Normes produits (karité, sésame, miel) |

### Sources théoriques (modules experts)

| Théorie | Auteur / Origine |
|---------|------------------|
| Seuil de rentabilité (point mort) | Rostagny & Lavergne |
| Activity-Based Costing (ABC) | Cooper & Kaplan, Harvard Business School (1988) |
| Matrice BCG | Bruce Henderson, Boston Consulting Group (1968) |
| Besoin en Fonds de Roulement (BFR) | Michel Sion, *Analyse financière* |
| Days Sales Outstanding (DSO) | Standard de credit management |
| PFC (Price-Function-Cost) | Modèle de pricing stratégique |
| Stock rotation | Norme IAS 2 / méthodes Wilson |
| Loi de Pareto (80/20) | Application à l'ABC analysis |
| Saisonnalité agricole BF | INSD & ONAC |
| Algorithme Apriori | Agrawal & Srikant (1994) — market basket analysis |
| Règle des 48h | Standard e-commerce (E-commerce Europe) |

### Technologies

- **HTML5** — structure sémantique
- **CSS3** — custom properties, Grid, Flexbox, dark mode, responsive
- **JavaScript ES6+** — modules, async/await, destructuring, template literals
- **localStorage** — persistance côté client
- **SVG inline** — icônes et illustrations (pas d'icon font, pas d'emoji)
- **QR code SVG** — généré nativement pour les reçus

### Inspirations design

- Palette inspirée des couleurs traditionnelles burkinabè (terre, miel, coton, bronze)
- Design system inspiré des guidelines Material Design et des principes de Brad Frost (atomic design)
- Mode sombre inspiré des recommandations de Thomas Steiner (web.dev)

---

<div align="center">

**🇧🇫 Achetons Burkinabè — Consommer local, valoriser le savoir-faire burkinabè.**

[Signaler un bug](../../issues) · [Proposer une amélioration](../../issues) · [Wiki](../../wiki)

</div>

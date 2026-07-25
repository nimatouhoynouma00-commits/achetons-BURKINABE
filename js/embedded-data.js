/* js/embedded-data.js - Donnees JSON embarquees (fallback pour file://)
 * Genere automatiquement par scripts/gen-embedded-data.py depuis json/*.json
 * Permet au site de fonctionner sans serveur HTTP (ouverture directe de index.html)
 *
 * Source : /home/z/my-project/workspace/prod/json
 * Fichiers embarques : 17
 * NE PAS EDITER A LA MAIN - executer gen-embedded-data.py pour regenerer.
 */
const EmbeddedData = {
  beta_accounts: {
  "description": "Comptes beta testeurs pre-configures pour tester la plateforme sans inscription - 12 comptes avec historique complet",
  "beta_mode": true,
  "auto_login_message": "Mode beta: tout identifiant fonctionne. Cliquez sur un compte pre-configure pour tester.",
  "version": "2.0",
  "genere_le": "2025-07-25",
  "total_comptes": 12,
  "accounts": [
    {
      "id": "beta_acheteur_1",
      "type": "acheteur",
      "nom": "Amadou Diallo",
      "email": "amadou.diallo@test.bf",
      "telephone": "70 25 36 48",
      "ville": "Ouagadougou",
      "region": "Centre",
      "trust_level": "bronze",
      "achats_count": 5,
      "date_inscription": "2024-08-15",
      "preferences": {
        "categories_preferees": [
          "Karite",
          "Miel"
        ],
        "newsletter": true,
        "langue": "fr"
      },
      "description_courte": "Jeune entrepreneur de 25 ans, achète des produits cosmétiques naturels pour sa famille",
      "historique_activite": [
        {
          "date": "2025-07-24T16:00:00",
          "type": "notification",
          "detail": "Vendeur a expédié votre commande BF-20250721-00042"
        },
        {
          "date": "2025-07-23T08:20:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250721-00042"
        },
        {
          "date": "2025-07-22T14:00:00",
          "type": "notification",
          "detail": "Vendeur a accepté votre commande BF-20250721-00042"
        },
        {
          "date": "2025-07-21T09:15:00",
          "type": "commande",
          "detail": "Commande BF-20250721-00042 (2500 FCFA) - 1 article"
        },
        {
          "date": "2025-07-21T09:10:00",
          "type": "paiement",
          "detail": "Paiement Mobile Money - 2500 FCFA (Orange Money)"
        },
        {
          "date": "2025-07-20T10:40:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-07-20T10:35:00",
          "type": "recherche",
          "detail": "Recherche: 'beurre karite bio'"
        },
        {
          "date": "2025-07-20T10:30:00",
          "type": "connexion",
          "detail": "Connexion depuis Ouagadougou (Centre)"
        },
        {
          "date": "2025-06-15T11:00:00",
          "type": "avis",
          "detail": "Avis 5★ laissé sur Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-06-14T16:30:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250610-00038"
        },
        {
          "date": "2025-06-12T10:00:00",
          "type": "notification",
          "detail": "Commande BF-20250610-00038 en cours de livraison"
        },
        {
          "date": "2025-06-10T14:25:00",
          "type": "commande",
          "detail": "Commande BF-20250610-00038 (4000 FCFA) - 1 article"
        },
        {
          "date": "2025-06-10T14:20:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel toutes fleurs du Sud-Ouest (PRD005)"
        },
        {
          "date": "2025-06-10T14:00:00",
          "type": "recherche",
          "detail": "Recherche: 'miel brut bio'"
        },
        {
          "date": "2025-05-05T09:00:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Apiculteurs de Diebougou (SEL005)"
        },
        {
          "date": "2025-04-22T15:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250418-00031"
        },
        {
          "date": "2025-04-18T11:30:00",
          "type": "commande",
          "detail": "Commande BF-20250418-00031 (1200 FCFA) - 1 article"
        },
        {
          "date": "2025-04-18T11:25:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Savon au karité et miel (PRD002)"
        },
        {
          "date": "2025-03-10T13:00:00",
          "type": "profil_update",
          "detail": "Profil mis à jour: préférence langue définie sur fr"
        },
        {
          "date": "2025-02-10T10:00:00",
          "type": "confiance_upgrade",
          "detail": "Niveau de confiance atteint: Bronze"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T16:00:00",
          "type": "order_shipped",
          "lu": false,
          "titre": "Commande expédiée",
          "message": "Votre commande BF-20250721-00042 a été expédiée par Coopérative Femmes de Léo"
        },
        {
          "date": "2025-07-23T10:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Vendeur favori promu",
          "message": "Coopérative Femmes de Léo est passée au niveau Or"
        },
        {
          "date": "2025-07-22T14:00:00",
          "type": "order_accepted",
          "lu": false,
          "titre": "Commande acceptée",
          "message": "Votre commande BF-20250721-00042 a été acceptée par le vendeur"
        },
        {
          "date": "2025-07-15T09:30:00",
          "type": "promo",
          "lu": true,
          "titre": "Promotion Karité",
          "message": "20% sur les produits karité cette semaine, profitez-en!"
        },
        {
          "date": "2025-06-12T10:00:00",
          "type": "order_delivered",
          "lu": true,
          "titre": "Commande en livraison",
          "message": "Votre commande BF-20250610-00038 est en cours de livraison"
        },
        {
          "date": "2025-05-05T09:00:00",
          "type": "favorite_added",
          "lu": true,
          "titre": "Vendeur favori",
          "message": "Apiculteurs de Diebougou ajouté à vos favoris"
        },
        {
          "date": "2025-04-01T08:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Avril",
          "message": "Découvrez les nouveaux produits de printemps de nos coopératives"
        }
      ]
    },
    {
      "id": "beta_acheteur_2",
      "type": "acheteur",
      "nom": "Fatimata Ouedraogo",
      "email": "fatimata.ouedraogo@test.bf",
      "telephone": "70 67 89 01",
      "ville": "Bobo-Dioulasso",
      "region": "Hauts-Bassins",
      "trust_level": "argent",
      "achats_count": 32,
      "date_inscription": "2023-03-12",
      "preferences": {
        "categories_preferees": [
          "Miel",
          "Sesame",
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr"
      },
      "description_courte": "Mère de famille nombreuse (6 enfants), achète régulièrement des produits alimentaires locaux",
      "historique_activite": [
        {
          "date": "2025-07-24T18:30:00",
          "type": "commande",
          "detail": "Commande BF-20250724-00156 (9100 FCFA) - 3 articles"
        },
        {
          "date": "2025-07-24T18:25:00",
          "type": "paiement",
          "detail": "Paiement Mobile Money - 9100 FCFA (Moov Money)"
        },
        {
          "date": "2025-07-24T18:20:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel de karité en rayon (PRD006)"
        },
        {
          "date": "2025-07-24T18:15:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Graines de sésame doré (PRD003) x2"
        },
        {
          "date": "2025-07-24T18:10:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-07-24T18:00:00",
          "type": "connexion",
          "detail": "Connexion depuis Bobo-Dioulasso (Hauts-Bassins)"
        },
        {
          "date": "2025-07-20T11:00:00",
          "type": "avis",
          "detail": "Avis 5★ laissé sur Miel toutes fleurs du Sud-Ouest (PRD005)"
        },
        {
          "date": "2025-07-18T15:30:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250710-00148"
        },
        {
          "date": "2025-07-15T09:00:00",
          "type": "notification",
          "detail": "Commande BF-20250710-00148 prête pour retrait"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "commande",
          "detail": "Commande BF-20250710-00148 (4800 FCFA) - 2 articles"
        },
        {
          "date": "2025-07-10T13:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Huile de sésame artisanale (PRD004) x2"
        },
        {
          "date": "2025-06-28T16:00:00",
          "type": "recherche",
          "detail": "Recherche: 'huile sésame pressé froid'"
        },
        {
          "date": "2025-06-20T10:30:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250615-00137"
        },
        {
          "date": "2025-06-15T11:00:00",
          "type": "commande",
          "detail": "Commande BF-20250615-00137 (4000 FCFA) - 1 article"
        },
        {
          "date": "2025-06-15T10:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel toutes fleurs du Sud-Ouest (PRD005)"
        },
        {
          "date": "2025-05-22T14:00:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Coopérative Wend-Kuni (SEL004)"
        },
        {
          "date": "2025-05-10T09:15:00",
          "type": "commande",
          "detail": "Commande BF-20250510-00121 (7200 FCFA) - 4 articles"
        },
        {
          "date": "2025-04-25T16:00:00",
          "type": "confiance_upgrade",
          "detail": "Niveau de confiance atteint: Argent (merci pour votre fidélité!)"
        },
        {
          "date": "2025-04-12T13:00:00",
          "type": "avis",
          "detail": "Avis 4★ laissé sur Graines de sésame doré (PRD003)"
        },
        {
          "date": "2025-03-30T11:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250320-00108"
        },
        {
          "date": "2025-03-20T15:30:00",
          "type": "commande",
          "detail": "Commande BF-20250320-00108 (5300 FCFA) - 2 articles"
        },
        {
          "date": "2025-02-15T10:00:00",
          "type": "profil_update",
          "detail": "Profil mis à jour: adresse de livraison ajoutée"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T18:30:00",
          "type": "order_placed",
          "lu": false,
          "titre": "Commande confirmée",
          "message": "Votre commande BF-20250724-00156 de 9100 FCFA a été enregistrée"
        },
        {
          "date": "2025-07-23T09:00:00",
          "type": "promo",
          "lu": false,
          "titre": "Promo Miel",
          "message": "Le miel de karité en rayon est en stock limité!"
        },
        {
          "date": "2025-07-15T09:00:00",
          "type": "order_ready",
          "lu": true,
          "titre": "Commande prête",
          "message": "Votre commande BF-20250710-00148 est prête pour retrait"
        },
        {
          "date": "2025-06-28T16:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Juin",
          "message": "Recettes du Ramadan avec des produits locaux burkinabè"
        },
        {
          "date": "2025-04-25T16:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Argent atteint!",
          "message": "Félicitations! Vous êtes maintenant acheteur Argents avec 5% de réduction"
        },
        {
          "date": "2025-03-01T08:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Mars",
          "message": "Nouveaux produits de la coopérative Wend-Kuni disponibles"
        }
      ]
    },
    {
      "id": "beta_acheteur_3",
      "type": "acheteur",
      "nom": "Ibrahim Kabore",
      "email": "ibrahim.kabore@test.bf",
      "telephone": "70 78 90 12",
      "ville": "Koudougou",
      "region": "Centre-Ouest",
      "trust_level": "or",
      "achats_count": 85,
      "date_inscription": "2022-06-01",
      "preferences": {
        "categories_preferees": [
          "Artisanat",
          "Coton"
        ],
        "newsletter": false,
        "langue": "fr"
      },
      "description_courte": "Collectionneur passionné d'artisanat burkinabè, acheteur premium niveau Or avec 85 achats",
      "historique_activite": [
        {
          "date": "2025-07-24T20:00:00",
          "type": "commande",
          "detail": "Commande BF-20250724-00203 (27000 FCFA) - 2 articles"
        },
        {
          "date": "2025-07-24T19:55:00",
          "type": "paiement",
          "detail": "Paiement virement bancaire - 27000 FCFA (UBA)"
        },
        {
          "date": "2025-07-24T19:50:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Bronze du Burkina statuette (PRD010)"
        },
        {
          "date": "2025-07-24T19:45:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Pagne en coton bazin riche (PRD007)"
        },
        {
          "date": "2025-07-24T19:30:00",
          "type": "connexion",
          "detail": "Connexion depuis Koudougou (Centre-Ouest)"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "avis",
          "detail": "Avis 5★ laissé sur Bronze du Burkina (PRD010) - 'Pièce magnifique de collection'"
        },
        {
          "date": "2025-07-20T14:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250710-00189"
        },
        {
          "date": "2025-07-18T09:00:00",
          "type": "notification",
          "detail": "Nouvelle pièce en bronze disponible chez Fondeurs de Ouagadougou"
        },
        {
          "date": "2025-07-15T16:30:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Fondeurs de Ouagadougou (SEL009)"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "commande",
          "detail": "Commande BF-20250710-00189 (15000 FCFA) - 1 article"
        },
        {
          "date": "2025-07-10T13:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Bronze du Burkina statuette (PRD010)"
        },
        {
          "date": "2025-06-28T17:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250620-00175"
        },
        {
          "date": "2025-06-20T10:00:00",
          "type": "commande",
          "detail": "Commande BF-20250620-00175 (6500 FCFA) - 1 article"
        },
        {
          "date": "2025-06-20T09:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Panier tressé en fibres locales (PRD009)"
        },
        {
          "date": "2025-06-15T14:00:00",
          "type": "recherche",
          "detail": "Recherche: 'masque bois sculpté Bobo'"
        },
        {
          "date": "2025-05-30T11:00:00",
          "type": "avis",
          "detail": "Avis 5★ laissé sur Pagne en coton bazin riche (PRD007)"
        },
        {
          "date": "2025-05-20T15:30:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250510-00162"
        },
        {
          "date": "2025-05-10T13:00:00",
          "type": "commande",
          "detail": "Commande BF-20250510-00162 (30000 FCFA) - 2 articles"
        },
        {
          "date": "2025-05-10T12:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Masque en bois sculpté (PRD011) x2"
        },
        {
          "date": "2025-04-18T10:00:00",
          "type": "confiance_upgrade",
          "detail": "Niveau de confiance atteint: Or - statut premium débloqué"
        },
        {
          "date": "2025-04-05T16:00:00",
          "type": "commande",
          "detail": "Commande BF-20250405-00151 (18000 FCFA) - 1 article"
        },
        {
          "date": "2025-03-22T11:00:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Sculpteurs de Bobo-Dioulasso (SEL010)"
        },
        {
          "date": "2025-03-10T14:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250228-00138"
        },
        {
          "date": "2025-02-28T13:00:00",
          "type": "commande",
          "detail": "Commande BF-20250228-00138 (12000 FCFA) - 1 article"
        },
        {
          "date": "2025-02-10T09:00:00",
          "type": "recherche",
          "detail": "Recherche: 'bijoux perles Sahel'"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T20:00:00",
          "type": "order_placed",
          "lu": false,
          "titre": "Commande premium",
          "message": "Votre commande BF-20250724-00203 de 27000 FCFA a été enregistrée - 10% de réduction Or appliquée"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "review_thanks",
          "lu": false,
          "titre": "Merci pour votre avis",
          "message": "Votre avis sur Bronze du Burkina aide la communauté"
        },
        {
          "date": "2025-07-18T09:00:00",
          "type": "new_product",
          "lu": true,
          "titre": "Nouveau produit favori",
          "message": "Fondeurs de Ouagadougou a ajouté une nouvelle pièce en bronze"
        },
        {
          "date": "2025-07-15T16:30:00",
          "type": "favorite_added",
          "lu": true,
          "titre": "Favori ajouté",
          "message": "Fondeurs de Ouagadougou ajouté à vos vendeurs favoris"
        },
        {
          "date": "2025-06-15T14:00:00",
          "type": "search_suggestion",
          "lu": true,
          "titre": "Suggestion",
          "message": "Basé sur vos recherches: Masque en bois sculpté pourrait vous intéresser"
        },
        {
          "date": "2025-04-18T10:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Or atteint!",
          "message": "Félicitations! Vous êtes maintenant acheteur Or avec 10% de réduction permanente"
        },
        {
          "date": "2025-03-22T11:00:00",
          "type": "favorite_added",
          "lu": true,
          "titre": "Favori ajouté",
          "message": "Sculpteurs de Bobo-Dioulasso ajouté à vos vendeurs favoris"
        },
        {
          "date": "2025-02-15T09:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Février",
          "message": "Nouvelles collections d'artisanat disponibles"
        }
      ]
    },
    {
      "id": "beta_acheteur_4",
      "type": "acheteur",
      "nom": "Aïssata Traoré",
      "email": "aissata.traore@test.bf",
      "telephone": "70 33 44 55",
      "ville": "Ouahigouya",
      "region": "Nord",
      "trust_level": "bronze",
      "achats_count": 8,
      "date_inscription": "2024-11-20",
      "preferences": {
        "categories_preferees": [
          "Miel",
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr"
      },
      "description_courte": "Neene (aînée) réservée de Ouahigouya, achète miel et karité pour sa famille élargie",
      "historique_activite": [
        {
          "date": "2025-07-23T17:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250718-00074"
        },
        {
          "date": "2025-07-22T10:00:00",
          "type": "notification",
          "detail": "Commande BF-20250718-00074 en livraison"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "commande",
          "detail": "Commande BF-20250718-00074 (4000 FCFA) - 1 article"
        },
        {
          "date": "2025-07-18T13:55:00",
          "type": "paiement",
          "detail": "Paiement Mobile Money - 4000 FCFA (Orange Money)"
        },
        {
          "date": "2025-07-18T13:50:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel toutes fleurs du Sud-Ouest (PRD005)"
        },
        {
          "date": "2025-07-18T13:30:00",
          "type": "connexion",
          "detail": "Connexion depuis Ouahigouya (Nord)"
        },
        {
          "date": "2025-06-25T11:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250615-00065"
        },
        {
          "date": "2025-06-15T16:00:00",
          "type": "commande",
          "detail": "Commande BF-20250615-00065 (2500 FCFA) - 1 article"
        },
        {
          "date": "2025-06-15T15:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-05-20T10:00:00",
          "type": "avis",
          "detail": "Avis 4★ laissé sur Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-05-10T14:30:00",
          "type": "recherche",
          "detail": "Recherche: 'miel karité naturel'"
        },
        {
          "date": "2025-04-28T11:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250420-00058"
        },
        {
          "date": "2025-04-20T15:00:00",
          "type": "commande",
          "detail": "Commande BF-20250420-00058 (5500 FCFA) - 1 article"
        },
        {
          "date": "2025-04-20T14:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel de karité en rayon (PRD006)"
        },
        {
          "date": "2025-03-15T13:00:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Apiculteurs de Diebougou (SEL005)"
        },
        {
          "date": "2025-02-20T10:30:00",
          "type": "commande",
          "detail": "Commande BF-20250220-00045 (1200 FCFA) - 1 article"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-23T17:00:00",
          "type": "order_delivered",
          "lu": false,
          "titre": "Commande livrée",
          "message": "Votre commande BF-20250718-00074 a été livrée - merci de confirmer la réception"
        },
        {
          "date": "2025-07-22T10:00:00",
          "type": "order_shipped",
          "lu": true,
          "titre": "Commande en livraison",
          "message": "Votre commande BF-20250718-00074 est en cours de livraison"
        },
        {
          "date": "2025-06-25T11:00:00",
          "type": "order_delivered",
          "lu": true,
          "titre": "Commande livrée",
          "message": "Votre commande BF-20250615-00065 a été livrée"
        },
        {
          "date": "2025-05-20T10:00:00",
          "type": "review_thanks",
          "lu": true,
          "titre": "Merci pour votre avis",
          "message": "Votre avis sur Beurre de karité pur est très apprécié"
        },
        {
          "date": "2025-03-15T13:00:00",
          "type": "favorite_added",
          "lu": true,
          "titre": "Favori ajouté",
          "message": "Apiculteurs de Diebougou ajouté à vos vendeurs favoris"
        }
      ]
    },
    {
      "id": "beta_vendeur_1",
      "type": "vendeur",
      "nom": "Coopérative Femmes de Léo",
      "email": "femmesleo@test.bf",
      "telephone": "70 50 60 70",
      "ville": "Léo",
      "region": "Sud-Ouest",
      "trust_level": "argent",
      "ventes_count": 87,
      "seller_id": "SEL001",
      "categories": [
        "Karite"
      ],
      "date_inscription": "2019-03-15",
      "preferences": {
        "categories_gerees": [
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_commandes": true
      },
      "description_courte": "Coopérative de 200+ femmes productrices de karité bio à Léo, 87 ventes réalisées",
      "historique_activite": [
        {
          "date": "2025-07-24T16:00:00",
          "type": "expedition_commande",
          "detail": "Commande BF-20250721-00042 expédiée (client: Amadou Diallo)"
        },
        {
          "date": "2025-07-23T09:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250721-00042 marquée comme reçue par le client"
        },
        {
          "date": "2025-07-22T14:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250721-00042 acceptée"
        },
        {
          "date": "2025-07-21T09:20:00",
          "type": "notification",
          "detail": "Nouvelle commande reçue: BF-20250721-00042 (2500 FCFA)"
        },
        {
          "date": "2025-07-21T09:15:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x1 - 2500 FCFA"
        },
        {
          "date": "2025-07-21T09:00:00",
          "type": "paiement_recu",
          "detail": "Paiement Mobile Money reçu - 2500 FCFA"
        },
        {
          "date": "2025-07-20T08:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Léo (Sud-Ouest)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "gestion_stock",
          "detail": "Stock mis à jour: Beurre de karité pur (PRD001) - 150 unités disponibles"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x3 - 7500 FCFA (commande BF-20250715-00120)"
        },
        {
          "date": "2025-07-15T10:30:00",
          "type": "message_client",
          "detail": "Message reçu de Fatimata Ouedraogo - question sur origine du karité"
        },
        {
          "date": "2025-07-12T16:00:00",
          "type": "reponse_message",
          "detail": "Réponse envoyée à Fatimata Ouedraogo"
        },
        {
          "date": "2025-07-10T09:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x2 - 5000 FCFA (commande BF-20250710-00115)"
        },
        {
          "date": "2025-07-05T14:00:00",
          "type": "avis_recu",
          "detail": "Avis 5★ reçu sur Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-06-28T11:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance atteint: Argent (87 ventes)"
        },
        {
          "date": "2025-06-20T10:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250615-00115 acceptée et expédiée"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x5 - 12500 FCFA (lot revendeur)"
        },
        {
          "date": "2025-05-15T13:00:00",
          "type": "gestion_stock",
          "detail": "Réassort: 200 unités de beurre de karité produites et ajoutées au stock"
        },
        {
          "date": "2025-04-20T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x1 - 2500 FCFA"
        },
        {
          "date": "2025-03-30T10:00:00",
          "type": "certification_update",
          "detail": "Certification BioSPG renouvelée pour 2 ans"
        },
        {
          "date": "2025-02-15T14:00:00",
          "type": "produit_ajoute",
          "detail": "Nouveau produit ajouté: Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-01-28T09:00:00",
          "type": "profil_update",
          "detail": "Profil coopérative mis à jour: 200+ femmes membres"
        },
        {
          "date": "2025-01-25T11:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Léo (Sud-Ouest)"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T16:00:00",
          "type": "order_shipped",
          "lu": false,
          "titre": "Commande expédiée",
          "message": "BF-20250721-00042 expédiée avec succès au client Amadou Diallo"
        },
        {
          "date": "2025-07-23T09:00:00",
          "type": "order_completed",
          "lu": false,
          "titre": "Commande terminée",
          "message": "BF-20250721-00042 marquée comme reçue - paiement libéré"
        },
        {
          "date": "2025-07-21T09:15:00",
          "type": "new_order",
          "lu": false,
          "titre": "Nouvelle commande",
          "message": "Commande BF-20250721-00042 (2500 FCFA) reçue - à valider"
        },
        {
          "date": "2025-07-15T10:30:00",
          "type": "new_message",
          "lu": true,
          "titre": "Nouveau message",
          "message": "Fatimata Ouedraogo vous a envoyé un message"
        },
        {
          "date": "2025-07-05T14:00:00",
          "type": "new_review",
          "lu": true,
          "titre": "Nouvel avis 5★",
          "message": "Un client a laissé un avis 5★ sur Beurre de karité pur"
        },
        {
          "date": "2025-06-28T11:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Argent atteint!",
          "message": "Félicitations! Votre coopérative atteint le niveau Argent"
        },
        {
          "date": "2025-03-30T10:00:00",
          "type": "certification",
          "lu": true,
          "titre": "Certification renouvelée",
          "message": "Votre certification BioSPG a été renouvelée pour 2 ans"
        }
      ]
    },
    {
      "id": "beta_vendeur_2",
      "type": "vendeur",
      "nom": "Fondeurs de Ouagadougou",
      "email": "fondeurs@test.bf",
      "telephone": "70 01 23 45",
      "ville": "Ouagadougou",
      "region": "Centre",
      "trust_level": "or",
      "ventes_count": 230,
      "seller_id": "SEL009",
      "categories": [
        "Artisanat"
      ],
      "date_inscription": "2016-01-01",
      "preferences": {
        "categories_gerees": [
          "Artisanat"
        ],
        "newsletter": false,
        "langue": "fr",
        "notifications_commandes": true
      },
      "description_courte": "Maîtres fondeurs de bronze, technique ancestrale cire perdue, 230 ventes, niveau Or",
      "historique_activite": [
        {
          "date": "2025-07-24T20:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x1 - 15000 FCFA (commande BF-20250724-00203, client: Ibrahim Kabore)"
        },
        {
          "date": "2025-07-24T19:30:00",
          "type": "notification",
          "detail": "Nouvelle commande premium reçue: BF-20250724-00203 (27000 FCFA)"
        },
        {
          "date": "2025-07-24T19:00:00",
          "type": "paiement_recu",
          "detail": "Paiement virement bancaire reçu - 27000 FCFA"
        },
        {
          "date": "2025-07-22T11:30:00",
          "type": "avis_recu",
          "detail": "Avis 5★ reçu sur Bronze du Burkina (PRD010) de Ibrahim Kabore"
        },
        {
          "date": "2025-07-22T10:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250720-00195 expédiée"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "expedition_commande",
          "detail": "Commande BF-20250720-00195 expédiée (client: Boutique Sahel Commerce)"
        },
        {
          "date": "2025-07-20T14:00:00",
          "type": "vente",
          "detail": "Vente en gros: Bronze du Burkina statuette (PRD010) x5 - 75000 FCFA (lot revendeur)"
        },
        {
          "date": "2025-07-18T09:00:00",
          "type": "nouveau_produit",
          "detail": "Nouvelle pièce ajoutée au catalogue: statuette danseur Lobi (PRD010 variante)"
        },
        {
          "date": "2025-07-15T16:30:00",
          "type": "message_client",
          "detail": "Message reçu de Ibrahim Kabore - commande personnalisée demandée"
        },
        {
          "date": "2025-07-15T15:00:00",
          "type": "reponse_message",
          "detail": "Réponse envoyée à Ibrahim Kabore - devis personnalisé"
        },
        {
          "date": "2025-07-10T14:30:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x1 - 15000 FCFA (commande BF-20250710-00189)"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250710-00189 acceptée"
        },
        {
          "date": "2025-07-05T11:00:00",
          "type": "gestion_stock",
          "detail": "Stock mis à jour: Bronze du Burkina (PRD010) - 15 unités disponibles (alerte stock bas)"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x3 - 45000 FCFA (lot revendeur)"
        },
        {
          "date": "2025-06-20T10:00:00",
          "type": "production",
          "detail": "Nouvelle production terminée: 8 statuettes en bronze cire perdue"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x2 - 30000 FCFA (export)"
        },
        {
          "date": "2025-05-25T13:00:00",
          "type": "certification_update",
          "detail": "Certification ABNORM maintenue - contrôle qualité passé"
        },
        {
          "date": "2025-05-10T11:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance maintenu: Or (230 ventes)"
        },
        {
          "date": "2025-04-25T10:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x1 - 15000 FCFA"
        },
        {
          "date": "2025-04-15T14:00:00",
          "type": "message_client",
          "detail": "Message reçu de Artisan Market Tenkodogo - demande de lot bronze"
        },
        {
          "date": "2025-03-30T11:00:00",
          "type": "production",
          "detail": "Nouvelle production: 12 statuettes en bronze ajoutées au stock"
        },
        {
          "date": "2025-03-15T09:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x4 - 60000 FCFA (lot export)"
        },
        {
          "date": "2025-02-20T16:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Ouagadougou (Centre)"
        },
        {
          "date": "2025-02-10T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x1 - 15000 FCFA"
        },
        {
          "date": "2025-01-28T10:00:00",
          "type": "profil_update",
          "detail": "Profil atelier mis à jour: nouvelle photo galerie"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T19:30:00",
          "type": "new_order",
          "lu": false,
          "titre": "Commande premium",
          "message": "Commande BF-20250724-00203 (27000 FCFA) de Ibrahim Kabore reçue"
        },
        {
          "date": "2025-07-24T19:00:00",
          "type": "payment_received",
          "lu": false,
          "titre": "Paiement reçu",
          "message": "27000 FCFA reçus par virement bancaire - commande BF-20250724-00203"
        },
        {
          "date": "2025-07-22T11:30:00",
          "type": "new_review",
          "lu": false,
          "titre": "Avis 5★",
          "message": "Ibrahim Kabore a laissé un avis 5★ sur Bronze du Burkina"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "order_shipped",
          "lu": true,
          "titre": "Commande expédiée",
          "message": "BF-20250720-00195 expédiée à Boutique Sahel Commerce"
        },
        {
          "date": "2025-07-18T09:00:00",
          "type": "product_added",
          "lu": true,
          "titre": "Produit ajouté",
          "message": "Nouvelle pièce ajoutée au catalogue"
        },
        {
          "date": "2025-07-15T16:30:00",
          "type": "new_message",
          "lu": true,
          "titre": "Message personnalisé",
          "message": "Ibrahim Kabore demande une commande personnalisée"
        },
        {
          "date": "2025-07-05T11:00:00",
          "type": "low_stock",
          "lu": true,
          "titre": "Stock bas",
          "message": "Bronze du Burkina: 15 unités restantes - pensez à relancer la production"
        },
        {
          "date": "2025-05-25T13:00:00",
          "type": "certification",
          "lu": true,
          "titre": "Certification maintenue",
          "message": "Votre certification ABNORM a été renouvelée"
        }
      ]
    },
    {
      "id": "beta_vendeur_3",
      "type": "vendeur",
      "nom": "Apiculteur de Banfora",
      "email": "apiculteur.banfora@test.bf",
      "telephone": "70 24 68 13",
      "ville": "Banfora",
      "region": "Cascades",
      "trust_level": "argent",
      "ventes_count": 65,
      "seller_id": "SEL004",
      "categories": [
        "Miel"
      ],
      "date_inscription": "2020-09-10",
      "preferences": {
        "categories_gerees": [
          "Miel"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_commandes": true
      },
      "description_courte": "Apiculteur de Banfora spécialisé en miel de karité et miel toutes fleurs, 65 ventes",
      "historique_activite": [
        {
          "date": "2025-07-24T17:30:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel toutes fleurs du Sud-Ouest (PRD005) x2 - 8000 FCFA (commande BF-20250724-00160)"
        },
        {
          "date": "2025-07-24T17:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250724-00160 acceptée"
        },
        {
          "date": "2025-07-23T11:00:00",
          "type": "paiement_recu",
          "detail": "Paiement Mobile Money reçu - 8000 FCFA"
        },
        {
          "date": "2025-07-22T15:00:00",
          "type": "notification",
          "detail": "Nouvelle commande reçue: BF-20250724-00160"
        },
        {
          "date": "2025-07-20T10:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Banfora (Cascades)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "gestion_stock",
          "detail": "Stock mis à jour: Miel de karité en rayon (PRD006) - 25 unités (stock limité)"
        },
        {
          "date": "2025-07-15T11:30:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel de karité en rayon (PRD006) x1 - 5500 FCFA (commande BF-20250715-00125)"
        },
        {
          "date": "2025-07-12T09:00:00",
          "type": "message_client",
          "detail": "Message reçu de Boutique Sahel Commerce - demande de lot miel"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "reponse_message",
          "detail": "Réponse envoyée à Boutique Sahel Commerce - devis lot 20 unités"
        },
        {
          "date": "2025-07-05T16:00:00",
          "type": "vente",
          "detail": "Vente en gros: Miel toutes fleurs du Sud-Ouest (PRD005) x10 - 40000 FCFA (lot revendeur)"
        },
        {
          "date": "2025-06-28T11:00:00",
          "type": "production",
          "detail": "Récolte de printemps terminée: 80 kg de miel toutes fleurs"
        },
        {
          "date": "2025-06-20T10:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250615-00120 expédiée"
        },
        {
          "date": "2025-06-15T15:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel toutes fleurs du Sud-Ouest (PRD005) x3 - 12000 FCFA"
        },
        {
          "date": "2025-06-10T11:00:00",
          "type": "avis_recu",
          "detail": "Avis 4★ reçu sur Miel de karité en rayon (PRD006)"
        },
        {
          "date": "2025-05-28T14:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance atteint: Argent (65 ventes)"
        },
        {
          "date": "2025-05-15T10:00:00",
          "type": "gestion_stock",
          "detail": "Réassort: 50 unités de miel de karité en rayon produites"
        },
        {
          "date": "2025-04-20T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel toutes fleurs du Sud-Ouest (PRD005) x5 - 20000 FCFA (lot)"
        },
        {
          "date": "2025-04-05T13:00:00",
          "type": "certification_update",
          "detail": "Certification BioSPG maintenue pour la saison 2025"
        },
        {
          "date": "2025-03-15T10:00:00",
          "type": "production",
          "detail": "Préparation des ruches pour la saison des fleurs de karité"
        },
        {
          "date": "2025-02-20T09:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel toutes fleurs du Sud-Ouest (PRD005) x2 - 8000 FCFA"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T17:00:00",
          "type": "new_order",
          "lu": false,
          "titre": "Nouvelle commande",
          "message": "Commande BF-20250724-00160 (8000 FCFA) reçue"
        },
        {
          "date": "2025-07-23T11:00:00",
          "type": "payment_received",
          "lu": false,
          "titre": "Paiement reçu",
          "message": "8000 FCFA reçus par Mobile Money"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "low_stock",
          "lu": true,
          "titre": "Stock limité",
          "message": "Miel de karité en rayon: 25 unités restantes - produit rare"
        },
        {
          "date": "2025-07-12T09:00:00",
          "type": "new_message",
          "lu": true,
          "titre": "Demande de lot",
          "message": "Boutique Sahel Commerce demande un lot de miel"
        },
        {
          "date": "2025-06-10T11:00:00",
          "type": "new_review",
          "lu": true,
          "titre": "Nouvel avis",
          "message": "Un client a laissé un avis 4★ sur Miel de karité en rayon"
        },
        {
          "date": "2025-05-28T14:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Argent atteint!",
          "message": "Félicitations! Vous atteignez le niveau Argent"
        }
      ]
    },
    {
      "id": "beta_vendeur_4",
      "type": "vendeur",
      "nom": "Tisserands de Koudougou",
      "email": "tisserands.koudougou@test.bf",
      "telephone": "70 79 13 57",
      "ville": "Koudougou",
      "region": "Centre-Ouest",
      "trust_level": "bronze",
      "ventes_count": 28,
      "seller_id": "SEL007",
      "categories": [
        "Coton",
        "Bogolan"
      ],
      "date_inscription": "2023-02-15",
      "preferences": {
        "categories_gerees": [
          "Coton",
          "Bogolan"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_commandes": true
      },
      "description_courte": "Coopérative de tisserands traditionnels de Koudougou, coton et bogolan, 28 ventes",
      "historique_activite": [
        {
          "date": "2025-07-23T16:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Fil de coton filé main (PRD008) x10 - 9000 FCFA (commande BF-20250723-00092)"
        },
        {
          "date": "2025-07-23T15:30:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250723-00092 acceptée"
        },
        {
          "date": "2025-07-23T15:00:00",
          "type": "paiement_recu",
          "detail": "Paiement Mobile Money reçu - 9000 FCFA"
        },
        {
          "date": "2025-07-22T09:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Koudougou (Centre-Ouest)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "notification",
          "detail": "Nouvelle commande reçue: BF-20250723-00092"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "gestion_stock",
          "detail": "Stock mis à jour: Fil de coton filé main (PRD008) - 300 bobines"
        },
        {
          "date": "2025-07-10T15:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Fil de coton filé main (PRD008) x5 - 4500 FCFA (commande BF-20250710-00085)"
        },
        {
          "date": "2025-07-05T10:00:00",
          "type": "message_client",
          "detail": "Message reçu de Distrib Plus Centre - demande de lot bogolan"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "production",
          "detail": "Nouvelle production: 100 bobines de fil de coton filées"
        },
        {
          "date": "2025-06-20T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Fil de coton filé main (PRD008) x20 - 18000 FCFA (lot revendeur)"
        },
        {
          "date": "2025-06-15T10:00:00",
          "type": "reponse_message",
          "detail": "Réponse envoyée à Boutique Sahel Commerce - devis lot coton"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "avis_recu",
          "detail": "Avis 4★ reçu sur Fil de coton filé main (PRD008)"
        },
        {
          "date": "2025-05-28T11:00:00",
          "type": "message_client",
          "detail": "Message reçu de Boutique Sahel Commerce - demande de prix gros"
        },
        {
          "date": "2025-05-20T14:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250515-00072 expédiée"
        },
        {
          "date": "2025-05-15T10:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Fil de coton filé main (PRD008) x8 - 7200 FCFA"
        },
        {
          "date": "2025-04-25T13:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance atteint: Bronze (28 ventes)"
        },
        {
          "date": "2025-04-10T11:00:00",
          "type": "produit_ajoute",
          "detail": "Nouveau produit ajouté: Fil de coton filé main (PRD008)"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "production",
          "detail": "Production de bogolan: 15 pièces teintes traditionnellement"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-23T15:30:00",
          "type": "new_order",
          "lu": false,
          "titre": "Nouvelle commande",
          "message": "Commande BF-20250723-00092 (9000 FCFA) reçue"
        },
        {
          "date": "2025-07-23T15:00:00",
          "type": "payment_received",
          "lu": false,
          "titre": "Paiement reçu",
          "message": "9000 FCFA reçus par Mobile Money"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "new_order",
          "lu": true,
          "titre": "Commande en attente",
          "message": "BF-20250723-00092 - à valider"
        },
        {
          "date": "2025-07-05T10:00:00",
          "type": "new_message",
          "lu": true,
          "titre": "Demande de lot",
          "message": "Distrib Plus Centre demande un lot bogolan"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "new_review",
          "lu": true,
          "titre": "Nouvel avis",
          "message": "Un client a laissé un avis 4★ sur Fil de coton filé main"
        }
      ]
    },
    {
      "id": "beta_revendeur_1",
      "type": "revendeur",
      "nom": "Boutique Sahel Commerce",
      "email": "sahel.commerce@test.bf",
      "telephone": "70 34 56 78",
      "ville": "Ouagadougou",
      "region": "Centre",
      "trust_level": "or",
      "boutique_type": "grande_boutique",
      "transactions_count": 156,
      "date_inscription": "2021-04-10",
      "preferences": {
        "categories_gerees": [
          "Artisanat",
          "Coton",
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_lots": true
      },
      "description_courte": "Grande boutique d'import/export à Ouagadougou, 156 transactions en gros, niveau Or",
      "historique_activite": [
        {
          "date": "2025-07-24T19:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Bronze du Burkina statuette (PRD010) x5 - 75000 FCFA (LOT-20250724-0042)"
        },
        {
          "date": "2025-07-24T18:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 5 x 15000 = 75000 FCFA - remise gros 10% = 67500 FCFA économisés 7500 FCFA"
        },
        {
          "date": "2025-07-24T18:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Fondeurs de Ouagadougou (SEL009) - demande de devis lot"
        },
        {
          "date": "2025-07-22T15:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250715-0038 - 20 bobines de fil de coton (PRD008)"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 18000 FCFA à Tisserands de Koudougou"
        },
        {
          "date": "2025-07-20T14:00:00",
          "type": "commande_gros",
          "detail": "Commande gros enregistrée: LOT-20250720-0040 (75000 FCFA) - 5 statuettes bronze"
        },
        {
          "date": "2025-07-18T11:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 20 bobines de fil de coton (PRD008) à 1200 FCFA/bobine (marge 33%)"
        },
        {
          "date": "2025-07-15T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Miel toutes fleurs du Sud-Ouest (PRD005) x10 - 40000 FCFA (LOT-20250715-0039)"
        },
        {
          "date": "2025-07-15T13:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 10 x 4000 = 40000 FCFA - remise gros 8% = 36800 FCFA économisés 3200 FCFA"
        },
        {
          "date": "2025-07-12T09:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Apiculteur de Banfora (SEL004) - négociation prix miel"
        },
        {
          "date": "2025-07-10T16:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250705-0035 - 5 statuettes bronze (PRD010)"
        },
        {
          "date": "2025-07-05T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Bronze du Burkina statuette (PRD010) x2 - 35000 FCFA (marge 4000 FCFA/unité)"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Pagne en coton bazin riche (PRD007) x10 - 180000 FCFA (LOT-20250628-0032)"
        },
        {
          "date": "2025-06-25T10:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Tisserands de Koudougou (SEL007) - commande lot bogolan"
        },
        {
          "date": "2025-06-20T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 10 pagnes bazin riche (PRD007) à 22000 FCFA/unité (marge 22%)"
        },
        {
          "date": "2025-06-15T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Pagne en coton bazin riche (PRD007) x3 - 66000 FCFA"
        },
        {
          "date": "2025-06-10T14:00:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 10 x 18000 = 180000 FCFA - remise gros 12% = 158400 FCFA économisés 21600 FCFA"
        },
        {
          "date": "2025-05-25T10:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250520-0028 - 50 beurres de karité (PRD001)"
        },
        {
          "date": "2025-05-15T14:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 125000 FCFA à Coopérative Femmes de Léo"
        },
        {
          "date": "2025-04-28T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Beurre de karité pur (PRD001) x50 - 125000 FCFA (LOT-20250428-0025)"
        },
        {
          "date": "2025-04-10T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 50 beurres de karité (PRD001) à 3000 FCFA/unité (marge 20%)"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard revendeur depuis Ouagadougou (Centre)"
        },
        {
          "date": "2025-02-15T14:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance atteint: Or - remise gros maximale débloquée"
        },
        {
          "date": "2025-01-30T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Bronze du Burkina statuette (PRD010) x1 - 18000 FCFA (marge 3000 FCFA)"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T19:00:00",
          "type": "wholesale_confirmed",
          "lu": false,
          "titre": "Commande gros confirmée",
          "message": "LOT-20250724-0042 (75000 FCFA) confirmée par Fondeurs de Ouagadougou"
        },
        {
          "date": "2025-07-22T15:00:00",
          "type": "lot_received",
          "lu": false,
          "titre": "Lot reçu",
          "message": "LOT-20250715-0038 reçu - 20 bobines de fil de coton disponibles"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "payment_sent",
          "lu": true,
          "titre": "Paiement envoyé",
          "message": "18000 FCFA envoyés à Tisserands de Koudougou"
        },
        {
          "date": "2025-07-18T11:00:00",
          "type": "products_listed",
          "lu": true,
          "titre": "Produits mis en vente",
          "message": "20 bobines de fil de coton mises en vente à 1200 FCFA"
        },
        {
          "date": "2025-07-12T09:00:00",
          "type": "supplier_reply",
          "lu": true,
          "titre": "Réponse fournisseur",
          "message": "Apiculteur de Banfora a répondu à votre demande de devis"
        },
        {
          "date": "2025-06-25T10:00:00",
          "type": "supplier_contact",
          "lu": true,
          "titre": "Contact fournisseur",
          "message": "Demande de lot bogolan envoyée à Tisserands de Koudougou"
        },
        {
          "date": "2025-02-15T14:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Or atteint!",
          "message": "Félicitations! Niveau Or débloqué - remises gros maximales"
        }
      ]
    },
    {
      "id": "beta_revendeur_2",
      "type": "revendeur",
      "nom": "Petite Boutique Bobo",
      "email": "petite.bobo@test.bf",
      "telephone": "70 45 67 89",
      "ville": "Bobo-Dioulasso",
      "region": "Hauts-Bassins",
      "trust_level": "argent",
      "boutique_type": "petite_boutique",
      "transactions_count": 43,
      "date_inscription": "2022-08-22",
      "preferences": {
        "categories_gerees": [
          "Miel",
          "Sesame",
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_lots": true
      },
      "description_courte": "Petite boutique d'épicerie locale à Bobo-Dioulasso, 43 transactions en lots moyens",
      "historique_activite": [
        {
          "date": "2025-07-23T17:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Graines de sésame doré (PRD003) x20 kg - 36000 FCFA (LOT-20250723-0018)"
        },
        {
          "date": "2025-07-23T16:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 20 x 1800 = 36000 FCFA - remise gros 5% = 34200 FCFA économisés 1800 FCFA"
        },
        {
          "date": "2025-07-23T16:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Ferme Wend-Kuni (SEL003) - commande sésame"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250715-0016 - 10 miels toutes fleurs (PRD005)"
        },
        {
          "date": "2025-07-20T15:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 40000 FCFA à Apiculteur de Banfora"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 10 miels toutes fleurs (PRD005) à 4500 FCFA/unité (marge 12.5%)"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Miel toutes fleurs du Sud-Ouest (PRD005) x10 - 40000 FCFA (LOT-20250715-0016)"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Beurre de karité pur (PRD001) x5 - 15000 FCFA (marge 2500 FCFA)"
        },
        {
          "date": "2025-06-28T10:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Coopérative Femmes de Léo (SEL001) - commande beurre karité"
        },
        {
          "date": "2025-06-20T15:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250615-0014 - 20 beurres de karité (PRD001)"
        },
        {
          "date": "2025-06-15T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Beurre de karité pur (PRD001) x20 - 50000 FCFA (LOT-20250615-0014)"
        },
        {
          "date": "2025-06-10T13:00:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 20 x 2500 = 50000 FCFA - remise gros 5% = 47500 FCFA économisés 2500 FCFA"
        },
        {
          "date": "2025-05-28T14:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 20 beurres de karité (PRD001) à 3000 FCFA/unité"
        },
        {
          "date": "2025-05-15T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Miel toutes fleurs (PRD005) x3 - 13500 FCFA"
        },
        {
          "date": "2025-05-05T10:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 12000 FCFA à Apiculteur de Banfora"
        },
        {
          "date": "2025-04-20T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Huile de sésame artisanale (PRD004) x8 - 24000 FCFA (LOT-20250420-0011)"
        },
        {
          "date": "2025-04-10T11:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250405-0010 - 8 huiles de sésame (PRD004)"
        },
        {
          "date": "2025-03-20T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 8 huiles de sésame (PRD004) à 3500 FCFA/unité"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-23T17:00:00",
          "type": "wholesale_confirmed",
          "lu": false,
          "titre": "Commande gros confirmée",
          "message": "LOT-20250723-0018 (36000 FCFA) confirmée par Ferme Wend-Kuni"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "lot_received",
          "lu": false,
          "titre": "Lot reçu",
          "message": "LOT-20250715-0016 reçu - 10 miels disponibles en boutique"
        },
        {
          "date": "2025-07-20T15:00:00",
          "type": "payment_sent",
          "lu": true,
          "titre": "Paiement envoyé",
          "message": "40000 FCFA envoyés à Apiculteur de Banfora"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "products_listed",
          "lu": true,
          "titre": "Produits mis en vente",
          "message": "10 miels toutes fleurs à 4500 FCFA en boutique"
        },
        {
          "date": "2025-06-28T10:00:00",
          "type": "supplier_contact",
          "lu": true,
          "titre": "Contact fournisseur",
          "message": "Demande envoyée à Coopérative Femmes de Léo"
        },
        {
          "date": "2025-04-25T09:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Avril",
          "message": "Offres spéciales printemps pour revendeurs"
        }
      ]
    },
    {
      "id": "beta_revendeur_3",
      "type": "revendeur",
      "nom": "Distrib Plus Centre",
      "email": "distrib.plus@test.bf",
      "telephone": "70 88 77 66",
      "ville": "Ouagadougou",
      "region": "Centre",
      "trust_level": "or",
      "boutique_type": "grande_boutique",
      "transactions_count": 280,
      "date_inscription": "2020-01-15",
      "preferences": {
        "categories_gerees": [
          "Karite",
          "Sesame",
          "Miel",
          "Coton"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_lots": true
      },
      "description_courte": "Distributeur régional à Ouagadougou, 280 transactions, couvre plusieurs régions du Burkina",
      "historique_activite": [
        {
          "date": "2025-07-24T18:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Beurre de karité pur (PRD001) x100 - 250000 FCFA (LOT-20250724-0085)"
        },
        {
          "date": "2025-07-24T17:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 100 x 2500 = 250000 FCFA - remise gros Or 15% = 212500 FCFA économisés 37500 FCFA"
        },
        {
          "date": "2025-07-24T17:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Coopérative Femmes de Léo (SEL001) - commande mensuelle"
        },
        {
          "date": "2025-07-22T16:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250715-0082 - 50 miels toutes fleurs (PRD005)"
        },
        {
          "date": "2025-07-20T15:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Beurre de karité pur (PRD001) x30 - 90000 FCFA (marge 15000 FCFA)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 200000 FCFA à Apiculteur de Banfora"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Miel toutes fleurs du Sud-Ouest (PRD005) x50 - 200000 FCFA (LOT-20250715-0082)"
        },
        {
          "date": "2025-07-12T10:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 50 miels toutes fleurs (PRD005) à 4500 FCFA/unité (marge 12.5%)"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Apiculteur de Banfora (SEL004) - demande devis 50 unités"
        },
        {
          "date": "2025-07-05T15:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Graines de sésame doré (PRD003) x50 kg - 90000 FCFA (LOT-20250705-0078)"
        },
        {
          "date": "2025-07-05T14:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 50 x 1800 = 90000 FCFA - remise gros 12% = 79200 FCFA économisés 10800 FCFA"
        },
        {
          "date": "2025-06-28T16:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250620-0075 - 30 pagnes bazin riche (PRD007)"
        },
        {
          "date": "2025-06-25T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Pagne en coton bazin riche (PRD007) x5 - 110000 FCFA (marge 10000 FCFA)"
        },
        {
          "date": "2025-06-20T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Pagne en coton bazin riche (PRD007) x30 - 540000 FCFA (LOT-20250620-0075)"
        },
        {
          "date": "2025-06-15T10:00:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 30 x 18000 = 540000 FCFA - remise gros 15% = 459000 FCFA économisés 81000 FCFA"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 30 pagnes bazin riche (PRD007) à 22000 FCFA/unité"
        },
        {
          "date": "2025-05-28T11:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Tisserands de Koudougou (SEL007) - commande lot bogolan"
        },
        {
          "date": "2025-05-20T14:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Graines de sésame doré (PRD003) x20 kg - 40000 FCFA"
        },
        {
          "date": "2025-05-10T10:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250505-0070 - 100 beurres de karité (PRD001)"
        },
        {
          "date": "2025-04-28T15:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Beurre de karité pur (PRD001) x100 - 250000 FCFA (LOT-20250428-0068)"
        },
        {
          "date": "2025-04-15T11:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 212500 FCFA à Coopérative Femmes de Léo (remise Or 15%)"
        },
        {
          "date": "2025-04-05T14:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 100 beurres de karité (PRD001) à 3000 FCFA/unité"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance maintenu: Or - 280 transactions"
        },
        {
          "date": "2025-02-15T15:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard revendeur depuis Ouagadougou (Centre)"
        },
        {
          "date": "2025-02-10T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Miel toutes fleurs (PRD005) x20 - 90000 FCFA"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T18:00:00",
          "type": "wholesale_confirmed",
          "lu": false,
          "titre": "Commande gros confirmée",
          "message": "LOT-20250724-0085 (250000 FCFA) confirmée par Coopérative Femmes de Léo"
        },
        {
          "date": "2025-07-24T17:30:00",
          "type": "discount_applied",
          "lu": false,
          "titre": "Remise Or appliquée",
          "message": "Remise gros 15% appliquée - 37500 FCFA économisés sur LOT-20250724-0085"
        },
        {
          "date": "2025-07-22T16:00:00",
          "type": "lot_received",
          "lu": false,
          "titre": "Lot reçu",
          "message": "LOT-20250715-0082 reçu - 50 miels toutes fleurs en stock"
        },
        {
          "date": "2025-07-20T15:00:00",
          "type": "resale_completed",
          "lu": true,
          "titre": "Vente revendu",
          "message": "30 beurres de karité vendus - marge 15000 FCFA réalisée"
        },
        {
          "date": "2025-07-12T10:00:00",
          "type": "products_listed",
          "lu": true,
          "titre": "Produits mis en vente",
          "message": "50 miels toutes fleurs à 4500 FCFA en boutique"
        },
        {
          "date": "2025-06-28T16:00:00",
          "type": "lot_received",
          "lu": true,
          "titre": "Lot reçu",
          "message": "LOT-20250620-0075 reçu - 30 pagnes bazin riche en stock"
        },
        {
          "date": "2025-05-28T11:00:00",
          "type": "supplier_contact",
          "lu": true,
          "titre": "Contact fournisseur",
          "message": "Demande de lot bogolan envoyée à Tisserands de Koudougou"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Or maintenu",
          "message": "Statut Or confirmé - 280 transactions réalisées"
        }
      ]
    },
    {
      "id": "beta_revendeur_4",
      "type": "revendeur",
      "nom": "Artisan Market Tenkodogo",
      "email": "artisan.tenkodogo@test.bf",
      "telephone": "70 99 88 77",
      "ville": "Tenkodogo",
      "region": "Centre-Est",
      "trust_level": "argent",
      "boutique_type": "petite_boutique",
      "transactions_count": 67,
      "date_inscription": "2021-11-05",
      "preferences": {
        "categories_gerees": [
          "Artisanat",
          "Coton"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_lots": true
      },
      "description_courte": "Boutique d'artisanat revendu à Tenkodogo, 67 transactions, valorise l'artisanat local",
      "historique_activite": [
        {
          "date": "2025-07-23T15:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Bijoux en perles du Sahel (PRD012) x10 - 32000 FCFA (LOT-20250723-0025)"
        },
        {
          "date": "2025-07-23T14:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 10 x 3200 = 32000 FCFA - remise gros 8% = 29440 FCFA économisés 2560 FCFA"
        },
        {
          "date": "2025-07-23T14:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Artisanes de Dori (SEL011) - commande bijoux"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250715-0023 - 5 bronzes (PRD010)"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 5 bronzes (PRD010) à 17000 FCFA/unité (marge 2000 FCFA)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Panier tressé en fibres locales (PRD009) x2 - 14000 FCFA (marge 2000 FCFA)"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Bronze du Burkina statuette (PRD010) x5 - 75000 FCFA (LOT-20250715-0023)"
        },
        {
          "date": "2025-07-10T15:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 75000 FCFA à Fondeurs de Ouagadougou"
        },
        {
          "date": "2025-07-05T10:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Fondeurs de Ouagadougou (SEL009) - demande lot bronze"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250620-0020 - 10 paniers tressés (PRD009)"
        },
        {
          "date": "2025-06-20T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Panier tressé en fibres locales (PRD009) x10 - 65000 FCFA (LOT-20250620-0020)"
        },
        {
          "date": "2025-06-15T10:00:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 10 x 6500 = 65000 FCFA - remise gros 5% = 61750 FCFA économisés 3250 FCFA"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 10 paniers tressés (PRD009) à 7500 FCFA/unité"
        },
        {
          "date": "2025-05-25T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Bijoux en perles du Sahel (PRD012) x3 - 10800 FCFA"
        },
        {
          "date": "2025-05-15T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Masque en bois sculpté (PRD011) x5 - 60000 FCFA (LOT-20250515-0016)"
        },
        {
          "date": "2025-05-10T10:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Sculpteurs de Bobo-Dioulasso (SEL010) - commande masques"
        },
        {
          "date": "2025-04-28T11:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250420-0014 - 8 bijoux perles (PRD012)"
        },
        {
          "date": "2025-04-20T15:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 25600 FCFA à Artisanes de Dori"
        },
        {
          "date": "2025-04-10T14:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 5 masques en bois sculpté (PRD011) à 14000 FCFA/unité"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard revendeur depuis Tenkodogo (Centre-Est)"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-23T15:00:00",
          "type": "wholesale_confirmed",
          "lu": false,
          "titre": "Commande gros confirmée",
          "message": "LOT-20250723-0025 (32000 FCFA) confirmée par Artisanes de Dori"
        },
        {
          "date": "2025-07-23T14:30:00",
          "type": "discount_applied",
          "lu": false,
          "titre": "Remise appliquée",
          "message": "Remise gros 8% - 2560 FCFA économisés sur LOT-20250723-0025"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "lot_received",
          "lu": true,
          "titre": "Lot reçu",
          "message": "LOT-20250715-0023 reçu - 5 bronzes disponibles en boutique"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "products_listed",
          "lu": true,
          "titre": "Produits mis en vente",
          "message": "5 bronzes à 17000 FCFA en boutique"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "resale_completed",
          "lu": true,
          "titre": "Vente revendu",
          "message": "2 paniers tressés vendus - marge 2000 FCFA"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "lot_received",
          "lu": true,
          "titre": "Lot reçu",
          "message": "LOT-20250620-0020 reçu - 10 paniers tressés en stock"
        }
      ]
    }
  ]
},
  beta_activity: {
  "acheteurs": {
    "beta_acheteur_1": {
      "id": "beta_acheteur_1",
      "type": "acheteur",
      "nom": "Amadou Diallo",
      "email": "amadou.diallo@test.bf",
      "telephone": "70 25 36 48",
      "ville": "Ouagadougou",
      "region": "Centre",
      "trust_level": "bronze",
      "date_inscription": "2024-08-15",
      "description_courte": "Jeune entrepreneur de 25 ans, achète des produits cosmétiques naturels pour sa famille",
      "historique_activite": [
        {
          "date": "2025-07-24T16:00:00",
          "type": "notification",
          "detail": "Vendeur a expédié votre commande BF-20250721-00042"
        },
        {
          "date": "2025-07-23T08:20:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250721-00042"
        },
        {
          "date": "2025-07-22T14:00:00",
          "type": "notification",
          "detail": "Vendeur a accepté votre commande BF-20250721-00042"
        },
        {
          "date": "2025-07-21T09:15:00",
          "type": "commande",
          "detail": "Commande BF-20250721-00042 (2500 FCFA) - 1 article"
        },
        {
          "date": "2025-07-21T09:10:00",
          "type": "paiement",
          "detail": "Paiement Mobile Money - 2500 FCFA (Orange Money)"
        },
        {
          "date": "2025-07-20T10:40:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-07-20T10:35:00",
          "type": "recherche",
          "detail": "Recherche: 'beurre karite bio'"
        },
        {
          "date": "2025-07-20T10:30:00",
          "type": "connexion",
          "detail": "Connexion depuis Ouagadougou (Centre)"
        },
        {
          "date": "2025-06-15T11:00:00",
          "type": "avis",
          "detail": "Avis 5★ laissé sur Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-06-14T16:30:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250610-00038"
        },
        {
          "date": "2025-06-12T10:00:00",
          "type": "notification",
          "detail": "Commande BF-20250610-00038 en cours de livraison"
        },
        {
          "date": "2025-06-10T14:25:00",
          "type": "commande",
          "detail": "Commande BF-20250610-00038 (4000 FCFA) - 1 article"
        },
        {
          "date": "2025-06-10T14:20:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel toutes fleurs du Sud-Ouest (PRD005)"
        },
        {
          "date": "2025-06-10T14:00:00",
          "type": "recherche",
          "detail": "Recherche: 'miel brut bio'"
        },
        {
          "date": "2025-05-05T09:00:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Apiculteurs de Diebougou (SEL005)"
        },
        {
          "date": "2025-04-22T15:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250418-00031"
        },
        {
          "date": "2025-04-18T11:30:00",
          "type": "commande",
          "detail": "Commande BF-20250418-00031 (1200 FCFA) - 1 article"
        },
        {
          "date": "2025-04-18T11:25:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Savon au karité et miel (PRD002)"
        },
        {
          "date": "2025-03-10T13:00:00",
          "type": "profil_update",
          "detail": "Profil mis à jour: préférence langue définie sur fr"
        },
        {
          "date": "2025-02-10T10:00:00",
          "type": "confiance_upgrade",
          "detail": "Niveau de confiance atteint: Bronze"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T16:00:00",
          "type": "order_shipped",
          "lu": false,
          "titre": "Commande expédiée",
          "message": "Votre commande BF-20250721-00042 a été expédiée par Coopérative Femmes de Léo"
        },
        {
          "date": "2025-07-23T10:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Vendeur favori promu",
          "message": "Coopérative Femmes de Léo est passée au niveau Or"
        },
        {
          "date": "2025-07-22T14:00:00",
          "type": "order_accepted",
          "lu": false,
          "titre": "Commande acceptée",
          "message": "Votre commande BF-20250721-00042 a été acceptée par le vendeur"
        },
        {
          "date": "2025-07-15T09:30:00",
          "type": "promo",
          "lu": true,
          "titre": "Promotion Karité",
          "message": "20% sur les produits karité cette semaine, profitez-en!"
        },
        {
          "date": "2025-06-12T10:00:00",
          "type": "order_delivered",
          "lu": true,
          "titre": "Commande en livraison",
          "message": "Votre commande BF-20250610-00038 est en cours de livraison"
        },
        {
          "date": "2025-05-05T09:00:00",
          "type": "favorite_added",
          "lu": true,
          "titre": "Vendeur favori",
          "message": "Apiculteurs de Diebougou ajouté à vos favoris"
        },
        {
          "date": "2025-04-01T08:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Avril",
          "message": "Découvrez les nouveaux produits de printemps de nos coopératives"
        }
      ],
      "achats_count": 5,
      "preferences": {
        "categories_preferees": [
          "Karite",
          "Miel"
        ],
        "newsletter": true,
        "langue": "fr"
      }
    },
    "beta_acheteur_2": {
      "id": "beta_acheteur_2",
      "type": "acheteur",
      "nom": "Fatimata Ouedraogo",
      "email": "fatimata.ouedraogo@test.bf",
      "telephone": "70 67 89 01",
      "ville": "Bobo-Dioulasso",
      "region": "Hauts-Bassins",
      "trust_level": "argent",
      "date_inscription": "2023-03-12",
      "description_courte": "Mère de famille nombreuse (6 enfants), achète régulièrement des produits alimentaires locaux",
      "historique_activite": [
        {
          "date": "2025-07-24T18:30:00",
          "type": "commande",
          "detail": "Commande BF-20250724-00156 (9100 FCFA) - 3 articles"
        },
        {
          "date": "2025-07-24T18:25:00",
          "type": "paiement",
          "detail": "Paiement Mobile Money - 9100 FCFA (Moov Money)"
        },
        {
          "date": "2025-07-24T18:20:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel de karité en rayon (PRD006)"
        },
        {
          "date": "2025-07-24T18:15:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Graines de sésame doré (PRD003) x2"
        },
        {
          "date": "2025-07-24T18:10:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-07-24T18:00:00",
          "type": "connexion",
          "detail": "Connexion depuis Bobo-Dioulasso (Hauts-Bassins)"
        },
        {
          "date": "2025-07-20T11:00:00",
          "type": "avis",
          "detail": "Avis 5★ laissé sur Miel toutes fleurs du Sud-Ouest (PRD005)"
        },
        {
          "date": "2025-07-18T15:30:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250710-00148"
        },
        {
          "date": "2025-07-15T09:00:00",
          "type": "notification",
          "detail": "Commande BF-20250710-00148 prête pour retrait"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "commande",
          "detail": "Commande BF-20250710-00148 (4800 FCFA) - 2 articles"
        },
        {
          "date": "2025-07-10T13:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Huile de sésame artisanale (PRD004) x2"
        },
        {
          "date": "2025-06-28T16:00:00",
          "type": "recherche",
          "detail": "Recherche: 'huile sésame pressé froid'"
        },
        {
          "date": "2025-06-20T10:30:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250615-00137"
        },
        {
          "date": "2025-06-15T11:00:00",
          "type": "commande",
          "detail": "Commande BF-20250615-00137 (4000 FCFA) - 1 article"
        },
        {
          "date": "2025-06-15T10:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel toutes fleurs du Sud-Ouest (PRD005)"
        },
        {
          "date": "2025-05-22T14:00:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Coopérative Wend-Kuni (SEL004)"
        },
        {
          "date": "2025-05-10T09:15:00",
          "type": "commande",
          "detail": "Commande BF-20250510-00121 (7200 FCFA) - 4 articles"
        },
        {
          "date": "2025-04-25T16:00:00",
          "type": "confiance_upgrade",
          "detail": "Niveau de confiance atteint: Argent (merci pour votre fidélité!)"
        },
        {
          "date": "2025-04-12T13:00:00",
          "type": "avis",
          "detail": "Avis 4★ laissé sur Graines de sésame doré (PRD003)"
        },
        {
          "date": "2025-03-30T11:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250320-00108"
        },
        {
          "date": "2025-03-20T15:30:00",
          "type": "commande",
          "detail": "Commande BF-20250320-00108 (5300 FCFA) - 2 articles"
        },
        {
          "date": "2025-02-15T10:00:00",
          "type": "profil_update",
          "detail": "Profil mis à jour: adresse de livraison ajoutée"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T18:30:00",
          "type": "order_placed",
          "lu": false,
          "titre": "Commande confirmée",
          "message": "Votre commande BF-20250724-00156 de 9100 FCFA a été enregistrée"
        },
        {
          "date": "2025-07-23T09:00:00",
          "type": "promo",
          "lu": false,
          "titre": "Promo Miel",
          "message": "Le miel de karité en rayon est en stock limité!"
        },
        {
          "date": "2025-07-15T09:00:00",
          "type": "order_ready",
          "lu": true,
          "titre": "Commande prête",
          "message": "Votre commande BF-20250710-00148 est prête pour retrait"
        },
        {
          "date": "2025-06-28T16:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Juin",
          "message": "Recettes du Ramadan avec des produits locaux burkinabè"
        },
        {
          "date": "2025-04-25T16:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Argent atteint!",
          "message": "Félicitations! Vous êtes maintenant acheteur Argents avec 5% de réduction"
        },
        {
          "date": "2025-03-01T08:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Mars",
          "message": "Nouveaux produits de la coopérative Wend-Kuni disponibles"
        }
      ],
      "achats_count": 32,
      "preferences": {
        "categories_preferees": [
          "Miel",
          "Sesame",
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr"
      }
    },
    "beta_acheteur_3": {
      "id": "beta_acheteur_3",
      "type": "acheteur",
      "nom": "Ibrahim Kabore",
      "email": "ibrahim.kabore@test.bf",
      "telephone": "70 78 90 12",
      "ville": "Koudougou",
      "region": "Centre-Ouest",
      "trust_level": "or",
      "date_inscription": "2022-06-01",
      "description_courte": "Collectionneur passionné d'artisanat burkinabè, acheteur premium niveau Or avec 85 achats",
      "historique_activite": [
        {
          "date": "2025-07-24T20:00:00",
          "type": "commande",
          "detail": "Commande BF-20250724-00203 (27000 FCFA) - 2 articles"
        },
        {
          "date": "2025-07-24T19:55:00",
          "type": "paiement",
          "detail": "Paiement virement bancaire - 27000 FCFA (UBA)"
        },
        {
          "date": "2025-07-24T19:50:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Bronze du Burkina statuette (PRD010)"
        },
        {
          "date": "2025-07-24T19:45:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Pagne en coton bazin riche (PRD007)"
        },
        {
          "date": "2025-07-24T19:30:00",
          "type": "connexion",
          "detail": "Connexion depuis Koudougou (Centre-Ouest)"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "avis",
          "detail": "Avis 5★ laissé sur Bronze du Burkina (PRD010) - 'Pièce magnifique de collection'"
        },
        {
          "date": "2025-07-20T14:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250710-00189"
        },
        {
          "date": "2025-07-18T09:00:00",
          "type": "notification",
          "detail": "Nouvelle pièce en bronze disponible chez Fondeurs de Ouagadougou"
        },
        {
          "date": "2025-07-15T16:30:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Fondeurs de Ouagadougou (SEL009)"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "commande",
          "detail": "Commande BF-20250710-00189 (15000 FCFA) - 1 article"
        },
        {
          "date": "2025-07-10T13:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Bronze du Burkina statuette (PRD010)"
        },
        {
          "date": "2025-06-28T17:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250620-00175"
        },
        {
          "date": "2025-06-20T10:00:00",
          "type": "commande",
          "detail": "Commande BF-20250620-00175 (6500 FCFA) - 1 article"
        },
        {
          "date": "2025-06-20T09:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Panier tressé en fibres locales (PRD009)"
        },
        {
          "date": "2025-06-15T14:00:00",
          "type": "recherche",
          "detail": "Recherche: 'masque bois sculpté Bobo'"
        },
        {
          "date": "2025-05-30T11:00:00",
          "type": "avis",
          "detail": "Avis 5★ laissé sur Pagne en coton bazin riche (PRD007)"
        },
        {
          "date": "2025-05-20T15:30:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250510-00162"
        },
        {
          "date": "2025-05-10T13:00:00",
          "type": "commande",
          "detail": "Commande BF-20250510-00162 (30000 FCFA) - 2 articles"
        },
        {
          "date": "2025-05-10T12:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Masque en bois sculpté (PRD011) x2"
        },
        {
          "date": "2025-04-18T10:00:00",
          "type": "confiance_upgrade",
          "detail": "Niveau de confiance atteint: Or - statut premium débloqué"
        },
        {
          "date": "2025-04-05T16:00:00",
          "type": "commande",
          "detail": "Commande BF-20250405-00151 (18000 FCFA) - 1 article"
        },
        {
          "date": "2025-03-22T11:00:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Sculpteurs de Bobo-Dioulasso (SEL010)"
        },
        {
          "date": "2025-03-10T14:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250228-00138"
        },
        {
          "date": "2025-02-28T13:00:00",
          "type": "commande",
          "detail": "Commande BF-20250228-00138 (12000 FCFA) - 1 article"
        },
        {
          "date": "2025-02-10T09:00:00",
          "type": "recherche",
          "detail": "Recherche: 'bijoux perles Sahel'"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T20:00:00",
          "type": "order_placed",
          "lu": false,
          "titre": "Commande premium",
          "message": "Votre commande BF-20250724-00203 de 27000 FCFA a été enregistrée - 10% de réduction Or appliquée"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "review_thanks",
          "lu": false,
          "titre": "Merci pour votre avis",
          "message": "Votre avis sur Bronze du Burkina aide la communauté"
        },
        {
          "date": "2025-07-18T09:00:00",
          "type": "new_product",
          "lu": true,
          "titre": "Nouveau produit favori",
          "message": "Fondeurs de Ouagadougou a ajouté une nouvelle pièce en bronze"
        },
        {
          "date": "2025-07-15T16:30:00",
          "type": "favorite_added",
          "lu": true,
          "titre": "Favori ajouté",
          "message": "Fondeurs de Ouagadougou ajouté à vos vendeurs favoris"
        },
        {
          "date": "2025-06-15T14:00:00",
          "type": "search_suggestion",
          "lu": true,
          "titre": "Suggestion",
          "message": "Basé sur vos recherches: Masque en bois sculpté pourrait vous intéresser"
        },
        {
          "date": "2025-04-18T10:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Or atteint!",
          "message": "Félicitations! Vous êtes maintenant acheteur Or avec 10% de réduction permanente"
        },
        {
          "date": "2025-03-22T11:00:00",
          "type": "favorite_added",
          "lu": true,
          "titre": "Favori ajouté",
          "message": "Sculpteurs de Bobo-Dioulasso ajouté à vos vendeurs favoris"
        },
        {
          "date": "2025-02-15T09:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Février",
          "message": "Nouvelles collections d'artisanat disponibles"
        }
      ],
      "achats_count": 85,
      "preferences": {
        "categories_preferees": [
          "Artisanat",
          "Coton"
        ],
        "newsletter": false,
        "langue": "fr"
      }
    },
    "beta_acheteur_4": {
      "id": "beta_acheteur_4",
      "type": "acheteur",
      "nom": "Aïssata Traoré",
      "email": "aissata.traore@test.bf",
      "telephone": "70 33 44 55",
      "ville": "Ouahigouya",
      "region": "Nord",
      "trust_level": "bronze",
      "date_inscription": "2024-11-20",
      "description_courte": "Neene (aînée) réservée de Ouahigouya, achète miel et karité pour sa famille élargie",
      "historique_activite": [
        {
          "date": "2025-07-23T17:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250718-00074"
        },
        {
          "date": "2025-07-22T10:00:00",
          "type": "notification",
          "detail": "Commande BF-20250718-00074 en livraison"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "commande",
          "detail": "Commande BF-20250718-00074 (4000 FCFA) - 1 article"
        },
        {
          "date": "2025-07-18T13:55:00",
          "type": "paiement",
          "detail": "Paiement Mobile Money - 4000 FCFA (Orange Money)"
        },
        {
          "date": "2025-07-18T13:50:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel toutes fleurs du Sud-Ouest (PRD005)"
        },
        {
          "date": "2025-07-18T13:30:00",
          "type": "connexion",
          "detail": "Connexion depuis Ouahigouya (Nord)"
        },
        {
          "date": "2025-06-25T11:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250615-00065"
        },
        {
          "date": "2025-06-15T16:00:00",
          "type": "commande",
          "detail": "Commande BF-20250615-00065 (2500 FCFA) - 1 article"
        },
        {
          "date": "2025-06-15T15:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-05-20T10:00:00",
          "type": "avis",
          "detail": "Avis 4★ laissé sur Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-05-10T14:30:00",
          "type": "recherche",
          "detail": "Recherche: 'miel karité naturel'"
        },
        {
          "date": "2025-04-28T11:00:00",
          "type": "commande_recue",
          "detail": "Marqué reçu: commande BF-20250420-00058"
        },
        {
          "date": "2025-04-20T15:00:00",
          "type": "commande",
          "detail": "Commande BF-20250420-00058 (5500 FCFA) - 1 article"
        },
        {
          "date": "2025-04-20T14:55:00",
          "type": "panier_ajout",
          "detail": "Ajouté au panier: Miel de karité en rayon (PRD006)"
        },
        {
          "date": "2025-03-15T13:00:00",
          "type": "favoris_ajout",
          "detail": "Ajouté aux favoris: Apiculteurs de Diebougou (SEL005)"
        },
        {
          "date": "2025-02-20T10:30:00",
          "type": "commande",
          "detail": "Commande BF-20250220-00045 (1200 FCFA) - 1 article"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-23T17:00:00",
          "type": "order_delivered",
          "lu": false,
          "titre": "Commande livrée",
          "message": "Votre commande BF-20250718-00074 a été livrée - merci de confirmer la réception"
        },
        {
          "date": "2025-07-22T10:00:00",
          "type": "order_shipped",
          "lu": true,
          "titre": "Commande en livraison",
          "message": "Votre commande BF-20250718-00074 est en cours de livraison"
        },
        {
          "date": "2025-06-25T11:00:00",
          "type": "order_delivered",
          "lu": true,
          "titre": "Commande livrée",
          "message": "Votre commande BF-20250615-00065 a été livrée"
        },
        {
          "date": "2025-05-20T10:00:00",
          "type": "review_thanks",
          "lu": true,
          "titre": "Merci pour votre avis",
          "message": "Votre avis sur Beurre de karité pur est très apprécié"
        },
        {
          "date": "2025-03-15T13:00:00",
          "type": "favorite_added",
          "lu": true,
          "titre": "Favori ajouté",
          "message": "Apiculteurs de Diebougou ajouté à vos vendeurs favoris"
        }
      ],
      "achats_count": 8,
      "preferences": {
        "categories_preferees": [
          "Miel",
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr"
      }
    }
  },
  "vendeurs": {
    "beta_vendeur_1": {
      "id": "beta_vendeur_1",
      "type": "vendeur",
      "nom": "Coopérative Femmes de Léo",
      "email": "femmesleo@test.bf",
      "telephone": "70 50 60 70",
      "ville": "Léo",
      "region": "Sud-Ouest",
      "trust_level": "argent",
      "date_inscription": "2019-03-15",
      "description_courte": "Coopérative de 200+ femmes productrices de karité bio à Léo, 87 ventes réalisées",
      "historique_activite": [
        {
          "date": "2025-07-24T16:00:00",
          "type": "expedition_commande",
          "detail": "Commande BF-20250721-00042 expédiée (client: Amadou Diallo)"
        },
        {
          "date": "2025-07-23T09:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250721-00042 marquée comme reçue par le client"
        },
        {
          "date": "2025-07-22T14:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250721-00042 acceptée"
        },
        {
          "date": "2025-07-21T09:20:00",
          "type": "notification",
          "detail": "Nouvelle commande reçue: BF-20250721-00042 (2500 FCFA)"
        },
        {
          "date": "2025-07-21T09:15:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x1 - 2500 FCFA"
        },
        {
          "date": "2025-07-21T09:00:00",
          "type": "paiement_recu",
          "detail": "Paiement Mobile Money reçu - 2500 FCFA"
        },
        {
          "date": "2025-07-20T08:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Léo (Sud-Ouest)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "gestion_stock",
          "detail": "Stock mis à jour: Beurre de karité pur (PRD001) - 150 unités disponibles"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x3 - 7500 FCFA (commande BF-20250715-00120)"
        },
        {
          "date": "2025-07-15T10:30:00",
          "type": "message_client",
          "detail": "Message reçu de Fatimata Ouedraogo - question sur origine du karité"
        },
        {
          "date": "2025-07-12T16:00:00",
          "type": "reponse_message",
          "detail": "Réponse envoyée à Fatimata Ouedraogo"
        },
        {
          "date": "2025-07-10T09:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x2 - 5000 FCFA (commande BF-20250710-00115)"
        },
        {
          "date": "2025-07-05T14:00:00",
          "type": "avis_recu",
          "detail": "Avis 5★ reçu sur Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-06-28T11:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance atteint: Argent (87 ventes)"
        },
        {
          "date": "2025-06-20T10:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250615-00115 acceptée et expédiée"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x5 - 12500 FCFA (lot revendeur)"
        },
        {
          "date": "2025-05-15T13:00:00",
          "type": "gestion_stock",
          "detail": "Réassort: 200 unités de beurre de karité produites et ajoutées au stock"
        },
        {
          "date": "2025-04-20T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Beurre de karité pur (PRD001) x1 - 2500 FCFA"
        },
        {
          "date": "2025-03-30T10:00:00",
          "type": "certification_update",
          "detail": "Certification BioSPG renouvelée pour 2 ans"
        },
        {
          "date": "2025-02-15T14:00:00",
          "type": "produit_ajoute",
          "detail": "Nouveau produit ajouté: Beurre de karité pur (PRD001)"
        },
        {
          "date": "2025-01-28T09:00:00",
          "type": "profil_update",
          "detail": "Profil coopérative mis à jour: 200+ femmes membres"
        },
        {
          "date": "2025-01-25T11:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Léo (Sud-Ouest)"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T16:00:00",
          "type": "order_shipped",
          "lu": false,
          "titre": "Commande expédiée",
          "message": "BF-20250721-00042 expédiée avec succès au client Amadou Diallo"
        },
        {
          "date": "2025-07-23T09:00:00",
          "type": "order_completed",
          "lu": false,
          "titre": "Commande terminée",
          "message": "BF-20250721-00042 marquée comme reçue - paiement libéré"
        },
        {
          "date": "2025-07-21T09:15:00",
          "type": "new_order",
          "lu": false,
          "titre": "Nouvelle commande",
          "message": "Commande BF-20250721-00042 (2500 FCFA) reçue - à valider"
        },
        {
          "date": "2025-07-15T10:30:00",
          "type": "new_message",
          "lu": true,
          "titre": "Nouveau message",
          "message": "Fatimata Ouedraogo vous a envoyé un message"
        },
        {
          "date": "2025-07-05T14:00:00",
          "type": "new_review",
          "lu": true,
          "titre": "Nouvel avis 5★",
          "message": "Un client a laissé un avis 5★ sur Beurre de karité pur"
        },
        {
          "date": "2025-06-28T11:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Argent atteint!",
          "message": "Félicitations! Votre coopérative atteint le niveau Argent"
        },
        {
          "date": "2025-03-30T10:00:00",
          "type": "certification",
          "lu": true,
          "titre": "Certification renouvelée",
          "message": "Votre certification BioSPG a été renouvelée pour 2 ans"
        }
      ],
      "ventes_count": 87,
      "seller_id": "SEL001",
      "categories": [
        "Karite"
      ],
      "preferences": {
        "categories_gerees": [
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_commandes": true
      }
    },
    "beta_vendeur_2": {
      "id": "beta_vendeur_2",
      "type": "vendeur",
      "nom": "Fondeurs de Ouagadougou",
      "email": "fondeurs@test.bf",
      "telephone": "70 01 23 45",
      "ville": "Ouagadougou",
      "region": "Centre",
      "trust_level": "or",
      "date_inscription": "2016-01-01",
      "description_courte": "Maîtres fondeurs de bronze, technique ancestrale cire perdue, 230 ventes, niveau Or",
      "historique_activite": [
        {
          "date": "2025-07-24T20:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x1 - 15000 FCFA (commande BF-20250724-00203, client: Ibrahim Kabore)"
        },
        {
          "date": "2025-07-24T19:30:00",
          "type": "notification",
          "detail": "Nouvelle commande premium reçue: BF-20250724-00203 (27000 FCFA)"
        },
        {
          "date": "2025-07-24T19:00:00",
          "type": "paiement_recu",
          "detail": "Paiement virement bancaire reçu - 27000 FCFA"
        },
        {
          "date": "2025-07-22T11:30:00",
          "type": "avis_recu",
          "detail": "Avis 5★ reçu sur Bronze du Burkina (PRD010) de Ibrahim Kabore"
        },
        {
          "date": "2025-07-22T10:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250720-00195 expédiée"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "expedition_commande",
          "detail": "Commande BF-20250720-00195 expédiée (client: Boutique Sahel Commerce)"
        },
        {
          "date": "2025-07-20T14:00:00",
          "type": "vente",
          "detail": "Vente en gros: Bronze du Burkina statuette (PRD010) x5 - 75000 FCFA (lot revendeur)"
        },
        {
          "date": "2025-07-18T09:00:00",
          "type": "nouveau_produit",
          "detail": "Nouvelle pièce ajoutée au catalogue: statuette danseur Lobi (PRD010 variante)"
        },
        {
          "date": "2025-07-15T16:30:00",
          "type": "message_client",
          "detail": "Message reçu de Ibrahim Kabore - commande personnalisée demandée"
        },
        {
          "date": "2025-07-15T15:00:00",
          "type": "reponse_message",
          "detail": "Réponse envoyée à Ibrahim Kabore - devis personnalisé"
        },
        {
          "date": "2025-07-10T14:30:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x1 - 15000 FCFA (commande BF-20250710-00189)"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250710-00189 acceptée"
        },
        {
          "date": "2025-07-05T11:00:00",
          "type": "gestion_stock",
          "detail": "Stock mis à jour: Bronze du Burkina (PRD010) - 15 unités disponibles (alerte stock bas)"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x3 - 45000 FCFA (lot revendeur)"
        },
        {
          "date": "2025-06-20T10:00:00",
          "type": "production",
          "detail": "Nouvelle production terminée: 8 statuettes en bronze cire perdue"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x2 - 30000 FCFA (export)"
        },
        {
          "date": "2025-05-25T13:00:00",
          "type": "certification_update",
          "detail": "Certification ABNORM maintenue - contrôle qualité passé"
        },
        {
          "date": "2025-05-10T11:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance maintenu: Or (230 ventes)"
        },
        {
          "date": "2025-04-25T10:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x1 - 15000 FCFA"
        },
        {
          "date": "2025-04-15T14:00:00",
          "type": "message_client",
          "detail": "Message reçu de Artisan Market Tenkodogo - demande de lot bronze"
        },
        {
          "date": "2025-03-30T11:00:00",
          "type": "production",
          "detail": "Nouvelle production: 12 statuettes en bronze ajoutées au stock"
        },
        {
          "date": "2025-03-15T09:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x4 - 60000 FCFA (lot export)"
        },
        {
          "date": "2025-02-20T16:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Ouagadougou (Centre)"
        },
        {
          "date": "2025-02-10T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Bronze du Burkina statuette (PRD010) x1 - 15000 FCFA"
        },
        {
          "date": "2025-01-28T10:00:00",
          "type": "profil_update",
          "detail": "Profil atelier mis à jour: nouvelle photo galerie"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T19:30:00",
          "type": "new_order",
          "lu": false,
          "titre": "Commande premium",
          "message": "Commande BF-20250724-00203 (27000 FCFA) de Ibrahim Kabore reçue"
        },
        {
          "date": "2025-07-24T19:00:00",
          "type": "payment_received",
          "lu": false,
          "titre": "Paiement reçu",
          "message": "27000 FCFA reçus par virement bancaire - commande BF-20250724-00203"
        },
        {
          "date": "2025-07-22T11:30:00",
          "type": "new_review",
          "lu": false,
          "titre": "Avis 5★",
          "message": "Ibrahim Kabore a laissé un avis 5★ sur Bronze du Burkina"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "order_shipped",
          "lu": true,
          "titre": "Commande expédiée",
          "message": "BF-20250720-00195 expédiée à Boutique Sahel Commerce"
        },
        {
          "date": "2025-07-18T09:00:00",
          "type": "product_added",
          "lu": true,
          "titre": "Produit ajouté",
          "message": "Nouvelle pièce ajoutée au catalogue"
        },
        {
          "date": "2025-07-15T16:30:00",
          "type": "new_message",
          "lu": true,
          "titre": "Message personnalisé",
          "message": "Ibrahim Kabore demande une commande personnalisée"
        },
        {
          "date": "2025-07-05T11:00:00",
          "type": "low_stock",
          "lu": true,
          "titre": "Stock bas",
          "message": "Bronze du Burkina: 15 unités restantes - pensez à relancer la production"
        },
        {
          "date": "2025-05-25T13:00:00",
          "type": "certification",
          "lu": true,
          "titre": "Certification maintenue",
          "message": "Votre certification ABNORM a été renouvelée"
        }
      ],
      "ventes_count": 230,
      "seller_id": "SEL009",
      "categories": [
        "Artisanat"
      ],
      "preferences": {
        "categories_gerees": [
          "Artisanat"
        ],
        "newsletter": false,
        "langue": "fr",
        "notifications_commandes": true
      }
    },
    "beta_vendeur_3": {
      "id": "beta_vendeur_3",
      "type": "vendeur",
      "nom": "Apiculteur de Banfora",
      "email": "apiculteur.banfora@test.bf",
      "telephone": "70 24 68 13",
      "ville": "Banfora",
      "region": "Cascades",
      "trust_level": "argent",
      "date_inscription": "2020-09-10",
      "description_courte": "Apiculteur de Banfora spécialisé en miel de karité et miel toutes fleurs, 65 ventes",
      "historique_activite": [
        {
          "date": "2025-07-24T17:30:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel toutes fleurs du Sud-Ouest (PRD005) x2 - 8000 FCFA (commande BF-20250724-00160)"
        },
        {
          "date": "2025-07-24T17:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250724-00160 acceptée"
        },
        {
          "date": "2025-07-23T11:00:00",
          "type": "paiement_recu",
          "detail": "Paiement Mobile Money reçu - 8000 FCFA"
        },
        {
          "date": "2025-07-22T15:00:00",
          "type": "notification",
          "detail": "Nouvelle commande reçue: BF-20250724-00160"
        },
        {
          "date": "2025-07-20T10:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Banfora (Cascades)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "gestion_stock",
          "detail": "Stock mis à jour: Miel de karité en rayon (PRD006) - 25 unités (stock limité)"
        },
        {
          "date": "2025-07-15T11:30:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel de karité en rayon (PRD006) x1 - 5500 FCFA (commande BF-20250715-00125)"
        },
        {
          "date": "2025-07-12T09:00:00",
          "type": "message_client",
          "detail": "Message reçu de Boutique Sahel Commerce - demande de lot miel"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "reponse_message",
          "detail": "Réponse envoyée à Boutique Sahel Commerce - devis lot 20 unités"
        },
        {
          "date": "2025-07-05T16:00:00",
          "type": "vente",
          "detail": "Vente en gros: Miel toutes fleurs du Sud-Ouest (PRD005) x10 - 40000 FCFA (lot revendeur)"
        },
        {
          "date": "2025-06-28T11:00:00",
          "type": "production",
          "detail": "Récolte de printemps terminée: 80 kg de miel toutes fleurs"
        },
        {
          "date": "2025-06-20T10:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250615-00120 expédiée"
        },
        {
          "date": "2025-06-15T15:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel toutes fleurs du Sud-Ouest (PRD005) x3 - 12000 FCFA"
        },
        {
          "date": "2025-06-10T11:00:00",
          "type": "avis_recu",
          "detail": "Avis 4★ reçu sur Miel de karité en rayon (PRD006)"
        },
        {
          "date": "2025-05-28T14:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance atteint: Argent (65 ventes)"
        },
        {
          "date": "2025-05-15T10:00:00",
          "type": "gestion_stock",
          "detail": "Réassort: 50 unités de miel de karité en rayon produites"
        },
        {
          "date": "2025-04-20T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel toutes fleurs du Sud-Ouest (PRD005) x5 - 20000 FCFA (lot)"
        },
        {
          "date": "2025-04-05T13:00:00",
          "type": "certification_update",
          "detail": "Certification BioSPG maintenue pour la saison 2025"
        },
        {
          "date": "2025-03-15T10:00:00",
          "type": "production",
          "detail": "Préparation des ruches pour la saison des fleurs de karité"
        },
        {
          "date": "2025-02-20T09:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Miel toutes fleurs du Sud-Ouest (PRD005) x2 - 8000 FCFA"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T17:00:00",
          "type": "new_order",
          "lu": false,
          "titre": "Nouvelle commande",
          "message": "Commande BF-20250724-00160 (8000 FCFA) reçue"
        },
        {
          "date": "2025-07-23T11:00:00",
          "type": "payment_received",
          "lu": false,
          "titre": "Paiement reçu",
          "message": "8000 FCFA reçus par Mobile Money"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "low_stock",
          "lu": true,
          "titre": "Stock limité",
          "message": "Miel de karité en rayon: 25 unités restantes - produit rare"
        },
        {
          "date": "2025-07-12T09:00:00",
          "type": "new_message",
          "lu": true,
          "titre": "Demande de lot",
          "message": "Boutique Sahel Commerce demande un lot de miel"
        },
        {
          "date": "2025-06-10T11:00:00",
          "type": "new_review",
          "lu": true,
          "titre": "Nouvel avis",
          "message": "Un client a laissé un avis 4★ sur Miel de karité en rayon"
        },
        {
          "date": "2025-05-28T14:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Argent atteint!",
          "message": "Félicitations! Vous atteignez le niveau Argent"
        }
      ],
      "ventes_count": 65,
      "seller_id": "SEL004",
      "categories": [
        "Miel"
      ],
      "preferences": {
        "categories_gerees": [
          "Miel"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_commandes": true
      }
    },
    "beta_vendeur_4": {
      "id": "beta_vendeur_4",
      "type": "vendeur",
      "nom": "Tisserands de Koudougou",
      "email": "tisserands.koudougou@test.bf",
      "telephone": "70 79 13 57",
      "ville": "Koudougou",
      "region": "Centre-Ouest",
      "trust_level": "bronze",
      "date_inscription": "2023-02-15",
      "description_courte": "Coopérative de tisserands traditionnels de Koudougou, coton et bogolan, 28 ventes",
      "historique_activite": [
        {
          "date": "2025-07-23T16:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Fil de coton filé main (PRD008) x10 - 9000 FCFA (commande BF-20250723-00092)"
        },
        {
          "date": "2025-07-23T15:30:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250723-00092 acceptée"
        },
        {
          "date": "2025-07-23T15:00:00",
          "type": "paiement_recu",
          "detail": "Paiement Mobile Money reçu - 9000 FCFA"
        },
        {
          "date": "2025-07-22T09:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard vendeur depuis Koudougou (Centre-Ouest)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "notification",
          "detail": "Nouvelle commande reçue: BF-20250723-00092"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "gestion_stock",
          "detail": "Stock mis à jour: Fil de coton filé main (PRD008) - 300 bobines"
        },
        {
          "date": "2025-07-10T15:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Fil de coton filé main (PRD008) x5 - 4500 FCFA (commande BF-20250710-00085)"
        },
        {
          "date": "2025-07-05T10:00:00",
          "type": "message_client",
          "detail": "Message reçu de Distrib Plus Centre - demande de lot bogolan"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "production",
          "detail": "Nouvelle production: 100 bobines de fil de coton filées"
        },
        {
          "date": "2025-06-20T11:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Fil de coton filé main (PRD008) x20 - 18000 FCFA (lot revendeur)"
        },
        {
          "date": "2025-06-15T10:00:00",
          "type": "reponse_message",
          "detail": "Réponse envoyée à Boutique Sahel Commerce - devis lot coton"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "avis_recu",
          "detail": "Avis 4★ reçu sur Fil de coton filé main (PRD008)"
        },
        {
          "date": "2025-05-28T11:00:00",
          "type": "message_client",
          "detail": "Message reçu de Boutique Sahel Commerce - demande de prix gros"
        },
        {
          "date": "2025-05-20T14:00:00",
          "type": "validation_commande",
          "detail": "Commande BF-20250515-00072 expédiée"
        },
        {
          "date": "2025-05-15T10:00:00",
          "type": "vente",
          "detail": "Vente enregistrée: Fil de coton filé main (PRD008) x8 - 7200 FCFA"
        },
        {
          "date": "2025-04-25T13:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance atteint: Bronze (28 ventes)"
        },
        {
          "date": "2025-04-10T11:00:00",
          "type": "produit_ajoute",
          "detail": "Nouveau produit ajouté: Fil de coton filé main (PRD008)"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "production",
          "detail": "Production de bogolan: 15 pièces teintes traditionnellement"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-23T15:30:00",
          "type": "new_order",
          "lu": false,
          "titre": "Nouvelle commande",
          "message": "Commande BF-20250723-00092 (9000 FCFA) reçue"
        },
        {
          "date": "2025-07-23T15:00:00",
          "type": "payment_received",
          "lu": false,
          "titre": "Paiement reçu",
          "message": "9000 FCFA reçus par Mobile Money"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "new_order",
          "lu": true,
          "titre": "Commande en attente",
          "message": "BF-20250723-00092 - à valider"
        },
        {
          "date": "2025-07-05T10:00:00",
          "type": "new_message",
          "lu": true,
          "titre": "Demande de lot",
          "message": "Distrib Plus Centre demande un lot bogolan"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "new_review",
          "lu": true,
          "titre": "Nouvel avis",
          "message": "Un client a laissé un avis 4★ sur Fil de coton filé main"
        }
      ],
      "ventes_count": 28,
      "seller_id": "SEL007",
      "categories": [
        "Coton",
        "Bogolan"
      ],
      "preferences": {
        "categories_gerees": [
          "Coton",
          "Bogolan"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_commandes": true
      }
    }
  },
  "revendeurs": {
    "beta_revendeur_1": {
      "id": "beta_revendeur_1",
      "type": "revendeur",
      "nom": "Boutique Sahel Commerce",
      "email": "sahel.commerce@test.bf",
      "telephone": "70 34 56 78",
      "ville": "Ouagadougou",
      "region": "Centre",
      "trust_level": "or",
      "date_inscription": "2021-04-10",
      "description_courte": "Grande boutique d'import/export à Ouagadougou, 156 transactions en gros, niveau Or",
      "historique_activite": [
        {
          "date": "2025-07-24T19:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Bronze du Burkina statuette (PRD010) x5 - 75000 FCFA (LOT-20250724-0042)"
        },
        {
          "date": "2025-07-24T18:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 5 x 15000 = 75000 FCFA - remise gros 10% = 67500 FCFA économisés 7500 FCFA"
        },
        {
          "date": "2025-07-24T18:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Fondeurs de Ouagadougou (SEL009) - demande de devis lot"
        },
        {
          "date": "2025-07-22T15:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250715-0038 - 20 bobines de fil de coton (PRD008)"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 18000 FCFA à Tisserands de Koudougou"
        },
        {
          "date": "2025-07-20T14:00:00",
          "type": "commande_gros",
          "detail": "Commande gros enregistrée: LOT-20250720-0040 (75000 FCFA) - 5 statuettes bronze"
        },
        {
          "date": "2025-07-18T11:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 20 bobines de fil de coton (PRD008) à 1200 FCFA/bobine (marge 33%)"
        },
        {
          "date": "2025-07-15T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Miel toutes fleurs du Sud-Ouest (PRD005) x10 - 40000 FCFA (LOT-20250715-0039)"
        },
        {
          "date": "2025-07-15T13:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 10 x 4000 = 40000 FCFA - remise gros 8% = 36800 FCFA économisés 3200 FCFA"
        },
        {
          "date": "2025-07-12T09:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Apiculteur de Banfora (SEL004) - négociation prix miel"
        },
        {
          "date": "2025-07-10T16:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250705-0035 - 5 statuettes bronze (PRD010)"
        },
        {
          "date": "2025-07-05T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Bronze du Burkina statuette (PRD010) x2 - 35000 FCFA (marge 4000 FCFA/unité)"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Pagne en coton bazin riche (PRD007) x10 - 180000 FCFA (LOT-20250628-0032)"
        },
        {
          "date": "2025-06-25T10:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Tisserands de Koudougou (SEL007) - commande lot bogolan"
        },
        {
          "date": "2025-06-20T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 10 pagnes bazin riche (PRD007) à 22000 FCFA/unité (marge 22%)"
        },
        {
          "date": "2025-06-15T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Pagne en coton bazin riche (PRD007) x3 - 66000 FCFA"
        },
        {
          "date": "2025-06-10T14:00:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 10 x 18000 = 180000 FCFA - remise gros 12% = 158400 FCFA économisés 21600 FCFA"
        },
        {
          "date": "2025-05-25T10:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250520-0028 - 50 beurres de karité (PRD001)"
        },
        {
          "date": "2025-05-15T14:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 125000 FCFA à Coopérative Femmes de Léo"
        },
        {
          "date": "2025-04-28T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Beurre de karité pur (PRD001) x50 - 125000 FCFA (LOT-20250428-0025)"
        },
        {
          "date": "2025-04-10T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 50 beurres de karité (PRD001) à 3000 FCFA/unité (marge 20%)"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard revendeur depuis Ouagadougou (Centre)"
        },
        {
          "date": "2025-02-15T14:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance atteint: Or - remise gros maximale débloquée"
        },
        {
          "date": "2025-01-30T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Bronze du Burkina statuette (PRD010) x1 - 18000 FCFA (marge 3000 FCFA)"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T19:00:00",
          "type": "wholesale_confirmed",
          "lu": false,
          "titre": "Commande gros confirmée",
          "message": "LOT-20250724-0042 (75000 FCFA) confirmée par Fondeurs de Ouagadougou"
        },
        {
          "date": "2025-07-22T15:00:00",
          "type": "lot_received",
          "lu": false,
          "titre": "Lot reçu",
          "message": "LOT-20250715-0038 reçu - 20 bobines de fil de coton disponibles"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "payment_sent",
          "lu": true,
          "titre": "Paiement envoyé",
          "message": "18000 FCFA envoyés à Tisserands de Koudougou"
        },
        {
          "date": "2025-07-18T11:00:00",
          "type": "products_listed",
          "lu": true,
          "titre": "Produits mis en vente",
          "message": "20 bobines de fil de coton mises en vente à 1200 FCFA"
        },
        {
          "date": "2025-07-12T09:00:00",
          "type": "supplier_reply",
          "lu": true,
          "titre": "Réponse fournisseur",
          "message": "Apiculteur de Banfora a répondu à votre demande de devis"
        },
        {
          "date": "2025-06-25T10:00:00",
          "type": "supplier_contact",
          "lu": true,
          "titre": "Contact fournisseur",
          "message": "Demande de lot bogolan envoyée à Tisserands de Koudougou"
        },
        {
          "date": "2025-02-15T14:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Or atteint!",
          "message": "Félicitations! Niveau Or débloqué - remises gros maximales"
        }
      ],
      "transactions_count": 156,
      "boutique_type": "grande_boutique",
      "preferences": {
        "categories_gerees": [
          "Artisanat",
          "Coton",
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_lots": true
      }
    },
    "beta_revendeur_2": {
      "id": "beta_revendeur_2",
      "type": "revendeur",
      "nom": "Petite Boutique Bobo",
      "email": "petite.bobo@test.bf",
      "telephone": "70 45 67 89",
      "ville": "Bobo-Dioulasso",
      "region": "Hauts-Bassins",
      "trust_level": "argent",
      "date_inscription": "2022-08-22",
      "description_courte": "Petite boutique d'épicerie locale à Bobo-Dioulasso, 43 transactions en lots moyens",
      "historique_activite": [
        {
          "date": "2025-07-23T17:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Graines de sésame doré (PRD003) x20 kg - 36000 FCFA (LOT-20250723-0018)"
        },
        {
          "date": "2025-07-23T16:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 20 x 1800 = 36000 FCFA - remise gros 5% = 34200 FCFA économisés 1800 FCFA"
        },
        {
          "date": "2025-07-23T16:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Ferme Wend-Kuni (SEL003) - commande sésame"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250715-0016 - 10 miels toutes fleurs (PRD005)"
        },
        {
          "date": "2025-07-20T15:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 40000 FCFA à Apiculteur de Banfora"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 10 miels toutes fleurs (PRD005) à 4500 FCFA/unité (marge 12.5%)"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Miel toutes fleurs du Sud-Ouest (PRD005) x10 - 40000 FCFA (LOT-20250715-0016)"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Beurre de karité pur (PRD001) x5 - 15000 FCFA (marge 2500 FCFA)"
        },
        {
          "date": "2025-06-28T10:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Coopérative Femmes de Léo (SEL001) - commande beurre karité"
        },
        {
          "date": "2025-06-20T15:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250615-0014 - 20 beurres de karité (PRD001)"
        },
        {
          "date": "2025-06-15T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Beurre de karité pur (PRD001) x20 - 50000 FCFA (LOT-20250615-0014)"
        },
        {
          "date": "2025-06-10T13:00:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 20 x 2500 = 50000 FCFA - remise gros 5% = 47500 FCFA économisés 2500 FCFA"
        },
        {
          "date": "2025-05-28T14:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 20 beurres de karité (PRD001) à 3000 FCFA/unité"
        },
        {
          "date": "2025-05-15T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Miel toutes fleurs (PRD005) x3 - 13500 FCFA"
        },
        {
          "date": "2025-05-05T10:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 12000 FCFA à Apiculteur de Banfora"
        },
        {
          "date": "2025-04-20T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Huile de sésame artisanale (PRD004) x8 - 24000 FCFA (LOT-20250420-0011)"
        },
        {
          "date": "2025-04-10T11:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250405-0010 - 8 huiles de sésame (PRD004)"
        },
        {
          "date": "2025-03-20T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 8 huiles de sésame (PRD004) à 3500 FCFA/unité"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-23T17:00:00",
          "type": "wholesale_confirmed",
          "lu": false,
          "titre": "Commande gros confirmée",
          "message": "LOT-20250723-0018 (36000 FCFA) confirmée par Ferme Wend-Kuni"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "lot_received",
          "lu": false,
          "titre": "Lot reçu",
          "message": "LOT-20250715-0016 reçu - 10 miels disponibles en boutique"
        },
        {
          "date": "2025-07-20T15:00:00",
          "type": "payment_sent",
          "lu": true,
          "titre": "Paiement envoyé",
          "message": "40000 FCFA envoyés à Apiculteur de Banfora"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "products_listed",
          "lu": true,
          "titre": "Produits mis en vente",
          "message": "10 miels toutes fleurs à 4500 FCFA en boutique"
        },
        {
          "date": "2025-06-28T10:00:00",
          "type": "supplier_contact",
          "lu": true,
          "titre": "Contact fournisseur",
          "message": "Demande envoyée à Coopérative Femmes de Léo"
        },
        {
          "date": "2025-04-25T09:00:00",
          "type": "newsletter",
          "lu": true,
          "titre": "Newsletter Avril",
          "message": "Offres spéciales printemps pour revendeurs"
        }
      ],
      "transactions_count": 43,
      "boutique_type": "petite_boutique",
      "preferences": {
        "categories_gerees": [
          "Miel",
          "Sesame",
          "Karite"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_lots": true
      }
    },
    "beta_revendeur_3": {
      "id": "beta_revendeur_3",
      "type": "revendeur",
      "nom": "Distrib Plus Centre",
      "email": "distrib.plus@test.bf",
      "telephone": "70 88 77 66",
      "ville": "Ouagadougou",
      "region": "Centre",
      "trust_level": "or",
      "date_inscription": "2020-01-15",
      "description_courte": "Distributeur régional à Ouagadougou, 280 transactions, couvre plusieurs régions du Burkina",
      "historique_activite": [
        {
          "date": "2025-07-24T18:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Beurre de karité pur (PRD001) x100 - 250000 FCFA (LOT-20250724-0085)"
        },
        {
          "date": "2025-07-24T17:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 100 x 2500 = 250000 FCFA - remise gros Or 15% = 212500 FCFA économisés 37500 FCFA"
        },
        {
          "date": "2025-07-24T17:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Coopérative Femmes de Léo (SEL001) - commande mensuelle"
        },
        {
          "date": "2025-07-22T16:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250715-0082 - 50 miels toutes fleurs (PRD005)"
        },
        {
          "date": "2025-07-20T15:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Beurre de karité pur (PRD001) x30 - 90000 FCFA (marge 15000 FCFA)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 200000 FCFA à Apiculteur de Banfora"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Miel toutes fleurs du Sud-Ouest (PRD005) x50 - 200000 FCFA (LOT-20250715-0082)"
        },
        {
          "date": "2025-07-12T10:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 50 miels toutes fleurs (PRD005) à 4500 FCFA/unité (marge 12.5%)"
        },
        {
          "date": "2025-07-10T14:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Apiculteur de Banfora (SEL004) - demande devis 50 unités"
        },
        {
          "date": "2025-07-05T15:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Graines de sésame doré (PRD003) x50 kg - 90000 FCFA (LOT-20250705-0078)"
        },
        {
          "date": "2025-07-05T14:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 50 x 1800 = 90000 FCFA - remise gros 12% = 79200 FCFA économisés 10800 FCFA"
        },
        {
          "date": "2025-06-28T16:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250620-0075 - 30 pagnes bazin riche (PRD007)"
        },
        {
          "date": "2025-06-25T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Pagne en coton bazin riche (PRD007) x5 - 110000 FCFA (marge 10000 FCFA)"
        },
        {
          "date": "2025-06-20T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Pagne en coton bazin riche (PRD007) x30 - 540000 FCFA (LOT-20250620-0075)"
        },
        {
          "date": "2025-06-15T10:00:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 30 x 18000 = 540000 FCFA - remise gros 15% = 459000 FCFA économisés 81000 FCFA"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 30 pagnes bazin riche (PRD007) à 22000 FCFA/unité"
        },
        {
          "date": "2025-05-28T11:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Tisserands de Koudougou (SEL007) - commande lot bogolan"
        },
        {
          "date": "2025-05-20T14:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Graines de sésame doré (PRD003) x20 kg - 40000 FCFA"
        },
        {
          "date": "2025-05-10T10:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250505-0070 - 100 beurres de karité (PRD001)"
        },
        {
          "date": "2025-04-28T15:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Beurre de karité pur (PRD001) x100 - 250000 FCFA (LOT-20250428-0068)"
        },
        {
          "date": "2025-04-15T11:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 212500 FCFA à Coopérative Femmes de Léo (remise Or 15%)"
        },
        {
          "date": "2025-04-05T14:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 100 beurres de karité (PRD001) à 3000 FCFA/unité"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "trust_upgrade",
          "detail": "Niveau de confiance maintenu: Or - 280 transactions"
        },
        {
          "date": "2025-02-15T15:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard revendeur depuis Ouagadougou (Centre)"
        },
        {
          "date": "2025-02-10T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Miel toutes fleurs (PRD005) x20 - 90000 FCFA"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-24T18:00:00",
          "type": "wholesale_confirmed",
          "lu": false,
          "titre": "Commande gros confirmée",
          "message": "LOT-20250724-0085 (250000 FCFA) confirmée par Coopérative Femmes de Léo"
        },
        {
          "date": "2025-07-24T17:30:00",
          "type": "discount_applied",
          "lu": false,
          "titre": "Remise Or appliquée",
          "message": "Remise gros 15% appliquée - 37500 FCFA économisés sur LOT-20250724-0085"
        },
        {
          "date": "2025-07-22T16:00:00",
          "type": "lot_received",
          "lu": false,
          "titre": "Lot reçu",
          "message": "LOT-20250715-0082 reçu - 50 miels toutes fleurs en stock"
        },
        {
          "date": "2025-07-20T15:00:00",
          "type": "resale_completed",
          "lu": true,
          "titre": "Vente revendu",
          "message": "30 beurres de karité vendus - marge 15000 FCFA réalisée"
        },
        {
          "date": "2025-07-12T10:00:00",
          "type": "products_listed",
          "lu": true,
          "titre": "Produits mis en vente",
          "message": "50 miels toutes fleurs à 4500 FCFA en boutique"
        },
        {
          "date": "2025-06-28T16:00:00",
          "type": "lot_received",
          "lu": true,
          "titre": "Lot reçu",
          "message": "LOT-20250620-0075 reçu - 30 pagnes bazin riche en stock"
        },
        {
          "date": "2025-05-28T11:00:00",
          "type": "supplier_contact",
          "lu": true,
          "titre": "Contact fournisseur",
          "message": "Demande de lot bogolan envoyée à Tisserands de Koudougou"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "trust_upgrade",
          "lu": true,
          "titre": "Niveau Or maintenu",
          "message": "Statut Or confirmé - 280 transactions réalisées"
        }
      ],
      "transactions_count": 280,
      "boutique_type": "grande_boutique",
      "preferences": {
        "categories_gerees": [
          "Karite",
          "Sesame",
          "Miel",
          "Coton"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_lots": true
      }
    },
    "beta_revendeur_4": {
      "id": "beta_revendeur_4",
      "type": "revendeur",
      "nom": "Artisan Market Tenkodogo",
      "email": "artisan.tenkodogo@test.bf",
      "telephone": "70 99 88 77",
      "ville": "Tenkodogo",
      "region": "Centre-Est",
      "trust_level": "argent",
      "date_inscription": "2021-11-05",
      "description_courte": "Boutique d'artisanat revendu à Tenkodogo, 67 transactions, valorise l'artisanat local",
      "historique_activite": [
        {
          "date": "2025-07-23T15:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Bijoux en perles du Sahel (PRD012) x10 - 32000 FCFA (LOT-20250723-0025)"
        },
        {
          "date": "2025-07-23T14:30:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 10 x 3200 = 32000 FCFA - remise gros 8% = 29440 FCFA économisés 2560 FCFA"
        },
        {
          "date": "2025-07-23T14:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Artisanes de Dori (SEL011) - commande bijoux"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250715-0023 - 5 bronzes (PRD010)"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 5 bronzes (PRD010) à 17000 FCFA/unité (marge 2000 FCFA)"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Panier tressé en fibres locales (PRD009) x2 - 14000 FCFA (marge 2000 FCFA)"
        },
        {
          "date": "2025-07-15T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Bronze du Burkina statuette (PRD010) x5 - 75000 FCFA (LOT-20250715-0023)"
        },
        {
          "date": "2025-07-10T15:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 75000 FCFA à Fondeurs de Ouagadougou"
        },
        {
          "date": "2025-07-05T10:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Fondeurs de Ouagadougou (SEL009) - demande lot bronze"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250620-0020 - 10 paniers tressés (PRD009)"
        },
        {
          "date": "2025-06-20T11:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Panier tressé en fibres locales (PRD009) x10 - 65000 FCFA (LOT-20250620-0020)"
        },
        {
          "date": "2025-06-15T10:00:00",
          "type": "calcul_lot",
          "detail": "Calcul lot: 10 x 6500 = 65000 FCFA - remise gros 5% = 61750 FCFA économisés 3250 FCFA"
        },
        {
          "date": "2025-06-10T15:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 10 paniers tressés (PRD009) à 7500 FCFA/unité"
        },
        {
          "date": "2025-05-25T11:00:00",
          "type": "vente_revendu",
          "detail": "Vente revendu: Bijoux en perles du Sahel (PRD012) x3 - 10800 FCFA"
        },
        {
          "date": "2025-05-15T14:00:00",
          "type": "achat_gros",
          "detail": "Achat en gros: Masque en bois sculpté (PRD011) x5 - 60000 FCFA (LOT-20250515-0016)"
        },
        {
          "date": "2025-05-10T10:00:00",
          "type": "contact_fournisseur",
          "detail": "Contact fournisseur: Sculpteurs de Bobo-Dioulasso (SEL010) - commande masques"
        },
        {
          "date": "2025-04-28T11:00:00",
          "type": "reception_lot",
          "detail": "Lot reçu: LOT-20250420-0014 - 8 bijoux perles (PRD012)"
        },
        {
          "date": "2025-04-20T15:00:00",
          "type": "paiement_fournisseur",
          "detail": "Paiement fournisseur - 25600 FCFA à Artisanes de Dori"
        },
        {
          "date": "2025-04-10T14:00:00",
          "type": "mise_en_vente",
          "detail": "Mise en vente: 5 masques en bois sculpté (PRD011) à 14000 FCFA/unité"
        },
        {
          "date": "2025-03-20T10:00:00",
          "type": "connexion",
          "detail": "Connexion dashboard revendeur depuis Tenkodogo (Centre-Est)"
        }
      ],
      "notifications_recentes": [
        {
          "date": "2025-07-23T15:00:00",
          "type": "wholesale_confirmed",
          "lu": false,
          "titre": "Commande gros confirmée",
          "message": "LOT-20250723-0025 (32000 FCFA) confirmée par Artisanes de Dori"
        },
        {
          "date": "2025-07-23T14:30:00",
          "type": "discount_applied",
          "lu": false,
          "titre": "Remise appliquée",
          "message": "Remise gros 8% - 2560 FCFA économisés sur LOT-20250723-0025"
        },
        {
          "date": "2025-07-22T11:00:00",
          "type": "lot_received",
          "lu": true,
          "titre": "Lot reçu",
          "message": "LOT-20250715-0023 reçu - 5 bronzes disponibles en boutique"
        },
        {
          "date": "2025-07-20T16:00:00",
          "type": "products_listed",
          "lu": true,
          "titre": "Produits mis en vente",
          "message": "5 bronzes à 17000 FCFA en boutique"
        },
        {
          "date": "2025-07-18T14:00:00",
          "type": "resale_completed",
          "lu": true,
          "titre": "Vente revendu",
          "message": "2 paniers tressés vendus - marge 2000 FCFA"
        },
        {
          "date": "2025-06-28T14:00:00",
          "type": "lot_received",
          "lu": true,
          "titre": "Lot reçu",
          "message": "LOT-20250620-0020 reçu - 10 paniers tressés en stock"
        }
      ],
      "transactions_count": 67,
      "boutique_type": "petite_boutique",
      "preferences": {
        "categories_gerees": [
          "Artisanat",
          "Coton"
        ],
        "newsletter": true,
        "langue": "fr",
        "notifications_lots": true
      }
    }
  },
  "metadata": {
    "genere_le": "2025-07-25",
    "total_comptes": 12,
    "total_entrees_historique": 255,
    "total_notifications": 79,
    "breakdown": {
      "acheteurs": 4,
      "vendeurs": 4,
      "revendeurs": 4
    },
    "periode_couverte": "2025-01-25 a 2025-07-24",
    "format_dates": "ISO 8601",
    "source": "json/beta-accounts.json v2.0"
  }
},
  cart_rules: {
  "cart_rules": {
    "max_items": 50,
    "min_quantity_per_item": 1,
    "max_quantity_per_item": 999,
    "allow_multiple_sellers": true,
    "delivery_note": "Livraison a confirmer avec chaque vendeur individuellement. La plateforme ne gere pas la livraison.",
    "payment_note": "Paiement direct avec le vendeur: cash, Wave, Orange Money, Mobile Money. Pas de paiement en ligne via la plateforme.",
    "checkout_requires_auth": true,
    "receipt_generation": true,
    "receipt_format": "HTML_printable",
    "receipt_number_format": "BF-YYYYMMDD-XXXXX",
    "save_to_history": true,
    "notify_sellers": true,
    "notify_type": "order_received"
  }
},
  categories: {
  "categories": [
    {
      "id": "CAT01",
      "nom": "Karite",
      "slug": "karite",
      "icon_svg": "images/icons/icon-karite.svg",
      "description": "Beurre de karite, savons, produits cosmetiques artisanaux",
      "color_accent": "#e8d4a0",
      "product_count": 2,
      "sub_categories": [
        "Beurre",
        "Savon",
        "Cosmetique"
      ]
    },
    {
      "id": "CAT02",
      "nom": "Sesame",
      "slug": "sesame",
      "icon_svg": "images/icons/icon-sesame.svg",
      "description": "Graines de sesame et huile presse a froid",
      "color_accent": "#eccf8a",
      "product_count": 2,
      "sub_categories": [
        "Graines",
        "Huile"
      ]
    },
    {
      "id": "CAT03",
      "nom": "Miel",
      "slug": "miel",
      "icon_svg": "images/icons/icon-miel.svg",
      "description": "Miel burkinabe recolte en foret classee",
      "color_accent": "#e8a13a",
      "product_count": 2,
      "sub_categories": [
        "Toutes fleurs",
        "Mono-floral karite",
        "En rayon"
      ]
    },
    {
      "id": "CAT04",
      "nom": "Coton",
      "slug": "coton",
      "icon_svg": "images/icons/icon-coton.svg",
      "description": "Pagnes bazin et fils de coton files main",
      "color_accent": "#7fa88a",
      "product_count": 2,
      "sub_categories": [
        "Pagne",
        "Fil",
        "Bazin"
      ]
    },
    {
      "id": "CAT05",
      "nom": "Artisanat",
      "slug": "artisanat",
      "icon_svg": "images/icons/icon-artisanat.svg",
      "description": "Paniers, bronzes, masques sculptes, bijoux en perles",
      "color_accent": "#a8531f",
      "product_count": 4,
      "sub_categories": [
        "Panier",
        "Bronze",
        "Masque",
        "Bijoux",
        "Sculpture"
      ]
    }
  ]
},
  certifications: {
  "certifications": [
    {
      "id": "CERT01",
      "nom": "BioSPG",
      "label": "BioSPG",
      "organisme": "CNABio -- Conseil National de l'Agriculture Biologique du Burkina Faso",
      "description": "Le label BioSPG garantit qu'une denree alimentaire a ete produite selon les normes de l'agriculture biologique. Le SPG (Systeme Participatif de Garantie) est un systeme de certification alternatif base sur la confiance et la participation active des producteurs, consommateurs et autres acteurs. Etabli en 2013, c'est l'un des premiers labels bio nationaux en Afrique de l'Ouest.",
      "color": "#1F7A3D",
      "icon_svg": "images/icons/icon-organic.svg",
      "website": "https://www.cnabio.net/le-biospg",
      "requirements": [
        "Agriculture biologique sans pesticides chimiques",
        "Verification participative par pairs",
        "Engagement ecologique et social"
      ]
    },
    {
      "id": "CERT02",
      "nom": "ABNORM",
      "label": "ABNORM",
      "organisme": "ABNORM -- Agence Burkinabe de Normalisation, Qualite, Metrologie et Certification",
      "description": "ABNORM est l'organisme national de normalisation et certification du Burkina Faso. Il certifie que les produits repondent aux normes de qualite nationales et internationales. ABNORM delivre des attestations de conformite aux entreprises burkinabe.",
      "color": "#2980B9",
      "icon_svg": "images/icons/icon-certification.svg",
      "requirements": [
        "Conformite aux normes nationales",
        "Tests de qualite en laboratoire",
        "Audit de processus de production"
      ]
    },
    {
      "id": "CERT03",
      "nom": "Made_in_BF",
      "label": "Made in BF",
      "organisme": "Ministere de l'Industrie, du Commerce et de l'Artisanat du Burkina Faso",
      "description": "Le label Made in Burkina Faso est un signe officiel de conformite qui atteste que le produit a ete fabrique au Burkina Faso conformement aux regles et procedures definies par le Ministere de l'Industrie, du Commerce et de l'Artisanat. Ce label a ete lance pour encourager le consommer local et valoriser les produits nationaux.",
      "color": "#A8531F",
      "icon_svg": "images/icons/icon-made-in-bf.svg",
      "website": "https://www.commerce.gov.bf",
      "requirements": [
        "Fabrication au Burkina Faso verifiee",
        "Conformite aux regles du ministere",
        "Origine locale confirme"
      ]
    }
  ]
},
  expert_modules: {
  "meta": {
    "version": "1.0",
    "date": "2026-07-24",
    "task_id": "L1c",
    "description": "Spec des 6 modules experts integrates au dashboard vendeur Achetons Burkinabe. Chaque module apporte une intelligence metier reelle basee sur des theories confirmees (BCG, ABC analysis, point mort, BFR, DSO, PFC, rotation stock, BFR).",
    "sources_theoriques": [
      "Theorie du seuil de rentabilite (point mort) - Rostagny & Lavergne",
      "Activity-Based Costing (ABC) - Cooper & Kaplan, Harvard Business School (1988)",
      "Matrice BCG (Boston Consulting Group) - Bruce Henderson (1968)",
      "Besoin en Fonds de Roulement (BFR) - Michel Sion, Analyse financiere",
      "Days Sales Outstanding (DSO) - ratio de credit management",
      "PFC (Price-Function-Cost) - modele de pricing strategique",
      "Stock rotation - norme IAS 2 / methodes Wilson",
      "Loi de Pareto (80/20) appliquee a l'ABC analysis",
      "Saisonnalite agricole BF - INSD & ONAC"
    ],
    "devise": "FCFA",
    "tva_bf": 0.18,
    "marge_defaut": 0.4
  },
  "modules": {
    "comptable": {
      "id": "comptable",
      "nom": "Expert Comptable",
      "icon": "calculator",
      "description": "Analyse financiere approfondie de votre activite: marges, rentabilité, seuil de rentabilite, TVA BF a 18% et tableau de bord mensuel.",
      "objectif": "Fournir au vendeur la vision comptable exacte de son activite (CA, charges, benefice, point mort) sans logiciels complexes, en s'appuyant sur les principes de comptabilite generale OHADA adaptes au contexte BF.",
      "calculations": [
        {
          "id": "marge_brute",
          "label": "Marge brute",
          "formula": "CA - Cout d'achat des marchandises vendues (CAMV)",
          "variables": {
            "CA": "Chiffre d'affaires HT = somme(prix_vente HT x quantite)",
            "CAMV": "Cout d'achat = somme(prix_achat HT x quantite vendue)"
          },
          "theorie": "La marge brute (gross margin) est la difference entre le chiffre d'affaires et le cout direct d'achat des produits revendus. Norme BF: 30-50% pour produits agricoles transformes, 15-25% pour matieres premieres brutes.",
          "interpretation": {
            "excellent": "> 40%",
            "bon": "25-40%",
            "faible": "10-25%",
            "critique": "< 10%"
          },
          "unite": "FCFA et %"
        },
        {
          "id": "marge_nette",
          "label": "Marge nette",
          "formula": "(Benefice net / CA) x 100",
          "variables": {
            "benefice_net": "CA - CAMV - charges variables - charges fixes - taxes"
          },
          "theorie": "La marge nette (net profit margin) mesure la rentabilite finale apres deduction de toutes les charges. Valeur par defaut BF: 40% du CA pour artisanat transforme (ajustable par le vendeur selon ses charges reelles).",
          "interpretation": {
            "excellent": "> 25%",
            "bon": "10-25%",
            "faible": "0-10%",
            "critique": "< 0%"
          },
          "unite": "%"
        },
        {
          "id": "benefice_estime",
          "label": "Benefice estime",
          "formula": "CA x taux_marge_nette (par defaut 40%, ajustable)",
          "theorie": "Estimation rapide du benefice net basee sur le ratio sectoriel moyen. A affiner en saisissant les charges reelles (loyer, transport, emballage, main d'oeuvre).",
          "interpretation": {
            "excellent": "> 500 000 FCFA/mois",
            "bon": "100 000 - 500 000 FCFA/mois",
            "faible": "0 - 100 000 FCFA/mois",
            "critique": "< 0"
          },
          "unite": "FCFA"
        },
        {
          "id": "charges_variables",
          "label": "Charges variables",
          "formula": "CAMV + transport + emballage + commissions + taxes variables",
          "theorie": "Les charges variables (direct costing) varient proportionnellement aux ventes. Elles s'opposent aux charges fixes (loyer, salaires) qui restent stables quel que soit le volume.",
          "unite": "FCFA"
        },
        {
          "id": "charges_fixes",
          "label": "Charges fixes",
          "formula": "Loyer + salaires + amortissements + abonnements + assurances",
          "theorie": "Les charges fixes (structure costs) sont independantes du volume d'activite a court terme. Elles doivent etre couvertes par la marge sur cout variable pour atteindre le seuil de rentabilite.",
          "unite": "FCFA"
        },
        {
          "id": "taux_marge_cout_variable",
          "label": "Taux de marge sur cout variable (TMCV)",
          "formula": "(CA - Charges variables) / CA x 100",
          "theorie": "Le TMCV (contribution margin ratio) mesure la part de chaque FCFA de vente qui contribue a couvrir les charges fixes puis a degager du benefice. Indispensable pour le calcul du point mort.",
          "interpretation": {
            "excellent": "> 50%",
            "bon": "30-50%",
            "faible": "15-30%",
            "critique": "< 15%"
          },
          "unite": "%"
        },
        {
          "id": "seuil_rentabilite",
          "label": "Seuil de rentabilite (Point mort)",
          "formula": "Charges fixes / Taux de marge sur cout variable",
          "variables": {
            "charges_fixes": "Somme des charges fixes mensuelles",
            "TMCV": "Taux de marge sur cout variable (decimal, ex: 0.40)"
          },
          "theorie": "Le seuil de rentabilite (break-even point) est le niveau de CA a partir duquel l'entreprise couvre toutes ses charges (fixes + variables). Au-dela, chaque FCFA vendu genere du benefice. Concept cles du controle de gestion (Rostagny). Formule: SR = CF / TMCV. Point mort en jours = (SR / CA annuel) x 360.",
          "interpretation": {
            "sain": "SR < 60% du CA realise",
            "vigilance": "60-80% du CA",
            "critique": "> 80% du CA"
          },
          "unite": "FCFA"
        },
        {
          "id": "tva_bf",
          "label": "TVA BF (18%)",
          "formula": "TTC = HT x 1.18 ; HT = TTC / 1.18 ; TVA = TTC - HT",
          "theorie": "La TVA au Burkina Faso est de 18% (Code General des Impots BF, art. 347). Les petits vendeurs informels beneficient du regime de la franchise de TVA si CA < 50 millions FCFA/an. Les produits de premiere necessite (riz, mil, mais locaux) beneficient d'une exoneration.",
          "interpretation": {
            "info": "TVA collectee a reverser a la DGI mensuellement si assujetti"
          },
          "unite": "FCFA"
        },
        {
          "id": "top5_rentabilite",
          "label": "Top 5 produits par rentabilite",
          "formula": "Pour chaque produit: rentabilite = marge unitaire x quantites vendues. Tri descendant.",
          "theorie": "L'ABC costing simplifie (Cooper & Kaplan, 1988) classe les produits par contribution a la rentabilite. Les 20% de produits en tete (classe A) generent 80% du benefice (loi de Pareto).",
          "unite": "FCFA"
        },
        {
          "id": "tableau_bord_mensuel",
          "label": "Tableau de bord mensuel",
          "formula": "Par mois: CA HT, charges variables, charges fixes, marge brute, benefice net, tresorerie nette",
          "theorie": "Le tableau de bord comptable mensuel (compte de resultat synthetique) suit l'evolution de l'activite dans le temps. Il permet de detecter les derives (charges qui augmentent plus vite que le CA) et d'anticiper les tensions de tresorerie.",
          "unite": "FCFA par mois"
        },
        {
          "id": "pfc_pricing",
          "label": "Pricing PFC (Price-Function-Cost)",
          "formula": "Prix optimal = f(Cout de revient + valeur percue fonction + marge cible)",
          "theorie": "Le modele PFC (Price-Function-Cost) est une approche de pricing strategique qui combine: (1) le cout de revient plancher, (2) la valeur percue par le client selon la fonction du produit, (3) la marge cible du vendeur. Il evite le pricing uniquement base cout (cost-plus) qui sous-evalue les produits a forte valeur percue.",
          "interpretation": {
            "optimal": "Prix dans [cout x 1.5 ; cout x 3] selon valeur fonctionnelle"
          },
          "unite": "FCFA"
        },
        {
          "id": "abc_costing",
          "label": "ABC costing simplifie",
          "formula": "Cout de revient produit = cout achat + (activites consommees x cout inducteur)",
          "theorie": "L'Activity-Based Costing (Cooper & Kaplan, HBS 1988) alloue les charges indirectes (transport, stockage, manutention) aux produits selon les inducteurs de cout (nombre de livraisons, volume stocke). Version simplifiee: cout direct + part des charges indirectes au prorata du volume.",
          "unite": "FCFA"
        }
      ],
      "recommendations_rules": [
        {
          "id": "rec_marge_faible",
          "condition": "marge_brute < 0.25",
          "action": "Negocier les prix d'achat avec fournisseurs OU augmenter le prix de vente de 10-15% OU reduire les couts de transport",
          "priorite": "haute"
        },
        {
          "id": "rec_point_mort_proche",
          "condition": "seuil_rentabilite > 0.8 x CA_realise",
          "action": "Augmenter le CA de X% pour se mettre a l'abri. Identifier les charges fixes reductibles.",
          "priorite": "haute"
        },
        {
          "id": "rec_marge_excellente",
          "condition": "marge_nette > 0.25",
          "action": "Marge superieure a la norme BF. Reinvestir 30% dans le stock pour accelerer la croissance.",
          "priorite": "moyenne"
        },
        {
          "id": "rec_tva_franchise",
          "condition": "CA_annuel < 50000000",
          "action": "Vous relevez du regime de franchise de TVA (CA < 50M FCFA). Mention 'TVA non applicable, art. 305 CGI' sur vos factures.",
          "priorite": "basse"
        },
        {
          "id": "rec_top_concentration",
          "condition": "top1_produit > 0.5 x CA",
          "action": "Concentration excessive sur 1 produit. Diversifier l'offre pour reduire le risque.",
          "priorite": "moyenne"
        }
      ],
      "input_fields": [
        {
          "id": "charges_fixes_mensuelles",
          "label": "Charges fixes mensuelles (FCFA)",
          "type": "number",
          "default": 50000,
          "placeholder": "Loyer + salaires + abonnements"
        },
        {
          "id": "charges_variables_pct",
          "label": "Charges variables (% du CA)",
          "type": "number",
          "default": 30,
          "min": 0,
          "max": 100
        },
        {
          "id": "taux_marge_nette",
          "label": "Taux de marge nette cible (%)",
          "type": "number",
          "default": 40,
          "min": 0,
          "max": 100
        },
        {
          "id": "cout_achat_moyen",
          "label": "Cout d'achat moyen produit (FCFA)",
          "type": "number",
          "default": 0,
          "placeholder": "Saisir pour calcul marge brute reelle"
        }
      ]
    },
    "financier": {
      "id": "financier",
      "nom": "Expert Financier",
      "icon": "trending-up",
      "description": "Pilotage de la tresorerie, projections a 3 mois, BFR, DSO et conseils d'investissement bases sur les ratios financiers.",
      "objectif": "Donner au vendeur une vision prospective de sa tresorerie et alerter sur les desequilibres (BFR trop eleve, DSO qui s'allonge, ratio tresorerie insuffisant).",
      "calculations": [
        {
          "id": "cash_flow_mensuel",
          "label": "Cash flow mensuel",
          "formula": "Entrees (encaissements) - Sorties (decaissements)",
          "variables": {
            "entrees": "Paiements recus sur le mois (livraisons validees)",
            "sorties": "Achats stock + charges + remboursements + investissements"
          },
          "theorie": "Le cash flow (flux de tresorerie net) mesure la variation de tresorerie sur une periode. Positif = tresorerie qui augmente. Negatif = risque de cessation de paiement. Distinction cruciale avec le benefice comptable: une vente non payee augmente le benefice mais pas le cash flow.",
          "interpretation": {
            "excellent": "> 100 000 FCFA/mois",
            "bon": "0 - 100 000 FCFA/mois",
            "critique": "< 0 FCFA/mois"
          },
          "unite": "FCFA"
        },
        {
          "id": "projection_3_mois",
          "label": "Projection 3 mois (trend lineaire)",
          "formula": "CA futur = CA moyen 3 derniers mois x (1 + pente mensuelle x n)",
          "variables": {
            "pente_mensuelle": "Regression lineaire sur les 3-6 derniers mois: (CA_recent - CA_ancien) / nb_mois"
          },
          "theorie": "La projection par regression lineaire (methode des moindres carres) etablit une tendance a partir de l'historique. Adequate pour activite stable sans forte saisonnalite. Pour produits saisonniers (karite, miel), appliquer un coefficient saisonnier en plus de la trend.",
          "interpretation": {
            "croissance": "Pente > 0 : activite en croissance",
            "stagnation": "Pente = 0 : activite stable",
            "declin": "Pente < 0 : activite en declin, anticiper action"
          },
          "unite": "FCFA par mois"
        },
        {
          "id": "ratio_tresorerie_charges",
          "label": "Ratio tresorerie / charges mensuelles",
          "formula": "Tresorerie disponible / Charges mensuelles totales",
          "theorie": "Ce ratio (cash ratio etendu) indique le nombre de mois d'autonomie financiere. Un ratio >= 3 signifie que le vendeur peut supporter 3 mois sans nouvelles rentrées. Reference: recommandation Banque de France pour PME, adaptee au contexte BF.",
          "interpretation": {
            "excellent": ">= 3 (autonomie 3 mois)",
            "bon": "1.5 - 3",
            "vigilance": "1 - 1.5",
            "critique": "< 1 (cessation de paiement imminente)"
          },
          "unite": "ratio (nombre de mois)"
        },
        {
          "id": "conseil_investissement",
          "label": "Conseil d'investissement",
          "formula": "Si marge_nette > 30% ET ratio_tresorerie > 2 ALORS reinvestir 30% du benefice dans stock OU marketing",
          "theorie": "Regle de prudence financiere: ne reinvestir que si (1) la rentabilite est saine et (2) la tresorerie permet de couvrir 2 mois de charges. Sinon, preferer le renforcement de la tresorerie (fonds de precaution).",
          "interpretation": {
            "reinvestir": "Marge > 30% ET tresorerie > 2 mois : reinvestir 30% du benefice",
            "epargner": "Marge > 30% ET tresorerie < 2 mois : epargner 50% du benefice",
            "ajuster": "Marge < 30% : revoir le modele economique avant investissement"
          },
          "unite": "decision + %"
        },
        {
          "id": "dso",
          "label": "DSO (Days Sales Outstanding) - Delai moyen de paiement",
          "formula": "(Creances clients / CA TTC) x 30 (pour mensuel) ou x 360 (annuel)",
          "variables": {
            "creances_clients": "Factures emises non encore payees",
            "CA_TTC": "Chiffre d'affaires TTC sur la periode"
          },
          "theorie": "Le DSO est l'indicateur cles du credit management. Il mesure le delai moyen entre la facturation et le paiement effectif. Au BF, beaucoup de ventes se font en comptant (DSO = 0). Pour les ventes a credit (INSS, administrations), le DSO peut exploser. Norme recommandee: < 30 jours.",
          "interpretation": {
            "excellent": "< 15 jours",
            "bon": "15-30 jours",
            "vigilance": "30-60 jours",
            "critique": "> 60 jours (risque de credit)"
          },
          "unite": "jours"
        },
        {
          "id": "bfr",
          "label": "BFR (Besoin en Fonds de Roulement)",
          "formula": "BFR = (Stocks + Creances clients) - (Dettes fournisseurs + Dettes fiscales et sociales)",
          "variables": {
            "stocks": "Valeur du stock a la date de calcul (prix d'achat)",
            "creances_clients": "Factures non encaissees",
            "dettes_fournisseurs": "Achats non encore payes aux fournisseurs"
          },
          "theorie": "Le BFR (Michel Sion, Analyse financiere) represente le besoin de financement du cycle d'exploitation. BFR positif = besoin de financement (cas frequent chez les vendeurs qui stockent avant de vendre). BFR negatif = ressource de financement (cas du retail pur avec paiement comptant client et credit fournisseur).",
          "interpretation": {
            "faible_besoin": "BFR < 1 mois de CA",
            "normal": "BFR entre 1 et 3 mois de CA",
            "eleve": "BFR > 3 mois de CA : risque de tension de tresorerie"
          },
          "unite": "FCFA"
        },
        {
          "id": "roi_produit",
          "label": "ROI par produit (Return On Investment)",
          "formula": "ROI = (Benefice realise - Investissement initial) / Investissement initial x 100",
          "variables": {
            "investissement": "Cout d'achat du stock du produit + couts logistiques",
            "benefice": "Marge brute cumulee sur les ventes du produit"
          },
          "theorie": "Le ROI (rendement du capital investi) permet de comparer la rentabilite de differentes allocations. Un ROI > 100% signifie que l'investissement s'est rembourse et a genere autant de benefice. Reference: un ROI annuel de 50-100% est excellent pour un produit artisanal BF.",
          "interpretation": {
            "excellent": "> 100%",
            "bon": "30-100%",
            "faible": "0-30%",
            "perte": "< 0%"
          },
          "unite": "%"
        },
        {
          "id": "fonds_roulement",
          "label": "Fonds de roulement net global (FRNG)",
          "formula": "FRNG = Capitaux permanents - Actif immobilise = (Tresorerie + BFR)",
          "theorie": "Le FRNG mesure l'excedent de capitaux permanents sur l'actif immobilise. Un FRNG positif couvre le BFR et degage de la tresorerie. Indicateur d'equilibre financier a long terme.",
          "unite": "FCFA"
        }
      ],
      "recommendations_rules": [
        {
          "id": "rec_tresorerie_critique",
          "condition": "ratio_tresorerie_charges < 1",
          "action": "URGENT: relancer les impayes, negocier delais fournisseurs, privilegier ventes comptant",
          "priorite": "haute"
        },
        {
          "id": "rec_dso_eleve",
          "condition": "dso > 30",
          "action": "DSO trop eleve. Exiger un acompte de 30% a la commande. Limiter les ventes a credit a 30 jours max.",
          "priorite": "haute"
        },
        {
          "id": "rec_bfr_eleve",
          "condition": "bfr > 3 x ca_mensuel",
          "action": "BFR eleve: reduire le stock dormant, ecouler les invendus en promotion, etendre les delais fournisseurs",
          "priorite": "moyenne"
        },
        {
          "id": "rec_reinvestir",
          "condition": "marge_nette > 0.30 ET ratio_tresorerie > 2",
          "action": "Reinvestir 30% du benefice dans le stock des produits a forte rotation (classe A ABC)",
          "priorite": "moyenne"
        },
        {
          "id": "rec_roi_faible",
          "condition": "roi_produit < 0.30",
          "action": "ROI faible: soit arreter ce produit, soit augmenter le prix de 15%, soit negocier le cout d'achat",
          "priorite": "moyenne"
        }
      ],
      "input_fields": [
        {
          "id": "tresorerie_initiale",
          "label": "Tresorerie disponible (FCFA)",
          "type": "number",
          "default": 100000
        },
        {
          "id": "creances_clients",
          "label": "Factures impayees (FCFA)",
          "type": "number",
          "default": 0
        },
        {
          "id": "dettes_fournisseurs",
          "label": "Achats non payes aux fournisseurs (FCFA)",
          "type": "number",
          "default": 0
        },
        {
          "id": "delai_paiement_client_jours",
          "label": "Delai paiement clients (jours)",
          "type": "number",
          "default": 0
        }
      ]
    },
    "marketing": {
      "id": "marketing",
      "nom": "Expert Marketing",
      "icon": "megaphone",
      "description": "Strategie commerciale basee sur la saisonnalite, la matrice BCG, le pricing et le ciblage clients pour maximiser vos ventes.",
      "objectif": "Orienter les decisions commerciales (quoi vendre, quand, a qui, a quel prix) grace aux outils de marketing stratgique (BCG, segmentation, pricing strategique).",
      "calculations": [
        {
          "id": "saisonnalite",
          "label": "Analyse de saisonnalite par categorie",
          "formula": "Pour chaque categorie: mois en pic (vente > 1.2 x moyenne annuelle) et mois en creux (vente < 0.8 x moyenne)",
          "theorie": "La saisonnalite mesure les variations periodiques des ventes. Pour les produits agricoles BF, elle suit les cycles culturaux (karite: recolte mai-juillet, pic vente novembre-janvier pour fetes) et les evenements (Ramadan, Noel, rentree scolaire). Le coefficient saisonnier = vente du mois / moyenne mensuelle.",
          "interpretation": {
            "pic": "Coefficient > 1.2 : preparez le stock 2 mois avant",
            "normal": "Coefficient 0.8 - 1.2",
            "creux": "Coefficient < 0.8 : lancez des promotions ou concentrez-vous sur d'autres categories"
          },
          "unite": "coefficient + liste de mois"
        },
        {
          "id": "suggestion_prix",
          "label": "Suggestion de prix optimale",
          "formula": "Prix suggere = Moyenne(prix_marche_min, prix_marche_max) ajuste par demande et concurrence",
          "variables": {
            "prix_marche": "Prix moyen constate sur le marche BF pour cette categorie",
            "demande": "Indice de demande actuel (saisonnalite + tendance)",
            "concurrence": "Nombre de vendeurs offrant le meme produit sur la plateforme"
          },
          "theorie": "Le pricing strategique combine trois approches: (1) cost-plus (cout + marge), (2) value-based (valeur percue par le client), (3) competition-based (positionnement vs concurrents). La suggestion pondere ces trois dimensions: prix = 0.4 x cout_x1.5 + 0.3 x prix_marche + 0.3 x valeur_fonctionnelle.",
          "interpretation": {
            "sous_price": "Prix actuel < 80% du prix marche : augmenter pour ne pas deprecier l'image",
            "optimal": "Prix actuel dans [0.9 ; 1.1] x prix_marche",
            "sur_price": "Prix actuel > 120% du prix marche : justifier par qualite/origine ou baisser"
          },
          "unite": "FCFA"
        },
        {
          "id": "bcg_matrix",
          "label": "Matrice BCG (Boston Consulting Group)",
          "formula": "Classification 2x2: croissance marche (axe Y) x part de marche relative (axe X)",
          "variables": {
            "croissance": "Croissance des ventes du produit sur 12 mois (%)",
            "part_relatif": "Part de marche du produit / part du concurrent direct"
          },
          "theorie": "La matrice BCG (Henderson, 1968) classe les produits en 4 quadrants selon leur position strategique. Etoile: forte croissance + forte part (investir). Vache a lait: faible croissance + forte part (rentabiliser). Dilemme: forte croissance + faible part (choisir: investir ou abandonner). Poids mort: faible croissance + faible part (desinvestir).",
          "interpretation": {
            "etoile": "Croissance > 10% ET part > 15% : investir pour conquerir le marche",
            "vache_lait": "Croissance < 10% ET part > 15% : rentabiliser, financer les etoiles",
            "dilemme": "Croissance > 10% ET part < 15% : investir selectivement ou abandonner",
            "poids_mort": "Croissance < 10% ET part < 15% : desinvestir progressivement"
          },
          "unite": "classification"
        },
        {
          "id": "promotion_recommandation",
          "label": "Recommandations de promotions",
          "formula": "Si stock eleve ET saison creuse ALORS promo 15-20% ; Si saison pic ALORS pas de promo (profiter pleine demande)",
          "theorie": "Le timing des promotions est cles: une promotion en pleine saison dilue la marge inutilement (la demande est deja la). Une promotion en creux stimule la demande atone. Le % ideal est de 15-20% (assez pour attirer, pas assez pour deprecier). Au-dela de 30%, le client suspecte une qualite inferieure.",
          "interpretation": {
            "promotion_forte": "15-20% sur produits classe B/C en saison creuse",
            "promotion_legere": "5-10% sur produits nouveaux pour essai",
            "pas_promo": "Pleine saison: aucun discount, maximiser la marge"
          },
          "unite": "% + produits cibles"
        },
        {
          "id": "ciblage_clients",
          "label": "Segmentation clients",
          "formula": "Segmentation par region (13 regions BF) + par categorie preferee + par frequence d'achat",
          "theorie": "La segmentation RFM (Recence, Frequence, Montant) est une methode classique de marketing direct. Combinee avec la segmentation geographique (regions BF), elle permet de cibler precisement les actions commerciales: clients du Centre (Ouaga) prefèrent l'artisanat, clients du Sud-Ouest (karite), clients du Haut-Bassins (miel).",
          "interpretation": {
            "vip": "Achats > 50 000 FCFA et frequence > 1/mois : offres premium",
            "fidele": "Plusieurs achats sur 6 mois : programme fidelite",
            "occasionnel": "1 achat unique : relance avec promo",
            "inactif": "Aucun achat > 6 mois : reactivation promo agressive"
          },
          "unite": "segments + comptes"
        },
        {
          "id": "best_timing_relance",
          "label": "Best timing pour relances",
          "formula": "Vendredi 14h-16h (heure BF, UTC+0)",
          "theorie": "Etudes BF (INSD - Institut National des Statistiques et de la Demographie) et return-on-engagement des plateformes locales: vendredi apres-midi = meilleur taux d'ouverture des messages commerciaux (40% superieur a la moyenne). Les clients sont disponibles, en fin de semaine, et predisposes a planifier leurs achats du week-end. Eviter lundi matin (delai de traitement des week-end) et dimanche (respect du repos).",
          "interpretation": {
            "optimal": "Vendredi 14h-16h",
            "bon": "Mardi 10h-12h, Jeudi 16h-18h",
            "eviter": "Lundi matin, week-end, apres 19h"
          },
          "unite": "creneau horaire"
        }
      ],
      "recommendations_rules": [
        {
          "id": "rec_preparer_saison",
          "condition": "mois_actuel == mois_pic - 2",
          "action": "Dans 2 mois, pic de saisonnalite prevu pour {categorie}. Augmenter le stock de 50% des maintenant.",
          "priorite": "haute"
        },
        {
          "id": "rec_promo_creux",
          "condition": "mois_actuel in mois_creux ET stock > 1.5 x vente_mensuelle",
          "action": "Saison creuse + stock eleve: lancer une promo 15-20% pour ecouler avant peremption",
          "priorite": "haute"
        },
        {
          "id": "rec_poids_mort",
          "condition": "bcg == 'poids_mort'",
          "action": "Produit 'poids mort' BCG: envisager l'abandon ou repositionner (nouveau marche, nouveau packaging)",
          "priorite": "moyenne"
        },
        {
          "id": "rec_sous_price",
          "condition": "prix_vendeur < 0.8 x prix_marche",
          "action": "Prix sous-estime de X% vs marche. Augmenter pour valoriser l'offre (produits artisanaux BF merits prix juste).",
          "priorite": "moyenne"
        },
        {
          "id": "rec_vip_segment",
          "condition": "nb_clients_vip > 5",
          "action": "{nb} clients VIP identifies: lancer un programme fidelite (livraison gratuite sur 5e commande, par exemple).",
          "priorite": "moyenne"
        },
        {
          "id": "rec_relance_vendredi",
          "condition": "today.day == 'vendredi' AND today.hour in [14,15]",
          "action": "Creneau optimal de relance actif. Contacter vos {nb_inactifs} clients inactifs maintenant.",
          "priorite": "basse"
        }
      ],
      "input_fields": [
        {
          "id": "objectif_mensuel_ca",
          "label": "Objectif CA mensuel (FCFA)",
          "type": "number",
          "default": 500000
        },
        {
          "id": "budget_marketing",
          "label": "Budget marketing mensuel (FCFA)",
          "type": "number",
          "default": 20000
        }
      ]
    },
    "secretaire": {
      "id": "secretaire",
      "nom": "Secretaire (Assistant)",
      "icon": "mail",
      "description": "Assistant de communication: modeles de messages pre-rediges, rappels automatiques, gestion d'agenda pour vos clients et commandes.",
      "objectif": "Automatiser les communications routine (confirmations, relances, remerciements) et les rappels (stock, peremption, commandes en attente) pour que le vendeur se concentre sur l'essentiel.",
      "calculations": [
        {
          "id": "messages_pre_rediges",
          "label": "Modeles de messages pre-rediges",
          "formula": "Templates avec variables {client}, {produit}, {montant}, {commande_id}, {vendeur}, {delai}",
          "theorie": "Les templates de communication professionnelle (template-based communication) reduisent le temps de redaction de 70% tout en garantissant la coherence du ton. Les variables (placeholders) permettent la personnalisation sans perte de temps. Distinction: message transactionnel (informationnel) vs message commercial (promotionnel).",
          "interpretation": {
            "info": "5 templates disponibles: confirmation commande, relance paiement, remerciement avis, annonce promo, reponse info"
          },
          "unite": "templates + variables"
        },
        {
          "id": "rappels_commandes_attente",
          "label": "Rappels commandes en attente > 48h",
          "formula": "Pour chaque commande: si status == 'en_cours' ET (now - date_commande) > 48h ALORS alerte",
          "theorie": "La regle des 48h est un standard du e-commerce (source: E-commerce Europe): au-dela, le taux d'annulation monte a 35% et la satisfaction client chute de 40%. La gestion proactive des commandes en attente (SLA - Service Level Agreement) protege la reputation du vendeur.",
          "interpretation": {
            "action_immediate": "> 48h : traiter aujourd'hui",
            "urgence": "> 7 jours : risque d'annulation client + mauvais avis"
          },
          "unite": "alertes"
        },
        {
          "id": "rappels_stock_bas",
          "label": "Rappels stock bas",
          "formula": "Pour chaque produit: si stock_actuel < seuil_reappro (stock_securite) ALORS alerte",
          "theorie": "Le seuil de reapprovisionnement (reorder point) declenche une alerte avant la rupture. Formule classique: seuil = (vente_moyenne_journaliere x delai_reappro_jours) + stock_securite. En dessous de ce seuil, risque de rupture pendant le delai d'approvisionnement.",
          "interpretation": {
            "critique": "Stock < stock_securite (rupture imminente)",
            "vigilance": "Stock < seuil_reappro (commander maintenant)",
            "ok": "Stock > seuil_reappro"
          },
          "unite": "alertes"
        },
        {
          "id": "rappels_peremption",
          "label": "Rappels peremptions proches",
          "formula": "Pour chaque produit perissable: si jours_restantants < 30 ALORS rouge ; si < 90 ALORS orange",
          "theorie": "La gestion des dates de peremption (FIFO - First In First Out) est obligatoire pour les produits alimentaires et cosmetiques. Regle BF (ABNORM): un produit perime ne peut etre vendu. Anticiper a 90 jours permet d'ecouler via promo, a 30 jours impose une action immediate (liquidation, don, destruction).",
          "interpretation": {
            "rouge": "< 30 jours : URGENT, promo forte ou liquidation",
            "orange": "30-90 jours : promo moderee pour ecouler",
            "vert": "> 90 jours : surveillance normale"
          },
          "unite": "alertes"
        },
        {
          "id": "agenda_livraisons",
          "label": "Agenda livraisons et RDV",
          "formula": "Liste chronologique des livraisons prevues + RDV clients + echeances fournisseurs",
          "theorie": "L'agenda operationnel (operational schedule) synchronise les engagements commerciaux (livraisons), administratifs (echeances) et relationnels (RDV clients). Format recommande: vue calendrier + alertes 24h avant.",
          "unite": "evenements chronologiques"
        }
      ],
      "recommendations_rules": [
        {
          "id": "rec_traiter_urgence_48h",
          "condition": "commande_en_attente_48h > 0",
          "action": "{n} commande(s) en attente > 48h. Traiter en priorite aujourd'hui pour eviter annulation.",
          "priorite": "haute"
        },
        {
          "id": "rec_commander_stock_bas",
          "condition": "produits_stock_bas > 0",
          "action": "{n} produit(s) en rupture imminente. Lancer commande fournisseur.",
          "priorite": "haute"
        },
        {
          "id": "rec_promo_peremption",
          "condition": "produits_peremption_30j > 0",
          "action": "{n} produit(s) perempt(s) dans < 30j. Lancer promo -25% ou contacter associations.",
          "priorite": "haute"
        },
        {
          "id": "rec_relance_paiement",
          "condition": "factures_impayees_7j > 0",
          "action": "{n} facture(s) impayee(s) > 7 jours. Envoyer message 'relance_paiement' au client.",
          "priorite": "moyenne"
        },
        {
          "id": "rec_remerciement_avis",
          "condition": "livraisons_recentes_3j > 0",
          "action": "{n} livraison(s) recente(s): envoyer message 'remerciement_avis' pour stimuler les avis.",
          "priorite": "basse"
        }
      ],
      "input_fields": [
        {
          "id": "delai_reappro_jours",
          "label": "Delai de reappro habituel (jours)",
          "type": "number",
          "default": 14
        },
        {
          "id": "stock_securite_jours",
          "label": "Stock securite (jours de vente)",
          "type": "number",
          "default": 7
        }
      ]
    },
    "stock": {
      "id": "stock",
      "nom": "Stock Manager",
      "icon": "package",
      "description": "Gestion intelligente du stock: alertes peremption, taux de rotation, analyse ABC, suggestions de reappro et detection des stocks dormants.",
      "objectif": "Optimiser le couple service-cout du stock: ni rupture (perte de vente), ni surstock (capital immobilise + risque peremption). Base sur les methodes classiques de gestion de stock (Wilson, ABC, FIFO).",
      "calculations": [
        {
          "id": "alerte_peremption",
          "label": "Alerte peremption",
          "formula": "Pour chaque produit: jours_restantants = date_peremption - aujourd'hui. Rouge si < 30j, Orange si < 90j, Vert sinon.",
          "theorie": "La gestion des peremptions repose sur le principe FIFO (First In First Out): ecouler en priorite les lots les plus anciens. La regle des 30/90 jours est un standard de la distribution: 30j = action immediate, 90j = action planifiee. Sources: ABNORM (Burkina), Codex Alimentarius.",
          "interpretation": {
            "rouge": "< 30 jours: action immediate (promo forte, liquidation, don)",
            "orange": "30-90 jours: promo moderee pour ecouler",
            "vert": "> 90 jours: surveillance normale"
          },
          "unite": "alertes"
        },
        {
          "id": "taux_rotation_stock",
          "label": "Taux de rotation du stock",
          "formula": "Rotation = Cout des ventes annuel / Stock moyen = Ventes (quantite) / ((stock_initial + stock_final) / 2)",
          "variables": {
            "ventes_annuelles": "Quantite totale vendue sur 12 mois",
            "stock_moyen": "Moyenne arithmetique stock debut et fin de periode"
          },
          "theorie": "Le taux de rotation (inventory turnover) mesure combien de fois le stock est renouvele sur une periode. Norme BF: 4/an minimum pour produits agricoles (3 mois de stock max), 8-12/an pour produits artisanaux a forte demande. Trop bas = surstock (capital dormant). Trop haut = risque de rupture. Source: IAS 2 / methodes Wilson.",
          "interpretation": {
            "excellent": "> 8/an",
            "bon": "4-8/an",
            "vigilance": "2-4/an",
            "critique": "< 2/an (surstock massif)"
          },
          "unite": "fois par an"
        },
        {
          "id": "abc_analysis",
          "label": "Analyse ABC (classification de Pareto)",
          "formula": "Classement des produits par CA decroissant. Classe A: 20% des produits = 80% du CA. Classe B: 30% = 15% du CA. Classe C: 50% = 5% du CA.",
          "variables": {
            "ca_par_produit": "CA realise par produit sur 12 mois",
            "cumul": "Somme cumulee du CA, tri descendant"
          },
          "theorie": "L'ABC analysis (loi de Pareto 80/20) est une methode de classification des produits selon leur importance economique. Elle guide la priorisation: controle strict (inventaire mensuel, stock securite eleve) pour classe A, controle normal (trimestriel) pour B, controle leger (annuel) pour C. Source: Pareto (1906), appliquee au stock par H.F. Dickie (1951).",
          "interpretation": {
            "classe_A": "20% produits / 80% CA : surveillance stricte, stock securite x2",
            "classe_B": "30% produits / 15% CA : surveillance normale",
            "classe_C": "50% produits / 5% CA : surveillance leger, envisager abandon"
          },
          "unite": "classification + listes"
        },
        {
          "id": "suggestion_reappro",
          "label": "Suggestion de reappro",
          "formula": "Quantite a commander = (vente_moyenne_journaliere x delai_reappro) + stock_securite - stock_actuel",
          "variables": {
            "vente_moyenne_journaliere": "Ventes 30 derniers jours / 30",
            "delai_reappro": "Delai habituel fournisseur (jours)",
            "stock_securite": "Vente moyenne x 7 jours (par defaut)"
          },
          "theorie": "La formule du point de commande (reorder point + EOQ) minimise le couple cout de stockage + cout de rupture. Quantite optimale = (vente_moyenne_journaliere x delai_reappro) + stock_securite - stock_actuel. Si negatif, pas de commande necessaire. La formule de Wilson (EOQ - Economic Order Quantity) donne la taille optimale de lot pour minimiser les couts totaux.",
          "interpretation": {
            "commander": "Quantite > 0 : passer commande de X unites",
            "attendre": "Quantite <= 0 : stock suffisant pour la periode"
          },
          "unite": "unites par produit"
        },
        {
          "id": "stock_optimal",
          "label": "Stock optimal",
          "formula": "Stock optimal = (vente_moyenne_journaliere x delai_reappro) + stock_securite",
          "theorie": "Le stock optimal (optimal stock level) est le niveau de stock qui minimise la somme du cout de possession (capital immobilise + entreposage) et du cout de rupture (ventes perdues). Compose du stock de circulation (couvre le delai de reappro) et du stock de securite (absorbe les aleas de demande et de delai).",
          "interpretation": {
            "optimal": "Stock actuel = stock optimal +/- 10%",
            "sur_stock": "Stock actuel > 1.5 x stock optimal",
            "sous_stock": "Stock actuel < 0.8 x stock optimal"
          },
          "unite": "unites"
        },
        {
          "id": "dead_stock",
          "label": "Dead stock (stock dormant)",
          "formula": "Pour chaque produit: si aucune vente sur les 60 derniers jours ALORS dead stock",
          "theorie": "Le dead stock (stock dormant) immobilise du capital sans retour. Au-dela de 60 jours sans vente, le produit est classe 'dormant'. Au-dela de 180 jours, 'mort'. Action: promo agressive (-30%), repositionnement, don (deduction fiscale), destruction. Source: APICS (American Production and Inventory Control Society).",
          "interpretation": {
            "dormant": "60-180 jours sans vente : promo -20%",
            "mort": "> 180 jours sans vente : liquidation -40% ou don",
            "actif": "< 60 jours : stock normal"
          },
          "unite": "produits"
        },
        {
          "id": "valeur_stock",
          "label": "Valeur du stock",
          "formula": "Somme(stock_actuel x cout_achat_unitaire) pour tous les produits",
          "theorie": "La valorisation du stock (au cout d'achat) est un indicateur cles du BFR. Elle permet de calculer le cout de possession annuel (environ 20-25% de la valeur du stock: entreposage, assurance, obsolescence, capital immobilise).",
          "unite": "FCFA"
        },
        {
          "id": "cout_possession",
          "label": "Cout annuel de possession du stock",
          "formula": "Valeur stock moyen x 0.22 (taux standard BF)",
          "theorie": "Le cout de possession (carrying cost) regroupe l'entreposage (5%), l'assurance (2%), l'obsolescence (5%), la depreciation (5%), le cout du capital immobilise (5%). Estimation standard: 22-25% de la valeur du stock. Source: APICS, adapté contexte BF.",
          "unite": "FCFA par an"
        }
      ],
      "recommendations_rules": [
        {
          "id": "rec_reappro_classe_a",
          "condition": "produit_classe_A ET stock < seuil_reappro",
          "action": "URGENT (classe A): reappro {quantite} unites de {produit}. CA a risque si rupture.",
          "priorite": "haute"
        },
        {
          "id": "rec_peremption_rouge",
          "condition": "jours_restantants < 30",
          "action": "{produit} expire dans {n} jours. Lancer promo -25% immediatement ou trouver debauche (restaurateurs, associations).",
          "priorite": "haute"
        },
        {
          "id": "rec_dead_stock",
          "condition": "jours_sans_vente > 60",
          "action": "{produit} dormant depuis {n} jours. Lancer promo -20% ou repositionner sur nouveau marche.",
          "priorite": "moyenne"
        },
        {
          "id": "rec_rotation_faible",
          "condition": "taux_rotation < 2",
          "action": "Rotation trop faible: reduire les quantites commandees, privilegier flux tendu, diversifier offre.",
          "priorite": "moyenne"
        },
        {
          "id": "rec_surstock",
          "condition": "stock_actuel > 1.5 x stock_optimal",
          "action": "Surstock sur {produit}. Limiter les futures commandes, ecouler via promo.",
          "priorite": "moyenne"
        }
      ],
      "input_fields": [
        {
          "id": "delai_reappro_jours",
          "label": "Delai de reappro moyen (jours)",
          "type": "number",
          "default": 14
        },
        {
          "id": "stock_securite_jours",
          "label": "Stock securite (jours)",
          "type": "number",
          "default": 7
        },
        {
          "id": "cout_possession_pct",
          "label": "Cout possession annuel (%)",
          "type": "number",
          "default": 22,
          "min": 10,
          "max": 35
        }
      ]
    },
    "conseiller": {
      "id": "conseiller",
      "nom": "Conseiller Ventes",
      "icon": "lightbulb",
      "description": "Boostez vos ventes grace au cross-sell, upsell, lots complementaires et recommandations personnalisees basees sur votre historique de ventes.",
      "objectif": "Augmenter le panier moyen et la frequence d'achat grace aux techniques de vente additionnelle (cross-sell, upsell, bundling) et au scoring de popularite des produits.",
      "calculations": [
        {
          "id": "cross_sell",
          "label": "Cross-sell: clients qui ont achete X ont aussi achete Y",
          "formula": "Pour chaque paire (X, Y): co-occurrence dans memes paniers / total paniers contenant X. Si > 30% ALORS recommander Y aux acheteurs de X.",
          "theorie": "Le cross-selling (vente croisee) repose sur l'analyse de panier (market basket analysis) et l'algorithme Apriori (Agrawal, 1994). Les regles d'association {X -> Y} mesurent la confiance (probabilite conditionnelle) et le support (frequence). Exemple BF: beurre de karite + savon karite (complementaires cosmetique), miel + grenade (complementaires gastronomique).",
          "interpretation": {
            "forte_confiance": "> 50% : recommandation systematique",
            "moyenne": "30-50% : recommandation contextuelle",
            "faible": "< 30% : pas de recommandation"
          },
          "unite": "paires de produits + %"
        },
        {
          "id": "upsell",
          "label": "Upsell: suggestion version premium/bulk",
          "formula": "Pour chaque produit: identifier version premium (qualite superieure) ou bulk (lot economique). Suggest si client a achete version standard.",
          "theorie": "L'upselling (vente superieure) pousse le client vers une option plus rentable: version premium (marge superieure), format bulk (panier plus gros), edition limitee (prix psychologique). Regle: l'upsell doit apporter une valeur reelle au client pour etre ethique. Taux de reussite moyen: 15-25% en e-commerce (source: Forrester Research).",
          "interpretation": {
            "premium": "Suggerer version premium (prix +30-50%)",
            "bulk": "Suggerer lot x5 avec remise 10% (panier +40%)",
            "none": "Pas d'upsell pertinent identifie"
          },
          "unite": "recommandations"
        },
        {
          "id": "recommandations_historique",
          "label": "Recommandations basees sur historique similaires",
          "formula": "Pour un produit donne: identifier les vendeurs de meme categorie ayant des patterns de vente similaires, suggerer leurs produits a succes",
          "theorie": "Le filtrage collaboratif (collaborative filtering, Goldberg 1992) recommande des items base sur le comportement d'utilisateurs similaires. Version vendeur: 'vendeurs comme vous ont aussi reussi avec ces produits'. Augmente la decouverte de niches porteuses.",
          "interpretation": {
            "fort": "Produit present chez > 50% des vendeurs similaires a succès",
            "moyen": "20-50%",
            "faible": "< 20% : signal faible"
          },
          "unite": "produits + %"
        },
        {
          "id": "periodes_optimales",
          "label": "Periodes optimales par produit",
          "formula": "Pour chaque produit: identifier le mois avec les ventes maximales sur l'historique (ou coefficient saisonnier max)",
          "theorie": "Le calendrier commercial optimal aligne les efforts promotionnels et les pics de demande. Source: courbe saisonniere BF (INSD). Permet de preparer le stock 2 mois avant et de lancer les campagnes marketing 1 mois avant.",
          "interpretation": {
            "pic_a_venir": "Pic prevu dans 1-2 mois: preparer maintenant",
            "pic_passe": "Pic passe: attendre l'annee prochaine",
            "stable": "Demande stable: opportuniste"
          },
          "unite": "mois par produit"
        },
        {
          "id": "suggestion_lots",
          "label": "Suggestion de lots complementaires",
          "formula": "Combiner produits complementaires (cross-sell > 30%) en lots avec remise 10-15%",
          "theorie": "Le bundling (offre groupee) augmente le panier moyen de 20-30% (source: Harvard Business Review). Le client percoit une valeur supérieure (complementarite) et une economie. Conditions: produits reels complementaires (pas artificiels), remise 10-15% (incitative sans deprecier).",
          "interpretation": {
            "lot_cree": "Lot suggere: {produit1} + {produit2} = {prix_lot} FCFA (economie 12%)",
            "pas_lot": "Pas de complementarite forte identifiee"
          },
          "unite": "lots"
        },
        {
          "id": "score_popularite",
          "label": "Score de popularite (30 jours)",
          "formula": "Score = (vues x 0.3 + paniers x 0.5 + achats x 1.0) / 30 jours",
          "variables": {
            "vues": "Nombre de consultations produit (page detail)",
            "paniers": "Nombre d'ajouts au panier",
            "achats": "Nombre de commandes finalisees"
          },
          "theorie": "Le score de popularite (engagement score) pondere les interactions selon leur intensite: vue (attention), panier (intention), achat (conversion). La ponderation 0.3/0.5/1.0 reflete le funnel de conversion AARRR (Acquisition, Activation, Retention, Revenue, Referral). Permet d'identifier les produits a fort potentiel avant qu'ils n'explosent en ventes.",
          "interpretation": {
            "top": "Score > 80e percentile: produit star, capitaliser",
            "emergent": "60-80e percentile: produit emergent, push marketing",
            "faible": "< 60e percentile: revoir le referencement"
          },
          "unite": "score (decimal)"
        },
        {
          "id": "panier_moyen",
          "label": "Panier moyen",
          "formula": "CA total / nombre de commandes",
          "theorie": "Le panier moyen (average order value) est un KPI cles du e-commerce. Au BF, estime a 8 500 FCFA pour produits artisanaux. L'augmenter de 20% via cross-sell/upsell equivaut a augmenter le trafic de 20% (sans investissement marketing).",
          "unite": "FCFA"
        },
        {
          "id": "taux_conversion",
          "label": "Taux de conversion",
          "formula": "(Achats / Visiteurs) x 100",
          "theorie": "Le taux de conversion (conversion rate) mesure l'efficacite du funnel. Norme e-commerce global: 2-3%. Pour artisans BF: 1-2% (marche naissant). Ameliorations: photos de qualite, descriptions detaillees, prix competitifs, badges confiance.",
          "interpretation": {
            "excellent": "> 3%",
            "bon": "1-3%",
            "faible": "< 1% : optimiser fiches produit"
          },
          "unite": "%"
        }
      ],
      "recommendations_rules": [
        {
          "id": "rec_cross_sell",
          "condition": "confiance_xy > 0.30",
          "action": "Aux acheteurs de {X}, recommander aussi {Y} ({n}% ont les 2).",
          "priorite": "moyenne"
        },
        {
          "id": "rec_upsell_premium",
          "condition": "version_premium_disponible",
          "action": "Proposer version premium de {produit} ({prix_premium} FCFA, +{delta}% marge).",
          "priorite": "moyenne"
        },
        {
          "id": "rec_lot_complementaire",
          "condition": "complementarite > 0.40",
          "action": "Creer un lot {produit1} + {produit2} a {prix_lot} FCFA (remise 12%).",
          "priorite": "haute"
        },
        {
          "id": "rec_produit_emergent",
          "condition": "score_popularite > 80 AND ventes < 5",
          "action": "{produit} emerge (score {score}) mais peu de ventes. Pousser en promo decouverte.",
          "priorite": "moyenne"
        },
        {
          "id": "rec_panier_faible",
          "condition": "panier_moyen < 5000",
          "action": "Panier moyen faible ({n} FCFA). Former un lot pour augmenter a {objectif} FCFA.",
          "priorite": "moyenne"
        },
        {
          "id": "rec_preparer_pic",
          "condition": "mois_actuel == mois_pic - 1",
          "action": "Pic de {produit} dans 1 mois. Preroller une campagne marketing maintenant.",
          "priorite": "haute"
        }
      ],
      "input_fields": [
        {
          "id": "objectif_panier_moyen",
          "label": "Objectif panier moyen (FCFA)",
          "type": "number",
          "default": 15000
        },
        {
          "id": "remise_lot_pct",
          "label": "Remise lot complementaire (%)",
          "type": "number",
          "default": 12,
          "min": 5,
          "max": 20
        }
      ]
    }
  },
  "reference_data": {
    "prix_moyens_marche": {
      "Karite": {
        "min": 800,
        "max": 3000,
        "moyenne": 1500,
        "unite": "FCFA/250g",
        "source": "Table Filiere Karite BF + marche Ouagadougou 2026"
      },
      "Sesame": {
        "min": 1200,
        "max": 2500,
        "moyenne": 1800,
        "unite": "FCFA/kg",
        "source": "Nitidae filiere sesame BF"
      },
      "Miel": {
        "min": 2500,
        "max": 6000,
        "moyenne": 4000,
        "unite": "FCFA/L",
        "source": "Apiculteurs BF + INSD"
      },
      "Coton": {
        "min": 3000,
        "max": 15000,
        "moyenne": 7500,
        "unite": "FCFA/m",
        "source": "SOFITEX + artisanat textile Ouagadougou"
      },
      "Artisanat": {
        "min": 2000,
        "max": 80000,
        "moyenne": 15000,
        "unite": "FCFA/piece",
        "source": "Chambre de l'Artisanat BF"
      }
    },
    "ratios_sains": {
      "marge_brute_min": 0.3,
      "marge_nette_bon_min": 0.1,
      "marge_nette_excellent_min": 0.25,
      "rotation_stock_min": 4,
      "rotation_stock_excellent": 8,
      "tresorerie_charges_min": 3,
      "tresorerie_charges_critique": 1,
      "dso_max_jours": 30,
      "dso_critique_jours": 60,
      "taux_conversion_min_pct": 1,
      "taux_conversion_excellent_pct": 3,
      "panier_moyen_objectif_fcfa": 15000,
      "abc_seuil_a_pct": 80,
      "abc_seuil_b_pct": 95,
      "bfr_max_mois_ca": 3,
      "roi_min_pct": 30,
      "concentration_max_top1_pct": 50,
      "stock_optimal_tolerance_pct": 10,
      "sur_stock_seuil": 1.5,
      "sous_stock_seuil": 0.8,
      "seuil_commande_attente_heures": 48,
      "seuil_peremption_rouge_jours": 30,
      "seuil_peremption_orange_jours": 90,
      "seuil_dead_stock_jours": 60,
      "seuil_dead_stock_mort_jours": 180,
      "confiance_cross_sell_min": 0.3,
      "confiance_cross_sell_forte": 0.5,
      "complementarite_lot_min": 0.4,
      "remise_lot_default_pct": 12,
      "remise_promo_min_pct": 5,
      "remise_promo_max_pct": 25,
      "coefficient_saison_pic_min": 1.2,
      "coefficient_saison_creux_max": 0.8
    },
    "saisonnalite": {
      "Karite": {
        "pic": [
          11,
          12,
          1
        ],
        "creux": [
          5,
          6,
          7
        ],
        "rationale": "Recolte mai-juillet, transformation aout-octobre, pic vente fetes fin d'annee (Noel, Nouvel An)"
      },
      "Miel": {
        "pic": [
          11,
          12
        ],
        "creux": [
          3,
          4
        ],
        "rationale": "Recolte octobre-novembre, pic consommation fetes fin d'annee"
      },
      "Coton": {
        "pic": [
          12,
          1,
          9
        ],
        "creux": [
          5,
          6
        ],
        "rationale": "Rentree scolaire (sept), fetes fin d'annee, harmattan (vêtements chauds)"
      },
      "Sesame": {
        "pic": [
          10,
          11
        ],
        "creux": [
          4,
          5
        ],
        "rationale": "Recolte septembre-octobre, pic exportation et consommation locale"
      },
      "Artisanat": {
        "pic": [
          12,
          4,
          8
        ],
        "creux": [
          2,
          6
        ],
        "rationale": "Noel (dec), fete des meres (mai-juin variable), rentree (sept), Ramadan variable"
      }
    },
    "bcg_matrix_rules": {
      "etoile": "croissance > 10% ET part > 15% : investir pour conquerir le marche",
      "vache_lait": "croissance < 10% ET part > 15% : rentabiliser, financer les etoiles",
      "dilemme": "croissance > 10% ET part < 15% : investir selectivement ou abandonner",
      "poids_mort": "croissance < 10% ET part < 15% : desinvestir progressivement"
    },
    "abc_classification_rules": {
      "classe_A": "20% des produits generant 80% du CA - surveillance stricte, inventaire mensuel, stock securite x2",
      "classe_B": "30% des produits generant 15% du CA - surveillance normale, inventaire trimestriel",
      "classe_C": "50% des produits generant 5% du CA - surveillance leger, envisager abandon si non strategique"
    },
    "regions_bf": [
      "Hauts-Bassins",
      "Boucle du Mouhoun",
      "Cascade",
      "Centre",
      "Centre-Est",
      "Centre-Nord",
      "Centre-Ouest",
      "Centre-Sud",
      "Est",
      "Nord",
      "Plateau-Central",
      "Sahel",
      "Sud-Ouest"
    ],
    "villes_principales": [
      "Ouagadougou",
      "Bobo-Dioulasso",
      "Koudougou",
      "Ouahigouya",
      "Banfora",
      "Tenkodogo",
      "Leo",
      "Dori"
    ],
    "tva": {
      "taux_normal": 0.18,
      "regime_franchise_ca_max": 50000000,
      "produits_exoneres": [
        "Riz local",
        "Mil",
        "Mais local",
        "Sorgho"
      ],
      "mention_franchise": "TVA non applicable, art. 305 CGI BF"
    },
    "delais_paiement_standards": {
      "comptant": 0,
      "court_terme": 7,
      "standard": 30,
      "long_terme": 60,
      "administration_bf": 90
    },
    "messages_templates": {
      "confirmation_commande": "Bonjour {client},\n\nNous confirmons la reception de votre commande {commande_id} d'un montant de {montant} FCFA. Elle sera preparee et expediee sous 48h.\n\nVous recevrez une notification a chaque etape (preparation, expedition, livraison).\n\nMerci de votre confiance,\n{vendeur}\n{boutique_url}",
      "relance_paiement": "Bonjour {client},\n\nNous vous rappelons que le paiement de {montant} FCFA pour la commande {commande_id} est attendu depuis {delai} jours. Merci de regulariser sous 7 jours.\n\nEn cas de difficulte, contactez-nous pour trouver un arrangement.\n\nCordialement,\n{vendeur}",
      "remerciement_avis": "Bonjour {client},\n\nMerci pour votre achat ! Nous esperons que {produit} vous donne entiere satisfaction. Pourriez-vous laisser un avis sur notre boutique ? Cela nous aide enormement et guide les autres acheteurs.\n\nLien avis: {avis_url}\n\n{vendeur}",
      "annonce_promotion": "Bonjour {client},\n\nBonne nouvelle ! Jusqu'au {date_fin}, profitez de {remise}% sur {produit}. Stock limite, depchez-vous !\n\nVoir l'offre: {offre_url}\n\n{vendeur}",
      "reponse_info": "Bonjour {client},\n\nMerci pour votre interest pour {produit}. Voici les informations demandees:\n\n- Prix: {prix} FCFA\n- Disponibilite: {stock} en stock\n- Delai livraison: {delai_livraison}\n- Conditions: {conditions}\n\nN'hesitez pas si vous avez d'autres questions.\n\nCordialement,\n{vendeur}",
      "livraison_confirmee": "Bonjour {client},\n\nVotre commande {commande_id} a ete expediee et sera livree le {date_livraison}.\n\nTransporteur: {transporteur}\nReference suivi: {suivi}\n\nMerci de votre confiance,\n{vendeur}",
      "rupture_stock": "Bonjour {client},\n\nNous vous informons que {produit} est actuellement en rupture de stock. Le reapprovisionnement est prevu pour le {date_reappro}.\n\nSouhaitez-vous etre prevenu(e) a la disponibilite ? Repondez OUI.\n\n{vendeur}"
    },
    "variables_templates": [
      "{client}",
      "{produit}",
      "{montant}",
      "{commande_id}",
      "{vendeur}",
      "{delai}",
      "{boutique_url}",
      "{avis_url}",
      "{offre_url}",
      "{date_fin}",
      "{remise}",
      "{prix}",
      "{stock}",
      "{delai_livraison}",
      "{conditions}",
      "{date_livraison}",
      "{transporteur}",
      "{suivi}",
      "{date_reappro}"
    ],
    "coefficient_saisonnier": {
      "1": 1.15,
      "2": 0.85,
      "3": 0.9,
      "4": 0.95,
      "5": 0.8,
      "6": 0.75,
      "7": 0.85,
      "8": 1.05,
      "9": 1.2,
      "10": 1.25,
      "11": 1.3,
      "12": 1.35
    },
    "couleurs_alertes": {
      "rouge": "#dc3545",
      "orange": "#fd7e14",
      "jaune": "#ffc107",
      "vert": "#28a745",
      "bleu": "#007bff",
      "violet": "#6f42c1"
    },
    "heurures_optimales_relance": {
      "optimal": [
        {
          "jour": "vendredi",
          "debut": 14,
          "fin": 16
        }
      ],
      "bon": [
        {
          "jour": "mardi",
          "debut": 10,
          "fin": 12
        },
        {
          "jour": "jeudi",
          "debut": 16,
          "fin": 18
        }
      ],
      "eviter": [
        {
          "jour": "lundi",
          "debut": 8,
          "fin": 10
        },
        {
          "jour": "samedi",
          "debut": 0,
          "fin": 24
        },
        {
          "jour": "dimanche",
          "debut": 0,
          "fin": 24
        }
      ]
    },
    "bibliographie": [
      "Cooper, R., & Kaplan, R. S. (1988). Measure costs right: Make the right decisions. Harvard Business Review.",
      "Henderson, B. D. (1968). The Product Portfolio. Boston Consulting Group Perspectives.",
      "Sion, M. (2014). Analyse financiere : concepts et methodes. Editions Dunod.",
      "Pareto, V. (1906). Manuale di economia politica. Societa Editrice Libraria.",
      "Dickie, H. F. (1951). ABC Inventory Analysis Shoots for Dollars. Factory Management and Maintenance.",
      "Agrawal, R., & Srikant, R. (1994). Fast algorithms for mining association rules. VLDB.",
      "Goldberg, D., Nichols, D., Oki, B. M., & Terry, D. (1992). Using collaborative filtering to weave an information tapestry. Communications of the ACM.",
      "INSD (2024). Annuaire statistique du Burkina Faso.",
      "ONAC (2024). Donnees secteur artisanat BF.",
      "ABNORM (2024). Reglementation etiquetage et peremption produits BF."
    ]
  },
  "integration": {
    "dashboard_hook": "DashboardVendeur.render() doit appeler ExpertSystems.{module}.render(sellerData) pour chaque module",
    "data_dependencies": {
      "required": [
        "seller_id",
        "orders",
        "stock_items",
        "seller"
      ],
      "optional": [
        "events",
        "stock_overrides",
        "client_messages"
      ]
    },
    "rendering": {
      "container_id": "expert-modules-container",
      "tabs_enabled": true,
      "default_tab": "comptable",
      "lazy_load": true
    },
    "persistence": {
      "input_values_key": "expert_modules_inputs",
      "last_active_tab_key": "expert_modules_last_tab"
    }
  }
},
  form_schemas: {
  "schemas": {
    "login": {
      "fields": [
        {
          "id": "email",
          "type": "text",
          "label": "Email ou telephone",
          "required": true,
          "validation": "email_or_phone",
          "error_message": "Merci d'indiquer un email ou telephone valide"
        },
        {
          "id": "password",
          "type": "password",
          "label": "Mot de passe",
          "required": true,
          "min_length": 4,
          "error_message": "Mot de passe trop court"
        }
      ]
    },
    "register_acheteur": {
      "fields": [
        {
          "id": "nom",
          "type": "text",
          "label": "Nom complet",
          "required": true,
          "min_length": 2
        },
        {
          "id": "email",
          "type": "email",
          "label": "Email",
          "required": true
        },
        {
          "id": "telephone",
          "type": "tel",
          "label": "Telephone",
          "required": true,
          "pattern": "^[0-9\\s+]{8,}$"
        },
        {
          "id": "password",
          "type": "password",
          "label": "Mot de passe",
          "required": true,
          "min_length": 4
        },
        {
          "id": "ville",
          "type": "select",
          "label": "Ville",
          "required": true,
          "options_source": "regions.json"
        }
      ]
    },
    "register_vendeur": {
      "fields": [
        {
          "id": "nom",
          "type": "text",
          "label": "Nom ou nom de boutique",
          "required": true,
          "min_length": 2
        },
        {
          "id": "email",
          "type": "email",
          "label": "Email",
          "required": true
        },
        {
          "id": "telephone",
          "type": "tel",
          "label": "Telephone",
          "required": true
        },
        {
          "id": "password",
          "type": "password",
          "label": "Mot de passe",
          "required": true,
          "min_length": 4
        },
        {
          "id": "region",
          "type": "select",
          "label": "Region d'activite",
          "required": true,
          "options_source": "regions.json"
        },
        {
          "id": "type_vendeur",
          "type": "select",
          "label": "Type de vendeur",
          "required": true,
          "options": [
            "Cooperative",
            "Artisan individuel",
            "Producteur agricole",
            "Revendeur boutique"
          ]
        },
        {
          "id": "categories",
          "type": "multi_select",
          "label": "Categories de produits",
          "options_source": "categories.json"
        }
      ]
    },
    "contact_vendeur": {
      "fields": [
        {
          "id": "nom",
          "type": "text",
          "label": "Nom complet",
          "required": true,
          "min_length": 2
        },
        {
          "id": "contact_info",
          "type": "text",
          "label": "Telephone ou email",
          "required": true,
          "validation": "email_or_phone"
        },
        {
          "id": "produit",
          "type": "select",
          "label": "Produit concerne",
          "required": true,
          "options_source": "products.json"
        },
        {
          "id": "message",
          "type": "textarea",
          "label": "Votre message",
          "required": true,
          "min_length": 10
        }
      ]
    },
    "checkout": {
      "fields": [
        {
          "id": "buyer_name",
          "type": "text",
          "label": "Nom complet",
          "required": true
        },
        {
          "id": "buyer_phone",
          "type": "tel",
          "label": "Telephone",
          "required": true
        },
        {
          "id": "buyer_address",
          "type": "textarea",
          "label": "Adresse de livraison",
          "required": true
        },
        {
          "id": "buyer_city",
          "type": "select",
          "label": "Ville",
          "required": true,
          "options_source": "regions.json villes"
        }
      ]
    }
  }
},
  loops_checklist: {
  "meta": {
    "version": "2.0",
    "description": "Checklist detaillee pour chaque loop de conception"
  },
  "loops": [
    {
      "loop_id": "L0",
      "name": "Initialisation",
      "status": "completed",
      "items_checked": [
        "Code source analyse",
        "Objectifs definis",
        "Structure creee"
      ],
      "checker": "chef_testeur",
      "check_result": "CHECK OK"
    },
    {
      "loop_id": "L1",
      "name": "Recherche",
      "status": "completed",
      "items_checked": [
        "Donnees Burkina collectees",
        "Cooperatives identifiees",
        "Certifications documentees",
        "Images sources identifiees",
        "Loop Engineering compris"
      ],
      "checker": "architecte_projet",
      "check_result": "CHECK OK"
    },
    {
      "loop_id": "L2",
      "name": "Design System",
      "status": "completed",
      "items_checked": [
        "Palette complete",
        "Typographie",
        "Spacing",
        "Icons",
        "Composants",
        "Dark mode"
      ],
      "checker": "testeur_design",
      "check_result": "CHECK OK"
    },
    {
      "loop_id": "L3",
      "name": "Wireframes & Logic",
      "status": "completed",
      "items_checked": [
        "11 pages wireframed",
        "YAML logic",
        "User flows",
        "Personas"
      ],
      "checker": "testeur_ux",
      "check_result": "CHECK OK"
    },
    {
      "loop_id": "L4",
      "name": "Data Architecture",
      "status": "completed",
      "items_checked": [
        "Products JSON",
        "Sellers JSON",
        "Categories",
        "Certifications",
        "Regions",
        "Beta accounts",
        "Trust badges",
        "Search config",
        "Cart rules",
        "Reseller rules",
        "Form schemas"
      ],
      "checker": "testeur_data",
      "check_result": "CHECK OK"
    },
    {
      "loop_id": "L5",
      "name": "Code HTML",
      "status": "pending",
      "items_checked": [],
      "checker": "testeur_html",
      "check_result": "PENDING"
    },
    {
      "loop_id": "L6",
      "name": "Code CSS",
      "status": "pending",
      "items_checked": [],
      "checker": "testeur_css",
      "check_result": "PENDING"
    },
    {
      "loop_id": "L7",
      "name": "Code JavaScript",
      "status": "pending",
      "items_checked": [],
      "checker": "testeur_js",
      "check_result": "PENDING"
    },
    {
      "loop_id": "L8",
      "name": "Integration & Anti-IA",
      "status": "pending",
      "items_checked": [],
      "checker": "chef_testeur",
      "check_result": "PENDING"
    },
    {
      "loop_id": "L9",
      "name": "Chrome DevTools Simulation",
      "status": "pending",
      "items_checked": [],
      "checker": "chef_testeur",
      "check_result": "PENDING"
    },
    {
      "loop_id": "L10",
      "name": "Finalisation & Livraison",
      "status": "pending",
      "items_checked": [],
      "checker": "architecte_projet + chef_testeur",
      "check_result": "PENDING"
    }
  ]
},
  mcp_skills: {
  "meta": {
    "version": "2.0",
    "description": "Skills, competences et MCP servers utiles pour la conception et le developpement"
  },
  "skills_needed": [
    {
      "id": "SK01",
      "name": "HTML5 Semantique",
      "category": "frontend_structure",
      "description": "Structure HTML semantique W3C, ARIA labels, forms accessibles"
    },
    {
      "id": "SK02",
      "name": "CSS3 Advanced",
      "category": "frontend_styling",
      "description": "Custom properties, Grid, Flexbox, responsive, dark mode, animations"
    },
    {
      "id": "SK03",
      "name": "JavaScript Vanilla ES6+",
      "category": "frontend_logic",
      "description": "DOM manipulation, events, localStorage, SPA routing, form validation"
    },
    {
      "id": "SK04",
      "name": "Data Modeling JSON",
      "category": "data",
      "description": "JSON schemas, CRUD localStorage, data seeding, reference integrity"
    },
    {
      "id": "SK05",
      "name": "UX Research & Design",
      "category": "design",
      "description": "Personas, user flows, wireframes, accessibility, WCAG"
    },
    {
      "id": "SK06",
      "name": "UI Design System",
      "category": "design",
      "description": "Color theory, typography, spacing, components, icons SVG"
    },
    {
      "id": "SK07",
      "name": "IxD Interaction Design",
      "category": "design",
      "description": "Feedback patterns, state management, error handling, animation"
    },
    {
      "id": "SK08",
      "name": "Chrome DevTools",
      "category": "testing",
      "description": "Console debugging, network analysis, device emulation, localStorage inspection"
    },
    {
      "id": "SK09",
      "name": "Anti-IA Style",
      "category": "quality",
      "description": "Comment audit, human text style, maintenance-friendly code"
    },
    {
      "id": "SK10",
      "name": "Loop Engineering",
      "category": "process",
      "description": "Iterative conception with checking and reflection cycles"
    }
  ],
  "mcp_servers_recommended": [
    {
      "name": "Chrome DevTools Protocol",
      "usage": "Testing site in headless Chrome, verifying console, layout, localStorage",
      "url": "https://chromedevtools.github.io/devtools-protocol/"
    },
    {
      "name": "W3C Validator API",
      "usage": "Validating HTML structure",
      "url": "https://validator.w3.org/"
    },
    {
      "name": "CSS Stats",
      "usage": "Analyzing CSS complexity and consistency",
      "url": "https://cssstats.com/"
    },
    {
      "name": "WebAIM Contrast Checker",
      "usage": "Verifying WCAG AA contrast ratios",
      "url": "https://webaim.org/resources/contrastchecker/"
    },
    {
      "name": "axe-core",
      "usage": "Accessibility testing library",
      "url": "https://github.com/dequelabs/axe-core"
    },
    {
      "name": "Lighthouse",
      "usage": "Performance, accessibility, best practices audit",
      "url": "https://developers.google.com/web/tools/lighthouse"
    }
  ],
  "tools_for_images": [
    {
      "name": "Unsplash",
      "usage": "Free high-quality photos of products",
      "url": "https://unsplash.com/"
    },
    {
      "name": "Wikimedia Commons",
      "usage": "Free real photos with context",
      "url": "https://commons.wikimedia.org/"
    },
    {
      "name": "SVG Optimization (SVGO)",
      "usage": "Optimizing SVG icons for web",
      "url": "https://github.com/svg/svgo"
    },
    {
      "name": "RealFaviconGenerator",
      "usage": "Generating favicon from SVG",
      "url": "https://realfavicongenerator.net/"
    },
    {
      "name": "Squoosh",
      "usage": "Image compression and format conversion",
      "url": "https://squoosh.app/"
    }
  ]
},
  personas: {
  "personas": [
    {
      "id": "P01",
      "name": "Amadou Diallo",
      "type": "acheteur",
      "age": 25,
      "location": "Ouagadougou, Centre",
      "device": "Smartphone Android milieu de gamme",
      "literacy": "Moyenne -- WhatsApp, Facebook quotidien",
      "goals": "Trouver des produits locaux de qualite pour sa famille",
      "frustrations": [
        "Pas habitue aux plateformes e-commerce",
        "Craint les arnaques",
        "Veut voir des vraies photos"
      ],
      "key_path": "Homepage -> Recherche -> Detail -> Panier -> Checkout",
      "needs": "Navigation simple, photos reelles, confiance visible"
    },
    {
      "id": "P02",
      "name": "Fatimata Ouedraogo",
      "type": "vendeur",
      "age": 35,
      "location": "Leo, Sud-Ouest",
      "device": "Smartphone basique",
      "literacy": "Basique -- WhatsApp pour cooperative",
      "goals": "Vendre produits karite, gerer commandes",
      "frustrations": [
        "Pas habituee aux dashboards",
        "Clics complexes"
      ],
      "key_path": "Connexion -> Dashboard -> Commandes -> Accepter/Refuser",
      "needs": "Dashboard simple, actions rapide 1 clic"
    },
    {
      "id": "P03",
      "name": "Ibrahim Kabore",
      "type": "revendeur",
      "age": 40,
      "location": "Ouagadougou, Centre",
      "device": "Ordinateur + smartphone",
      "literacy": "Bonne -- WhatsApp Business catalogue",
      "goals": "Acheter lots pour boutique, optimiser prix",
      "frustrations": [
        "Besoin voir remises clairement",
        "Calculer benefices"
      ],
      "key_path": "Connexion -> Catalogue bulk -> Calculer -> Checkout lot",
      "needs": "Prix bulk visible, calculateur economie"
    }
  ]
},
  products: [
  {
    "id": "PRD001",
    "nom": "Beurre de karité brut 250g",
    "categorie": "Karite",
    "prix": 1500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Beurre de karité 100% naturel et non raffiné, pressé à froid par la Coopérative Femmes de Léo dans la région du Sud-Ouest du Burkina Faso. Les noix de karité sont récoltées dans les parcs agroforestiers autour de Léo par plus de 200 femmes membres, puis transformées selon un savoir-faire ancestral transmis sur trois générations. Ce beurre brut conserve l'intégralité de ses vitamines A, E et F, idéales pour nourrir, protéger et réparer la peau sèche, les cheveux crépus et les lèvres gercées. Certifié BioSPG, il convient également à un usage culinaire traditionnel.",
    "description_courte": "Beurre brut 250g pressé à froid, non raffiné",
    "vendeur_id": "SEL001",
    "region": "Sud-Ouest",
    "ville": "Leo",
    "origine_cooperative": "Coopérative Femmes de Léo",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 150,
    "unite_quantite": "pièce",
    "date_production": "2025-03-15",
    "date_peremption": "2027-03-15",
    "conditions_stockage": "Lieu sec et frais, à l'abri de la lumière directe",
    "processus_fabrication": "Récolte des noix → ébullition → extraction des amandes → torréfaction → broyage → pressage à froid → filtrage → conditionnement",
    "poids_unitaire": "250g",
    "en_stock": true,
    "stock_alerte": 20,
    "reviews_count": 23,
    "average_rating": 4.6,
    "tags": [
      "naturel",
      "cosmetique",
      "bio",
      "femme",
      "hydratant"
    ]
  },
  {
    "id": "PRD002",
    "nom": "Beurre de karité brut 500g",
    "categorie": "Karite",
    "prix": 2500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Format familial 500g du beurre de karité brut pressé à froid par la Coopérative Femmes de Léo. Idéal pour les familles et les petits revendeurs, ce conditionnement permet de profiter du beurre naturel pour le soin du corps, des cheveux et la cuisine traditionnelle burkinabè. Récolté et transformé dans le respect des méthodes ancestrales au cœur du Sud-Ouest, ce beurre est certifié BioSPG, garantissant une production biologique sans additifs ni conservateurs chimiques. Sa texture onctueuse et son parfum de noisette caractéristique en font un produit authentique.",
    "description_courte": "Beurre brut 500g, format familial",
    "vendeur_id": "SEL001",
    "region": "Sud-Ouest",
    "ville": "Leo",
    "origine_cooperative": "Coopérative Femmes de Léo",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 90,
    "unite_quantite": "pièce",
    "date_production": "2025-04-10",
    "date_peremption": "2027-04-10",
    "conditions_stockage": "Lieu sec et frais, à l'abri de la lumière directe",
    "processus_fabrication": "Récolte des noix → ébullition → extraction → torréfaction → broyage → pressage à froid → filtrage → conditionnement 500g",
    "poids_unitaire": "500g",
    "en_stock": true,
    "stock_alerte": 15,
    "reviews_count": 31,
    "average_rating": 4.7,
    "tags": [
      "naturel",
      "cosmetique",
      "bio",
      "familial",
      "hydratant"
    ]
  },
  {
    "id": "PRD003",
    "nom": "Beurre de karité raffiné 1kg",
    "categorie": "Karite",
    "prix": 4500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Beurre de karité raffiné conditionné en pot d'un kilogramme, produit par la Coopérative Femmes de Léo. Le raffinage élimine l'odeur naturelle du karité tout en conservant ses propriétés émollientes, ce qui le rend particulièrement adapté à la fabrication cosmétique industrielle et artisanale. Conforme à la norme burkinabè NM 03.01.006 de l'ABNORM, ce beurre blanc neutre est prisé par les formulateurs de crèmes, savons et baumes. La coopérative maîtrise l'ensemble de la chaîne, de la noix récoltée en brousse au produit fini certifié.",
    "description_courte": "Beurre raffiné 1kg, norme ABNORM",
    "vendeur_id": "SEL001",
    "region": "Sud-Ouest",
    "ville": "Leo",
    "origine_cooperative": "Coopérative Femmes de Léo",
    "certification": [
      "ABNORM",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 60,
    "unite_quantite": "pièce",
    "date_production": "2025-02-20",
    "date_peremption": "2027-02-20",
    "conditions_stockage": "Lieu sec et frais, à l'abri de la lumière, température < 25°C",
    "processus_fabrication": "Beurre brut → désodorisation à la vapeur → filtrage → blanchiment argileux → contrôle qualité ABNORM → conditionnement 1kg",
    "poids_unitaire": "1kg",
    "en_stock": true,
    "stock_alerte": 10,
    "reviews_count": 17,
    "average_rating": 4.4,
    "tags": [
      "raffine",
      "cosmetique",
      "norme",
      "industriel",
      "blanc"
    ]
  },
  {
    "id": "PRD004",
    "nom": "Amandes de karité décortiquées 1kg",
    "categorie": "Karite",
    "prix": 2000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Amandes de karité décortiquées et triées, conditionnées en sac d'un kilogramme par la Coopérative Femmes de Léo. Ces amandes proviennent des noix de karité récoltées dans les parcs du Sud-Ouest, débarrassées de leur pulpe puis décortiquées manuellement par les femmes. Elles constituent la matière première de base pour la production de beurre de karité artisanal ou industriel. Riches en matières grasses (45 à 55%), elles sont également utilisées en torréfaction pour des préparations culinaires locales.",
    "description_courte": "Amandes décortiquées 1kg, matière première beurre",
    "vendeur_id": "SEL001",
    "region": "Sud-Ouest",
    "ville": "Leo",
    "origine_cooperative": "Coopérative Femmes de Léo",
    "certification": [
      "BioSPG"
    ],
    "made_in_bf": true,
    "quantite_disponible": 120,
    "unite_quantite": "pièce",
    "date_production": "2025-05-05",
    "date_peremption": "2026-05-05",
    "conditions_stockage": "Sac fermé en lieu sec et aéré, à l'abri de l'humidité",
    "processus_fabrication": "Récolte des noix → dépulpage → séchage → décorticage manuel → triage → conditionnement sac 1kg",
    "poids_unitaire": "1kg",
    "en_stock": true,
    "stock_alerte": 25,
    "reviews_count": 9,
    "average_rating": 4.3,
    "tags": [
      "amandes",
      "matiere-premiere",
      "bio",
      "karite"
    ]
  },
  {
    "id": "PRD005",
    "nom": "Pâte de karité crue 500g",
    "categorie": "Karite",
    "prix": 2200,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Pâte de karité crue non filtrée, obtenue après broyage des amandes torréfiées et avant l'étape de pressage. Conditionnée en pot de 500g par la Coopérative Femmes de Léo, cette pâte concentrée conserve toutes les fractions insaponifiables du karité, réputées pour leurs vertus cicatrisantes et anti-inflammatoires. Traditionnellement utilisée en masque capillaire et en soin des peaux à problèmes, elle offre une alternative rustique au beurre raffiné. Sa couleur ivoire marbrée et son parfum toasté authentique témoignent d'une transformation minimale.",
    "description_courte": "Pâte crue 500g, riche en insaponifiables",
    "vendeur_id": "SEL001",
    "region": "Sud-Ouest",
    "ville": "Leo",
    "origine_cooperative": "Coopérative Femmes de Léo",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 70,
    "unite_quantite": "pièce",
    "date_production": "2025-03-28",
    "date_peremption": "2026-09-28",
    "conditions_stockage": "Pot hermétique au frais, à consommer dans les 6 mois",
    "processus_fabrication": "Amandes torréfiées → broyage meule de pierre → malaxage → pâte crue non filtrée → conditionnement",
    "poids_unitaire": "500g",
    "en_stock": true,
    "stock_alerte": 12,
    "reviews_count": 14,
    "average_rating": 4.5,
    "tags": [
      "pate",
      "crue",
      "cosmetique",
      "cicatrisant",
      "bio"
    ]
  },
  {
    "id": "PRD006",
    "nom": "Savon noir au karité 150g",
    "categorie": "Karite",
    "prix": 800,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Savon noir africain traditionnel enrichi au beurre de karité brut, fabriqué à la main par l'Atelier Sougrinooma à Ouagadougou. Ce savon doux, à base de cendres de cosses de cacao et de karité, nettoie en profondeur sans dessécher la peau. Sa couleur brune naturelle et sa texture légèrement granuleuse sont caractéristiques du savon noir beldi. Recommandé pour le visage, le corps et même comme shampoing doux, il convient à tous types de peaux, y compris sensibles. Saponification à froid sans détergents chimiques.",
    "description_courte": "Savon noir beldi karité 150g",
    "vendeur_id": "SEL002",
    "region": "Centre",
    "ville": "Ouagadougou",
    "origine_cooperative": "Atelier Sougrinooma",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 200,
    "unite_quantite": "pièce",
    "date_production": "2025-06-01",
    "date_peremption": "2027-06-01",
    "conditions_stockage": "Endroit sec et ventilé, à l'abri de l'humidité",
    "processus_fabrication": "Cendres végétales → lessive de potasse → mélange beurre de karité → cuisson → séchage 3 semaines → façonnage → emballage",
    "poids_unitaire": "150g",
    "en_stock": true,
    "stock_alerte": 30,
    "reviews_count": 28,
    "average_rating": 4.4,
    "tags": [
      "savon",
      "noir",
      "naturel",
      "visage",
      "corps"
    ]
  },
  {
    "id": "PRD007",
    "nom": "Savon karité et miel 120g",
    "categorie": "Karite",
    "prix": 1200,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Savon artisanal surgras à froid enrichi au beurre de karité et au miel local de Diébougou, fabriqué par l'Atelier Sougrinooma à Ouagadougou. Le miel apporte ses propriétés antibactériennes et humectantes tandis que le karité nourrit intensément la peau. Ce savon doux, sans huile de palme ni parfum synthétique, dégage un léger parfum de miel et de cire. Idéal pour le visage et les peaux sensibles, il mousse onctueusement et laisse la peau souple et hydratée. Chaque pain est coulé et découpé à la main.",
    "description_courte": "Savon surgras karité et miel 120g",
    "vendeur_id": "SEL002",
    "region": "Centre",
    "ville": "Ouagadougou",
    "origine_cooperative": "Atelier Sougrinooma",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 180,
    "unite_quantite": "pièce",
    "date_production": "2025-05-18",
    "date_peremption": "2027-05-18",
    "conditions_stockage": "Endroit sec à température ambiante, savon draîné entre 2 usages",
    "processus_fabrication": "Saponification à froid → ajout beurre karité + miel → coulée en moules → cure 4 semaines → découpe → estampillage",
    "poids_unitaire": "120g",
    "en_stock": true,
    "stock_alerte": 25,
    "reviews_count": 19,
    "average_rating": 4.6,
    "tags": [
      "savon",
      "karite",
      "miel",
      "artisanal",
      "surgras",
      "visage"
    ]
  },
  {
    "id": "PRD008",
    "nom": "Crème hydratante au karité 200ml",
    "categorie": "Karite",
    "prix": 3500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Crème corporelle hydratante formulée à partir de beurre de karité brut et d'huile de sésame, développée par l'Atelier Sougrinooma. Le beurre de karité utilisé provient de la zone de Banfora dans la région des Cascades, réputée pour la qualité de ses parcs à karité. Cette crème légère pénètre rapidement sans effet gras, nourrit les peaux sèches et restaure la barrière cutanée. Parfumée à l'huile essentielle de citronnelle locale, elle convient au visage et au corps. Pot de 200ml refermable fabriqué à Ouagadougou.",
    "description_courte": "Crème hydratante karité 200ml citronnelle",
    "vendeur_id": "SEL002",
    "region": "Cascade",
    "ville": "Banfora",
    "origine_cooperative": "Atelier Sougrinooma (sourcing Cascades)",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 95,
    "unite_quantite": "pièce",
    "date_production": "2025-04-22",
    "date_peremption": "2027-04-22",
    "conditions_stockage": "Pot fermé à température ambiante, à l'abri de la chaleur",
    "processus_fabrication": "Émulsion eau/huile → incorporation beurre karité de Banfora → huile sésame → citronnelle → mise en pot 200ml",
    "poids_unitaire": "200ml",
    "en_stock": true,
    "stock_alerte": 15,
    "reviews_count": 22,
    "average_rating": 4.5,
    "tags": [
      "creme",
      "hydratante",
      "karite",
      "corps",
      "citronnelle"
    ]
  },
  {
    "id": "PRD009",
    "nom": "Baume à lèvres au karité 15ml",
    "categorie": "Karite",
    "prix": 1000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Baume à lèvres nourrissant à base de beurre de karité brut, de cire d'abeille locale et d'huile de sésame, confectionné par l'Atelier Sougrinooma à Ouagadougou. Sa formule 100% naturelle répare les lèvres gercées et les protège du soleil et du harmattan sec. Le baume fond délicatement au contact des lèvres sans laisser de film gras. Présenté en tube refermable de 15ml, il se glisse facilement en poche. Fabriqué en petites séries pour garantir la fraîcheur des matières premières biologiques.",
    "description_courte": "Baume lèvres karité et cire 15ml",
    "vendeur_id": "SEL002",
    "region": "Centre",
    "ville": "Ouagadougou",
    "origine_cooperative": "Atelier Sougrinooma",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 250,
    "unite_quantite": "pièce",
    "date_production": "2025-06-12",
    "date_peremption": "2027-06-12",
    "conditions_stockage": "Tube fermé, à l'abri de la chaleur excessive",
    "processus_fabrication": "Fusion cire d'abeille → incorporation beurre karité + huile sésame → coulée en tubes 15ml → refroidissement",
    "poids_unitaire": "15ml",
    "en_stock": true,
    "stock_alerte": 40,
    "reviews_count": 16,
    "average_rating": 4.5,
    "tags": [
      "baume",
      "levres",
      "karite",
      "cire",
      "naturel"
    ]
  },
  {
    "id": "PRD010",
    "nom": "Beurre de karité parfumé 250g",
    "categorie": "Karite",
    "prix": 2000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Beurre de karité brut parfumé à l'huile essentielle naturelle de frangipanier et d'hibiscus, fouetté par l'Atelier Sougrinooma à Ouagadougou. Fouetté à la main, ce beurre prend une texture aérienne et fondante qui pénètre rapidement la peau sans laisser d'effet gras. Le parfum floral délicat provient d'huiles essentielles distillées au Burkina. Pot de 250g idéal pour le soin quotidien du corps et des cheveux. Conservation des propriétés hydratantes originelles du karité brut de Léo.",
    "description_courte": "Beurre fouetté parfumé 250g frangipanier",
    "vendeur_id": "SEL002",
    "region": "Centre",
    "ville": "Ouagadougou",
    "origine_cooperative": "Atelier Sougrinooma",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 110,
    "unite_quantite": "pièce",
    "date_production": "2025-05-30",
    "date_peremption": "2027-05-30",
    "conditions_stockage": "Pot fermé au frais, à l'abri de la lumière",
    "processus_fabrication": "Beurre brut de Léo → fouettage → incorporation HE frangipanier/hibiscus → mise en pot 250g",
    "poids_unitaire": "250g",
    "en_stock": true,
    "stock_alerte": 18,
    "reviews_count": 21,
    "average_rating": 4.7,
    "tags": [
      "beurre",
      "parfume",
      "fouetté",
      "cosmetique",
      "floral"
    ]
  },
  {
    "id": "PRD011",
    "nom": "Lait corporel au karité 300ml",
    "categorie": "Karite",
    "prix": 4000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Lait corporel hydratant à base de beurre de karité et de lait de coco, formulé par l'Atelier Sougrinooma. Sa texture fluide et non grasse s'applique facilement sur tout le corps, pénètre rapidement et laisse la peau souple toute la journée. Enrichi en vitamine E naturelle issue du karité brut, il convient aux peaux normales à sèches. Flacon pompe de 300ml pratique pour la famille. Parfum discret à la vanille de Madagascar. Fabriqué à Ouagadougou sans parabène ni silicone.",
    "description_courte": "Lait corporel karité vanille 300ml",
    "vendeur_id": "SEL002",
    "region": "Centre",
    "ville": "Ouagadougou",
    "origine_cooperative": "Atelier Sougrinooma",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 80,
    "unite_quantite": "pièce",
    "date_production": "2025-04-08",
    "date_peremption": "2027-04-08",
    "conditions_stockage": "Flacon fermé à température ambiante, à l'abri du soleil",
    "processus_fabrication": "Émulsion fluide → beurre karité fondu → lait coco → vitamine E → parfum vanille → flacon pompe 300ml",
    "poids_unitaire": "300ml",
    "en_stock": true,
    "stock_alerte": 15,
    "reviews_count": 13,
    "average_rating": 4.3,
    "tags": [
      "lait",
      "corporel",
      "karite",
      "hydratant",
      "vanille"
    ]
  },
  {
    "id": "PRD012",
    "nom": "Masque visage karité et argile 100g",
    "categorie": "Karite",
    "prix": 2500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Masque visage purifiant combinant beurre de karité, argile verte de Tenkodogo et poudre de feuilles de neem, élaboré par l'Atelier Sougrinooma. L'argile verte extraite dans la région du Centre-Est absorbe l'excès de sébum et purifie les pores, tandis que le karité évite le dessèchement et le neem apporte son action antibactérienne reconnue. Ce masque équilibrant convient aux peaux mixtes à grasses et aux peaux acnéiques. Pot de 100g pour environ 10 applications. Prêt à l'emploi, à appliquer 10 minutes une à deux fois par semaine.",
    "description_courte": "Masque argile et karité 100g Centre-Est",
    "vendeur_id": "SEL002",
    "region": "Centre-Est",
    "ville": "Tenkodogo",
    "origine_cooperative": "Atelier Sougrinooma (sourcing Centre-Est)",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 65,
    "unite_quantite": "pièce",
    "date_production": "2025-05-09",
    "date_peremption": "2027-05-09",
    "conditions_stockage": "Pot fermé au sec, à l'abri de l'humidité",
    "processus_fabrication": "Argile verte de Tenkodogo → beurre karité → poudre neem → malaxage → pot 100g",
    "poids_unitaire": "100g",
    "en_stock": true,
    "stock_alerte": 12,
    "reviews_count": 11,
    "average_rating": 4.4,
    "tags": [
      "masque",
      "visage",
      "argile",
      "karite",
      "purifiant"
    ]
  },
  {
    "id": "PRD013",
    "nom": "Graines de sésame doré 1kg",
    "categorie": "Sesame",
    "prix": 1800,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Graines de sésame doré cultivées par la Ferme Wend-Kuni dans la Boucle du Mouhoun, première région sésamière du Burkina Faso. Récoltées à maturité, séchées et vannées manuellement, ces graines sont triées pour garantir une pureté supérieure à 99%. Le sésame burkinabè, réputé pour son taux d'huile élevé et son goût de noisette prononcé, est exporté vers l'Europe et le Japon. Idéal pour la pâtisserie, la cuisine salée, la fabrication de tahini ou la pression artisanale d'huile. Sac kraft refermable d'un kilogramme.",
    "description_courte": "Sésame doré trié 1kg Boucle du Mouhoun",
    "vendeur_id": "SEL003",
    "region": "Boucle du Mouhoun",
    "ville": "Dedougou",
    "origine_cooperative": "Ferme Wend-Kuni",
    "certification": [
      "BioSPG",
      "ABNORM"
    ],
    "made_in_bf": true,
    "quantite_disponible": 200,
    "unite_quantite": "pièce",
    "date_production": "2025-01-20",
    "date_peremption": "2026-07-20",
    "conditions_stockage": "Sac refermé en lieu sec et frais, à l'abri des rongeurs",
    "processus_fabrication": "Semis → culture pluviale → récolte manuelle → séchage → battage → vannage → triage → conditionnement 1kg",
    "poids_unitaire": "1kg",
    "en_stock": true,
    "stock_alerte": 30,
    "reviews_count": 34,
    "average_rating": 4.7,
    "tags": [
      "graines",
      "sesame",
      "dore",
      "bio",
      "cuisine"
    ]
  },
  {
    "id": "PRD014",
    "nom": "Graines de sésame blanc décortiqué 500g",
    "categorie": "Sesame",
    "prix": 2200,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Graines de sésame blanc décortiquées, produites par la Ferme Wend-Kuni dans la Boucle du Mouhoun. Le décorticage mécanique retire la fine enveloppe rougeâtre, rendant les graines plus digestes, plus claires et moins amères. Ces graines décortiquées sont prisées pour la préparation du tahini, des halwas et pour enrober pains et gâteaux. Leur taux d'huile supérieur à 50% en fait aussi une excellente matière première pour la pression d'huile douce. Sac refermable de 500g garantissant fraîcheur et pureté.",
    "description_courte": "Sésame blanc décortiqué 500g",
    "vendeur_id": "SEL003",
    "region": "Boucle du Mouhoun",
    "ville": "Dedougou",
    "origine_cooperative": "Ferme Wend-Kuni",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 140,
    "unite_quantite": "pièce",
    "date_production": "2025-02-15",
    "date_peremption": "2026-08-15",
    "conditions_stockage": "Sac refermé au sec, à l'abri de la lumière et de l'humidité",
    "processus_fabrication": "Graines brutes → trempage → décorticage mécanique → séchage → soufflage → triage → sac 500g",
    "poids_unitaire": "500g",
    "en_stock": true,
    "stock_alerte": 20,
    "reviews_count": 18,
    "average_rating": 4.5,
    "tags": [
      "graines",
      "sesame",
      "decortique",
      "blanc",
      "tahini"
    ]
  },
  {
    "id": "PRD015",
    "nom": "Sésame doré de Fada N'Gourma 1kg",
    "categorie": "Sesame",
    "prix": 1900,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Graines de sésame doré cultivées dans la région de l'Est autour de Fada N'Gourma, zone émergente de production sésamière du Burkina Faso. La Ferme Wend-Kuni y travaille avec un réseau de petits producteurs encadrés et formés aux bonnes pratiques agricoles. Le sésame de l'Est bénéficie de sols bien drainés et d'une pluviométrie favorable qui lui confèrent un grain régulier et une couleur dorée uniforme. Sac d'un kilogramme destiné à la cuisine, à la boulangerie et à l'export. Produit conforme au cahier des charges UEMOA.",
    "description_courte": "Sésame doré de Fada 1kg région Est",
    "vendeur_id": "SEL003",
    "region": "Est",
    "ville": "Fada N'Gourma",
    "origine_cooperative": "Ferme Wend-Kuni (réseau Est)",
    "certification": [
      "BioSPG"
    ],
    "made_in_bf": true,
    "quantite_disponible": 160,
    "unite_quantite": "pièce",
    "date_production": "2025-01-10",
    "date_peremption": "2026-07-10",
    "conditions_stockage": "Sac refermé au sec et frais",
    "processus_fabrication": "Semis → culture pluviale → récolte → séchage → battage → vannage → triage → sac 1kg",
    "poids_unitaire": "1kg",
    "en_stock": true,
    "stock_alerte": 25,
    "reviews_count": 12,
    "average_rating": 4.4,
    "tags": [
      "graines",
      "sesame",
      "dore",
      "est",
      "fada"
    ]
  },
  {
    "id": "PRD016",
    "nom": "Sésame de Tenkodogo 1kg",
    "categorie": "Sesame",
    "prix": 1850,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Graines de sésame produit dans la région du Centre-Est autour de Tenkodogo, zone traditionnelle de culture du sésame de Saison des pluies. La Ferme Wend-Kuni accompagne les producteurs locaux dans la maîtrise des itinéraires techniques et le respect des normes phytosanitaires. Ces graines, à la coque fine et au cœur tendre, sont particulièrement appréciées pour la préparation des soupes et sauces locales comme le ragoût de sésame bissap. Sac kraft d'un kilogramme avec traçabilité par lot.",
    "description_courte": "Sésame de Tenkodogo 1kg Centre-Est",
    "vendeur_id": "SEL003",
    "region": "Centre-Est",
    "ville": "Tenkodogo",
    "origine_cooperative": "Ferme Wend-Kuni (réseau Centre-Est)",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 130,
    "unite_quantite": "pièce",
    "date_production": "2025-01-25",
    "date_peremption": "2026-07-25",
    "conditions_stockage": "Sac refermé au sec",
    "processus_fabrication": "Semis → culture → récolte manuelle → séchage → battage → vannage → triage → sac 1kg",
    "poids_unitaire": "1kg",
    "en_stock": true,
    "stock_alerte": 22,
    "reviews_count": 8,
    "average_rating": 4.2,
    "tags": [
      "graines",
      "sesame",
      "centre-est",
      "tenkodogo",
      "cuisine"
    ]
  },
  {
    "id": "PRD017",
    "nom": "Huile de sésame pressée à froid 250ml",
    "categorie": "Sesame",
    "prix": 3500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Huile de sésame vierge pressée à froid par la Coopérative Wend-Kuni à Dédougou, à partir de graines dorées torréfiées. La pression mécanique à basse température préserve les acides gras essentiels, la vitamine E et le goût caractéristique de noisette grillée. Cette huile dorée au parfum prononcé est un condiment de choix pour assaisonner les salades, les légumes sautés et les sauces. Bouteille en verre sombre de 250ml protégeant l'huile de l'oxydation. Sans additifs ni solvants d'extraction.",
    "description_courte": "Huile sésame pressée à froid 250ml",
    "vendeur_id": "SEL004",
    "region": "Boucle du Mouhoun",
    "ville": "Dedougou",
    "origine_cooperative": "Coopérative Wend-Kuni",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 110,
    "unite_quantite": "pièce",
    "date_production": "2025-03-05",
    "date_peremption": "2026-09-05",
    "conditions_stockage": "Bouteille fermée au frais et à l'abri de la lumière",
    "processus_fabrication": "Graines dorées → torréfaction légère → pressage mécanique à froid → décantation → filtration → bouteille 250ml",
    "poids_unitaire": "250ml",
    "en_stock": true,
    "stock_alerte": 18,
    "reviews_count": 26,
    "average_rating": 4.8,
    "tags": [
      "huile",
      "sesame",
      "pressé-froid",
      "cuisine",
      "vierge"
    ]
  },
  {
    "id": "PRD018",
    "nom": "Huile de sésame pressée à froid 500ml",
    "categorie": "Sesame",
    "prix": 6000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Huile de sésame vierge pressée à froid en bouteille de 500ml, produite par la Coopérative Wend-Kuni à Dédougou. Format économique destiné aux familles et aux restaurants. La coopérative maîtrise toute la chaîne, de la collecte des graines auprès de ses 300 membres producteurs au conditionnement final. L'huile non raffinée conserve sa couleur ambrée, son arôme de sésame grillé et ses propriétés nutritionnelles. Idéale pour la finition des plats et les marinades, elle supporte mal les hautes températures.",
    "description_courte": "Huile sésame pressée à froid 500ml",
    "vendeur_id": "SEL004",
    "region": "Boucle du Mouhoun",
    "ville": "Dedougou",
    "origine_cooperative": "Coopérative Wend-Kuni",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 85,
    "unite_quantite": "pièce",
    "date_production": "2025-03-12",
    "date_peremption": "2026-09-12",
    "conditions_stockage": "Bouteille fermée au frais et à l'abri de la lumière",
    "processus_fabrication": "Graines → torréfaction → pressage à froid → décantation → filtration → bouteille 500ml",
    "poids_unitaire": "500ml",
    "en_stock": true,
    "stock_alerte": 15,
    "reviews_count": 20,
    "average_rating": 4.7,
    "tags": [
      "huile",
      "sesame",
      "pressé-froid",
      "familial",
      "cuisine"
    ]
  },
  {
    "id": "PRD019",
    "nom": "Pâte de sésame (tahini) 300g",
    "categorie": "Sesame",
    "prix": 3000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Pâte de sésame pure, dite tahini, obtenue par broyage fin de graines décortiquées torréfiées, fabriquée par la Coopérative Wend-Kuni. Sans additif ni émulsifiant, cette pâte onctueuse au goût de noisette se sépare naturellement en phase huileuse et phase solide, signe de pureté. Le tahini entre dans la préparation du houmous, du baba ganoush, des halwas et des pâtisseries orientales. Pot en verre de 300g à remuer avant usage. Broyage sur meule de pierre pour préserver les arômes.",
    "description_courte": "Tahini pur 300g sans additif",
    "vendeur_id": "SEL004",
    "region": "Boucle du Mouhoun",
    "ville": "Dedougou",
    "origine_cooperative": "Coopérative Wend-Kuni",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 95,
    "unite_quantite": "pièce",
    "date_production": "2025-04-01",
    "date_peremption": "2026-04-01",
    "conditions_stockage": "Pot fermé au frais, remuer avant usage, consommer sous 2 mois après ouverture",
    "processus_fabrication": "Graines décortiquées → torréfaction → broyage meule de pierre → pot 300g",
    "poids_unitaire": "300g",
    "en_stock": true,
    "stock_alerte": 14,
    "reviews_count": 15,
    "average_rating": 4.6,
    "tags": [
      "pate",
      "tahini",
      "sesame",
      "cuisine",
      "purer"
    ]
  },
  {
    "id": "PRD020",
    "nom": "Sésame grillé et salé sachet 200g",
    "categorie": "Sesame",
    "prix": 1200,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Graines de sésame doré grillées et légèrement salées, prêtes à déguster, conditionnées par la Coopérative Wend-Kuni. Ce sachet apéritif est idéal pour grignoter, saupoudrer les salades, les soupes ou les nouilles sautées. Le grillage maîtrisé révèle l'arôme de noisette du sésame de la Boucle du Mouhoun sans le brûler. Sachet kraft refermable de 200g avec fenêtre de visualisation. Sans huile de palme ni exhausteur de goût, uniquement graines de sésame et sel de mine de Taoudeni.",
    "description_courte": "Sésame grillé salé sachet 200g",
    "vendeur_id": "SEL004",
    "region": "Boucle du Mouhoun",
    "ville": "Dedougou",
    "origine_cooperative": "Coopérative Wend-Kuni",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 175,
    "unite_quantite": "pièce",
    "date_production": "2025-05-22",
    "date_peremption": "2025-11-22",
    "conditions_stockage": "Sachet refermé au sec, à l'abri de l'humidité",
    "processus_fabrication": "Graines → grillage platine → salage léger → refroidissement → sachet 200g",
    "poids_unitaire": "200g",
    "en_stock": true,
    "stock_alerte": 28,
    "reviews_count": 24,
    "average_rating": 4.5,
    "tags": [
      "sesame",
      "grille",
      "sale",
      "aperitif",
      "snack"
    ]
  },
  {
    "id": "PRD021",
    "nom": "Miel cru toutes fleurs 500g",
    "categorie": "Miel",
    "prix": 3500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Miel cru multiloral récolté par les Apiculteurs de Diébougou dans les forêts classées du Sud-Ouest du Burkina Faso. Ce miel ambré non chauffé conserve l'ensemble des enzymes, pollens et propriétés antibactériennes naturelles. Sa robe dorée et son parfum floral complexe reflètent la diversité de la flore sahélienne et soudanienne du Sud-Ouest. Pot en verre de 500g. La cristallisation naturelle est un gage d'authenticité et n'altère pas la qualité. Récolte traditionnelle en ruches kenyanes suspendues.",
    "description_courte": "Miel cru multiloral 500g Sud-Ouest",
    "vendeur_id": "SEL005",
    "region": "Sud-Ouest",
    "ville": "Diebougou",
    "origine_cooperative": "Apiculteurs de Diebougou",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 120,
    "unite_quantite": "pièce",
    "date_production": "2025-02-10",
    "date_peremption": "2027-02-10",
    "conditions_stockage": "Pot fermé à température ambiante, à l'abri de la lumière",
    "processus_fabrication": "Ruches kenyanes → récolte à froid → désoperculation → extraction centrifuge → décantation → mise en pot 500g",
    "poids_unitaire": "500g",
    "en_stock": true,
    "stock_alerte": 20,
    "reviews_count": 29,
    "average_rating": 4.8,
    "tags": [
      "miel",
      "cru",
      "multifloral",
      "bio",
      "sud-ouest"
    ]
  },
  {
    "id": "PRD022",
    "nom": "Miel cru toutes fleurs 1kg",
    "categorie": "Miel",
    "prix": 6500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Miel cru multiloral en pot familial d'un kilogramme, récolté par les Apiculteurs de Diébougou. Format économique pour les consommateurs réguliers et les transformateurs. Ce miel non pasteurisé, récolté dans les forêts du Sud-Ouest, présente une texture épaisse et un goût riche de fleurs sauvages. Utilisable en cuisine, en pâtisserie, en cosmétique maison ou comme édulcorant naturel. Pot en verre large pour faciliter la prise de miel à la cuillère.",
    "description_courte": "Miel cru multiloral 1kg familial",
    "vendeur_id": "SEL005",
    "region": "Sud-Ouest",
    "ville": "Diebougou",
    "origine_cooperative": "Apiculteurs de Diebougou",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 90,
    "unite_quantite": "pièce",
    "date_production": "2025-02-15",
    "date_peremption": "2027-02-15",
    "conditions_stockage": "Pot fermé à température ambiante, à l'abri de la lumière",
    "processus_fabrication": "Ruches kenyanes → récolte à froid → extraction → décantation → pot 1kg",
    "poids_unitaire": "1kg",
    "en_stock": true,
    "stock_alerte": 15,
    "reviews_count": 33,
    "average_rating": 4.7,
    "tags": [
      "miel",
      "cru",
      "multifloral",
      "familial",
      "bio"
    ]
  },
  {
    "id": "PRD023",
    "nom": "Miel monofloral de karité 350g",
    "categorie": "Miel",
    "prix": 4200,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Miel monofloral de fleurs de karité récolté par la Coopérative Femmes de Léo, dont les ruches kenyanes sont disposées au cœur des parcs à karité du Sud-Ouest pendant la floraison. Ce miel rare, à la robe claire et au parfum délicat de fleur de karité, est l'un des miels les plus prisés du Burkina. Sa texture fine et sa saveur douce et lactée en font un produit gastronomique recherché. Pot en verre de 350g. Récolte limitée et saisonnière, disponible selon la floraison annuelle du karité. La coopérative combine savoir-faire karité et apiculture depuis 2020.",
    "description_courte": "Miel monofloral karité 350g rare",
    "vendeur_id": "SEL001",
    "region": "Sud-Ouest",
    "ville": "Leo",
    "origine_cooperative": "Coopérative Femmes de Léo",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 55,
    "unite_quantite": "pièce",
    "date_production": "2025-03-20",
    "date_peremption": "2027-03-20",
    "conditions_stockage": "Pot fermé à température ambiante, à l'abri de la lumière",
    "processus_fabrication": "Ruches en parcs à karité → récolte post-floraison → extraction à froid → décantation → pot 350g",
    "poids_unitaire": "350g",
    "en_stock": true,
    "stock_alerte": 10,
    "reviews_count": 18,
    "average_rating": 4.9,
    "tags": [
      "miel",
      "monofloral",
      "karite",
      "rare",
      "gastronomie"
    ]
  },
  {
    "id": "PRD024",
    "nom": "Miel en rayon 400g",
    "categorie": "Miel",
    "prix": 5000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Miel en rayon de cire, vendu tel que récolté dans la ruche par les Apiculteurs de Diebougou. Le rayon de cire pur se déguste en croquant la cire avec le miel, ce qui permet de bénéficier des vertus de la propolis et de la cire elle-même. Produit brut non extrait, présenté en bloc de 400g dans un barquet alimentaire. Spécialité d'apiculture traditionnelle très appréciée des connaisseurs et des pâtissiers pour la décoration. Cire comestible de couleur jaune pâle.",
    "description_courte": "Miel en rayon de cire 400g brut",
    "vendeur_id": "SEL005",
    "region": "Sud-Ouest",
    "ville": "Diebougou",
    "origine_cooperative": "Apiculteurs de Diebougou",
    "certification": [
      "BioSPG"
    ],
    "made_in_bf": true,
    "quantite_disponible": 40,
    "unite_quantite": "pièce",
    "date_production": "2025-03-25",
    "date_peremption": "2027-03-25",
    "conditions_stockage": "Barquet fermé au frais, à consommer dans les 3 mois",
    "processus_fabrication": "Ruche → découpe du rayon → barquet alimentaire → étiquetage",
    "poids_unitaire": "400g",
    "en_stock": true,
    "stock_alerte": 8,
    "reviews_count": 12,
    "average_rating": 4.6,
    "tags": [
      "miel",
      "rayon",
      "cire",
      "brut",
      "propolis"
    ]
  },
  {
    "id": "PRD025",
    "nom": "Miel de Cascades 500g",
    "categorie": "Miel",
    "prix": 3800,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Miel cru récolté dans la région des Cascades autour de Banfora, zone à forte biodiversité végétale. Les Apiculteurs de Diebougou y exploitent un réseau de ruchers partenaires dans les galeries forestières et les champs de canne à sucre environnants. Ce miel à la robe ambrée foncée offre des notes caramel et florales intenses. Pot de 500g. La flore variée de la région des Cascades, entre forêts humides et savanes, donne à ce miel un profil gustatif unique et une texture veloutée.",
    "description_courte": "Miel cru de Banfora 500g Cascades",
    "vendeur_id": "SEL005",
    "region": "Cascade",
    "ville": "Banfora",
    "origine_cooperative": "Apiculteurs de Diebougou (ruchers Cascades)",
    "certification": [
      "BioSPG",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 70,
    "unite_quantite": "pièce",
    "date_production": "2025-02-28",
    "date_peremption": "2027-02-28",
    "conditions_stockage": "Pot fermé à température ambiante, à l'abri de la lumière",
    "processus_fabrication": "Ruchers Cascades → récolte → extraction à froid → décantation → pot 500g",
    "poids_unitaire": "500g",
    "en_stock": true,
    "stock_alerte": 12,
    "reviews_count": 16,
    "average_rating": 4.6,
    "tags": [
      "miel",
      "cru",
      "cascades",
      "banfora",
      "ambré"
    ]
  },
  {
    "id": "PRD026",
    "nom": "Propolis pure 30g",
    "categorie": "Miel",
    "prix": 4500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Propolis brute récoltée par grattage des cadres par les Apiculteurs de Diébougou. Cette résine végétale collectée par les abeilles sur les bourgeons d'arbres est reconnue pour ses propriétés antibactériennes, antifongiques et anti-inflammatoires. Conditionnée en bloc de 30g, elle se consomme en petites doses à mâcher ou en macération alcoolique pour préparer une teinture-mère. La propolis du Sud-Ouest, riche en flavonoïdes, est issue des résineux et arbres locaux. Pot en verre teinté pour préserver les principes actifs.",
    "description_courte": "Propolis brute 30g Sud-Ouest",
    "vendeur_id": "SEL005",
    "region": "Sud-Ouest",
    "ville": "Diebougou",
    "origine_cooperative": "Apiculteurs de Diebougou",
    "certification": [
      "BioSPG"
    ],
    "made_in_bf": true,
    "quantite_disponible": 50,
    "unite_quantite": "pièce",
    "date_production": "2025-01-15",
    "date_peremption": "2027-07-15",
    "conditions_stockage": "Pot fermé au sec et frais",
    "processus_fabrication": "Grattage des cadres → tri → purification → pot 30g",
    "poids_unitaire": "30g",
    "en_stock": true,
    "stock_alerte": 8,
    "reviews_count": 9,
    "average_rating": 4.5,
    "tags": [
      "propolis",
      "abeilles",
      "immunite",
      "bio",
      "sante"
    ]
  },
  {
    "id": "PRD027",
    "nom": "Miel de Fada N'Gourma 500g",
    "categorie": "Miel",
    "prix": 3700,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Miel cru récolté dans la région de l'Est autour de Fada N'Gourma, dans les forêts classées du Gobnangou et de la Pama. Les Apiculteurs de Diebougou y déploient des ruchers partenaires auprès des apiculteurs locaux formés aux bonnes pratiques. Ce miel au goût puissant et légèrement boisé reflète la flore soudanienne de l'Est, riche en combretum et en acacias. Pot de 500g, miel non chauffé et non filtré finement pour préserver les pollens et enzymes naturels.",
    "description_courte": "Miel cru de Fada 500g Est",
    "vendeur_id": "SEL005",
    "region": "Est",
    "ville": "Fada N'Gourma",
    "origine_cooperative": "Apiculteurs de Diebougou (réseau Est)",
    "certification": [
      "BioSPG"
    ],
    "made_in_bf": true,
    "quantite_disponible": 60,
    "unite_quantite": "pièce",
    "date_production": "2025-03-08",
    "date_peremption": "2027-03-08",
    "conditions_stockage": "Pot fermé à température ambiante, à l'abri de la lumière",
    "processus_fabrication": "Ruchers Est → récolte → extraction à froid → décantation → pot 500g",
    "poids_unitaire": "500g",
    "en_stock": true,
    "stock_alerte": 10,
    "reviews_count": 11,
    "average_rating": 4.5,
    "tags": [
      "miel",
      "cru",
      "est",
      "fada",
      "boisé"
    ]
  },
  {
    "id": "PRD028",
    "nom": "Gelée royale fraîche 25g",
    "categorie": "Miel",
    "prix": 8000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Gelée royale fraîche prélevée manuellement dans les cellules royales par les Apiculteurs de Diébougou. Cette substance sécrétée par les abeilles nourrices, aliment exclusif de la reine, est réputée pour ses vertus tonifiantes, immunostimulantes et régénérantes. Conditionnée en petit pot de 25g, elle se consomme par cure de quelques semaines à raison d'une dose quotidienne sous la langue. La gelée royale du Sud-Ouest est récoltée en saison productive et conservée au frais. Pot en verre brun avec cuillère doseuse.",
    "description_courte": "Gelée royale fraîche 25g premium",
    "vendeur_id": "SEL005",
    "region": "Sud-Ouest",
    "ville": "Diebougou",
    "origine_cooperative": "Apiculteurs de Diebougou",
    "certification": [
      "BioSPG"
    ],
    "made_in_bf": true,
    "quantite_disponible": 30,
    "unite_quantite": "pièce",
    "date_production": "2025-04-15",
    "date_peremption": "2026-04-15",
    "conditions_stockage": "Pot fermé au réfrigérateur (4 à 8°C), à consommer sous 6 mois",
    "processus_fabrication": "Transfert de larves → cellules royales → prélèvement à la spatule → pot 25g → chaîne du froid",
    "poids_unitaire": "25g",
    "en_stock": true,
    "stock_alerte": 6,
    "reviews_count": 7,
    "average_rating": 4.7,
    "tags": [
      "gelée-royale",
      "premium",
      "immunite",
      "tonique",
      "rare"
    ]
  },
  {
    "id": "PRD029",
    "nom": "Faso Dan Fani tissu 2m",
    "categorie": "Coton",
    "prix": 8000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Tissu Faso Dan Fani tissé à la main par la Coopérative des Tisserands de Koudougou, dans le Centre-Ouest. Ce pagne traditionnel en coton filé et tissé sur métier à tisser étroit est un emblème culturel du Burkina Faso, popularisé par Thomas Sankara. Composé de bandes de 15 cm cousues entre elles, ce tissu de 2 mètres est parfait pour confectionner boubous, ensembles et accessoires. Motifs traditionnels en fines rayures jaunes, noires et blanches. Coton filé main, teinture naturelle à l'indigo et à la nappe.",
    "description_courte": "Faso Dan Fani 2m tissé main Koudougou",
    "vendeur_id": "SEL006",
    "region": "Centre-Ouest",
    "ville": "Koudougou",
    "origine_cooperative": "Tisserands de Koudougou",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 60,
    "unite_quantite": "pièce",
    "date_production": "2025-04-20",
    "date_peremption": "2030-04-20",
    "conditions_stockage": "Lieu sec, à l'abri de la lumière directe, lavage délicat",
    "processus_fabrication": "Filage coton → teinture naturelle → tissage métier étroit → assemblage bandes → finition",
    "poids_unitaire": "2m (env. 600g)",
    "en_stock": true,
    "stock_alerte": 10,
    "reviews_count": 25,
    "average_rating": 4.8,
    "tags": [
      "faso-dan-fani",
      "tissu",
      "traditionnel",
      "sankara",
      "coton"
    ]
  },
  {
    "id": "PRD030",
    "nom": "Bazin riche 6 yards",
    "categorie": "Coton",
    "prix": 12000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Bazin riche importé puis embossé et teint localement par les Tisserands de Koudougou. Le bazin, étoffe de coton glacé originaire d'Europe, est travaillé au Burkina selon la technique du rich-dyeing qui consiste à plisser, nouer et teindre pour obtenir des motifs en relief brillants. Cette pièce de 6 yards (5,5 m) est idéale pour la confection de grands boubous de cérémonie. Le bazin riche de Koudougou est réputé dans toute l'Afrique de l'Ouest pour la finesse de son embossage. Couleur profonde indigo.",
    "description_courte": "Bazin riche 6 yards embossé Koudougou",
    "vendeur_id": "SEL006",
    "region": "Centre-Ouest",
    "ville": "Koudougou",
    "origine_cooperative": "Tisserands de Koudougou",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 45,
    "unite_quantite": "pièce",
    "date_production": "2025-05-12",
    "date_peremption": "2032-05-12",
    "conditions_stockage": "Lieu sec, repassage à basse température sur l'envers",
    "processus_fabrication": "Bazin brut → plissage et nouage → teinture indigo → séchage → embossage → finition 6 yards",
    "poids_unitaire": "6 yards (5,5m)",
    "en_stock": true,
    "stock_alerte": 8,
    "reviews_count": 19,
    "average_rating": 4.7,
    "tags": [
      "bazin",
      "riche",
      "ceremonie",
      "indigo",
      "coton"
    ]
  },
  {
    "id": "PRD031",
    "nom": "Bogolan tissu teint 2m",
    "categorie": "Coton",
    "prix": 10000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Tissu bogolan (bougie de terre) peint à la main avec des boues ferriques et des décoctés végétaux par les Tisserands de Koudougou. Cette technique ancestrale d'origine malienne, maîtrisée au Burkina, utilise la boue riche en fer du Centre-Ouest pour fixer des motifs symboliques sur coton tissé main. Chaque pièce est unique et raconte une histoire à travers ses pictogrammes. Tissu de 2 mètres idéal pour la décoration murale, les coussins ou les vêtements ethniques. Teinture 100% naturelle et écologique.",
    "description_courte": "Bogolan peint main 2m motifs terre",
    "vendeur_id": "SEL006",
    "region": "Centre-Ouest",
    "ville": "Koudougou",
    "origine_cooperative": "Tisserands de Koudougou",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 35,
    "unite_quantite": "pièce",
    "date_production": "2025-03-30",
    "date_peremption": "2032-03-30",
    "conditions_stockage": "Lieu sec, lavage à la main eau froide, ne pas tordre",
    "processus_fabrication": "Coton tissé main → application boue ferrique → séchage → décoctés végétaux → motifs symboliques → fixation",
    "poids_unitaire": "2m (env. 700g)",
    "en_stock": true,
    "stock_alerte": 6,
    "reviews_count": 14,
    "average_rating": 4.6,
    "tags": [
      "bogolan",
      "teinture",
      "naturelle",
      "terre",
      "decoration"
    ]
  },
  {
    "id": "PRD032",
    "nom": "Fil de coton écrú pelote 200g",
    "categorie": "Coton",
    "prix": 2500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Pelote de fil de coton écrú filé à la main par la Coopérative de filature de Bobo-Dioulasso, dans les Hauts-Bassins. Ce fil brut non blanchi, issu du coton burkinabè cultivé sans irrigation intensive, est destiné au tricot, au tissage et à la broderie traditionnelle. La filature manuelle au rouet préserve les fibres longues du coton et donne un fil résistant et légèrement irrégulier, signature de l'artisanat. Pelote de 200g, épaisseur moyenne idéale pour aiguilles n°4 à 5.",
    "description_courte": "Fil coton écrú filé main 200g Bobo",
    "vendeur_id": "SEL007",
    "region": "Hauts-Bassins",
    "ville": "Bobo-Dioulasso",
    "origine_cooperative": "Coopérative de filature de Bobo",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 130,
    "unite_quantite": "pièce",
    "date_production": "2025-05-08",
    "date_peremption": "2032-05-08",
    "conditions_stockage": "Lieu sec à l'abri de l'humidité",
    "processus_fabrication": "Coton égrene → cardage → filage rouet → pelotage → 200g",
    "poids_unitaire": "200g",
    "en_stock": true,
    "stock_alerte": 20,
    "reviews_count": 16,
    "average_rating": 4.4,
    "tags": [
      "fil",
      "coton",
      "ecru",
      "filé-main",
      "tricot"
    ]
  },
  {
    "id": "PRD033",
    "nom": "Bazin de Manga 6 yards",
    "categorie": "Coton",
    "prix": 11000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Bazin embossé teint à Manga, dans la région du Centre-Sud, par les Tisserands de Koudougou en partenariat avec des artisans teinteurs locaux. Cette pièce de 6 yards présente un motif géométrique original en relief, teint dans une nuance prune profond. Le Centre-Sud est reconnu pour la créativité de ses teinteurs qui renouvellent les motifs traditionnels. Tissu parfait pour la confection de boubous d'apparat et de pagnes de cérémonie. Embossage réalisé à la main, chaque pièce légèrement différente.",
    "description_courte": "Bazin de Manga 6 yards prune Centre-Sud",
    "vendeur_id": "SEL006",
    "region": "Centre-Sud",
    "ville": "Manga",
    "origine_cooperative": "Tisserands de Koudougou (atelier Manga)",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 30,
    "unite_quantite": "pièce",
    "date_production": "2025-04-05",
    "date_peremption": "2032-04-05",
    "conditions_stockage": "Lieu sec, repassage envers à basse température",
    "processus_fabrication": "Bazin brut → plissage → teinture prune → embossage main → finition 6 yards",
    "poids_unitaire": "6 yards (5,5m)",
    "en_stock": true,
    "stock_alerte": 6,
    "reviews_count": 10,
    "average_rating": 4.5,
    "tags": [
      "bazin",
      "embossé",
      "manga",
      "centre-sud",
      "ceremonie"
    ]
  },
  {
    "id": "PRD034",
    "nom": "Ensemble Faso Dan Fani homme",
    "categorie": "Coton",
    "prix": 25000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Ensemble trois pièces pour homme en Faso Dan Fani tissé main, cousu sur mesure par les Tisserands de Koudougou. Composé d'un boubou long, d'un pantalon bouffant et d'un chapeau assorti, cet ensemble traditionnel est porté lors des grandes fêtes religieuses et des cérémonies familiales. Le tissage en bandes cousues et les motifs à rayures sont l'identité visuelle du Faso Dan Fani, symbole d'émancipation et de souveraineté culturelle burkinabè. Taille sur demande, motifs au choix dans la palette traditionnelle.",
    "description_courte": "Ensemble Faso Dan Fani 3 pièces homme",
    "vendeur_id": "SEL006",
    "region": "Centre-Ouest",
    "ville": "Koudougou",
    "origine_cooperative": "Tisserands de Koudougou",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 25,
    "unite_quantite": "pièce",
    "date_production": "2025-05-25",
    "date_peremption": "2032-05-25",
    "conditions_stockage": "Sur cintre au sec, lavage à la main eau tiède",
    "processus_fabrication": "Tissage Faso Dan Fani → coupe → couture boubou+pantalon+chapeau → finition → essayage",
    "poids_unitaire": "ensemble (env. 1,2kg)",
    "en_stock": true,
    "stock_alerte": 5,
    "reviews_count": 13,
    "average_rating": 4.7,
    "tags": [
      "faso-dan-fani",
      "ensemble",
      "homme",
      "ceremonie",
      "sur-mesure"
    ]
  },
  {
    "id": "PRD035",
    "nom": "Écharpe coton filé main",
    "categorie": "Coton",
    "prix": 4500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Écharpe en coton filé main tissée par la Coopérative de filature de Bobo-Dioulasso. Légère et chaude, cette écharpe aux franges nouées main est tissée sur métier étroit avec des fils de coton écrú et teintés indigo. Ses dimensions de 180 cm sur 25 cm en font un accessoire polyvalent pour homme ou femme. Chaque pièce est unique par ses variations de teint naturel. Le coton burkinabè utilisé est cultivé sans OGM dans les Hauts-Bassins, première région cotonnière du pays.",
    "description_courte": "Écharpe coton filé main 180cm Bobo",
    "vendeur_id": "SEL007",
    "region": "Hauts-Bassins",
    "ville": "Bobo-Dioulasso",
    "origine_cooperative": "Coopérative de filature de Bobo",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 85,
    "unite_quantite": "pièce",
    "date_production": "2025-06-02",
    "date_peremption": "2032-06-02",
    "conditions_stockage": "Pliée au sec, lavage à la main",
    "processus_fabrication": "Filage coton → teinture indigo → tissage métier étroit → franges → finition",
    "poids_unitaire": "180x25cm (env. 200g)",
    "en_stock": true,
    "stock_alerte": 12,
    "reviews_count": 17,
    "average_rating": 4.5,
    "tags": [
      "echarpe",
      "coton",
      "filé-main",
      "indigo",
      "accessoire"
    ]
  },
  {
    "id": "PRD036",
    "nom": "Nappe bogolan 180x120cm",
    "categorie": "Coton",
    "prix": 18000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Nappe de table en bogolan peint main par les Tisserands de Koudougou, aux dimensions 180 par 120 cm. Les motifs symboliques peints à la boue ferrique représentent des proverbes et des légendes de la région du Centre-Ouest. Cette nappe épaisse en coton tissé main habille une table de 6 personnes et apporte une touche ethnique chaleureuse à la décoration. Pièce unique signée par l'artisane. Teinture naturelle garantie sans produits chimiques, couleurs terre ocre et noir.",
    "description_courte": "Nappe bogolan 180x120cm motifs symboles",
    "vendeur_id": "SEL006",
    "region": "Centre-Ouest",
    "ville": "Koudougou",
    "origine_cooperative": "Tisserands de Koudougou",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 20,
    "unite_quantite": "pièce",
    "date_production": "2025-04-18",
    "date_peremption": "2033-04-18",
    "conditions_stockage": "Roulée au sec, lavage délicat eau froide, séchage à plat",
    "processus_fabrication": "Coton tissé main → peinture boue ferrique → décoctés végétaux → motifs → fixation → ourlets",
    "poids_unitaire": "180x120cm (env. 1kg)",
    "en_stock": true,
    "stock_alerte": 4,
    "reviews_count": 9,
    "average_rating": 4.6,
    "tags": [
      "nappe",
      "bogolan",
      "decoration",
      "table",
      "unique"
    ]
  },
  {
    "id": "PRD037",
    "nom": "Foulard Faso Dan Fani 150x50cm",
    "categorie": "Coton",
    "prix": 5000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Foulard en Faso Dan Fani tissé main par la Coopérative de filature de Bobo-Dioulasso. Aux dimensions 150 par 50 cm, ce foulard léger se porte autour du cou, en ceinture ou en coiffe. Tissé en bandes fines cousues, il arbore les rayures traditionnelles ocre, noir et écru du Faso Dan Fani. Le coton filé main provient des champs des Hauts-Bassins. Accessoire unisexe idéal pour affirmer une identité panafricaine. Franges latérales nouées main.",
    "description_courte": "Foulard Faso Dan Fani 150x50cm Bobo",
    "vendeur_id": "SEL007",
    "region": "Hauts-Bassins",
    "ville": "Bobo-Dioulasso",
    "origine_cooperative": "Coopérative de filature de Bobo",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 75,
    "unite_quantite": "pièce",
    "date_production": "2025-05-14",
    "date_peremption": "2032-05-14",
    "conditions_stockage": "Pliée au sec, lavage à la main",
    "processus_fabrication": "Filage → teinture → tissage métier étroit → assemblage bandes → franges → finition",
    "poids_unitaire": "150x50cm (env. 150g)",
    "en_stock": true,
    "stock_alerte": 10,
    "reviews_count": 12,
    "average_rating": 4.5,
    "tags": [
      "foulard",
      "faso-dan-fani",
      "accessoire",
      "unisexe",
      "coton"
    ]
  },
  {
    "id": "PRD038",
    "nom": "Robe en bazin femme sur mesure",
    "categorie": "Coton",
    "prix": 35000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Robe de soirée en bazin riche embossé, cousue sur mesure par la Coopérative de filature de Bobo-Dioulasso. Le bazin, embossé et teint à la main dans les Hauts-Bassins, est travaillé selon une coupe élégante adaptée à la morphologie de la cliente. Cette robe d'apparat, brodée de motifs dorés au col et aux manches, est destinée aux grandes cérémonies : mariages, baptêmes, fêtes religieuses. Confectionnée en atelier par des couturiers expérimentés. Mesures prises sur demande après commande.",
    "description_courte": "Robe bazin riche sur mesure femme",
    "vendeur_id": "SEL007",
    "region": "Hauts-Bassins",
    "ville": "Bobo-Dioulasso",
    "origine_cooperative": "Coopérative de filature de Bobo",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 15,
    "unite_quantite": "pièce",
    "date_production": "2025-06-10",
    "date_peremption": "2032-06-10",
    "conditions_stockage": "Sur cintre, nettoyage à sec recommandé",
    "processus_fabrication": "Bazin embossé → prise de mesures → coupe → couture → broderie dorée → finitions → essayage",
    "poids_unitaire": "robe (env. 900g)",
    "en_stock": true,
    "stock_alerte": 3,
    "reviews_count": 8,
    "average_rating": 4.8,
    "tags": [
      "robe",
      "bazin",
      "femme",
      "ceremonie",
      "sur-mesure"
    ]
  },
  {
    "id": "PRD039",
    "nom": "Panier tressé rond 40cm",
    "categorie": "Artisanat",
    "prix": 6000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Panier rond tressé main de 40 cm de diamètre par les Artisans de Ouahigouya, dans la région du Nord. Réalisé en fibres de rônier et de paille de mil teintées à l'indigo et à la terre ocre, ce panier robuste sert au transport des denrées, au rangement ou de décoration murale. Les tresseuses du Nord maîtrisent des motifs géométriques transmis de mère en fille. Poignées tressées renforcées pour la portée. Chaque panier nécessite environ trois jours de travail artisanal.",
    "description_courte": "Panier rond 40cm tressé Nord",
    "vendeur_id": "SEL008",
    "region": "Nord",
    "ville": "Ouahigouya",
    "origine_cooperative": "Artisans de Ouahigouya",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 70,
    "unite_quantite": "pièce",
    "date_production": "2025-04-12",
    "date_peremption": "2035-04-12",
    "conditions_stockage": "Lieu sec et ventilé, éviter l'humidité prolongée",
    "processus_fabrication": "Récolte fibres rônier → teinture indigo/ocre → séchage → tressage enroulé → poignées → finition",
    "poids_unitaire": "40cm (env. 500g)",
    "en_stock": true,
    "stock_alerte": 12,
    "reviews_count": 21,
    "average_rating": 4.6,
    "tags": [
      "panier",
      "vannerie",
      "tressé",
      "nord",
      "decoration"
    ]
  },
  {
    "id": "PRD040",
    "nom": "Sculpture bronze cire perdue 25cm",
    "categorie": "Artisanat",
    "prix": 45000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Sculpture en bronze coulée à la cire perdue par les Fondeurs de Ouagadougou, maîtres artisans de la région du Centre. Cette statuette de 25 cm de hauteur représente une femme portant une jarre, thème classique de la statuaire burkinabè. La technique ancestrale de la cire perdue consiste à modeler l'œuvre en cire, à l'entourer d'un moule d'argile, puis à fondre la cire pour la remplacer par le bronze en fusion. Chaque pièce est unique et signée par le fondeur.",
    "description_courte": "Statuette bronze cire perdue 25cm Ouaga",
    "vendeur_id": "SEL009",
    "region": "Centre",
    "ville": "Ouagadougou",
    "origine_cooperative": "Fondeurs de Ouagadougou",
    "certification": [
      "ABNORM",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 18,
    "unite_quantite": "pièce",
    "date_production": "2025-03-22",
    "date_peremption": "2099-12-31",
    "conditions_stockage": "Intérieur, dépoussiérage chiffon sec, éviter l'humidité",
    "processus_fabrication": "Modelage cire → moule argile → cuisson → fonte bronze → démoulage → polissage → patine",
    "poids_unitaire": "25cm (env. 2kg)",
    "en_stock": true,
    "stock_alerte": 4,
    "reviews_count": 15,
    "average_rating": 4.9,
    "tags": [
      "bronze",
      "sculpture",
      "cire-perdue",
      "statuette",
      "collection"
    ]
  },
  {
    "id": "PRD041",
    "nom": "Masque sculpté en bois 35cm",
    "categorie": "Artisanat",
    "prix": 18000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Masque traditionnel sculpté en bois de karité par les Sculpteurs de Bobo-Dioulasso, dans les Hauts-Bassins. Ce masque de 35 cm de haut s'inspire des masques Bwa et Bobo utilisés lors des cérémonies d'initiation et de funérailles. Sculpté à la herminette puis patiné à la suie et à la terre, il représente un visage stylisé aux traits géométriques. Chaque masque est unique et porte la signature discrète de son sculpteur. Pièce de collection ou de décoration murale authentique.",
    "description_courte": "Masque bois sculpté Bwa 35cm Bobo",
    "vendeur_id": "SEL010",
    "region": "Hauts-Bassins",
    "ville": "Bobo-Dioulasso",
    "origine_cooperative": "Sculpteurs de Bobo-Dioulasso",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 28,
    "unite_quantite": "pièce",
    "date_production": "2025-04-30",
    "date_peremption": "2099-12-31",
    "conditions_stockage": "Intérieur sec, dépoussiérage doux, éviter ensoleillement direct",
    "processus_fabrication": "Sélection bois karité → ébauche herminette → sculpture détails → ponçage → patine suie/terre → finition",
    "poids_unitaire": "35cm (env. 900g)",
    "en_stock": true,
    "stock_alerte": 6,
    "reviews_count": 17,
    "average_rating": 4.7,
    "tags": [
      "masque",
      "bois",
      "sculpté",
      "bwa",
      "collection"
    ]
  },
  {
    "id": "PRD042",
    "nom": "Collier perles traditionnel Sahel",
    "categorie": "Artisanat",
    "prix": 7000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Collier de perles traditionnel confectionné par les Artisanes de Dori, dans la région du Sahel. Composé de perles de verre, de cauris et de perles en laiton, ce collier multiniveau est un héritage de l'art peul et touareg du Sahel burkinabè. Les artisanes assemblent à la main des motifs géométriques symboliques sur plusieurs rangées. Fermeture par boucle laiton gravée. Ce bijou ethnique se porte aussi bien en tenue traditionnelle qu'en accessoire de mode contemporain.",
    "description_courte": "Collier perles Sahel multiniveau Dori",
    "vendeur_id": "SEL011",
    "region": "Sahel",
    "ville": "Dori",
    "origine_cooperative": "Artisanes de Dori",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 55,
    "unite_quantite": "pièce",
    "date_production": "2025-05-16",
    "date_peremption": "2040-05-16",
    "conditions_stockage": "Écrin sec, éviter le contact avec l'eau et les parfums",
    "processus_fabrication": "Tri perles → filage motifs → assemblage multiniveau → boucle laiton → finition",
    "poids_unitaire": "collier (env. 180g)",
    "en_stock": true,
    "stock_alerte": 10,
    "reviews_count": 19,
    "average_rating": 4.5,
    "tags": [
      "bijoux",
      "collier",
      "perles",
      "sahel",
      "ethnique"
    ]
  },
  {
    "id": "PRD043",
    "nom": "Sac en cuir tanné végétal",
    "categorie": "Artisanat",
    "prix": 22000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Sac à main en cuir de vachette tanné végétal par les Artisans de Ouahigouya, dans la région du Nord. Le tannage végétal utilise des écorces locales de néré et d'acacia, respectueux de l'environnement. Ce sac spacieux à bandoulière est décoré de motifs gravés à la main et doté de deux poches intérieures. Cuir épais et résistant, doublure en coton Faso Dan Fani. Fermeture par boucle laiton. Le tannage végétal confère au cuir une patine unique qui se bonifie avec le temps.",
    "description_courte": "Sac cuir tanné végétal Nord Ouahigouya",
    "vendeur_id": "SEL008",
    "region": "Nord",
    "ville": "Ouahigouya",
    "origine_cooperative": "Artisans de Ouahigouya",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 32,
    "unite_quantite": "pièce",
    "date_production": "2025-04-25",
    "date_peremption": "2040-04-25",
    "conditions_stockage": "Au sec, nourrir le cuir une fois par an avec cire d'abeille",
    "processus_fabrication": "Tannage écorces → coupe patron → couture → gravure motifs → doublure Faso Dan Fani → boucle",
    "poids_unitaire": "sac (env. 700g)",
    "en_stock": true,
    "stock_alerte": 6,
    "reviews_count": 14,
    "average_rating": 4.6,
    "tags": [
      "sac",
      "cuir",
      "tannage-vegetal",
      "maroquinerie",
      "nord"
    ]
  },
  {
    "id": "PRD044",
    "nom": "Poterie culinaire terrine 30cm",
    "categorie": "Artisanat",
    "prix": 5500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Terrine en terre cuite modelée au tour par un atelier partenaire des Fondeurs de Ouagadougou, dans la région du Plateau-Central autour de Ziniaré. Réalisée à partir d'argile locale extraite des carrières du Plateau-Central, cette terrine de 30 cm de diamètre est cuite au four traditionnel à bois. La poterie culinaire en terre conserve la chaleur et rehausse le goût des plats mijotés comme le tô et les sauces traditionnelles. Chaque pièce présente des variations de teinte dues à la cuisson artisanale. Émaillage naturel à la cendre de mil.",
    "description_courte": "Terrine terre cuite 30cm Plateau-Central",
    "vendeur_id": "SEL009",
    "region": "Plateau-Central",
    "ville": "Ziniare",
    "origine_cooperative": "Fondeurs de Ouagadougou (atelier poterie Ziniaré)",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 48,
    "unite_quantite": "pièce",
    "date_production": "2025-05-05",
    "date_peremption": "2099-12-31",
    "conditions_stockage": "Sécher entre deux usages, éviter les chocs thermiques",
    "processus_fabrication": "Extraction argile → pétrissage → tournage → séchage → engobe cendre → cuisson four à bois",
    "poids_unitaire": "30cm (env. 1,5kg)",
    "en_stock": true,
    "stock_alerte": 8,
    "reviews_count": 11,
    "average_rating": 4.4,
    "tags": [
      "poterie",
      "terre-cuite",
      "culinaire",
      "nord",
      "artisanat"
    ]
  },
  {
    "id": "PRD045",
    "nom": "Statuette bois iroko 30cm Bwa",
    "categorie": "Artisanat",
    "prix": 15000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Statuette sculptée en bois d'iroko par les Sculpteurs de Bobo-Dioulasso, dans les Hauts-Bassins. Cette pièce de 30 cm représente un ancêtre protecteur selon la tradition bwa, peuple réputé pour sa statuaire et ses masques plats. Sculptée à la herminette puis polie à la pierre ponce, elle est enduite d'une patine à la cire d'abeille locale. La région des Hauts-Bassins, berceau culturel bwa et bobo, est réputée pour sa statuaire ancestrale et ses sculptures sur bois. Pièce unique idéale pour la décoration d'intérieur et les collectionneurs d'art premier.",
    "description_courte": "Statuette bois iroko 30cm Bwa Bobo",
    "vendeur_id": "SEL010",
    "region": "Hauts-Bassins",
    "ville": "Bobo-Dioulasso",
    "origine_cooperative": "Sculpteurs de Bobo-Dioulasso",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 22,
    "unite_quantite": "pièce",
    "date_production": "2025-04-08",
    "date_peremption": "2099-12-31",
    "conditions_stockage": "Intérieur sec, dépoussiérage chiffon sec, éviter le soleil direct",
    "processus_fabrication": "Sélection iroko → ébauche herminette → sculpture → polissage pierre ponce → patine cire d'abeille",
    "poids_unitaire": "30cm (env. 1,1kg)",
    "en_stock": true,
    "stock_alerte": 5,
    "reviews_count": 9,
    "average_rating": 4.6,
    "tags": [
      "statuette",
      "bois",
      "iroko",
      "mossi",
      "plateau-central"
    ]
  },
  {
    "id": "PRD046",
    "nom": "Tambour djembé sculpté 40cm",
    "categorie": "Artisanat",
    "prix": 28000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Djembé traditionnel sculpté en bois dense et monté d'une peau de chèvre par les Sculpteurs de Bobo-Dioulasso, dans les Hauts-Bassins. Ce tambour de 40 cm de hauteur et 22 cm de diamètre de membrane offre un son chaud et puissant, caractéristique des djembés du Burkina. La caisse en bois de dimba est sculptée à la main d'un motif en relief, et la tension de la peau est assurée par un système de corde en nylon résistant. Instrument de musique emblématique de l'Afrique de l'Ouest, livré accordé.",
    "description_courte": "Djembé bois sculpté 40cm Bobo",
    "vendeur_id": "SEL010",
    "region": "Hauts-Bassins",
    "ville": "Bobo-Dioulasso",
    "origine_cooperative": "Sculpteurs de Bobo-Dioulasso",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 16,
    "unite_quantite": "pièce",
    "date_production": "2025-05-20",
    "date_peremption": "2099-12-31",
    "conditions_stockage": "Lieu sec à l'abri de l'humidité, détendre la peau en cas de non-usage prolongé",
    "processus_fabrication": "Tronc dimba → creusement → sculpture relief → peau chèvre → montage corde → accordage",
    "poids_unitaire": "40cm (env. 4kg)",
    "en_stock": true,
    "stock_alerte": 4,
    "reviews_count": 13,
    "average_rating": 4.8,
    "tags": [
      "djembé",
      "tambour",
      "musique",
      "bois",
      "instrument"
    ]
  },
  {
    "id": "PRD047",
    "nom": "Boucles d'oreilles laiton Sahel",
    "categorie": "Artisanat",
    "prix": 4000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Boucles d'oreilles forgées en laiton par les Artisanes de Dori, dans la région du Sahel. Inspirées des bijoux touaregs et peuls, ces boucles gravées de motifs géométriques sont légères et confortables. Le laiton, alliage de cuivre et de zinc, est martelé et ciselé à la main puis poli. Fermoirs en argent pour éviter les allergies. Ces boucles apportent une touche ethnique élégante aux tenues quotidiennes ou de cérémonie. Vendues avec écrin en tissu Faso Dan Fani.",
    "description_courte": "Boucles oreilles laiton forgé Sahel",
    "vendeur_id": "SEL011",
    "region": "Sahel",
    "ville": "Dori",
    "origine_cooperative": "Artisanes de Dori",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 65,
    "unite_quantite": "pièce",
    "date_production": "2025-05-28",
    "date_peremption": "2040-05-28",
    "conditions_stockage": "Écrin sec, nettoyer au chiffon doux, éviter l'eau",
    "processus_fabrication": "Découpe laiton → martelage → ciselure motifs → polissage → fermoir argent → écrin",
    "poids_unitaire": "paire (env. 25g)",
    "en_stock": true,
    "stock_alerte": 12,
    "reviews_count": 22,
    "average_rating": 4.5,
    "tags": [
      "bijoux",
      "boucles",
      "laiton",
      "sahel",
      "ethnique"
    ]
  },
  {
    "id": "PRD048",
    "nom": "Bronze figurine musicien 20cm",
    "categorie": "Artisanat",
    "prix": 35000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Figurine en bronze représentant un musicien jouant du balafon, coulée à la cire perdue par les Fondeurs de Ouagadougou. Cette statuette de 20 cm de hauteur capte avec sensibilité l'instant musical cher à la culture burkinabè. La cire perdue, technique maîtrisée depuis des siècles par les fondeurs de Liptako-Gourma, permet une finesse de détails exceptionnelle. Chaque pièce est unique, numérotée et accompagnée d'un certificat d'authenticité. Bronze patiné à l'oxyde de fer pour une finition chaleureuse.",
    "description_courte": "Figurine bronze musicien 20cm Ouaga",
    "vendeur_id": "SEL009",
    "region": "Centre",
    "ville": "Ouagadougou",
    "origine_cooperative": "Fondeurs de Ouagadougou",
    "certification": [
      "ABNORM",
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 14,
    "unite_quantite": "pièce",
    "date_production": "2025-03-10",
    "date_peremption": "2099-12-31",
    "conditions_stockage": "Intérieur sec, chiffon sec pour le dépoussiérage",
    "processus_fabrication": "Modelage cire → moule argile → cuisson → coulée bronze → démoulage → polissage → patine → certificat",
    "poids_unitaire": "20cm (env. 1,4kg)",
    "en_stock": true,
    "stock_alerte": 3,
    "reviews_count": 10,
    "average_rating": 4.8,
    "tags": [
      "bronze",
      "figurine",
      "musicien",
      "cire-perdue",
      "collection"
    ]
  },
  {
    "id": "PRD049",
    "nom": "Chapeau de paille tressé Mossi",
    "categorie": "Artisanat",
    "prix": 3500,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Chapeau de paille tressé à la main par les Artisans de Ouahigouya, dans la région du Nord. Inspiré des coiffes traditionnelles mossi, ce chapeau à large bord protège du soleil pendant les travaux champêtres et les déplacements. Tressé en fibres de rônier et de paille de mil, il est renforcé par un lien en cuir tressé. Léger et respirant, il convient aussi bien aux hommes qu'aux femmes. Modèle durable et réparable, fabriqué selon un savoir-faire ancestral transmis dans les villages du Nord.",
    "description_courte": "Chapeau paille tressé Mossi Nord",
    "vendeur_id": "SEL008",
    "region": "Nord",
    "ville": "Ouahigouya",
    "origine_cooperative": "Artisans de Ouahigouya",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 90,
    "unite_quantite": "pièce",
    "date_production": "2025-05-10",
    "date_peremption": "2035-05-10",
    "conditions_stockage": "Lieu sec, à plat pour conserver la forme",
    "processus_fabrication": "Récolte paille mil + rônier → tressage enroulé → assemblage bord → lien cuir → finition",
    "poids_unitaire": "chapeau (env. 250g)",
    "en_stock": true,
    "stock_alerte": 15,
    "reviews_count": 16,
    "average_rating": 4.4,
    "tags": [
      "chapeau",
      "paille",
      "tressé",
      "mossi",
      "soleil"
    ]
  },
  {
    "id": "PRD050",
    "nom": "Bracelet mandingue cuivre grave",
    "categorie": "Artisanat",
    "prix": 6000,
    "devise": "FCFA",
    "unite_prix": "pièce",
    "description": "Bracelet en cuivre gravé à la main par les Artisanes de Dori, dans la région du Sahel. Inspiré des bijoux mandingues et touaregs, ce bracelet rigide est décoré de motifs géométriques ciselés symbolisant la protection et la fécondité. Le cuivre, martelé à froid, développe une belle patine naturelle au contact de la peau. Taille unique légèrement ajustable. Ce bijou ethnique se porte seul ou en accumulation avec d'autres bracelets. Vendu avec un petit sachet de protection en cuir.",
    "description_courte": "Bracelet cuivre gravé mandingue Sahel",
    "vendeur_id": "SEL011",
    "region": "Sahel",
    "ville": "Dori",
    "origine_cooperative": "Artisanes de Dori",
    "certification": [
      "Made_in_BF"
    ],
    "made_in_bf": true,
    "quantite_disponible": 70,
    "unite_quantite": "pièce",
    "date_production": "2025-05-22",
    "date_peremption": "2040-05-22",
    "conditions_stockage": "Au sec, nettoyer au chiffon doux, éviter l'humidité prolongée",
    "processus_fabrication": "Découpe cuivre → martelage → cintrage → ciselure motifs → polissage → sachet cuir",
    "poids_unitaire": "bracelet (env. 60g)",
    "en_stock": true,
    "stock_alerte": 12,
    "reviews_count": 18,
    "average_rating": 4.5,
    "tags": [
      "bracelet",
      "cuivre",
      "gravé",
      "mandingue",
      "bijoux"
    ]
  }
],
  regions: {
  "regions": [
    {
      "id": "REG01",
      "nom": "Centre",
      "chef_lieu": "Ouagadougou",
      "produits_typiques": [
        "Bronze artisanal",
        "Savons karite"
      ]
    },
    {
      "id": "REG02",
      "nom": "Centre-Ouest",
      "chef_lieu": "Koudougou",
      "produits_typiques": [
        "Pagnes bazin",
        "Coton file"
      ]
    },
    {
      "id": "REG03",
      "nom": "Sud-Ouest",
      "chef_lieu": "Gaoua",
      "produits_typiques": [
        "Karite",
        "Miel"
      ]
    },
    {
      "id": "REG04",
      "nom": "Boucle du Mouhoun",
      "chef_lieu": "Dedougou",
      "produits_typiques": [
        "Sesame",
        "Graines"
      ]
    },
    {
      "id": "REG05",
      "nom": "Hauts-Bassins",
      "chef_lieu": "Bobo-Dioulasso",
      "produits_typiques": [
        "Sculptures bois",
        "Coton filature"
      ]
    },
    {
      "id": "REG06",
      "nom": "Nord",
      "chef_lieu": "Ouahigouya",
      "produits_typiques": [
        "Paniers tresses",
        "Cereales"
      ]
    },
    {
      "id": "REG07",
      "nom": "Sahel",
      "chef_lieu": "Dori",
      "produits_typiques": [
        "Bijoux perles",
        "Elevage"
      ]
    },
    {
      "id": "REG08",
      "nom": "Plateau-Central",
      "chef_lieu": "Ziniare",
      "produits_typiques": [
        "Cereales",
        "Legumes"
      ]
    },
    {
      "id": "REG09",
      "nom": "Centre-Est",
      "chef_lieu": "Tenkodogo",
      "produits_typiques": [
        "Karite",
        "Sesame"
      ]
    },
    {
      "id": "REG10",
      "nom": "Est",
      "chef_lieu": "Fada N'Gourma",
      "produits_typiques": [
        "Sesame",
        "Miel"
      ]
    },
    {
      "id": "REG11",
      "nom": "Cascades",
      "chef_lieu": "Banfora",
      "produits_typiques": [
        "Miel",
        "Fruits"
      ]
    },
    {
      "id": "REG12",
      "nom": "Centre-Nord",
      "chef_lieu": "Kaya",
      "produits_typiques": [
        "Coton",
        "Cereales"
      ]
    }
  ]
},
  reseller_rules: {
  "reseller_rules": {
    "types": {
      "grande_boutique": {
        "min_lot_size": 50,
        "unites": [
          "kg",
          "unites",
          "tonnes"
        ],
        "remise_percentage": 15,
        "description": "Grandes boutiques et distributeurs passant des commandes en gros (50+ kg/unites)"
      },
      "petite_boutique": {
        "min_lot_size": 10,
        "unites": [
          "kg",
          "unites"
        ],
        "remise_percentage": 8,
        "description": "Petites boutiques et revendeurs locaux passant des commandes moyennes (10+ kg/unites)"
      }
    },
    "pricing_calculation": [
      "prix_lot = prix_unitaire * quantite_lot * (1 - remise_percentage / 100)",
      "economie = prix_unitaire * quantite_lot * remise_percentage / 100"
    ],
    "bulk_cart_rules": {
      "min_item_quantity": "depends on boutique type",
      "cart_must_meet_minimum": true,
      "receipt_includes_remise_details": true
    }
  }
},
  search_config: {
  "search_settings": {
    "fields": [
      {
        "name": "nom",
        "weight": 3,
        "type": "string",
        "search_mode": "contains"
      },
      {
        "name": "categorie",
        "weight": 2,
        "type": "string",
        "search_mode": "exact_then_contains"
      },
      {
        "name": "vendeur_nom",
        "weight": 1.5,
        "type": "string",
        "search_mode": "contains"
      },
      {
        "name": "region",
        "weight": 1,
        "type": "string",
        "search_mode": "exact"
      },
      {
        "name": "description",
        "weight": 0.5,
        "type": "string",
        "search_mode": "contains"
      },
      {
        "name": "certification",
        "weight": 1,
        "type": "string",
        "search_mode": "exact"
      },
      {
        "name": "tags",
        "weight": 1,
        "type": "array",
        "search_mode": "contains_any"
      }
    ],
    "fuzzy_search": true,
    "fuzzy_threshold": 0.6,
    "autocomplete_enabled": true,
    "autocomplete_max_suggestions": 8,
    "synonyms": {
      "karite": [
        "beurre karite",
        "shea butter",
        "shi",
        "beurre",
        "savon karite"
      ],
      "sesame": [
        "graines sesame",
        "huile sesame",
        "sesame dore",
        "graines"
      ],
      "miel": [
        "honey",
        "apiculture",
        "miel brut",
        "miel karite"
      ],
      "coton": [
        "bazin",
        "pagne",
        "tissu",
        "fil coton",
        "tissage"
      ],
      "artisanat": [
        "bronze",
        "masque",
        "panier",
        "bijoux",
        "sculpture",
        "perles",
        "cire perdue"
      ]
    },
    "min_query_length": 2,
    "debounce_ms": 300
  }
},
  sellers: {
  "meta": {
    "version": "2.0",
    "date": "2026-07-24"
  },
  "sellers": [
    {
      "id": "SEL001",
      "nom": "Cooperative Femmes de Leo",
      "type": "cooperative",
      "region": "Sud-Ouest",
      "ville": "Leo",
      "telephone": "70 25 36 48",
      "email": "femmesleo@achetons.bf",
      "description": "Cooperative de femmes productrices de karite dans la region du Sud-Ouest. Plus de 200 femmes membres qui transforme le karite selon les methods traditionnelles.",
      "categories": [
        "Karite"
      ],
      "trust_level": "argent",
      "ventes_count": 87,
      "products_count": 2,
      "date_creation": "2019-03-15",
      "certification_cooperative": [
        "BioSPG"
      ],
      "logo_url": "images/products/karite-beurre.jpg"
    },
    {
      "id": "SEL002",
      "nom": "Atelier Sougrinooma",
      "type": "artisan_individuel",
      "region": "Centre",
      "ville": "Ouagadougou",
      "telephone": "70 12 34 56",
      "email": "sougrinooma@achetons.bf",
      "description": "Atelier artisanal de fabrication de savons naturels a Ouagadougou. Specialise dans les savons au karite et au miel.",
      "categories": [
        "Karite"
      ],
      "trust_level": "bronze",
      "ventes_count": 34,
      "products_count": 1,
      "date_creation": "2022-01-10"
    },
    {
      "id": "SEL003",
      "nom": "Ferme Wend-Kuni",
      "type": "producteur_agricole",
      "region": "Boucle du Mouhoun",
      "ville": "Dedougou",
      "telephone": "70 45 67 89",
      "email": "wendkuni@achetons.bf",
      "description": "Ferme agricole familiale productrice de sesame dore dans la Boucle du Mouhoun, la premiere region sesame du Burkina.",
      "categories": [
        "Sesame"
      ],
      "trust_level": "argent",
      "ventes_count": 120,
      "products_count": 1,
      "date_creation": "2018-06-20",
      "certification_cooperative": [
        "BioSPG",
        "ABNORM"
      ]
    },
    {
      "id": "SEL004",
      "nom": "Cooperative Wend-Kuni",
      "type": "cooperative",
      "region": "Boucle du Mouhoun",
      "ville": "Dedougou",
      "telephone": "70 56 78 90",
      "email": "coop-wendkuni@achetons.bf",
      "description": "Cooperative de producteurs de sesame qui transforme les graines en huile artisanale presse a froid.",
      "categories": [
        "Sesame"
      ],
      "trust_level": "or",
      "ventes_count": 215,
      "products_count": 1,
      "date_creation": "2017-01-05",
      "certification_cooperative": [
        "BioSPG"
      ]
    },
    {
      "id": "SEL005",
      "nom": "Apiculteurs de Diebougou",
      "type": "cooperative",
      "region": "Sud-Ouest",
      "ville": "Diebougou",
      "telephone": "70 67 89 01",
      "email": "apidiebougou@achetons.bf",
      "description": "Groupement d'apiculteurs pratiquant une apiculture respectueuse en foret classee du Sud-Ouest.",
      "categories": [
        "Miel"
      ],
      "trust_level": "argent",
      "ventes_count": 95,
      "products_count": 2,
      "date_creation": "2020-04-01",
      "certification_cooperative": [
        "BioSPG"
      ]
    },
    {
      "id": "SEL006",
      "nom": "Tisserands de Koudougou",
      "type": "cooperative",
      "region": "Centre-Ouest",
      "ville": "Koudougou",
      "telephone": "70 78 90 12",
      "email": "tisserands-kdg@achetons.bf",
      "description": "Cooperative de tisserands traditionnels de Koudougou, centre historique du tissage au Burkina.",
      "categories": [
        "Coton"
      ],
      "trust_level": "argent",
      "ventes_count": 68,
      "products_count": 1,
      "date_creation": "2019-08-10"
    },
    {
      "id": "SEL007",
      "nom": "Cooperative de filature de Bobo",
      "type": "cooperative",
      "region": "Hauts-Bassins",
      "ville": "Bobo-Dioulasso",
      "telephone": "70 89 01 23",
      "email": "filature-bobo@achetons.bf",
      "description": "Cooperative de filature artisanale de coton a Bobo-Dioulasso.",
      "categories": [
        "Coton"
      ],
      "trust_level": "bronze",
      "ventes_count": 28,
      "products_count": 1,
      "date_creation": "2023-02-15"
    },
    {
      "id": "SEL008",
      "nom": "Artisans de Ouahigouya",
      "type": "cooperative",
      "region": "Nord",
      "ville": "Ouahigouya",
      "telephone": "70 90 12 34",
      "email": "artisans-ohg@achetons.bf",
      "description": "Groupement d'artisans tresseurs du Nord du Burkina, specialises dans les paniers et objets decoratifs.",
      "categories": [
        "Artisanat"
      ],
      "trust_level": "argent",
      "ventes_count": 55,
      "products_count": 1,
      "date_creation": "2020-05-20"
    },
    {
      "id": "SEL009",
      "nom": "Fondeurs de Ouagadougou",
      "type": "artisan_individuel",
      "region": "Centre",
      "ville": "Ouagadougou",
      "telephone": "70 01 23 45",
      "email": "fondeurs-odg@achetons.bf",
      "description": "Maitres fondeurs de bronze utilisant la technique ancestrale de la cire perdue.",
      "categories": [
        "Artisanat"
      ],
      "trust_level": "or",
      "ventes_count": 230,
      "products_count": 1,
      "date_creation": "2016-01-01",
      "certification_cooperative": [
        "ABNORM"
      ]
    },
    {
      "id": "SEL010",
      "nom": "Sculpteurs de Bobo-Dioulasso",
      "type": "cooperative",
      "region": "Hauts-Bassins",
      "ville": "Bobo-Dioulasso",
      "telephone": "70 12 34 56",
      "email": "sculpteurs-bobo@achetons.bf",
      "description": "Sculpteurs traditionnels de Bobo-Dioulasso, capitale culturelle du Burkina Faso.",
      "categories": [
        "Artisanat"
      ],
      "trust_level": "argent",
      "ventes_count": 78,
      "products_count": 1,
      "date_creation": "2019-06-15"
    },
    {
      "id": "SEL011",
      "nom": "Artisanes de Dori",
      "type": "cooperative",
      "region": "Sahel",
      "ville": "Dori",
      "telephone": "70 23 45 67",
      "email": "artisanes-dori@achetons.bf",
      "description": "Artisanes du Sahel specialises dans les bijoux en perles traditionnelles.",
      "categories": [
        "Artisanat"
      ],
      "trust_level": "bronze",
      "ventes_count": 42,
      "products_count": 1,
      "date_creation": "2021-09-10"
    }
  ]
},
  trust_badges: {
  "trust_levels": [
    {
      "level": "bronze",
      "hex": "#CD7F32",
      "icon_svg": "images/icons/icon-bronze.svg",
      "threshold_ventes": {
        "min": 1,
        "max": 49
      },
      "threshold_avis_positifs": "60% minimum",
      "description": "Vendeur debutant avec confiance initiale. A complete entre 1 et 49 ventes avec un taux d'avis positifs de minimum 60%. Ce badge indique que le vendeur est actif sur la plateforme et que les premiers acheteurs ont donne des avis globalement positifs."
    },
    {
      "level": "argent",
      "hex": "#C0C0C0",
      "icon_svg": "images/icons/icon-argent.svg",
      "threshold_ventes": {
        "min": 50,
        "max": 199
      },
      "threshold_avis_positifs": "75% minimum",
      "description": "Vendeur etabli avec confiance renforce. A complete entre 50 et 199 ventes avec un taux d'avis positifs de minimum 75%. Ce badge signale un vendeur regulier qui a construit une reputation solide sur la plateforme."
    },
    {
      "level": "or",
      "hex": "#FFD700",
      "icon_svg": "images/icons/icon-or.svg",
      "threshold_ventes": {
        "min": 200,
        "max": null
      },
      "threshold_avis_positifs": "90% minimum",
      "description": "Vendeur premium avec confiance maximale. A complete 200 ventes ou plus avec un taux d'avis positifs de minimum 90%. Ce badge est la distinction supreme et indique un vendeur exceptionnel dont la qualite et le service sont reconnus."
    }
  ],
  "upgrade_logic": {
    "check_frequency": "a chaque nouvelle vente completee",
    "notification_on_upgrade": true,
    "downgrade_rules": "Pas de downgrade automatique, mais avis negatifs consecutifs peuvent signaler un probleme"
  }
},
  user_flows: {
  "flows": {
    "acheteur_complete": {
      "name": "Parcours Acheteur Complet",
      "steps": [
        {
          "step": 1,
          "page": "accueil",
          "action": "Arrivee homepage, voit categories et produits phares"
        },
        {
          "step": 2,
          "page": "produits",
          "action": "Click 'Decouvrir les produits' -> catalogue"
        },
        {
          "step": 3,
          "page": "produits",
          "action": "Recherche ou filtre -> trouve un produit"
        },
        {
          "step": 4,
          "page": "produit-detail",
          "action": "Click produit -> detail, tracabilite, certification"
        },
        {
          "step": 5,
          "page": "produit-detail",
          "action": "Click 'Ajouter au panier' -> toast confirmation"
        },
        {
          "step": 6,
          "page": "panier",
          "action": "Click panier header -> voit items + total"
        },
        {
          "step": 7,
          "page": "connexion",
          "action": "Click 'Valider' -> si non connecte, redirect connexion"
        },
        {
          "step": 8,
          "page": "connexion",
          "action": "Se connecte (beta account ou inscription)"
        },
        {
          "step": 9,
          "page": "checkout",
          "action": "Remplit infos livraison + confirme"
        },
        {
          "step": 10,
          "page": "checkout",
          "action": "Recu genere, historique mis a jour"
        },
        {
          "step": 11,
          "page": "historique",
          "action": "Voir historique, statut commande"
        }
      ],
      "target_time": "moins de 8 minutes"
    },
    "vendeur_complete": {
      "name": "Parcours Vendeur Complet",
      "steps": [
        {
          "step": 1,
          "page": "connexion",
          "action": "Connexion type vendeur"
        },
        {
          "step": 2,
          "page": "dashboard-vendeur",
          "action": "Vue stats: ventes, revenus, commandes en cours, stock"
        },
        {
          "step": 3,
          "page": "dashboard-vendeur",
          "action": "Section commandes -> nouvelle commande visible"
        },
        {
          "step": 4,
          "page": "dashboard-vendeur",
          "action": "Click 'Accepter' -> notification envoyee a acheteur"
        },
        {
          "step": 5,
          "page": "dashboard-vendeur",
          "action": "Section stock -> verifier quantites restantes"
        },
        {
          "step": 6,
          "page": "dashboard-vendeur",
          "action": "Section finance -> voir benefices et marges"
        },
        {
          "step": 7,
          "page": "notifications",
          "action": "Voir notifications trust upgrade si applicable"
        }
      ],
      "target_time": "moins de 3 minutes pour action principale"
    },
    "revendeur_complete": {
      "name": "Parcours Revendeur Complet",
      "steps": [
        {
          "step": 1,
          "page": "connexion",
          "action": "Connexion type revendeur"
        },
        {
          "step": 2,
          "page": "revendeur",
          "action": "Choisi type boutique (grande/petite) -> remises affichees"
        },
        {
          "step": 3,
          "page": "revendeur",
          "action": "Recherche produits bulk -> voit prix + remise"
        },
        {
          "step": 4,
          "page": "revendeur",
          "action": "Ajoute lots au panier -> calcul remise automatique"
        },
        {
          "step": 5,
          "page": "checkout",
          "action": "Checkout avec details remises et economies"
        }
      ]
    }
  }
},
};
window.EmbeddedData = EmbeddedData;

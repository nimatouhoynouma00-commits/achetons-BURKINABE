/* js/auth.js - Gestion connexion/inscription, sessions, permissions */

const Auth = {
  SESSION_KEY: 'session',

  /* Verifie si utilisateur connecte */
  isLoggedIn() {
    return Storage.getSession() !== null;
  },

  /* Recupere la session courante. Si l'utilisateur est un beta account,
   * enrichit la session avec historique_activite et notifications_recentes
   * provenant de Data.betaActivity (lorsque disponibles). */
  current() {
    const session = Storage.getSession();
    if (!session) return null;

    // Enrichissement beta : historique + notifications initiales
    if (session.beta && session.user_id && typeof Data !== 'undefined' && Data.betaActivity) {
      // On ne reecrase pas l'historique deja en session (evite les grosses sessions)
      // mais on expose les compteurs + l'historique a la demande.
      const hist = Data.getActivityForUser(session.user_id);
      const notifs = Data.getNotificationsForUser(session.user_id);
      session.historique_activite = hist || [];
      session.notifications_recentes = notifs || [];
    }
    return session;
  },

  /* ====================================================================
   * BUG 1 - login() : priorite email exact > telephone exact, et en cas de
   * collision ( meme email ou tel sur plusieurs comptes ), on prend celui
   * du type demande. Retourne un message d'erreur clair si ambiguite.
   * ==================================================================== */
  async login(type, identifier, password) {
    if (!identifier || !password) {
      return { success: false, error: 'Veuillez remplir tous les champs' };
    }
    if (password.length < 4) {
      return { success: false, error: 'Mot de passe trop court (4 caracteres minimum)' };
    }
    if (!type) {
      return { success: false, error: 'Type de compte manquant' };
    }

    // 1) Recherche par email EXACT
    let matches = Data.betaAccounts.filter(a => a.email && a.email === identifier);

    // 2) Si rien, recherche par telephone EXACT (comparaison normalisee)
    if (!matches.length) {
      const norm = s => String(s || '').replace(/[\s+]/g, '');
      const idNorm = norm(identifier);
      matches = Data.betaAccounts.filter(a => norm(a.telephone) === idNorm);
    }

    let betaAccount = null;
    if (matches.length === 1) {
      betaAccount = matches[0];
    } else if (matches.length > 1) {
      // Collision : on privilegie le compte du type demande
      betaAccount = matches.find(a => a.type === type) || null;
      if (!betaAccount) {
        return {
          success: false,
          error: 'Identifiant ambigu (' + matches.length + ' comptes). Précisez un email.'
        };
      }
    }

    let session;
    if (betaAccount) {
      // Verifie la coherence du type demande
      if (betaAccount.type !== type) {
        return {
          success: false,
          error: 'Ce compte est de type ' + betaAccount.type + ', pas ' + type
        };
      }
      session = Auth._buildSessionFromBetaAccount(betaAccount);
    } else {
      // Si identifiant correspond a un vendeur connu (Data.sellers), on l'utilise
      const seller = Data.sellers.find(s =>
        s.email === identifier || String(s.telephone || '').replace(/[\s+]/g, '') === String(identifier || '').replace(/[\s+]/g, '')
      );
      if (seller && type === 'vendeur') {
        session = {
          user_id: seller.id,
          user_type: 'vendeur',
          user_name: seller.nom,
          email: seller.email,
          telephone: seller.telephone,
          ville: seller.ville,
          region: seller.region,
          trust_level: seller.trust_level,
          ventes_count: seller.ventes_count,
          login_time: new Date().toISOString(),
          beta: true
        };
      } else {
        // Sinon on cree un compte temporaire (mode beta tolerant)
        session = {
          user_id: 'user_' + Utils.uuid(),
          user_type: type,
          user_name: identifier.split('@')[0] || identifier,
          email: identifier,
          telephone: '',
          ville: '',
          region: '',
          trust_level: type === 'vendeur' ? 'bronze' : null,
          ventes_count: 0,
          achats_count: 0,
          login_time: new Date().toISOString(),
          beta: true
        };
      }
    }

    Storage.setSession(session);

    // Initialise Storage activity/notifications pour les beta accounts
    if (betaAccount) {
      Auth._seedBetaStorage(betaAccount.id);
    }

    return { success: true, session };
  },

  /* Construit une session a partir d'un beta account */
  _buildSessionFromBetaAccount(account) {
    return {
      user_id: account.id,
      user_type: account.type,
      user_name: account.nom,
      email: account.email,
      telephone: account.telephone,
      ville: account.ville,
      region: account.region,
      trust_level: account.trust_level || Utils.getTrustLevel(account.ventes_count || 0),
      ventes_count: account.ventes_count || 0,
      achats_count: account.achats_count || 0,
      login_time: new Date().toISOString(),
      beta: true,
      boutique_type: account.boutique_type || null,
      description_courte: account.description_courte || null
    };
  },

  /* Initialise Storage (notifications_<userId>, activity_<userId>) pour un
   * beta account, depuis Data.betaActivity. N'ecrase pas les donnees deja
   * presentes (idempotent). */
  _seedBetaStorage(userId) {
    if (!userId) return;
    try {
      // Notifications initiales
      const existingNotifs = Storage.get('notifications_' + userId, null);
      if (existingNotifs === null) {
        const seedNotifs = (typeof Data !== 'undefined' && Data.getNotificationsForUser)
          ? Data.getNotificationsForUser(userId)
          : [];
        if (seedNotifs && seedNotifs.length) {
          Storage.set('notifications_' + userId, seedNotifs);
        }
      }

      // Activite initiale
      const existingActivity = Storage.get('activity_' + userId, null);
      if (existingActivity === null) {
        const seedActivity = (typeof Data !== 'undefined' && Data.getActivityForUser)
          ? Data.getActivityForUser(userId)
          : [];
        if (seedActivity && seedActivity.length) {
          Storage.set('activity_' + userId, seedActivity);
        }
      }
    } catch (e) {
      console.warn('[Auth._seedBetaStorage] erreur pour', userId, e);
    }
  },

  /* ====================================================================
   * BUG 3 - Inscription. Supporte acheteur / vendeur / revendeur.
   * Pour 'revendeur', formData.boutique_type doit valoir
   * 'grande_boutique' ou 'petite_boutique'.
   * ==================================================================== */
  async register(type, formData) {
    if (!['acheteur', 'vendeur', 'revendeur'].includes(type)) {
      return { success: false, error: 'Type de compte invalide: ' + type };
    }
    if (!formData.nom || formData.nom.length < 2) {
      return { success: false, error: 'Nom trop court' };
    }
    if (!Utils.isValidEmail(formData.email)) {
      return { success: false, error: 'Email invalide' };
    }
    if (!Utils.isValidPhone(formData.telephone)) {
      return { success: false, error: 'Telephone invalide (8 chiffres)' };
    }
    if (!formData.password || formData.password.length < 4) {
      return { success: false, error: 'Mot de passe trop court (4 caracteres minimum)' };
    }

    // Verifie qu'aucun beta account n'utilise deja cet email/tel
    const norm = s => String(s || '').replace(/[\s+]/g, '');
    const emailClash = Data.betaAccounts.some(a => a.email === formData.email);
    const telClash = Data.betaAccounts.some(a => norm(a.telephone) === norm(formData.telephone));
    if (emailClash) {
      return { success: false, error: 'Cet email est deja utilise par un compte beta' };
    }
    if (telClash) {
      return { success: false, error: 'Ce telephone est deja utilise par un compte beta' };
    }

    // Validation specifique revendeur : boutique_type requis
    if (type === 'revendeur') {
      const allowedBoutiques = ['grande_boutique', 'petite_boutique'];
      if (!allowedBoutiques.includes(formData.boutique_type)) {
        return {
          success: false,
          error: 'boutique_type invalide (grande_boutique ou petite_boutique requis)'
        };
      }
    }

    const session = {
      user_id: 'user_' + Utils.uuid(),
      user_type: type,
      user_name: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      ville: formData.ville || '',
      region: formData.region || '',
      trust_level: type === 'vendeur' ? 'bronze' : null,
      ventes_count: 0,
      achats_count: 0,
      login_time: new Date().toISOString(),
      beta: false,
      categories: formData.categories || [],
      type_vendeur: formData.type_vendeur || null,
      boutique_type: type === 'revendeur' ? formData.boutique_type : null,
      registered_at: new Date().toISOString()
    };

    Storage.setSession(session);

    // Log l'inscription dans l'activite
    if (Storage.addActivity) {
      Storage.addActivity(session.user_id, {
        date: new Date().toISOString(),
        type: 'inscription',
        detail: 'Inscription compte ' + type + ' (' + (formData.boutique_type || 'n/a') + ')'
      });
    }

    return { success: true, session };
  },

  /* ====================================================================
   * BUG 2 - betaLogin() verifie le type si expectedType est fourni.
   * ==================================================================== */
  betaLogin(accountId, expectedType) {
    const account = Data.betaAccounts.find(a => a.id === accountId);
    if (!account) {
      return { success: false, error: 'Compte beta introuvable' };
    }
    if (expectedType && account.type !== expectedType) {
      return {
        success: false,
        error: 'Ce compte beta est de type ' + account.type + ', pas ' + expectedType
      };
    }

    const session = Auth._buildSessionFromBetaAccount(account);
    Storage.setSession(session);

    // Initialise Storage activity/notifications pour ce beta account
    Auth._seedBetaStorage(account.id);

    return { success: true, session };
  },

  logout() {
    Storage.clearSession();
  },

  /* Redirige selon le type utilisateur */
  redirectByType(session) {
    session = session || Auth.current();
    if (!session) {
      window.location.href = 'connexion.html';
      return;
    }
    if (session.user_type === 'vendeur') {
      window.location.href = 'dashboard-vendeur.html';
    } else if (session.user_type === 'revendeur') {
      window.location.href = 'revendeur.html';
    } else {
      window.location.href = 'dashboard-acheteur.html';
    }
  },

  /* Verifie permission pour une page */
  requireAuth(allowedTypes = null) {
    const session = Auth.current();
    if (!session) {
      const msg = encodeURIComponent('Connectez-vous pour acceder a cette page');
      window.location.href = 'connexion.html?message=' + msg;
      return null;
    }
    if (allowedTypes && !allowedTypes.includes(session.user_type)) {
      window.location.href = 'index.html';
      return null;
    }
    return session;
  },

  /* Permission check */
  can(permission) {
    const session = Auth.current();
    if (!session) return false;
    const perms = {
      acheteur: ['browse_products', 'add_to_cart', 'checkout', 'view_history', 'contact_seller', 'leave_review'],
      vendeur: ['manage_products', 'manage_stock', 'view_orders', 'accept_reject_orders', 'view_dashboard', 'manage_boutique'],
      revendeur: ['browse_bulk', 'bulk_checkout', 'manage_boutique', 'view_dashboard']
    };
    return (perms[session.user_type] || []).includes(permission);
  }
};

window.Auth = Auth;

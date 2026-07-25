/* js/notifications.js - Systeme de notifications locales */

const Notifications = {
  /* Charge les notifs d'un user */
  list(userId) {
    return Storage.getNotifications(userId || Auth.current()?.user_id);
  },

  /* Marque toutes comme lues */
  markAllRead(userId) {
    Storage.markAllNotificationsRead(userId || Auth.current()?.user_id);
  },

  /* Marque une notif comme lue */
  markRead(userId, notifId) {
    Storage.markNotificationRead(userId, notifId);
  },

  /* Rendu liste notifications */
  renderList(container, filter = 'toutes') {
    const session = Auth.current();
    if (!session) return;
    const all = Notifications.list(session.user_id);

    const typeConfig = {
      order_received: { icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>', color: 'success' },
      order_accepted: { icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>', color: 'success' },
      order_refused: { icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>', color: 'error' },
      order_delivered: { icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>', color: 'success' },
      stock_low: { icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>', color: 'warning' },
      expiry_warning: { icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', color: 'error' },
      new_review: { icon: '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', color: 'info' },
      trust_upgrade: { icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>', color: 'info' },
      message_received: { icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>', color: 'info' }
    };

    // Mapping type -> categorie pour les filtres (gerer 'expiry' distinctement)
    const typeToCategory = {
      order_received: 'order', order_accepted: 'order',
      order_refused: 'order', order_delivered: 'order',
      stock_low: 'stock',
      expiry_warning: 'expiry',
      trust_upgrade: 'trust',
      message_received: 'message',
      new_review: 'message'
    };
    const filtered = filter === 'toutes'
      ? all
      : all.filter(n => typeToCategory[n.type] === filter || (n.type && n.type.startsWith(filter)));

    if (!filtered.length) {
      container.innerHTML = `
        <div class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <h3>Aucune notification</h3>
          <p>Vous serez notifie ici des qu'il y aura du nouveau.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(n => {
      const cfg = typeConfig[n.type] || { icon: '', color: 'info' };
      return `
        <div class="notif-item card ${n.read ? 'read' : 'unread'}" data-notif-id="${n.id}">
          <div class="notif-icon notif-${cfg.color}">${cfg.icon}</div>
          <div class="notif-body">
            <div class="notif-header">
              <strong>${Utils.escapeHtml(n.title)}</strong>
              <span class="text-caption">${Utils.formatDate(n.created_at)}</span>
            </div>
            <p class="text-sm">${Utils.escapeHtml(n.message)}</p>
            ${n.link ? `<a href="${n.link}" class="btn btn-ghost btn-sm">Voir</a>` : ''}
          </div>
          ${!n.read ? '<span class="status-dot info" aria-label="Non lu"></span>' : ''}
        </div>
      `;
    }).join('');
  }
};

window.Notifications = Notifications;

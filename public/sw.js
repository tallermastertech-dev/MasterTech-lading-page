// Service Worker para Notificaciones Push en Segundo Plano (Taller MasterTech)
// Permite recibir y mostrar notificaciones de citas y recordatorios incluso con la página o pestaña cerrada.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listener para notificaciones push enviadas desde el servidor
self.addEventListener('push', (event) => {
  let data = { title: '🔔 Taller MasterTech', body: 'Tienes un nuevo recordatorio o cita agendada.', tag: 'mastertech-notif' };
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || 'Recordatorio de Cita Taller MasterTech',
    icon: '/logo.png',
    badge: '/logo.png',
    tag: data.tag || `mastertech-${Date.now()}`,
    renotify: true,
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/admin'
    }
  };

  event.waitUntil(self.registration.showNotification(data.title || '🔔 Recordatorio Taller MasterTech', options));
});

// Evento al hacer clic en la notificación: abre o enfoca el Panel Ejecutivo
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('admin') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/admin');
      }
    })
  );
});

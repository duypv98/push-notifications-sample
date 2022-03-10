console.log('[Service Worker] loaded');

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('[Push Notification] received');
  self.registration.showNotification(data.title, {
    body: 'Notified',
    icon: 'https://i.ibb.co/yRhGWrP/ks-Ntj-PCn-DL3s.jpg'
  });
})
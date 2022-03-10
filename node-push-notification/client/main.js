
const publicVapidKey = 'BORm_4DSCLKrBWu38W51jmS_C8nevyqW7ENUjq5hLcFBJFurMRdpXmCBgKU5XeubEXu4NuKXfcW3mxPFm7o13bs';

// Check service worker for register
if ('serviceWorker' in navigator) {
  send().catch((err) => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  // Register SW
  console.log('[Service Worker] registering...');
  const register = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  console.log('[Service Worker] registered');

  // Register Push Subscription
  console.log('[Push Notifications] registering push subscription...');
  const subsciption = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey
  });

  // Send push notification
  console.log('[Push Notification] sending...');
  await fetch('/subscribe', {
    method: "POST",
    body: JSON.stringify(subsciption),
    headers: {
      'content-type': 'application/json'
    }
  });
  console.log('[Push Notification] sent');
}
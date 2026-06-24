/* =========================
MOYO APP - FCM SERVICE WORKER
BACKGROUND PUSH NOTIFICATIONS
========================= */

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

/* 🔥 FIREBASE CONFIG (REPLACE WITH YOURS) */
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
});

const messaging = firebase.messaging();

/* =========================
BACKGROUND NOTIFICATION HANDLER
========================= */
messaging.onBackgroundMessage((payload) => {

  console.log("Background message received:", payload);

  const title = payload.notification?.title || "Moyo App";
  const options = {
    body: payload.notification?.body || "New update available",
    icon: "/icon.png",
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});

/* =========================
NOTIFICATION CLICK
========================= */
self.addEventListener("notificationclick", (event) => {

  event.notification.close();

  const url = event.notification.data?.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clientsArr) => {

        for (const client of clientsArr) {
          if (client.url.includes(url) && "focus" in client) {
            return client.focus();
          }
        }

        return clients.openWindow(url);
      })
  );
});
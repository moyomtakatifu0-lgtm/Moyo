/* ======================================================
   MOYO APP SERVICE WORKER
   VERSION: v5 (PRODUCTION FINAL)
   FIREBASE v9 SAFE ARCHITECTURE
====================================================== */

const CACHE_NAME = "moyo-app-v5";

/* =========================
   APP SHELL (STATIC FILES)
========================= */
const ASSETS = [
  "/",
  "/index.html",

  "/pages/login.html",
  "/pages/menu.html",
  "/pages/offline.html",

  "/pages/devotion/home.html",
  "/pages/book-library.html",
  "/pages/book-reader.html",
  "/pages/chapter-list.html",

  "/app/assets/css/global.css",
  "/app/assets/img/fallback.png"
];

/* =========================
   INSTALL EVENT (SAFE CACHE)
========================= */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {

      for (const asset of ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn("Cache failed:", asset);
        }
      }

    })
  );

  self.skipWaiting();
});

/* =========================
   ACTIVATE EVENT (CLEAN OLD CACHE)
========================= */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );

  self.clients.claim();
});

/* =========================
   FETCH WITH TIMEOUT
========================= */
function fetchWithTimeout(request, timeout = 8000) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) =>
      setTimeout(() => reject("timeout"), timeout)
    )
  ]);
}

/* =========================
   CACHE LIMIT CONTROL
========================= */
async function limitCacheSize(cacheName, maxItems = 60) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    limitCacheSize(cacheName, maxItems);
  }
}

/* =========================
   FETCH STRATEGY
========================= */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  /* NAVIGATION REQUEST */
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/pages/offline.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetchWithTimeout(req)
        .then((res) => {
          const clone = res.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, clone);

            // prevent cache explosion
            limitCacheSize(CACHE_NAME);
          });

          return res;
        })
        .catch(() => {

          /* IMAGE FALLBACK */
          if (req.destination === "image") {
            return caches.match("/app/assets/img/fallback.png");
          }

          /* GENERIC OFFLINE RESPONSE */
          return new Response(
            "Offline - content not available",
            { status: 503, statusText: "Offline" }
          );
        });
    })
  );
});

/* =========================
   BACKGROUND SYNC (CLIENT TRIGGER)
========================= */
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-scheduler") {
    event.waitUntil(notifyClients());
  }
});

/* =========================
   SEND MESSAGE TO CLIENT
========================= */
async function notifyClients() {
  const clients = await self.clients.matchAll();

  for (const client of clients) {
    client.postMessage({
      type: "SYNC_SCHEDULER_REQUEST"
    });
  }
}

/* =========================
   PUSH EVENT (OPTIONAL FUTURE USE)
========================= */
self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {}

  const title = data.title || "Moyo App";
  const options = {
    body: data.body || "New update available",
    icon: "/app/assets/img/icon.png",
    badge: "/app/assets/img/icon.png"
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
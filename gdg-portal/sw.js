/**
 * Minimal service worker: caches the app shell so the site (including
 * localStorage-backed data views) still loads offline. HTML pages use
 * network-first (so content updates show up immediately when online);
 * static assets use cache-first (they rarely change, and this keeps
 * things fast).
 */

const CACHE_NAME = "gdg-vitc-portal-v1";

const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/departments.html",
  "/dept.html",
  "/apply.html",
  "/status.html",
  "/admin.html",
  "/leaderboard.html",
  "/updates.html",
  "/offline.html",

  "/css/style.css",
  "/css/hero.css",
  "/css/departments.css",
  "/css/dept.css",
  "/css/form.css",
  "/css/community.css",
  "/css/leaderboard.css",

  "/js/main.js",
  "/js/countdown.js",
  "/js/storage.js",
  "/js/departments-data.js",
  "/js/departments.js",
  "/js/dept.js",
  "/js/team-data.js",
  "/js/events-data.js",
  "/js/community.js",
  "/js/form.js",
  "/js/status.js",
  "/js/admin.js",
  "/js/analytics.js",
  "/js/leaderboard-data.js",
  "/js/leaderboard.js",

  "/assets/img/gdg.svg",
  "/assets/img/icon-192.png",
  "/assets/img/icon-512.png",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const isHTML = request.mode === "navigate" || request.headers.get("accept")?.includes("text/html");

  if (isHTML) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("/offline.html"))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return res;
      });
    })
  );
});

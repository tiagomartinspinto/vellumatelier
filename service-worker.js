const CACHE_NAME = "vellum-atelier-v20260601-1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles/app.css?v=20260601-1",
  "./src/app/dom.mjs?v=20260601-1",
  "./src/app/export-utils.mjs?v=20260601-1",
  "./src/app/review-checks.mjs?v=20260601-1",
  "./src/app/service-worker-client.mjs?v=20260601-1",
  "./src/app/ui.mjs?v=20260601-1",
  "./src/main.mjs?v=20260601-1",
  "./src/data/reference-data.mjs?v=20260601-1",
  "./src/lib/storage.mjs?v=20260601-1",
  "./src/lib/reference-utils.mjs?v=20260601-1",
  "./src/lib/text-utils.mjs?v=20260601-1",
  "./manifest.webmanifest?v=20260601-1",
  "./assets/icon.svg?v=20260601-1",
];

function isAppShellRequest(requestUrl) {
  return (
    requestUrl.origin === self.location.origin &&
    (
      requestUrl.pathname.endsWith("/") ||
      requestUrl.pathname.endsWith("/index.html") ||
      requestUrl.pathname.endsWith(".css") ||
      requestUrl.pathname.endsWith(".js") ||
      requestUrl.pathname.endsWith(".mjs") ||
      requestUrl.pathname.endsWith(".webmanifest") ||
      requestUrl.pathname.endsWith(".svg")
    )
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      ),
    ),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);

  if (event.request.mode === "navigate" || isAppShellRequest(requestUrl)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    }),
  );
});

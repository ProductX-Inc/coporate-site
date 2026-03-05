// ProductX Service Worker — Cache-first for static assets, network-first for pages
const CACHE_NAME = "productx-v1";
const STATIC_ASSETS = ["/", "/images/logo.png", "/images/favicon.png"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    // Skip non-GET & chrome-extension
    if (request.method !== "GET" || request.url.startsWith("chrome-extension")) return;

    // Network-first for HTML pages
    if (request.headers.get("accept")?.includes("text/html")) {
        event.respondWith(
            fetch(request)
                .then((res) => {
                    const clone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
                    return res;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // Cache-first for static assets
    event.respondWith(
        caches.match(request).then((cached) => cached || fetch(request))
    );
});

const SHELL_CACHE_NAME = "menu-export-shell-1774256761188";
const SPRITE_CACHE_NAME = "menu-export-sprites-1774256761188";
const CACHE_PREFIX = "menu-export-";
const PRECACHE_URLS = ["./","index.html","app.js?v=1774256761188","runtime-manifest.json?v=1774256761188","styles.css?v=1774256761188","favicon.png?v=1774256761188","visual_onboarding/circular_motion_arrows.png?v=1774256761188","visual_onboarding/hor_ver_motion_arrows.png?v=1774256761188","visual_onboarding/horizontal_motion_arrows.png?v=1774256761188","visual_onboarding/pointing_hand.png?v=1774256761188","visual_onboarding/sample_2d_dish.png?v=1774256761188"];
const resolvePrecacheRequestUrl = (value) => new URL(value, self.location.href).href;
const PRECACHE_REQUEST_URLS = new Set(PRECACHE_URLS.map(resolvePrecacheRequestUrl));
const isSameOrigin = (url) => url.origin === self.location.origin;
const isInteractiveDetailRequest = (url) =>
  isSameOrigin(url) &&
  /\/assets\/items\/.+-int-(?:sprite\.webp|alpha\.(?:webm|mp4))$/i.test(url.pathname);

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE_NAME);
      await cache.addAll(PRECACHE_URLS);
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!key.startsWith(CACHE_PREFIX)) return Promise.resolve();
          if (key === SHELL_CACHE_NAME || key === SPRITE_CACHE_NAME) return Promise.resolve();
          return caches.delete(key);
        })
      );
      await self.clients.claim();
    })()
  );
});

const readShellCache = async (request) => {
  const cache = await caches.open(SHELL_CACHE_NAME);
  return (await cache.match(request)) ?? (await cache.match("index.html"));
};

const handleNavigationRequest = async (request) => {
  try {
    return await fetch(request);
  } catch {
    return (
      (await readShellCache(request)) ??
      new Response("Offline", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      })
    );
  }
};

const handleShellAssetRequest = async (request) => {
  const cache = await caches.open(SHELL_CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
  }
  return response;
};

const handleInteractiveDetailRequest = async (request) => {
  const cache = await caches.open(SPRITE_CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
  }
  return response;
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (!isSameOrigin(url)) return;
  if (request.mode === "navigate") {
    event.respondWith(handleNavigationRequest(request));
    return;
  }
  if (isInteractiveDetailRequest(url)) {
    event.respondWith(handleInteractiveDetailRequest(request));
    return;
  }
  if (PRECACHE_REQUEST_URLS.has(url.href)) {
    event.respondWith(handleShellAssetRequest(request));
  }
});
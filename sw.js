const STATIC_CACHE = 'masquemagos-static-v1';
const IMAGE_CACHE  = 'masquemagos-images-v1';

const APP_SHELL = [
  '/index.html', '/empresas.html',
  '/css/global.css', '/css/home.css', '/css/empresas.css',
  '/js/main.js', '/manifest.json', '/images/home/logo.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(STATIC_CACHE).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => ![STATIC_CACHE, IMAGE_CACHE].includes(k)).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  if (new URL(request.url).origin !== location.origin) return;
  if (request.destination === 'image')  { e.respondWith(cacheFirst(request, IMAGE_CACHE));  return; }
  if (['style','script','font'].includes(request.destination)) { e.respondWith(cacheFirst(request, STATIC_CACHE)); return; }
  if (request.destination === 'document') { e.respondWith(networkFirst(request)); return; }
});

async function cacheFirst(req, cacheName) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) (await caches.open(cacheName)).put(req, res.clone());
    return res;
  } catch { return new Response('', { status: 200 }); }
}

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res.ok) (await caches.open(STATIC_CACHE)).put(req, res.clone());
    return res;
  } catch {
    return (await caches.match(req)) || caches.match('/index.html');
  }
}

// sw.js
const CACHE = "if-then-v4"; // <- change the number each time you deploy
const ASSETS = ["./", "index.html", "manifest.webmanifest"];

self.addEventListener("install", (e) => {
  self.skipWaiting(); // activate new SW without waiting
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim()) // new SW takes control of open pages
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});

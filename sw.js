/* L3 Exam Focus Notes: offline cache. Build 20260929201837 */
var V = 'efn-20260929201837';
var CORE = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];
var EXT = ['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Literata:opsz,wght@7..72,400;7..72,600&display=swap'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(V).then(function(c){
    return Promise.all(CORE.map(function(u){ return fetch(u, {cache:'reload'}).then(function(r){ if (r.ok) return c.put(u, r); }).catch(function(){}); }).concat(
      EXT.map(function(u){ var same = u.indexOf('http') !== 0; return fetch(u, same ? {} : {mode:'no-cors'}).then(function(r){ return c.put(u, r); }).catch(function(){}); })));
  }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k !== V; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  var req = e.request; if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (req.mode === 'navigate' && url.origin === location.origin) {
    e.respondWith(caches.open(V).then(function(c){
      return c.match('./index.html').then(function(hit){
        var net = fetch(req).then(function(r){ if (r.ok && r.type === 'basic') c.put('./index.html', r.clone()); return r; }).catch(function(){ return null; });
        return hit || net.then(function(r){ return r || Response.error(); });
      });
    }));
    return;
  }
  var cacheable = url.origin === location.origin || /(^|\.)cdnjs\.cloudflare\.com$|fonts\.googleapis\.com$|fonts\.gstatic\.com$/.test(url.hostname);
  if (!cacheable) return;
  e.respondWith(caches.open(V).then(function(c){
    return c.match(req).then(function(hit){
      if (hit) return hit;
      return fetch(req).then(function(r){ if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; });
    });
  }));
});

const V='ne-v3',SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL).catch(()=>{})).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('ne-v')&&x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 const mine=u.origin===location.origin,cdn=['cdn.jsdelivr.net','fonts.googleapis.com','fonts.gstatic.com'].includes(u.hostname);
 if(!mine&&!cdn)return;
 if(mine&&(r.mode==='navigate'||u.pathname.endsWith('index.html')||u.pathname.endsWith('/'))){
  e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(ca=>ca.put('./index.html',c));return x}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(ca=>ca.put(r,c))}return x})));
});

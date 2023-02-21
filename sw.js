const cacheName = "cache1"; // Change value to force update

self.addEventListener("install", event => {
	// Kick out the old service worker
	self.skipWaiting();

	event.waitUntil(
		caches.open(cacheName).then(cache => {
			return cache.addAll([
				"/",
				"icon/36.png", // Favicon, Android Chrome M39+ with 0.75 screen density
				"icon/48.png", // Favicon, Android Chrome M39+ with 1.0 screen density
				"icon/72.png", // Favicon, Android Chrome M39+ with 1.5 screen density
				"icon/96.png", // Favicon, Android Chrome M39+ with 2.0 screen density
				"icon/144.png", // Favicon, Android Chrome M39+ with 3.0 screen density
				"icon/192.png", // Favicon, Android Chrome M39+ with 4.0 screen density
				"icon/256.png", // Favicon, Android Chrome M47+ Splash screen with 1.5 screen density
				"icon/384.png", // Favicon, Android Chrome M47+ Splash screen with 3.0 screen density
				"icon/512.png", // Favicon, Android Chrome M47+ Splash screen with 4.0 screen density
				"/icon/apple-touch-icon.png", // Favicon, Apple default
				"icon/57.png", // Apple iPhone, Non-retina with iOS6 or prior
				"icon/60.png", // Apple iPhone, Non-retina with iOS7
				"icon/72.png", // Apple iPad, Non-retina with iOS6 or prior
				"icon/76.png", // Apple iPad, Non-retina with iOS7
				"icon/114.png", // Apple iPhone, Retina with iOS6 or prior
				"icon/120.png", // Apple iPhone, Retina with iOS7
				"icon/144.png", // Apple iPad, Retina with iOS6 or prior
				"icon/152.png", // Apple iPad, Retina with iOS7
				"icon/180.png", // Apple iPhone 6 Plus with iOS8
				"browserconfig.xml", // IE11 icon configuration file
				"favicon.ico", // Favicon, IE and fallback for other browsers
				"icon/16.png", // Favicon, default
				"icon/32.png", // Favicon, Safari on Mac OS
				"index.html", // Main HTML file
				"icon/logo.png", // Logo
				"main.js", // Main Javascript file
				"manifest.json", // Manifest file
				"maskable_icon.png", // Favicon, maskable https://web.dev/maskable-icon
				"mstile-70x70.png", // Favicon, Windows 8 / IE11
				"mstile-144x144.png", // Favicon, Windows 8 / IE10
				"mstile-150x150.png", // Favicon, Windows 8 / IE11
				"mstile-310x150.png", // Favicon, Windows 8 / IE11
				"mstile-310x310.png", // Favicon, Windows 8 / IE11
				"safari-pinned-tab.svg", // Favicon, Safari pinned tab
				"icon/share.jpg", // Social media sharing
				"style.css", // Main CSS file
			]);
		})
	);
});

self.addEventListener("activate", event => {
	// Delete any non-current cache
	event.waitUntil(
		caches.keys().then(keys => {
			Promise.all(
				keys.map(key => {
					if (![cacheName].includes(key)) {
						return caches.delete(key);
					}
				})
			)
		})
	);
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data. 
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open(cacheName).then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			})
		})
	);
});
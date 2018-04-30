this.addEventListener('install', function(e) {
  console.log("Service worker installed");
});

this.addEventListener('activate', function(e) {
  console.log("Service worker activated");
});

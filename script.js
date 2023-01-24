$( document ).ready(function (){
let ip = "";
$.getJSON("https://api.ipify.org?format=json", function(data) {
  ip = data.ip;
});
$.ajax({url: "https://ipapi.co/" + ip + "/json/",
     async: false,
     dataType: "json",
     success: function(data) {
     var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);
     
     var map = L.map('map', {
       center: bounds.getCenter(),
       maxBounds: bounds,
       maxBoundsViscosity: 1.0
     }).setView([data.latitude, data.longitude], 13);
     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(map);
     $.ajax({
       url: "https://geostore.supremestdoggo.repl.co/?lat=" + data.latitude.toString() + "&long=" + data.longitude.toString(),
       method: "POST"
     })
     $.getJSON("https://geostore.supremestdoggo.repl.co/", function(data) {
  for (let i = 0; i < data.length; i++) {
    let marker = L.marker([data[i].latitude, data[i].longitude]).addTo(map);
  }
});
}})
})

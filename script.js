$( document ).ready(function (){
let ip = "";
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
$.getJSON("https://api.ipify.org?format=json", function(data) {
  ip = data.ip;
});
$.ajax({url: "https://ipapi.co/" + ip + "/json/",
     async: false,
     dataType: "json",
     success: function(data) {
     var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);
     var bounds = L.latLngBounds(southWest, northEast);
     var map = L.map('map', {
       center: bounds.getCenter(),
       maxBounds: bounds,
       maxBoundsViscosity: 1.0,
       minZoom: 1
     }).setView([data.latitude, data.longitude], 10);
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
    let marker = L.marker([data[i].latitude, data[i].longitude], {icon: blueIcon}).addTo(map);
  }
});
}})
})

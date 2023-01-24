$( document ).ready(function (){
let ip = "";
$.getJSON("https://api.ipify.org?format=json", function(data) {
  ip = data.ip;
});
$.ajax({url: "https://ipapi.co/" + ip + "/json/",
     async: false,
     dataType: "json",
     success: function(data) {
     var map = L.map('map').setView([data.latitude, data.longitude], 13);
     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(map);
     $.ajax({
       url: "https://geostore.supremestdoggo.repl.co/?lat=" + data.latitude.toString() + "&long=" + data.longitude.toString(),
       method: "POST"
     })
     $.getJSON("https://geostore.supremestdoggo.repl.co/", function(data) {
  console.log(data);
});
}})
})
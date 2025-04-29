(function(){
    'use strict';

    // add your script here
    var map = L.map('map').setView([37.774929, -122.419418], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([37.774929, -122.419418]).addTo(map);

    var circle = L.circle([37.774785, -122.451511], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);

    var polygon = L.polygon([
        [37.770579, -122.510417],
        [37.76393, -122.509902],
        [37.765558, -122.477966],
        [37.771258, -122.480198]
    ]).addTo(map);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    var popup = L.popup()
        .setLatLng([37.774929, -122.419418])
        .setContent("I am a standalone popup.")
        .openOn(map);

    function onMapClick(e) {
        alert("You clicked the map at " + e.latlng);
    }

    map.on('click', onMapClick);

    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);
}());
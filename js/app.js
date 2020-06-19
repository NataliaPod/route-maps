'use strict';

let start = document.querySelector('[data-start]');
let destination = document.querySelector('[data-destination]');
let defaultPosition = {
    lat: 49.583120,
    lng: 34.582619
};

function initMap() {
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    let infoWindow = new google.maps.InfoWindow;
    let bounds = new google.maps.LatLngBounds();

    let map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 15,
        center: defaultPosition,
        disableDefaultUI: true
    });

    let marker = new google.maps.Marker({
        position: defaultPosition,
        map: map
    });
    directionsRenderer.setMap(map);
    function calcRoute() {
        const routeRequest = {
            origin: start.value,
            destination: destination.value,
            travelMode: 'DRIVING'
        };
        directionsService.route(routeRequest, function (result, status) {
            directionsRenderer.setDirections(result);
        });
    }
    function newRoute(event) {
        event.preventDefault();
        if (marker != undefined) {
            marker.setMap(null);
        }
        calcRoute();
    }
    const sendRoute = document.querySelector('.ba-map');
    sendRoute.addEventListener('submit', newRoute);
}
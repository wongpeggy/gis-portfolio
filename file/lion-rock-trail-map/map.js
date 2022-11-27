// map.js
// Author: Peggy Wong
// Date Created: Feb 01, 2022
// Date Modified: Feb 02, 2022

function initMap() {
    // Create a new map and hide the labels of point of interest
    // Reference: https://developers.google.com/maps/documentation/javascript/reference/map#Map
    // Reference: https://developers.google.com/maps/documentation/javascript/reference/map#MapTypeStyle
    // Example: https://developers.google.com/maps/documentation/javascript/examples/map-simple
    // Example: https://developers.google.com/maps/documentation/javascript/examples/hiding-features
    const map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 22.3523,
        lng: 114.1870
      },
      zoom: 15,
      styles: [{
        featureType: "poi",
        elementType: "labels",
        stylers: [{
          visibility: "off"
        }]
      }]
    });
    // Create a new instance of a DirectionsService to send directions queries to Google servers
    // Reference: https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsService
    const directionsService = new google.maps.DirectionsService();
    // Create DirectionsRenderer with the option of suppressing direction markers
    // Reference: https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRenderer
    // Reference: https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsRendererOptions
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
    // Call setMap() on the renderer to bind it to the passed map, and then call calculateAndDisplayRoute()
    // Reference: https://developers.google.com/maps/documentation/javascript/directions#DisplayingResults
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    // Create an array of numbers used to label the markers
    // Example: https://developers.google.com/maps/documentation/javascript/examples/marker-labels
    const labels = "123456789";
    let labelIndex = 0;
    // Create an array of marker properties, including latitude, longitude, and infowindow content
    // Example: https://github.com/FlemingGeom/googlemaps-shawnmflemingc/blob/main/clustering/clustering.js
    const markerInfoList = [{
        lat: 22.3497609255,
        lng: 114.1939888133,
        info: "<img src='img/fat-jong-temple.jpg'><p><b>Temple Hill Fat Jong Temple</b><p>Elevation: 140m</p><p>Progress: 0.0km/4.7km</p>"
      },
      {
        lat: 22.3555093106,
        lng: 114.1988428342,
        info: "<img src='img/lion-rock-country-park-entrance.jpg'><p><b>Lion Rock Country Park Entrance</b></p><p>Elevation: 290m</p><p>Progress: 1.2km/4.7km</p>"
      },
      {
        lat: 22.3528634882,
        lng: 114.1869495970,
        info: "<img src='img/lion-rock-peak.jpg'><p><b>Lion Rock Peak</b></p><p>Elevation: 495m</p><p>Progress: 3.0km/4.7km</p>"
      },
      {
        lat: 22.3523096096,
        lng: 114.1849627106,
        info: "<img src='img/lion-rock-head.jpg'><p><b>Lion Rock Head</b></p><p>Elevation: 490m</p><p>Progress: 3.2km/4.7km</p>"
      },
      {
        lat: 22.3507957614,
        lng: 114.1817620690,
        info: "<img src='img/wind-and-rain-pavilion.jpg'><p><b>Wind and Rain Pavilion</b></p><p>Elevation: 330m</p><p>Progress: 3.9km/4.7km</p>"
      },
      {
        lat: 22.3449293569,
        lng: 114.1843613124,
        info: "<img src='img/lion-rock-park.jpg'><p><b>Lion Rock Park</b></p><p>Elevation: 100m</p><p>Progress: 4.7km/4.7km</p>"
      }
    ];
    // Create markers and info windows using for loop
    // Reference: https://www.w3schools.com/js/js_iterables.asp
    for (const markerInfo of markerInfoList) {
      // Create markers using the constants of labels and markerInfoList
      // Reference: https://developers.google.com/maps/documentation/javascript/reference/marker#Marker
      // Example: https://developers.google.com/maps/documentation/javascript/examples/marker-simple
      // Example: https://developers.google.com/maps/documentation/javascript/examples/marker-labels
      const marker = new google.maps.Marker({
        position: {
          lat: markerInfo.lat,
          lng: markerInfo.lng
        },
        map,
        label: {
          text: labels[labelIndex++ % labels.length],
          color: "white"
        }
      });
      // Create info windows and set the maximum width
      // Reference: https://developers.google.com/maps/documentation/javascript/reference/info-window
      // Example: https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple-max
      const infowindow = new google.maps.InfoWindow({
        content: markerInfo.info,
        maxWidth: 130
      });
      // Open info window by clicking the marker
      // Reference: https://developers.google.com/maps/documentation/javascript/reference/event#MVCObject-Methods
      // Example: https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple-max
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false
        });
      });
      // Close info window by clicking on the map
      // Reference: https://developers.google.com/maps/documentation/javascript/reference/event#MVCObject-Methods
      // Example: https://stackoverflow.com/questions/10022873/closing-info-windows-in-google-maps-by-clicking-the-map
      google.maps.event.addListener(map, "click", function(event) {
        infowindow.close();
      });
    };
  }
  // Define the function to calculate and display route
  // Reference: https://developers.google.com/maps/documentation/javascript/reference/directions#DirectionsService
  // Example: https://developers.google.com/maps/documentation/javascript/examples/directions-waypoints
  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
      .route({
        origin: "Temple Hill Fat Jong Temple, Shatin Pass Road, Sha Tin Pass, Hong Kong",
        destination: "Lion Rock Park, Chuk Yuen Rd, Chuk Un, Hong Kong",
        waypoints: [{
            location: "Lion Rock Country Park Entrance, Shatin Pass Road, Sha Tin Pass, Hong Kong"
          },
          {
            location: "Lion Rock Head, Lion Rock, Hong Kong"
          },
          {
            location: "Wind & Rain Pavilion, Maclehose Trail Sec. 5, Lion Rock, Hong Kong"
          }
        ],
        travelMode: google.maps.TravelMode.WALKING
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert(e));
  }
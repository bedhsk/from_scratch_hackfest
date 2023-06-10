const input = document.getElementById("place_input");

let map;
let marker;
let kmlLayer;
let autocomplete;
let user_location;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    mapId: "99e6d3506180ee33",
    center: { lat: 14.83987, lng: -91.52158 },
    zoom: 15,
  });

  marker = new google.maps.Marker({
    position: { lat: 14.83153, lng: -91.50973 },
    map: map,
  });

  // kmlLayer = new google.maps.KmlLayer("", {
  //   suppressInfoWindows: true,
  //   preserveViewport: false,
  //   map: map
  // });

  // const ctaLayer1 = new google.maps.KmlLayer({
  //   url: "https://raw.githubusercontent.com/bedhsk/document/main/cta.kml",
  //   map: map,
  // });

  // const ctaLayer = new google.maps.KmlLayer({
  //   url: "https://raw.githubusercontent.com/bedhsk/document/main/Mapa%20sin%20nombre.kml",
  //   map: map,
  // });

  const ctaLayer = new google.maps.KmlLayer({
    url: "https://raw.githubusercontent.com/bedhsk/document/main/Santa%20F%C3%A9.kml",
    map: map,
  });

  initAutocomplete();
  showLocation();
}

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
  });
}

function showLocation() {
  button.addEventListener('click', () => {
    if (navigator.geolocation) {
      user_location = navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const coords = {
            lat: latitude,
            lng: longitude,
          };
          // map.setCenter(coords)
          marker.setPosition(coords)
        },
        () => {
          alert("Ocurrió un error");
        }
      );
    } else {
      alert("Tu navegador no dispone de geolocalización");
    }
  });
}

window.initMap = initMap;

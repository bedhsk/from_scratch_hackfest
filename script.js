let map;
let kmlLayer;
let autocomplete;
let user_location;

// icons
let moon_icon;
let coffee_icon;

// markers
// let coffee_marker;
let restaurant_icon
let location_marker;
let destination_marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    mapId: "99e6d3506180ee33",
    center: { lat: 14.83987, lng: -91.52158 },
    zoom: 10,
  });

  loadIcons();

  let coordinates_coffee = [14.83664, -91.51912, 14.83659, -91.51831, 14.83656, -91.51744,14.84361, -91.52638];
  let details_coffee = ["Leyendas Café", "Grano de Café", "Cory_kay bakeshop", "Cafetería Azarela"];
  let pos_coffee = 0;

  for (let index = 0; index < coordinates_coffee.length; index++) {
    add_coffee_marker(coordinates_coffee[pos_coffee], coordinates_coffee[pos_coffee+1], details_coffee[index]);
    pos_coffee += 2;
  }

  let coordinates_rest = [14.85067, -91.52647, 14.84704, -91.5226];
  let details_rest = ["Restaurante Don Carlos", "Xelapan Los Altos"];
  let pos_rest = 0;

  for (let index = 0; index < coordinates_rest.length; index++) {
    add_restaurant_marker(coordinates_rest[pos_rest], coordinates_rest[pos_rest+1], details_rest[index]);
    pos_rest += 2;
  }

  // Colocar las rutas
  const routes = new google.maps.KmlLayer({
    url: "https://raw.githubusercontent.com/bedhsk/document/main/moonmapv1.kml",
    map: map,
  });

  initAutocomplete();
  showLocation();
}

function add_restaurant_marker(lat, lng, msg) {
  const restaurant_marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    icon: restaurant_icon,
  });

  const detailWindow = new google.maps.InfoWindow({
    content: msg,
  });

  restaurant_marker.addListener("click", () => {
    detailWindow.open(map, restaurant_marker);
  });
}

function add_coffee_marker(lat, lng, msg) {
  const coffee_marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    icon: coffee_icon,
  });

  const detailWindow = new google.maps.InfoWindow({
    content: msg,
  });

  coffee_marker.addListener("click", () => {
    detailWindow.open(map, coffee_marker);
  });
}

function loadIcons() {
  moon_icon = {
    url: "https://cdn-icons-png.flaticon.com/512/4931/4931239.png", // url
    scaledSize: new google.maps.Size(50, 50),
  };

  coffee_icon = {
    url: "https://cdn-icons-png.flaticon.com/512/9246/9246639.png", // url
    scaledSize: new google.maps.Size(40, 40),
  };

  restaurant_icon = {
    url: "https://cdn-icons-png.flaticon.com/512/3207/3207949.png", // url
    scaledSize: new google.maps.Size(40, 40),
  };
}

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(place_input, {
    strictBounds: false,
  });
  autocomplete.bindTo("bounds", map);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    const { geometry } = place;
    const { viewport, location } = geometry;

    if (destination_marker) {
      destination_marker.setPosition(location);
      // map.fitBounds(viewport);
    } else {
      destination_marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: moon_icon,
      });
    }
    map.setCenter(location);
    document.getElementById("place_input").value = "";
  });
}

function showLocation() {
  button.addEventListener("click", () => {
    if (navigator.geolocation) {
      user_location = navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const coords = {
            lat: latitude,
            lng: longitude,
          };
          if (location_marker) {
            map.setCenter(coords);
            location_marker.setPosition(coords);
          } else {
            location_marker = new google.maps.Marker({
              position: coords,
              map: map,
              icon: moon_icon,
            });
            map.setCenter(coords);
          }
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

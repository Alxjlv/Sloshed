// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

const SEARCH_RADIUS = "500";

async function getLocationsAsync() {
  const currentPos = await geoFindMe();
  const locations = await retrieveData(currentPos);

  console.log(JSON.stringify(locations));

  displayResults(locations);
}

async function geoFindMe() {
  return new Promise((resolve, reject) => {
    // Attempt to fetch location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const location = new google.maps.LatLng(latitude, longitude);
          //   console.log('success');
          resolve(location);
        },
        () => {
          //   console.log('failed')
          resolve(new google.maps.LatLng(-36.84341, 174.756973));
        }
      );
    }
  });
}

function retrieveData(currentPos) {
  // TODO find way to make API call work without this
  const map = new google.maps.Map(document.getElementById("map"), {
    center: currentPos,
    zoom: 15,
  });

  const requestBars = {
    location: currentPos,
    radius: SEARCH_RADIUS,
    type: ["bar"],
  };

  const service = new google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    service.nearbySearch(requestBars, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let locations = [];
        for (let i = 0; i < results.length; i++) {
          // console.log(results[i])
          const result = {
            name: results[i].name,

            // TODO remove deprecated field open_now, try to make isOpen() work
            // TODO if possible add something to give actual opening hours
            //is_open_now: results[i].opening_hours.open_now,

            // TODO add something to get address for given LatLng
            is_open_now: results[i].opening_hours
              ? results[i].opening_hours.open_now
              : false,

            lat: results[i].geometry.location.lat().toString(),

            lng: results[i].geometry.location.lng().toString(),

            photo: results[i].photos[0],

            address: results[i].vicinity ? results[i].vicinity : "Unknown",

            // TODO add something to calculate distance from current location
            distance: 0,
          };
          locations.push(result);
        }

        resolve(locations);
      }
    });
  });
}

function displayResults(locations) {
  document.getElementById("location-name").textContent = locations[0].name;
  // this is currently not calculated
  // TODO: calculate distance to location
  document.getElementById("location-dist").textContent = "";
  document.getElementById("location-addr").textContent = locations[0].address;
  document.getElementById("location-status").textContent = locations[0].is_open_now ? "Open now" : "Closed"
  document.getElementById('location-link-uber').href = "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff%5Blatitude%5D=" + locations[0].lat + "&dropoff%5Blongitude%5D=" + locations[0].lng;
  document.getElementById('location-link-maps').href = "https://www.google.com/maps/dir/?api=1&destination=" + locations[0].lat + "," + locations[0].lng;
}
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

const SEARCH_RADIUS = '1000';

function initMap() {
    const currentPos = geoFindMe();
    retrieveData(currentPos);
}

function geoFindMe() {
    return new google.maps.LatLng(-33.867, 151.195);
}

function retrieveData(currentPos) {
    // TODO find way to make API call work without this
    const map = new google.maps.Map(document.getElementById("map"), {
        center: currentPos,
        zoom: 15
    });

    const request = {
        location: currentPos,
        radius: SEARCH_RADIUS,
        type: ['liquor_store']
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        //   for (let i = 0; i < results.length; i++) {
        //     console.log(results[i]);
        //   }

        const result = {
            name: results[0].name,

            // TODO remove deprecated field open_now, try to make isOpen() work
            // TODO if possible add something to give actual opening hours
            is_open_now: results[0].opening_hours.open_now,

            // TODO add something to get address for given LatLng
            address: results[0].geometry.location.lat().toString() + ',' + results[0].geometry.location.lng().toString(),

            // TODO add something to calculate distance from current location
            distance: 0
        };

        displayResults(result);
    }
}

function displayResults(result) {
    console.log(JSON.stringify(result));
}
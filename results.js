// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

const SEARCH_RADIUS = '200';

async function getLocationsAsync() {
    const currentPos = geoFindMe();
    const locations = await retrieveData(currentPos);

    console.log(JSON.stringify(locations));

    return locations;
}

function geoFindMe() {
    return new google.maps.LatLng(-36.842240, 174.756797);
}

function retrieveData(currentPos) {
    // TODO find way to make API call work without this
    const map = new google.maps.Map(document.getElementById("map"), {
        center: currentPos,
        zoom: 15
    });

    const requestBars = {
        location: currentPos,
        radius: SEARCH_RADIUS,
        type: ['bar']
    };

    const service = new google.maps.places.PlacesService(map);
    return new Promise((resolve, reject) => {
        service.nearbySearch(requestBars, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                let locations = [];
                for (let i = 0; i < results.length; i++) {
                    // console.log(results)
                    const result = {
                        name: results[i].name,

                        // TODO remove deprecated field open_now, try to make isOpen() work
                        // TODO if possible add something to give actual opening hours
                        //is_open_now: results[i].opening_hours.open_now,

                        // TODO add something to get address for given LatLng
                        is_open_now: results[i].opening_hours ? results[i].opening_hours.open_now : false,

                        lat: results[i].geometry.location.lat().toString(),

                        lng: results[i].geometry.location.lng().toString(),

                        address: results[i].vicinity ? results[i].vicinity : 'Unknown',

                        // TODO add something to calculate distance from current location
                        distance: 0
                    };
                    locations.push(result);
                }

                resolve(locations);
            }
        });
    });
}
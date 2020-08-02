// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

const SEARCH_RADIUS = '200';

async function getLocationsAsync() {
    const currentPos = geoFindMe();
    const locations = await retrieveData(currentPos);
    console.log(JSON.stringify(locations));

    // nearbySearch();
}

function geoFindMe() {
    return new google.maps.LatLng(-36.842240, 174.756797);
}

// const encodeGetParams = p =>
//     Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

// async function nearbySearch() {
//     const apiKey = "AIzaSyDUqXF3eNX4my85sgEgdWLl30BSUfyDtso";

//     const parameters = {
//         key: apiKey,
//         location: "-36.842240,174.756797",
//         rankby: "distance",
//         type: ['bars']
//     }

//     const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
//     const params = encodeGetParams(parameters)
//     const response = await fetch(url + params)
//     const data = response.json()

//     console.log(data)
// }


function retrieveData(currentPos) {
    // TODO find way to make API call work without this
    const map = new google.maps.Map(document.getElementById("map"), {
        center: currentPos,
        zoom: 15
    });

    const requestBars = {
        location: currentPos,
        radius: SEARCH_RADIUS,
        // rankby: "distance",
        type: ['bar']
    };

    const service = new google.maps.places.PlacesService(map);
    //service.nearbySearch(requestLiquor, callbackLiquor);
    return new Promise((resolve, reject) => {
        service.nearbySearch(requestBars, (results, status) => {
            let locations = [];
            if (status === google.maps.places.PlacesServiceStatus.OK) {
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
                        // type: results[i].types,

                        // TODO add something to calculate distance from current location
                        distance: 0
                    };
                    locations.push(result);
                }

                resolve(locations)

            }
        });

    })

}
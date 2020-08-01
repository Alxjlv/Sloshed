/*function geoFindMe() {
  
    // Return found location if geolocation works
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;

      const location = new google.maps.LatLng(latitude, longitude);
      return location
    }
  
    // Return location of create camp if there is an error
    function error() {
      return new google.maps.LatLng(-36.843410, 174.756973);
    }
  
    // Attempt to fetch location
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }*/

  function geoFindMe() {

    const status = document.querySelector('#status');
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      status.textContent = '';
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude}°, Longitude: ${longitude}°`;
    }
  
    function error() {
      status.textContent = 'Unable to retrieve your location';
    }
  
    if(!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported by your browser';
    } else {
      status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }
  
  document.querySelector('#find-me').addEventListener('click', geoFindMe);

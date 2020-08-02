function geoFindMe() {
  
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

  }
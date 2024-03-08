function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Tu navegador no soporta la geolocalización.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  const mapOptions = {
    center: { lat: lat, lng: lng },
    zoom: 15,
  };

  const map = new google.maps.Map(document.getElementById("map"), mapOptions);

  const marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
  });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("El usuario ha denegado la solicitud de geolocalización.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("La información de ubicación no está disponible.");
      break;
    case error.TIMEOUT:
      alert("La solicitud para obtener la ubicación del usuario ha expirado.");
      break;
    case error.UNKNOWN_ERROR:
      alert("Ha ocurrido un error desconocido.");
      break;
  }
}

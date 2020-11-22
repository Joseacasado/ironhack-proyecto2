let mapInstance

function initApp() {
  drawMap()
  // getEventFromApi()
}

function drawMap() {
  mapInstance = new google.maps.Map( document.querySelector('#eventMap'), { center: { lat: 40.392499, lng: -3.698214 }, zoom: 10 })
}
let mapInstance
const id = document.querySelector('#eventIdFinal').value

function initApp() {
  drawMap()
  getEventLocation(id)
}

function drawMap() {
  mapInstance = new google.maps.Map( document.querySelector('#eventMap'), { center: { lat: 40.392499, lng: -3.698214 }, zoom: 15 })
}

function getEventLocation(id) {
  eventDetailsApiHandler
    .getEventDetails(id)
    .then(response => drawMarker(response.data._embedded.events[ 0 ]))
    .catch(err => console.log(err))
}

function drawMarker(event) {
  let eventLocation = event._embedded.venues[ 0 ].location
  let eventPosition = {
    lat: Number(eventLocation.latitude),
    lng: Number(eventLocation.longitude)
  }
  let eventTitle = event.name

  new google.maps.Marker({ map: mapInstance, position: eventPosition, title: eventTitle })

  mapInstance.setCenter({ lat: eventPosition.lat, lng: eventPosition.lng })
}
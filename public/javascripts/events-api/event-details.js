const eventDetailsApiHandler = new EventsApiHandler()

window.onload = () => {
  const id = document.querySelector('#eventId').value

  eventDetailsApiHandler
    .getEventDetails(id)
    .then(response => {
      let event = response.data._embedded.events[0]

      console.log(event)

      document.querySelector('#eventDetailsContainer').innerHTML = 
        `<div class="row justify-content-center align-items-center">

          <div class="col-md-4 event-details-img">
            <figure><img src="${event.images[0].url}" alt="${event.name}"></figure>
            <figcaption></figcaption>
          </div>

          <div class="col-md-8">
            <h2>${event.name}</h2>
            <hr>
            <ul>
              <li>Date: ${event.dates.start.localDate}</li>
              <li>Venue: ${event._embedded.venues[0].name}</li>
              <li>City: ${event._embedded.venues[0].city.name}</li>
              <li>Price: ${event.priceRanges[0].max} - ${event.priceRanges[0].currency}</li>
            </ul>
            <hr>
            <p><strong>Description:</strong> ${event.info}</p>
            <hr>
            <a class="btn btn-warning btn-lg" href="${event.url}" target="_blank">Buy tickets</a>
          </div>
        </div>`
})
    .catch(err => console.log(err))
}

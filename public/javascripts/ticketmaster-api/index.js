const eventsListApiHandler = new EventsApiHandler()
let resultHtml = '';


// setSlider()      ** Por si falla widget de TM
applyFilters()

//    ****  FUNCTIONS ****

function applyFilters() {
  const inputs = document.querySelectorAll('#event-search .form-control')

  const filterInfo = {
    keyword: inputs[0].value,
    city: inputs[1].value,
    genre: inputs[2].value,
    sort: inputs[3].value
  }

  eventsListApiHandler
    .getEventsList(filterInfo)
    .then(response => {
      if (response.data._embedded === undefined) {          // TO-DO ==> boostrap popups?
        alert('No events for this search')
        return
      }
      newFilteredHtml(response)
      document.querySelector('#event-search').reset()
    })
    .catch(err => console.log(err))
}


function newFilteredHtml(response) {
  let allEvents = response.data._embedded.events

  resultHtml = ''
  console.log(allEvents)

  allEvents.forEach(elm => {
    resultHtml += `<div class="col-md-6 col-lg-4">
                    <div class="card mb-2" style="width: 18rem;">
                      <img src="${elm.images[2].url}" class="card-img-top" alt="${elm.name}">
                      <div class="card-body">
                        <h5 class="card-title">${elm.name}</h5>
                        <p class="card-text">${ elm.dates.start.localDate } || ${ elm._embedded.venues[ 0 ].name}</p>
                        <a href="/shows/details/${elm.id}" class="btn btn-dark d-block event-details-btn">See more</a> 
                      </div>
                    </div>
                  </div>`
  })
  document.querySelector('#card-list').innerHTML = resultHtml
}


//  Set Slider
// function setSlider() {
//   apiHandler
//     .getSliderList()
//     .then(response => {
//       let allEvents = response.data._embedded.events
//       let slidertHtml

//       console.log(allEvents)

//       allEvents.forEach(elm => {                  // TO-DO - Fix with GlideJS??
//         slidertHtml += `<div class="carousel-item active">
//                           <img src="${elm.images[1].url}" class="d-block w-100" alt="${elm.name}">
//                         </div>`
//       })
//       document.querySelector('#events-carousel').innerHTML = slidertHtml
//     })
// }


// //    ****  LISTENERS ****

document.querySelector('#event-search').onsubmit = e => {
  e.preventDefault()
  applyFilters()
}


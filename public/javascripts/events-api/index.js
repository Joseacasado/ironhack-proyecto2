const eventsListApiHandler = new EventsApiHandler()
let resultHtml = ''


document.querySelector('#event-search').onsubmit = e => {
    e.preventDefault()
    applyFilters()
}

function applyFilters() {

    const inputs = document.querySelectorAll('#event-search .form-control')

    const filterInfo = {
        name: inputs[0].value,
        city: inputs[1].value,
        genre: inputs[2].value,
        priceMin: inputs[3].value,
        priceMax: inputs[4].value

    }
    let queryString = Object.keys(filterInfo).map(key => key + '=' + filterInfo[key]).join('&')

    eventsListApiHandler
        .getEventsList(queryString)
        .then(response => {
            if (response.data.length === 0) {         
                alert('No events for this search')
                return
            }
            newFilteredHtml(response)
            document.querySelector('#event-search').reset()
        })
        .catch(err => console.log(err))
}


function newFilteredHtml(response) {
    
    resultHtml = ''
    response.data.forEach(elm => {
        resultHtml += `<div class="col-md-6 col-lg-4">
                    <div class="card mt-3">
                      <img src="${elm.images[0].url}" class="card-img-top" alt="${elm.name}">
                      <div class="card-body">
                        <h5 class="card-title">${elm.name}</h5>
                        <p class="card-text">${elm.dates.start.localDate } || ${ elm.dates.start.localTime}</p>
                        <p>${ elm._embedded.venues[0].name} – ${elm._embedded.venues[0].city.name}</p>
                        <a href="/events/details/${elm._id}" class="btn btn-dark d-block event-details-btn">See more</a> 
                      </div>
                    </div>
                  </div>`
    })
    document.querySelector('#card-list').innerHTML = resultHtml
}
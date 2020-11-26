const eventsListApiHandler = new EventsApiHandler()

window.onload = function () {

    let fav = document.querySelector('.fav')

    let eventId = fav.value
    eventsListApiHandler.addEventToList(eventId)

    fav.addEventListener('click', function () {
        fav.classList.replace('btn-outline-primary', 'btn-primary')
    })

}
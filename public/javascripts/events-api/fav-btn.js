const eventsListApiHandler = new EventsApiHandler()
let fav = document.querySelector('.fav')

fav.addEventListener('click', function () {
    eventsListApiHandler.addEventToList(fav.value)
    fav.classList.replace('btn-outline-primary', 'btn-primary')
})

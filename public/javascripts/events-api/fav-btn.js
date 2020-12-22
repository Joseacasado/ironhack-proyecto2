const eventsListApiHandler = new EventsApiHandler()

if (document.querySelector('.fav')) {
    let fav = document.querySelector('.fav')

    fav.addEventListener('click', function () {
        fav.classList.contains('btn-outline-primary') ? addFav(fav) : removeFav(fav)
    })
}

function addFav(btn) {

    eventsListApiHandler
        .addEventToList(btn.value)
        .then(() => alert('Event added to your list!'))
        .catch(err => new Error(err))

    btn.classList.replace('btn-outline-primary', 'btn-primary')
}

function removeFav(btn) {

    eventsListApiHandler
        .removeFav(btn.value)
        .then(() => alert('Event removed from your list!'))
        .catch(err => new Error(err))

    btn.classList.replace('btn-primary', 'btn-outline-primary')
}


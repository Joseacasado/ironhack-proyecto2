const express = require('express')
const router = express.Router()
const Event = require('../models/event.model')
const CDNupload = require('./../configs/cdn-upload.config')
const isAdmin = require('../middlewares/custom.middlewares')
const adminOptions = require('../utils/admin-auth')
const addedFav = require('../utils/added-fav')


router.get('/', (req, res, next) => {

  const successMsg = req.query.successMsg
  Event
    .aggregate([{ $sample: { size: 40 } }])
    .then(events => res.render('events/', { successMsg, events, isLogged: req.isAuthenticated(), admin: adminOptions(req) }))
    .catch(err => next(new Error(err)))
})

router.get('/details/:id', (req, res, next) => {

  Event
    .findById(req.params.id)
    .then(event => res.render('events/details', { event, isLogged: req.isAuthenticated(), added: addedFav(req), admin: adminOptions(req) }))
    .catch(err => next(new Error(err)))
})

router.get('/create', isAdmin, (req, res) => res.render('events/create', { isLogged: req.isAuthenticated(), admin: adminOptions(req) }))

router.post('/create', (req, res, next) => {
  const { name, genre, date, time, city, venue, price, currency, url, latitude, longitude, info } = req.body

  name === ' ' ? res.render('events/create', { errorMsg: 'Fill name filed, please' }) : null
  genre === '' ? res.render('events/create', { errorMsg: 'Fill genre filed, please' }) : null
  venue === '' ? res.render('events/create', { errorMsg: 'Fill venue filed, please' }) : null

  Event
    .create(
      {
        name, url, info,
        'classifications.0.genre.name': genre,
        '_embedded.venues.0.city.name': city,
        'images.0.ratio': '16_9',
        'dates.start.localDate': date,
        'dates.start.localTime': time,
        '_embedded.venues.0.name': venue,
        'priceRanges.0.max': price,
        'priceRanges.0.min': price,
        'priceRanges.0.currency': currency,
        '_embedded.venues.0.location.latitude': latitude,
        '_embedded.venues.0.location.longitude': longitude
      })
    .then(() => res.redirect(`/events?successMsg=Event created!`))
    .catch(err => next(new Error(err)))
})

router.get('/:id/edit', isAdmin, (req, res, next) => {
  req.isAuthenticated() ? admin = req.user.isAdmin : null
  Event
    .findById(req.params.id)
    .then(event => res.render('events/edit', { event, isLogged: req.isAuthenticated(), admin: adminOptions(req) }))
    .catch(err => next(new Error(err)))
})

router.post('/:id/edit', (req, res, next) => {
  const { name, genre, date, time, city, venue, price, currency, url, latitude, longitude, info } = req.body
  const eventId = req.params.id
  Event
    .findByIdAndUpdate(eventId,
      {
        name, url, info,
        'classifications.0.genre.name': genre,
        '_embedded.venues.0.city.name': city,
        'images.0.ratio': '16_9',
        'dates.start.localDate': date,
        'dates.start.localTime': time,
        '_embedded.venues.0.name': venue,
        'priceRanges.0.max': price,
        'priceRanges.0.min': price,
        'priceRanges.0.currency': currency,
        '_embedded.venues.0.location.latitude': latitude,
        '_embedded.venues.0.location.longitude': longitude
      })
    .then(() => res.redirect(`/events/details/${eventId}`))
    .catch(err => next(new Error(err)))
})

router.post('/edit/picture', CDNupload.single('eventImageFile'), (req, res, next) => {
  const eventId = req.query.id
  const imageUrl = req.file.path
  Event
    .findByIdAndUpdate(eventId, { 'images.0.url': imageUrl })
    .then(() => res.redirect(`/events/details/${eventId}`))
    .catch(err => next(new Error(err)))
})


router.post('/:id/delete', (req, res, next) => {
  Event
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/events'))
    .catch(err => next(new Error(err)))
})


module.exports = router
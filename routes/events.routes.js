const express = require('express')
const router = express.Router()
const Event = require('../models/event.model')
const CDNupload = require('./../configs/cdn-upload.config')


// Endpoints
router.get('/', (req, res, next) => {
  const successMsg = req.query.successMsg
  Event
    .aggregate([{ $sample: { size: 40 } }])
    .then(events => res.render('events/', { successMsg, events, isLogged: req.isAuthenticated() }))
    .catch(err => new Error(next(err)))
})

router.get('/details/:id', (req, res, next) => {
  Event
    .findById(req.params.id)
    .then(event => res.render('events/details', { event, isLogged: req.isAuthenticated() }))
    .catch(err => new Error(next(err)))
})

router.get('/create', (req, res) => res.render('events/create', { isLogged: req.isAuthenticated() }))

router.post('/create', (req, res, next) => {
  const { name, date, venue, price, currency, url, latitude, longitude, info } = req.body
  Event
    .create(
      {
        name, url, info,
        'classifications.0.genre.name': 'n/a',
        '_embedded.venues.0.city.name': 'n/a',
        'images.0.ratio': '16_9',
        'dates.start.localDate': date,
        '_embedded.venues.0.name': venue,
        'priceRanges.0.max': price,
        'priceRanges.0.min': price,
        'priceRanges.0.currency': currency,
        '_embedded.venues.0.location.latitude': latitude,
        '_embedded.venues.0.location.longitude': longitude
      })
    .then(response => {
      console.log(response)
      res.redirect(`/events?successMsg=Event created!`)
    })
    .catch(err => new Error(next(err)))
})

router.get('/:id/edit', (req, res) => {
  Event
    .findById(req.params.id)
    .then(event => res.render('events/edit', { event, isLogged: req.isAuthenticated() }))
    .catch(err => new Error(next(err)))
})

router.post('/:id/edit', (req, res, next) => {
  const { name, date, venue, price, currency, url, latitude, longitude, info } = req.body
  const eventId = req.params.id
  Event
    .findByIdAndUpdate(eventId,
      {
        name, url, info,
        'dates.start.localDate': date,
        '_embedded.venues.0.name': venue,
        'priceRanges.0.max': price,
        'priceRanges.0.currency': currency,
        '_embedded.venues.0.location.latitude': latitude,
        '_embedded.venues.0.location.longitude': longitude
      })
    .then(response => {
      console.log(response)
      res.redirect(`/events/details/${ eventId }`)
    })
    .catch(err => new Error(next(err)))
})

router.post('/edit/picture', CDNupload.single('eventImageFile'), (req, res, next) => {
    const eventId = req.query.id
    const imageUrl = req.file.path
    Event
        .findByIdAndUpdate(eventId, { 'images.0.url': imageUrl })
        .then(() => res.redirect(`/events/details/${ eventId }`))
        .catch(err => new Error(next(err)))
})


router.post('/:id/delete', (req, res, next) => {
  Event
    .findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/events'))
    .catch(err => new Error(next(err)))
})


module.exports = router
const express = require('express')
const router = express.Router()
const Event = require('../models/event.model')
const CDNupload = require('./../configs/cdn-upload.config')


// Endpoints
router.get('/', (req, res, next) => {
  const successMsg = req.query.successMsg
  Event
    .aggregate([ {$sample: { size: 40 }} ])
    .then(events => res.render('shows-crud/', { successMsg, events, isLogged: req.isAuthenticated() }))
    .catch(err => new Error(next(err)))
})

router.get('/details/:id', (req, res, next) => {
  Event
    .findById(req.params.id)
    .then(event => res.render('shows-crud/details', { event, isLogged: req.isAuthenticated() }))
    .catch(err => new Error(next(err)))
})

router.get('/create', (req, res) => res.render('shows-crud/create', { isLogged: req.isAuthenticated() }))

router.post('/create', CDNupload.single('eventImageFile'), (req, res, next) => {
  const { name, date, venue, price, currency, url, latitude, longitude, info } = req.body
  // const imageUrl = req.file.path
  Event
    .create(
      {
        name, url, info,
        'dates.0.start.localDate': date,
        '_embedded.venues.0.name': venue,
        'priceRanges.0.max': price,
        'priceRanges.0.currency': currency,
        '_embedded.venues.0.location.latitude': latitude,
        '_embedded.venues.0.location.longitude': longitude,
        // 'images.0.url': imageUrl 
      })
    .then(response => {
      console.log(response)
      res.redirect(`/shows-crud?successMsg='Event created!'`)
    })
    .catch(err => new Error(next(err)))
})

router.get('/:id/edit', (req, res) => {
  Event
    .findById(req.params.id)
    .then(event => res.render('shows-crud/edit', { event, isLogged: req.isAuthenticated() }))
    .catch(err => new Error(next(err)))
})

router.post('/:id/edit', CDNupload.single('eventImageFile'), (req, res, next) => {
  const { name, date, venue, price, currency, url, latitude, longitude, info } = req.body
  const eventId = req.params.id
  // const imageUrl = req.file.path
  Event
    .findByIdAndUpdate(eventId,
      {
        name, url, info,
        'dates.0.start.localDate': date,
        '_embedded.venues.0.name': venue,
        'priceRanges.0.max': price,
        'priceRanges.0.currency': currency,
        '_embedded.venues.0.location.latitude': latitude,
        '_embedded.venues.0.location.longitude': longitude,
        // 'images.0.url': imageUrl 
      })
    .then(() => res.redirect(`/shows-crud/details/${eventId}`))
    .catch(err => new Error(next(err)))
})


router.post('/:id/delete', (req, res, next) => {
    Event
      .findByIdAndDelete(req.params.id)
      .then(() => res.redirect('/shows-crud'))
      .catch(err => new Error(next(err)))
})


module.exports = router
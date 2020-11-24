const express = require('express')
const router = express.Router()
const Event = require('../models/event.model')
const CDNupload = require('./../configs/cdn-upload.config')


// Endpoints
router.get('/', (req, res, next) => {
  Event
    .aggregate([ {$sample: { size: 40 }} ])
    .then(events => res.render('shows-crud/', { events }))
    .catch(err => new Error(next(err)))
})

router.get('/details/:id', (req, res, next) => {
  Event
    .findById(req.params.id)
    .then(event => res.render('shows-crud/details', event))
    .catch(err => new Error(next(err)))
})

router.get('/create', (req, res) => res.render('shows-crud/create'))

router.post('/create', CDNupload.single('eventImageFile'), (req, res, next) => {
  const { name, date, venue, price, currency, url, latitude, longitude, info } = req.body
  // const imageUrl = req.file.path
  Event
    .create(
      {
        name, url, info,
        'dates.$.start.localDate': date,
        'priceRanges.$.max': price,
        'priceRanges.$.currency': currency,
        '_embedded.venues.$.location.latitude': latitude,
        '_embedded.venues.$.location.longitude': longitude,
        // 'images.$.url': imageUrl 
      })
    .then(response => {
      console.log(response)
      res.redirect('/shows-crud')
    })
    .catch(err => new Error(next(err)))
})

router.get('/:id/edit', (req, res) => {
  Event
    .findById(req.params.id)
    .then(response => res.render('shows-crud/edit', response))
    .catch(err => new Error(next(err)))
})

router.post('/:id/edit', CDNupload.single('eventImageFile'), (req, res, next) => {
  const { name, date, venue, price, currency, url, latitude, longitude, info } = req.body
  // const imageUrl = req.file.path
  Event
    .findByIdAndUpdate(req.params.id,
      {
        name, url, info,
        'dates.$.start.localDate': date,
        'priceRanges.$.max': price,
        'priceRanges.$.currency': currency,
        '_embedded.venues.$.location.latitude': latitude,
        '_embedded.venues.$.location.longitude': longitude,
        // 'images.$.url': imageUrl 
      })
    .then(() => res.redirect('back'))
    .catch(err => new Error(next(err)))
})


router.get('/:id/delete', (req, res, next) => {
    Event
      .findByIdAndDelete(req.params.id)
      .then(() => res.redirect('/shows-crud'))
      .catch(err => new Error(next(err)))
})


module.exports = router
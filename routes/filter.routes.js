
const express = require('express')
const router = express.Router()
const Event = require('../models/event.model')


// Endpoints
router.get('/', (req, res) => {
    Event
        .aggregate([{ $sample: { size: 45 } }])
        .then(events => res.render('filter/filter-form', { events, isLogged: req.isAuthenticated() }))
        .catch(err => next(err))

})

router.get('/details', (req, res, next) => {
    Event
        .findById(req.query.id)
        .then(event => res.render('filter/details', { event, isLogged: req.isAuthenticated() }))
        .catch(err => next(err))

})

module.exports = router

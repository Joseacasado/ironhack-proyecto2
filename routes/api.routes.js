const express = require('express')
const router = express.Router()
const Event = require('../models/event.model')

//  Search api route
router.get('/', (req, res, next) => {
    
    const { name, city, genre } = req.query
    req.query.priceMin ? priceMin = req.query.priceMin : priceMin = 0 // If not price min query $gte is not working
    req.query.priceMax ? priceMax = req.query.priceMax : priceMax = Number.POSITIVE_INFINITY // If not price max query $lte is not working

    const regex = { name: new RegExp(name, 'i'), city: new RegExp(city, 'i'), genre: new RegExp(genre, 'i') } 

    Event
        .find({ name: regex.name, "classifications.genre.name": regex.genre, "_embedded.venues.city.name": regex.city, "priceRanges.max": { $lte: priceMax }, "priceRanges.min": { $gte: priceMin } })
        .then(event => res.json(event))
        .catch(err => next(err))
})

//  getEventDetails
router.get('/:id', (req, res, next) => {
    Event
        .findById(req.params.id)
        .then(event => {
            console.log('Este mensaje viene desde api routes', event)
            res.json(event)
        })
        .catch(err => new Error(next(err)))
})


module.exports = router
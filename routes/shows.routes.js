const express = require('express')
const router = express.Router()
// const axios = require('axios')


// Events List
router.get('/', (req, res) => res.render('shows/'))

// Event Details
router.get('/details/:id', (req, res) => res.render('shows/details', { eventId: req.params.id }))


module.exports = router
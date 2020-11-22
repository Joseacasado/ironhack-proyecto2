const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => res.render('index', { isLogged: req.isAuthenticated() }))


module.exports = router
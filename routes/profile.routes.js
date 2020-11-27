const express = require('express')
const User = require('../models/user.model')
const Event = require('../models/event.model')
const router = express.Router()
const CDNupload = require('./../configs/cdn-upload.config')
const transporter = require('../configs/nodemailer.config')


// Endpoints
router.get('/profile', (req, res) => {
    User
        .findById(req.user.id)
        .populate('events_id')
        .then(user => res.render('profile/', { user, isLogged: req.isAuthenticated() }))
        .catch(err => next(new Error(err)))
})

router.get('/profile/edit', (req, res, next) => res.render('profile/edit', { user: req.user, isLogged: req.isAuthenticated() }))

router.post('/profile/edit', (req, res, next) => {

    const { fullname, username, email } = req.body

    User
        .findByIdAndUpdate(req.user.id, { username, fullname, email })
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})

router.post('/profile/edit/picture', CDNupload.single('imageFile'), (req, res, next) => {

    const avatar = req.file.path

    User
        .findByIdAndUpdate(req.user.id, { avatar })
        .then(() => res.redirect('/profile/edit'))
        .catch(err => next(new Error(err)))
})

router.get('/profile/remove-fav/:id', (req, res, next) => {

    User
        .findByIdAndUpdate(req.user.id, { $pull: { events_id: req.params.id } })
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))

})

router.get('/profile/attend/:id', (req, res, next) => {
    Event
        .findById(req.params.id, { "dates.start.localDate": 1, "dates.start.localTime": 1, name: 1, url: 1, "images.0.url": 1, "_embedded.venues.0.city.name": 1, "_embedded.venues.0.address.line1": 1 })
        .then(mail => {
            let message = `Remember you are going to ${mail.name} on ${mail.dates.start.localDate} at ${mail.dates.start.localTime}. 
    You can always buy your tickets here: ${mail.url}.
    Address: ${mail._embedded.venues[0].address.line1}, ${mail._embedded.venues[0].city.name}.`
            transporter
                .sendMail({
                    from: `"No reply" <${process.env.EMAILUSER}>`,
                    to: req.user.email,
                    subject: "Event attending",
                    text: message,
                    html: `<b>${message}</b>`
                })
                .then(() => {
                    res.redirect('/profile')
                })
        })
        .catch(err => next(new Error(err)))
})


module.exports = router
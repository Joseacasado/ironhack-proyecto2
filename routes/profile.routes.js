const express = require('express')
const User = require('../models/user.model')
const Event = require('../models/event.model')
const router = express.Router()
const CDNupload = require('./../configs/cdn-upload.config')
const transporter = require('../configs/nodemailer.config')
const { adminOptions } = require('../utils/utils')


router.get('/profile', (req, res) => {
    User
        .findById(req.user.id, { username: 1, fullname: 1, email: 1, avatar: 1, events_id: 1 })
        .populate({ path: 'events_id', select: ['name', 'images.url', 'dates.start.localDate', 'dates.start.localTime' ]})
        .then(user => res.render('profile/', { user, isLogged: req.isAuthenticated(), admin: adminOptions(req) }))
        .catch(err => next(new Error(err)))
})

router.get('/profile/edit', (req, res, next) => res.render('profile/edit', { user: req.user, isLogged: req.isAuthenticated(), admin: adminOptions(req) }))

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
        .findById(req.params.id,
            {
                "dates.start.localDate": 1,
                "dates.start.localTime": 1,
                name: 1,
                url: 1,
                "images.0.url": 1,
                "_embedded.venues.0.city.name": 1,
                "_embedded.venues.0.address.line1": 1
            })
        .then(event => `Remember you are going to ${event.name} on ${event.dates.start.localDate} at ${event.dates.start.localTime}. 
                            You can always buy your tickets here: ${event.url}.`)
        .then(message => {
            transporter
                .sendMail({
                    from: `"No reply" <${process.env.EMAILUSER}>`,
                    to: req.user.email,
                    subject: "Event attending",
                    text: message,
                    html: `<b>${message}</b>`
                })
        })
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})


module.exports = router
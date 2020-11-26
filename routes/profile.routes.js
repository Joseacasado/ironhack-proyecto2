const express = require('express')
const User = require('../models/user.model')
const router = express.Router()
const CDNupload = require('./../configs/cdn-upload.config')
const transporter = require('../configs/nodemailer.config')


// Endpoints
router.get('/profile', (req, res) => res.render('profile/', { user: req.user, isLogged: req.isAuthenticated() }))

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

router.get('/profile/send-mail', (req, res, next) => {
    const message = 'You are going to --event selected--, remember it is on --event date-- at --event location--.'
    transporter
        .sendMail({
            from: `"No reply" <${process.env.EMAILUSER}>`,
            to: req.user.email,
            subject: "Event attending",
            text: message,
            html: `<b>${message}</b>`
        })
        .then(info => {
            console.log(info)
            res.redirect('/profile')
        })
        .catch(err => next(new Error(err)))
})


module.exports = router
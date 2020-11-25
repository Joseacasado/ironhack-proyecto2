const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcryptjs")
const bcryptSalt = 10
const User = require('../models/user.model')
const { check, validationResult } = require('express-validator');


router.get('/signup', (req, res) => res.render('auth/signup'))

router.post('/signup', [

    check('username').isLength({ min: 3 }).withMessage('Name should have min 3 characters.').custom(value => {

        return User.findOne({ username: value }).then(user => {
            if (user) { return Promise.reject('Username in use') }
        })

    }),

    check('email').isEmail().withMessage('Invalid email').custom(value => {

        return User.findOne({ email: value }).then(user => {
            if (user) { return Promise.reject('Email in use') }
        })

    }),

    check('password').isLength({ min: 6 }).withMessage('Password min 6 characters').matches(/\d/).withMessage('Password must contain a number')

], (req, res, next) => {

    const passCheck = validationResult(req)

    if (!passCheck.isEmpty()) {
        console.log(passCheck.errors)
        res.render('auth/signup', { errorMsg: passCheck.errors })
        return
    }

    const { username, password, email } = req.body

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    User.create({ username, password: hashPass, email })
        .then(() => res.redirect('/login'))
        .catch(() => res.render("auth/signup", { errorMsg: "There was an error. Please try again." }))
})

router.get('/login', (req, res, next) => res.render('auth/login'))

router.post("/login", passport.authenticate("local", {
    successRedirect: "/events",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect("/login")
})



module.exports = router

module.exports = app => {
    const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Log in first' })


    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/events', require('./events.routes.js'))
    app.use('/api', require('./api.routes.js'))
    app.use('/', ensureAuthenticated, require('./profile.routes.js'))
}
module.exports = app => {
    const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Log in first' })
   
    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/shows', require('./shows.routes.js'))
    app.use('/shows-crud', require('./shows-crud.routes.js'))
    app.use('/', ensureAuthenticated, require('./profile.routes.js'))

    // API Shows
}
module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))

    // API Shows
    app.use('/shows', require('./shows.routes.js'))
}
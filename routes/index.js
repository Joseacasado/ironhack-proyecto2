const { isLoggedIn } = require('../middlewares/custom.middlewares')

module.exports = app => {

    app.use('/', require('./base.routes.js'))
    app.use('/', require('./auth.routes.js'))
    app.use('/events', require('./events.routes.js'))
    app.use('/api', require('./api.routes.js'))
    app.use('/', isLoggedIn, require('./profile.routes.js'))
}
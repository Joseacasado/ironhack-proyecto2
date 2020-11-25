module.exports = app => {
    app.locals.title = '__RutOcho'
    app.locals.mapsKey = `${process.env.GOOGLEMAPS_API}`
    app.locals.ticketKey = `${process.env.TM_API}`
}

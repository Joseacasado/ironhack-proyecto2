module.exports = (req) => {
    let added
    req.isAuthenticated() ? added = req.user.events_id.includes(req.params.id) : null
    return added
}

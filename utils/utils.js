module.exports = {
  addedFav: req => req.isAuthenticated() && req.user.events_id.includes(req.params.id),
  adminOptions: req => req.isAuthenticated() && req.user.isAdmin
}
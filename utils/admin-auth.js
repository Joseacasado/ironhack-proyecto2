module.exports = (req) => {
    let admin = false
    req.isAuthenticated() ? admin = req.user.isAdmin : null
    return admin
}



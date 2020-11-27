const isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) { req.user.isAdmin ? next() : res.render('auth/login', { errorMsg: 'Account without permissions' }) }
    else { res.render('auth/login', { errorMsg: 'Log in first' }) }
}

module.exports = isAdmin




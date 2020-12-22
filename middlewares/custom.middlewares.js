module.exports = {
    isLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Log in first' }),
    isAdmin: (req, res, next) => req.user.isAdmin ? next() : res.render('auth/login', { errorMsg: 'Account without permissions' })
}

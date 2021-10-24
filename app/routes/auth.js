var authController = require('../controllers/authController.js');
const passport = require("passport");

module.exports = function (app) {
    app.get('/signin', authController.signin);
    app.get('/logout', authController.logout);
    app.get('/index', isLoggedIn, authController.index);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');

    }

    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/index',
            failureRedirect: '/signin'
        }
    ));

    app.post('/index', isLoggedIn, authController.indexPost);
}
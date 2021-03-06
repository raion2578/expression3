var md5 = require('md5');

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {

        done(null, user.id);

    });
    passport.deserializeUser(function (id, done) {

        User.findByPk(id).then(function (user) {

            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signin', new LocalStrategy(
        {

            usernameField: 'login',

            passwordField: 'password',

            passReqToCallback: true

        },


        function (req, login, password, done) {

            var User = user;

            var isValidPassword = function (userpass, password) {

                if (md5(password) === userpass)
                    return true;
            }

            User.findOne({
                where: {
                    login: login
                }
            }).then(function (user) {

                if (!user) {

                    return done(null, false, {
                        message: 'Email does not exist'
                    });

                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }

                var userinfo = user.get();
                return done(null, userinfo);


            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });


        }
    ));

}
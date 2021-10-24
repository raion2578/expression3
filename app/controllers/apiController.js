const expression = require('../scripts/expression'),
    jwt = require('jsonwebtoken'),
    md5 = require('md5');
var User = require('../models');

const expPost =  (req, res) => {
    const {expressionParam, myOperator, myPriority, resultOperations} = req.body;
    const exp = expression.expressionCalculator(expressionParam, myOperator, myPriority, resultOperations);
    res.status(200).json(exp);
}

const loginApi = (req, res) => {
        const {username, password} = req.body
        const user = User.user.findOne({
            where: {
                login: username
            }
        }).then(function (user) {

            var isValidPassword = function (userpass, password) {
                if (md5(password) === userpass)
                    return true;
            }

            if (!user) {

                return done(null, false, {
                    message: 'Login does not exist'
                });

            }
            if (!isValidPassword(user.password, password)) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }

            const token = jwt.sign({user}, 'mySecret', {expiresIn: "24h"});
			user.token = token;
            return res.json(token);

        }).catch(function (err) {

            console.log("Error:", err);

            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });

        });
}
module.exports = {
    expPost,
    loginApi,
};

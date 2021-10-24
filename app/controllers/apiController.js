const
    jwt = require('jsonwebtoken'),
    md5 = require('md5');
var User = require('../models'),
    expr = require('../models/expression'),
    expression = new expr();

const expPostNew =  (req, res) => {
    const {expressionParam} = req.body;
    expression.setExpr(expressionParam);
    res.status(200).json(expression.calculate());
}

const addOperation =  (req, res) => {
    const {operationSign, operationPriority, operationEval} = req.body;
    expression.addSign(operationSign);            //
    expression.addEvalOperations(operationSign, operationEval);  //
    expression.addPrioritys(operationSign, operationPriority);   //
    expression.printAll();
    res.json({'answer':'ok'});
}


const loginApi = (req, res) => {
    try {
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
            return res.json(token);

        }).catch(function (err) {

            console.log("Error:", err);

            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });

        });
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Login error'})
    }
}
module.exports = {
    loginApi,
    expPostNew,
    addOperation,
};
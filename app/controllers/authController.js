var exports = module.exports = {},
    expression = require('../scripts/expression');

exports.signin = function (req, res) {

    res.render('login');
}

exports.index = function (req, res) {
    res.render('index', {result: " "});
}

exports.indexPost = function (req, res) {
    res.render('index', {result: expression.expressionCalculator(req.body.expression)});
}


exports.logout = function (req, res) {

    req.session.destroy(function (err) {

        res.redirect('/signin');

    });

}


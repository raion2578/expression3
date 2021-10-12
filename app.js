var express = require('express'),
    app = express(),
    passport = require('passport'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    models = require("./app/models");



app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



var authRoute = require('./app/routes/auth.js')(app);


require('./app/config/passport/passport.js')(passport, models.user);


models.sequelize.sync().then(function () {

    console.log('Nice! Database looks fine')

}).catch(function (err) {

    console.log(err, "Something went wrong with the Database Update!")

});
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true})); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.set('views', './app/views')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {

    res.send('Welcome to Passport with Sequelize');

});

require('./app/config/passport/passport.js')(passport, models.user);

app.listen(3000, function (err) {

    if (!err)
        console.log("Site is live");
    else console.log(err)

});
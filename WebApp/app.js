var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('passport');
var models = require('./server/models');
var serverIP = require('./server/serverIPAddress');
// var flash=require("connect-flash");


// Init App
var app = express();
// set view engine
app.use(expressLayouts);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
// Passport init
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 10 * 24 * 3600 * 1000
    },
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

//register static dir
app.set('partials', path.join(__dirname, '/client'));
app.use(express.static(path.join(__dirname, '/client')));

//register router
app.use('/', require('./server/routes/index.js'));

//create database tables
models.sequelize.sync({force:false});

// Set Port
var address = serverIP.getIP();
app.set('port', (process.env.PORT || 80));
var server = app.listen(app.get('port'), address, function() {
    console.log('Listening to:  ' + address + ':' + app.get('port'));
});
module.exports = server;

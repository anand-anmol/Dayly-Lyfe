const express = require('express')
const fs = require('fs')
var http    = require('http');
var path    = require('path');
var engine  = require('ejs-locals');
var passport      = require('passport');
var bodyParser    = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var app     = express();


// app.use(express.urlencoded({ extended: true }));;
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// const User = require('./models/user');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Enable routing and use port 1337.
require('./router')(app);
app.set('port', 1337);
 
 // Set up ejs templating.
app.engine('ejs', engine);
app.set('view engine', 'ejs');
 
// Set view folder.
app.set('views', path.join(__dirname, 'views'));
 
// That line is to specify a directory where you could 
// link to static files (images, CSS, etc.). 
// So if you put a style.css file in that directory and you 
// could link directly to it in your view <link href=”style.css” rel=”stylesheet”>
app.use(express.static(path.join(__dirname, 'static')));
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

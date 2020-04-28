const express = require('express')
const fs = require('fs')
var http    = require('http');
var path    = require('path');
var engine  = require('ejs-locals');
var app     = express();

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

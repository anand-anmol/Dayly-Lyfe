var express = require('express');
var http    = require('http');
var path    = require('path');
var engine  = require('ejs-locals');
var app     = express();

// Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({ extended: true }));

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// var cors = require('cors');
// app.use(cors());

// Enable routing and use port 1337.
require('./router')(app);
app.set('port', 1338);

// Set up ejs templating.
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// Set view folder.
app.set('views', path.join(__dirname, 'views'));



/* your regular r

 */
// Let's us reference images from a public image folder.
app.use(express.static(__dirname+'/static'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;


let today = new Date();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();

function month(){
  return currentMonth + 1
}

function next_month(){
  return (currentMonth + 1) + 1
}

function next_year(){
  return currentYear + 1
}

function next_date(){
  return currentDay + 1
}

function previous_month(){
  return (currentMonth + 1) - 1
}

function previous_year(){
  return currentYear - 1
}

function previous_date(){
  return 31 - currentDay
}

function month_name(){
  return months[currentMonth]
}

function year(){
  return currentYear
}

function date(){
  return currentDay
}


module.exports = { month, year, date, month_name, next_month, next_year, next_date, previous_month, previous_date, previous_year}
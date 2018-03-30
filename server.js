// Dependencies
var express = require("express");
var exphbs  = require('express-handlebars');
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// set up handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
 
// app.get('/', function (req, res) {
//     res.render('home');
// });

// mongoose
// mongoose.connect('mongodb://localhost/my_database');

// body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

// cheerio
// const $ = cheerio.load('<h2 class="title">Hello world</h2>')
 
// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')
 
// $.html()
//=> <html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html> 


// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
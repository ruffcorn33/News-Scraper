// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// DEPENDENCIES
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require("express");
// const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const logger = require("morgan");
const mongoose = require('mongoose');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// EXPRESS SERVER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Initialize Express and handle Heroku deployment
let app = express();
const PORT = process.env.PORT || 3000;
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MORGAN
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Use morgan logger for logging requests
app.use(logger("dev"));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// BODY-PARSER MIDDLEWARE
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// body-parser middleware
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// MONGOOSE, ORM FOR MONGODB
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/hackernews", 
{
  // useMongoClient: true
});
// If deployed, use the deployed database. Otherwise use the local mongo
// Headlines database
// note: the heroku app is https://git.heroku.com/sheltered-springs-65221.git
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hackernews";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// HANDLEBARS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// set up handlebars to be the default templating engine
// and change the extension from .handlebars to .hbs
// app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
// app.set('view engine', '.hbs');

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Routes
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require("./routes/api/api-routes.js")(app);

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
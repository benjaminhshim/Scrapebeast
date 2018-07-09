var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require('path');

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.set('views', path.join(__dirname, 'views'));

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/scrapebeast_db");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://benjaminhshim:scr4p3b34st@ds129801.mlab.com:29801/scrapebeast";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});


require('./routes')(app);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

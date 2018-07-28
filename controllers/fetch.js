'use strict';

var db = require('../models');
var axios = require("axios");
var cheerio = require("cheerio");

// DISPLAY UNSAVED ARTICLES
exports.index = function(req, res) {
  db.Headline.find({})
  .then(data =>{
    res.render('home', {data});
  }).catch(err => {
    return res.json(error);
  });
};

// DISPLAY SAVED ARTICLES
exports.saved = function(req, res) {
  db.Headline.find({saved: true})
  .populate("notes")
  .then(data =>{
    console.log(data);
    res.render('saved', {data});

  }).catch(err => {
    return res.json(err);
  });
};

// SCRAPE ARTICLES
exports.fetch = function(req, res) {
    axios.get("https://hypebeast.com/music").then(function(response) {
      var $ = cheerio.load(response.data);
  
      $("div.post-box").each(function(i, element) {
        var result = {};
  
        result.headline = $(this).find("h2").children().text();
        result.summary = $(this).find('.post-box-content-excerpt').text();
        result.link = $(this).find('.post-box-content-title').find("a").attr("href");
        result.img_url = $(this).find('div.post-box-image-container').find('img').attr('data-src');
        // result.hypes = $(this).find('span.d-none').children().text();
  
        db.Headline.create(result)
          .then(function(data) {
            console.log(data);
          })
          .catch(function(err) {
            return res.json(err);
          });
      });
      console.log('fetched');
    });
}

// FIND ALL SAVED ARTICLES
exports.saved_api = function(req, res) {
  db.Headline.find({saved: true})
  .then(data =>{
    res.json(data);
  }).then(err => {
    return res.json(err);
  });

}

// FIND ALL UNSAVED ARTICLES
exports.unsaved_api = function(req, res) {
  db.Headline.find({saved: false})
  .then(data => {
    res.json(data);
  }).catch(err => {
    return res.json(err);
  })
}
'use strict';

var db = require('../models');
var axios = require("axios");
var cheerio = require("cheerio");

exports.index = function(req, res) {
  
  db.Headline.find({})
  .then(data =>{

    res.render('home', {data});

  }).then(err => {
    return res.json(error);
  });

}

exports.fetch = function(req, res) {
    axios.get("https://hypebeast.com/music").then(function(response) {
      var $ = cheerio.load(response.data);
  
      $("div.post-box").each(function(i, element) {
        var result = {};
  
        result.headline = $(this).find("h2").children().text();
        result.link = $(this).find('.post-box-content-title').find("a").attr("href");
        result.img_url = $(this).find('div.post-box-image-container').find('img').attr('data-src');
  
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

exports.saved = function(req, res) {
  db.Headline.find({saved: true})
  .then(data =>{

    res.render('saved', {data});

  }).then(err => {
    return res.json(error);
  });

}
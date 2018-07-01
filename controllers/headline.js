'use strict';

var db = require('../models');
var axios = require("axios");
var cheerio = require("cheerio");

exports.headlines = function(req, res) {
    db.Headline.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
};

exports.unsaved = function(req, res) {
    db.Headline.findOne({_id: req.params.id, saved: false})
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
}

exports.saved = function(req, res) {
    db.Headline.findOne({_id: req.params.id, saved: true})
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
}
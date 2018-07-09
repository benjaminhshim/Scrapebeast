'use strict';

var db = require('../models');
var axios = require("axios");
var cheerio = require("cheerio");

// FIND ALL ARTICLES
exports.headlines = function(req, res) {
    db.Headline.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json(err);
    })
};

// FIND UNSAVED ARTICLE
exports.unsaved = function(req, res) {
    db.Headline.findOne({_id: req.params.id, saved: false})
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
}

// FIND SAVED ARTICLE
exports.saved = function(req, res) {
    db.Headline.findOne({_id: req.params.id, saved: true})
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })

};

// MARK UNSAVED ITEMS AS SAVED
exports.markSaved = function(req, res) {
    db.Headline.update({_id: req.params.id}, {$set: {saved: true}},
        function(err, saved) {
            if (err) {
                res.send(err)
            } else {
                res.send(saved);
            }
        }
    )
}

// MARK SAVED ITEMS AS UNSAVED
exports.markUnsaved = function(req, res) {
    db.Headline.update({_id: req.params.id}, {$set: {saved: false}},
        function(err, saved) {
            if (err) {
                res.send(err)
            } else {
                res.send(saved);
                // res.redirect('/saved');
            }
        }
    )
}
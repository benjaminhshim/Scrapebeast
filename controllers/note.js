var db = require('../models');
var axios = require("axios");
var cheerio = require("cheerio");

exports.get_notes = function(req, res) {
    db.Note.find({})
    .then(dbNotes => {
        res.json(dbNotes);
    }).catch(err => {
        res.json(err);
    })
}



// exports.get_article_note = function(req, res) {
//     db.Note.findOne({_id: req.params.id})
//     .then(data => {
//         res.json(data);
//     }).catch(err=> {
//         res.json(err);
//     })
// }

exports.delete_note = function(req, res) {
    db.Note.remove({_id: req.params.id})
    .then(data => {
        res.json(data)
    }).catch(err => {
        res.json(err);
    })
}

exports.get_article_note = function(req, res) {
    db.Note.findOne({_id: req.params.id})
    .then(data => {
        res.json(data);
    }).catch(err=> {
        res.json(err);
    })
}

exports.get_headline_note = function(req, res) {
    db.Headline.findOne({_id: req.params.id })
    .populate('notes')
    .then(data => {
        console.log(data);
        res.json(data);
        // res.render('saved', {data});
    }).catch(err => {
        res.json(err)
    })
}


exports.create_note = function(req, res) {
    db.Note.create(req.body)
    .then(data => {
        return db.Headline.findOneAndUpdate({_id: req.params.id}, {$push: {notes: data._id}}, {new: true});
    })
    .then(headline => {
        res.json(headline);
    }).catch(err => {
        res.json(err);
    })
}
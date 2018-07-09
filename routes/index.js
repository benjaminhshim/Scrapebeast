const express = require('express');
const router  = express.Router();

const fetch_controller = require('../controllers/fetch');
const headline_controller = require('../controllers/headline');
const notes_controller = require('../controllers/note');

router.get('/', fetch_controller.index);
router.get('/fetch', fetch_controller.fetch);
router.get('/saved', fetch_controller.saved);

router.get('/api/saved', fetch_controller.saved_api);
router.get('/api/unsaved', fetch_controller.unsaved_api);
router.get('/api/headlines', headline_controller.headlines);

router.get('/unsaved/:id', headline_controller.markUnsaved);
router.get('/saved/:id', headline_controller.markSaved);

router.get('/api/notes', notes_controller.get_notes);
router.get('/api/notes/:id', notes_controller.get_article_note);
router.delete('/api/notes/:id', notes_controller.delete_note);

router.get('/headlines/:id', notes_controller.get_headline_note);
router.post('/headlines/:id', notes_controller.create_note);

module.exports = router;
const express = require('express');
const router  = express.Router();

const fetch_controller = require('../controllers/fetch');
const headline_controller = require('../controllers/headline');

router.get('/', fetch_controller.index);
// router.get('/saved', fetch_controller.saved);
router.get('/fetch', fetch_controller.fetch);

router.get('/headlines', headline_controller.headlines);

router.get('/unsaved/:id', headline_controller.unsaved);
router.get('/saved/:id', headline_controller.saved);

module.exports = router;
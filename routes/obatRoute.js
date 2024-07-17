const express = require('express');
const router = express.Router();
const obatController = require('../controllers/obatController');

router.get('/fetch-and-save', obatController.fetchAndSave);
router.get('/obat', obatController.getAllObat);

module.exports = router;

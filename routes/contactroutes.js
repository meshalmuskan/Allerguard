const express = require('express');
const contactController = require('../controllers/contactController');
const router = express.Router();

router.post('/contactform', contactController.handleContactForm);

module.exports = router;
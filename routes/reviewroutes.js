
// routes/reviewRoutes.js
const express = require('express');
const { addReview } = require('../controllers/reviewController');
const router = express.Router();

router.post('/reviews', addReview);

module.exports = router;
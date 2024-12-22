// controllers/reviewController.js
const Review = require('../models/Review');

// Add a review for the website
const addReview = async (req, res) => {
  const { username, comment } = req.body;

  try {
    const review = new Review({ username, comment });
    await review.save();

    // Redirect to the home page or wherever you'd like to show the reviews
    res.redirect('/'); // Redirect to home or any other page
  } catch (error) {
    res.status(400).send('Error adding review');
  }
};

module.exports = { addReview };

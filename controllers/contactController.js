const Contact = require('../models/contact');

// Contact form controller
const handleContactForm = async (req, res) => {
  try {
    console.log('Form data received:', req.body);
    const contact = new Contact(req.body);
    await contact.save();
    res.render('home');
  } catch (error) {
    console.error('Error saving contact form data:', error);
    res.status(500).send({ error: 'An error occurred while saving your message.' });
  }
};

module.exports = {
  handleContactForm,
};
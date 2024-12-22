const bcrypt = require('bcrypt');
const User = require('../models/User');
const Product = require('../models/Product'); // Import the Product model
const Review = require('../models/Review')
const signup = async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPassword, // Save the hashed password
    });

    await newUser.save();

    // Fetch products for the home page
    const products = await Product.find();
    const reviews = await Review.find(); // Fetch reviews from the database

    // Render the home page and pass products and reviews
    res.render('home', { products, reviews }); // Pass products to the home view
  } catch (error) {
    res.status(400).send(error.message);
  }
};


  
  // Login controller
const login = async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
          return res.render('login', { title: 'Login', error: 'Invalid email' });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
          return res.render('login', { title: 'Login', error: 'Invalid password' });
      }

      // Save the user's ID in the session
      req.session.userId = user._id;

      // Redirect to the profile page
      res.redirect('/profile');
  } catch (error) {
      res.render('login', { title: 'Login', error: 'Error logging in' });
  }
};


const getProfile = async (req, res) => {
  try {
      const user = await User.findById(req.session.userId);

      if (!user) {
          return res.redirect('/login');
      }

      // Render profile page with user data
      res.render('profile', {
          title: 'Profile',
          user: {
              firstname: user.firstname,
              email: user.email,
              phone: user.phone,
              symptoms:  user.symptoms || [] ,
          },
      });
  } catch (error) {
      res.status(500).send('Error retrieving profile');
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.session.userId; // Get user ID from the session
    if (!userId) {
      return res.redirect('/login');
    }

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).send('Name, email, and phone are required');
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstname: name, email, phone },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.redirect('/profile'); // Redirect to the profile page
  } catch (error) {
    console.error('Error updating profile:', error); // Log error for debugging
    res.status(400).send('Error updating profile: ' + error.message);
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.session.userId; // Get user ID from the session
    if (!userId) {
      return res.redirect('/login');
    }

    await User.findByIdAndDelete(userId); // Delete user from the database
    req.session.destroy(); // Clear session data
    res.redirect('/signup'); // Redirect to signup/login page
  } catch (error) {
    res.status(500).send('Error deleting profile: ' + error.message);
  }
};
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login'); // Redirect to login page
  });
};


  module.exports = {
    signup,
    login,
   updateProfile,
    getProfile,
    deleteProfile,
    logout,

  };
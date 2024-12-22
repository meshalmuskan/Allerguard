const express = require('express');
const router = express.Router();
const { signup, login, getProfile,updateProfile,deleteProfile,logout } = require('../controllers/authControllers');
const { addSymptom } = require('../controllers/symptomController'); // Import addSymptom

// Define routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', getProfile);
router.post('/add-symptom', addSymptom); // Use the imported function
router.post('/profile/update', updateProfile);
router.post('/profile/delete', deleteProfile);
router.post('/logout', logout);

module.exports = router;
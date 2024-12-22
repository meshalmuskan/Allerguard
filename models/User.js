const mongoose = require('mongoose');
// models/Symptom.js

const symptomSchema = new mongoose.Schema({
  
  date: { type: Date, required: true, default: Date.now },
  symptom: {  type: [String], required: true },
  severity: { type: Number, required: true, min: 1, max: 10 },
  allergyType: { 
      type: String, 
      enum: ['Pollen', 'Dust', 'Pet Dander', 'Mold', 'Food', 'Other'], 
      default: 'Other' 
  },
});


const userSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: [true, 'Firstname is required'],
      
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensures no duplicate emails in the database
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [
        /^[0-9]{11}$/, // Example regex for a 10-digit phone number
        'Please enter a valid 10-digit phone number',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    repeatPassword: {
        type: String,
        required: false, // Make it optional for database validation
        select: false, // Exclude from database queries
        validate: {
          validator: function (value) {
            return value === this.password;
          },
          message: 'Passwords must match',
        },
    },
    symptoms: [
      symptomSchema
    ],
  });
  
// Create the model
const User = mongoose.model('User', userSchema);
// Export the model
module.exports = User;

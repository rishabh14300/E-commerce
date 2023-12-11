// user.js inside models folder

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Define the User schema
const userSchema = new mongoose.Schema({
  // Define your user schema fields here
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Other fields as needed...
});

// Create the User model
const User = mongoose.model('User', userSchema);


module.exports = User;

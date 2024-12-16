const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    isLowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a Password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a Password'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;

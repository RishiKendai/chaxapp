const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
    min: 10,
    unique: true,
  },
  password: {
    type: String,
  },
  isProfileImageSet: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', userSchema);

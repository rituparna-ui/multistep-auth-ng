const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  state: {
    type: Number,
    default: 2,
    enum: [0, 1, 2],
  },
});

module.exports = mongoose.model('User', userSchema);

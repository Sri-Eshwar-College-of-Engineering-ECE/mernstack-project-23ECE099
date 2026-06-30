const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Single', 'Double', 'Suite'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Occupied', 'Vacant'],
  },
});

module.exports = mongoose.model('Room', roomSchema);
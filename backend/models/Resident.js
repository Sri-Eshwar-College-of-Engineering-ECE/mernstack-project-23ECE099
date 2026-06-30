const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  inOutStatus: {
    type: String,
    required: true,
    enum: ['In', 'Out'],
    default: 'In',
  },
});

module.exports = mongoose.model('Resident', residentSchema);
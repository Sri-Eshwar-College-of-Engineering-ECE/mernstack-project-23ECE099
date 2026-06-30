const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resident',
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ['Present', 'Absent'],
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
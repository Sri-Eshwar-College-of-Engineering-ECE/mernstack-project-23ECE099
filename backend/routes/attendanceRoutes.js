const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Get all attendance records
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('residentId');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add attendance
router.post('/', async (req, res) => {
  const attendance = new Attendance({
    residentId: req.body.residentId,
    date: req.body.date,
    status: req.body.status,
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('residentId');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a complaint
router.post('/', async (req, res) => {
  const complaint = new Complaint({
    residentId: req.body.residentId,
    description: req.body.description,
    status: req.body.status,
  });

  try {
    const newComplaint = await complaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update complaint status
router.put('/:id', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    complaint.status = req.body.status || complaint.status;

    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
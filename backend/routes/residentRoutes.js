const express = require('express');
const router = express.Router();
const Resident = require('../models/Resident');

// Get all residents
router.get('/', async (req, res) => {
  try {
    const residents = await Resident.find().populate('roomId');
    res.json(residents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a resident
router.post('/', async (req, res) => {
  const resident = new Resident({
    name: req.body.name,
    roomId: req.body.roomId,
    inOutStatus: req.body.inOutStatus,
  });

  try {
    const newResident = await resident.save();
    res.status(201).json(newResident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update resident in/out status
router.put('/:id', async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) return res.status(404).json({ message: 'Resident not found' });

    resident.inOutStatus = req.body.inOutStatus || resident.inOutStatus;

    const updatedResident = await resident.save();
    res.json(updatedResident);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a resident
router.delete('/:id', async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) return res.status(404).json({ message: 'Resident not found' });

    await resident.remove();
    res.json({ message: 'Resident deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
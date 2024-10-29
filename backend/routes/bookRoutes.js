const express = require('express');
const router = express.Router();
const Booking = require('../models/bookModel');

// Route to get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch all bookings
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Update venue approval status
router.patch('/approve/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get approved venues
router.get('/approved', async (req, res) => {
  try {
    const approvedVenues = await Booking.find({ isApproved: true });
    res.json(approvedVenues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

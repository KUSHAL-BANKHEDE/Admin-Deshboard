const Booking = require('../models/Booking');

exports.approveVenue = async (req, res) => {
  try {
    const venue = await Booking.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    
    if (!venue) {
      return res.status(404).json({ message: 'Venue not found' });
    }
    
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
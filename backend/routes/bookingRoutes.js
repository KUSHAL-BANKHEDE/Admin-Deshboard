// Get approved venues
router.get('/approved', async (req, res) => {
  try {
    const approvedVenues = await Booking.find({ status: 'approved' });
    res.json(approvedVenues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 
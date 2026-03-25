const express = require('express');
const router = express.Router();

// Import the middleware to protect routes
const auth = require('../middleware/authMiddleware');

// Import controller functions
const { 
    createBooking, 
    getUserBookings 
} = require('../controllers/bookingController');

/**
 * @route   POST /api/bookings
 * @desc    Create a new movie booking
 * @access  Private (Requires Token)
 */
router.post('/', auth, createBooking);

/**
 * @route   GET /api/bookings/my-bookings
 * @desc    Get booking history for the logged-in user
 * @access  Private (Requires Token)
 */
router.get('/my-bookings', auth, getUserBookings);

module.exports = router;
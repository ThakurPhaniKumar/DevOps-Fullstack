const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        // userId is automatically injected here by authMiddleware
        const newBooking = new Booking({ 
            ...req.body, 
            userId: req.user.id 
        });
        
        await newBooking.save();
        res.status(201).json({ success: true, booking: newBooking });
    } catch (err) { 
        res.status(400).json({ success: false, error: err.message }); 
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        // Fetch only the bookings belonging to the logged-in user
        const bookings = await Booking.find({ userId: req.user.id })
                                      .sort({ bookingDate: -1 });
        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};
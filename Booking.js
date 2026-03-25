const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieTitle: String,
  theatre: String,
  showtime: String,
  seats: [String],
  totalAmount: Number,
  bookingDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', BookingSchema);
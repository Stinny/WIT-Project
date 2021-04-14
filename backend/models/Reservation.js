const mongoose = require('mongoose');

const resSchema = new mongoose.Schema({
  listingId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reservation', resSchema);

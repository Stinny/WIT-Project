const mongoose = require('mongoose');

const listingShcema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: String,
    required: true,
  },
  numberOfRooms: {
    type: String,
    required: true,
  },
  numberOfBeds: {
    type: String,
    required: true,
  },
  numberOfBaths: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    requried: true,
  },
  imgUrls: [
    {
      type: String,
    },
  ],
  amenities: [
    {
      type: String,
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Listing', listingShcema);

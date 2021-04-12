const Joi = require('joi');

const listingValidation = (data) => {
  const listingSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    numberOfGuests: Joi.string().required(),
    numberOfRooms: Joi.string().required(),
    numberOfBeds: Joi.string().required(),
    numberOfBaths: Joi.string().required(),
    price: Joi.string().required(),
    amenities: Joi.array().required(),
    userId: Joi.string().required(),
  });

  return listingSchema.validate(data);
};

const updateListingValidation = (data) => {
  const listingSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    numberOfGuests: Joi.string().required(),
    numberOfRooms: Joi.string().required(),
    numberOfBeds: Joi.string().required(),
    numberOfBaths: Joi.string().required(),
    price: Joi.string().required(),
  });

  return listingSchema.validate(data);
};

const reviewValidation = (data) => {
  const listingSchema = Joi.object({
    listingId: Joi.string().required(),
    userId: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  return listingSchema.validate(data);
};

const updateReviewValidation = (data) => {
  const listingSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  return listingSchema.validate(data);
};

module.exports = {
  listingValidation,
  reviewValidation,
  updateReviewValidation,
  updateListingValidation,
};

const Joi = require('joi');

const reviewValidation = (data) => {
  const listingSchema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(5).required(),
  });

  return listingSchema.validate(data);
};

module.exports = { reviewValidation };

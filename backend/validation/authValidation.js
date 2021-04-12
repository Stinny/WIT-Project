const Joi = require('joi');

const registerValidation = (data) => {
  //schema for validating user registration data
  const registerSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return registerSchema.validate(data);
};

const loginValidation = (data) => {
  //schema for validating user login data
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return loginSchema.validate(data);
};

module.exports = { registerValidation, loginValidation };

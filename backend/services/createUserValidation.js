const joi = require("joi");

const createUserValidation = joi.object({
  username: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).max(30).required(),
  role: joi.string().valid("admin", "user").required(),
});

module.exports = { createUserValidation };

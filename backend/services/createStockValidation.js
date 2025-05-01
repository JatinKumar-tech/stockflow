const Joi = require("joi");

const createStockValidation = Joi.object({
  name: Joi.string().min(3).required(),
  symbol: Joi.string().min(1).required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().integer().positive().required(),
});

module.exports = { createStockValidation };

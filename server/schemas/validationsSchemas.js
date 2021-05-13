const Joi = require('joi');

const listingSchima = Joi.object({
  title: Joi.string().required(),
  price: Joi.string().required().min(1),
  name: Joi.string().required(),
  description: Joi.string().required(),
}).required();

module.exports = listingSchima;

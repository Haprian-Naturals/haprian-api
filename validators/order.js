// validators/orderValidator.js
import Joi from "joi";

export const createOrderValidator = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(24).required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),

  totalPrice: Joi.number().positive().required(),

  delivery: Joi.object({
    fullName: Joi.string().min(2).required(),
    address: Joi.string().min(5).required(),
    city: Joi.string().min(2).required(),
    country: Joi.string().min(2).required(),
  }).required(),

  contact: Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).required(),
  }).required(),
});


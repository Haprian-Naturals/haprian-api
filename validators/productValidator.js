import Joi from "joi";

export const productValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
});

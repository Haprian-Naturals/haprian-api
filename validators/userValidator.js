import Joi from "joi";

export const registerUserValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("user","admin").default("user"),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().required(),
});

export const verifyEmailValidator = Joi.object({
  email: Joi.string().email().required(),
  verificationCode: Joi.string().required()
})

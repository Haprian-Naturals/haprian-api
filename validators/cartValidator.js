import Joi from "joi";

export const cartItemValidator = Joi.object({
  itemId: Joi.string()
      .required()
      .custom((value, helpers) => {
          // Validate if itemId is a valid MongoDB ObjectId
          if (!/^[0-9a-fA-F]{24}$/.test(value)) {
              return helpers.message('Invalid item ID format.');
          }
          return value;
      }),
  quantity: Joi.number()
      .integer()
      .positive()
      .required(),
});

// Function to validate cart items
export const validateCartItems = (cartItems) => {
  const { error } = Joi.array().items(cartItemValidator).validate(cartItems);
  if (error) {
      throw new Error(error.details[0].message);
  }
};


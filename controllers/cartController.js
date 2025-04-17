import { CartModel } from "../models/cart.js";
import { ProductModel } from "../models/product.js";
import { validateCartItems } from "../validators/cartValidator.js";


export const addToCart = async (req, res) => {
  const userId = req.auth.id;
  const { quantity } = req.body; // Get quantity from request body
  const itemId = req.params.itemId; // Get itemId from URL parameters

  if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive integer.' });
  }

  try {
      // Validate itemId and quantity
      validateCartItems([{ itemId, quantity }]);

      // Find or create the user's cart
      let cart = await CartModel.findOne({ userId });
      if (!cart) {
          cart = await CartModel.create({ userId, items: [] });
      }

      const product = await ProductModel.findById(itemId);
      if (!product) {
          return res.status(404).json({ message: `Product with ID ${itemId} not found.` });
      }

      const price = product.price; // Get the price from the product
      console.log(price, "Price per product");

      // Validate price
      if (price === undefined || isNaN(price) || price <= 0) {
          return res.status(400).json({ message: 'Price is not defined or invalid for this product.' });
      }

      // Calculate total price
      const quantityParsed = parseInt(quantity, 10);
      const totalPriceForItem = price * quantityParsed;
      console.log(totalPriceForItem, "Total Price for item");

      // Validate total price
      if (isNaN(totalPriceForItem) || totalPriceForItem < 0) {
          return res.status(400).json({ message: 'Total price calculation failed. Invalid total price.' });
      }

      const existingItem = cart.items.find(item => item.itemId.toString() === itemId);
      console.log(existingItem, "existing item");
      if (existingItem) {
          // Update existing item
          existingItem.quantity += quantityParsed;
          existingItem.totalPrice = existingItem.price * existingItem.quantity; // Update total price based on new quantity

          // Validate updated total price
          if (isNaN(existingItem.totalPrice) || existingItem.totalPrice < 0) {
              return res.status(400).json({ message: 'Updated total price is invalid.' });
          }
      } else {
          // Push new item to cart
          cart.items.push({
              itemId,
              quantity: quantityParsed,
              price, // Save price
              totalPrice: totalPriceForItem // Save total price
          });
          console.log(cart.items, "pushed cart items");
      }

      // Save the updated cart
      await cart.save();
      console.log(cart, "the updated cart");
      res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getCartItems = async (req, res) => {
  const userId = req.auth.id; // Get user ID from authentication middleware

  try {
      // Find the user's cart
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
          return res.status(404).json({ message: 'Cart not found.' });
      }

      // Return the cart items
      res.status(200).json({ items: cart.items });
  } catch (error) {
      console.error("Error retrieving cart items:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const increaseCartQuantity = async (req, res) => {
  const userId = req.auth.id;
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
          return res.status(404).json({ message: 'Cart not found.' });
      }

      const item = cart.items.find(item => item.itemId.toString() === itemId);
      if (!item) {
          return res.status(404).json({ message: 'Item not found in cart.' });
      }

      const quantityParsed = parseInt(quantity, 10);
      if (isNaN(quantityParsed) || quantityParsed <= 0) {
          return res.status(400).json({ message: 'Quantity must be a positive integer.' });
      }

      item.quantity += quantityParsed;
      item.totalPrice = item.price * item.quantity;

      await cart.save();
      res.status(200).json({ message: 'Item quantity increased', cart });
  } catch (error) {
      console.error("Error increasing cart quantity:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const decreaseCartQuantity = async (req, res) => {
  const userId = req.auth.id;
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
          return res.status(404).json({ message: 'Cart not found.' });
      }

      const item = cart.items.find(item => item.itemId.toString() === itemId);
      if (!item) {
          return res.status(404).json({ message: 'Item not found in cart.' });
      }

      const quantityParsed = parseInt(quantity, 10);
      if (isNaN(quantityParsed) || quantityParsed <= 0) {
          return res.status(400).json({ message: 'Quantity must be a positive integer.' });
      }

      if (item.quantity - quantityParsed < 0) {
          return res.status(400).json({ message: 'Cannot decrease quantity below zero.' });
      }

      item.quantity -= quantityParsed;
      item.totalPrice = item.price * item.quantity;

      // Remove item from cart if quantity is zero
      if (item.quantity === 0) {
          cart.items = cart.items.filter(i => i.itemId.toString() !== itemId);
      }

      await cart.save();
      res.status(200).json({ message: 'Item quantity decreased', cart });
  } catch (error) {
      console.error("Error decreasing cart quantity:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const removeFromCart = async (req, res) => {
  const userId = req.auth.id;
  console.log(userId, "This is the user id")
  const { itemId } = req.params; // Get itemId from the request parameters

  try {
      // Find the user's cart
      const cart = await CartModel.findOne({ userId });
      if (!cart) {
          return res.status(404).json({ message: 'Cart not found.' });
      }

      // Find the item in the cart
      const itemIndex = cart.items.findIndex(item => item.itemId.toString() === itemId);
      if (itemIndex === -1) {
          return res.status(404).json({ message: 'Item not found in cart.' });
      }

      // Remove the item from the cart
      cart.items.splice(itemIndex, 1);

      // Save the updated cart
      await cart.save();
      res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};
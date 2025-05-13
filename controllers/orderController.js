import { OrderModel } from "../models/order.js";

export const createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;

  try {
    // Validate input
    if (!items || !totalPrice) {
      return res.status(400).json({ message: "Items and totalPrice are required." });
    }

    // Validate each item in items array
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items must be a non-empty array." });
    }

    for (const item of items) {
      if (!item.productId || !item.quantity) {
        return res.status(400).json({ message: "Each item must have a productId and quantity." });
      }
    }

    // Create a new order
    const newOrder = new OrderModel({
      items,
      totalPrice,
    });

    console.log(newOrder)
    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Populate the product details in the saved order
    const populatedOrder = await OrderModel.findById(savedOrder.id).populate('items.productId');

    return res.status(201).json({
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await OrderModel.find().populate('items');

    return res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving orders", error: error.message });
  }
};
import { OrderModel } from "../models/order.js";


export const createOrder = async (req, res) => {
  const { items, quantity, totalPrice } = req.body;

  try {
    // Validate input
    if (!items || !quantity || !totalPrice) {
      return res.status(400).json({ message: "Items and totalPrice are required." });
    }

    // Create a new order
    const newOrder = new OrderModel({
     items,
     quantity,
      totalPrice,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Populate the product details in the saved order
    const populatedOrder = await OrderModel.findById(savedOrder.
      id).populate('items');


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
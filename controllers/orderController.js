import { OrderModel } from "../models/order.js";

export const createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;

  try {
    if (!items || !totalPrice) {
      return res.status(400).json({ message: "Items and totalPrice are required." });
    }

    // Validate array items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items must be a non-empty array." });
    }

    for (const item of items) {
      if (!item.productId || !item.quantity) {
        return res.status(400).json({ message: "Each item must have a productId and quantity." });
      }
    }

    const newOrder = new OrderModel({
      items,
      totalPrice,
    });
   
    const savedOrder = await newOrder.save();
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
    const orders = await OrderModel.find().populate('items');

    return res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving orders", error: error.message });
  }
};
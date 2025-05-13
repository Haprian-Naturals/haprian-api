import { OrderModel } from "../models/order.js";
import { createOrderValidator } from "../validators/order.js";

export const createOrder = async (req, res) => {
  // Validate input
  const {error,value} = createOrderValidator.validate(req.body);

  if(error)
  {
    return res.status(422).json(error.details[0].message);
  }

  try {
    
    // Create a new order
    const newOrder = new OrderModel(value);

    // Save the order to the database
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
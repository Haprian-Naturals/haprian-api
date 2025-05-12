import { Router } from "express";
import { createOrder, getAllOrders } from "../controllers/orderController.js";

export const orderRouter = Router ()


orderRouter.post("/orders", createOrder);
orderRouter.get('/orders', getAllOrders);

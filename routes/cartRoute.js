import { Router } from "express";
import { addToCart, decreaseCartQuantity, getCartItems, increaseCartQuantity, removeFromCart} from "../controllers/cartController.js";
import { auth } from "../middlewares/auth.js";

// CART ROUTER
export const cartRouter = Router();

cartRouter.post("/cart/:itemId", auth, addToCart)

cartRouter.get("/cart", auth, getCartItems)

cartRouter.patch("/cart/increase/:itemId", auth, increaseCartQuantity)

cartRouter.patch("/cart/decrease/:itemId", auth, decreaseCartQuantity)

cartRouter.delete('/cart/:itemId', auth, removeFromCart);


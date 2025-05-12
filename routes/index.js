import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { productRouter } from "./productRoute.js";
import { orderRouter } from "./orderRoute.js";

const router = Router();
router.use("/api/", userRouter);
router.use("/api/", productRouter);
router.use("/api/", orderRouter)

export default router;

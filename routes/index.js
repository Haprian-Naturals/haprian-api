import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { productRouter } from "./productRoute.js";

const router = Router();
router.use("/api/v1", userRouter);
router.use("/api/v1", productRouter);

export default router;

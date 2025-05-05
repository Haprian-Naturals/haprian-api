import { Router } from "express";
import { userRouter } from "./userRoutes.js";
import { productRouter } from "./productRoute.js";

const router = Router();
router.use("/api/", userRouter);
router.use("/api/", productRouter);

export default router;

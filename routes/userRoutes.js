import { Router } from "express";
import { forgotPassword, loginUser, registerUser, resetPassword, verifyEmail } from "../controllers/userController.js";

export const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/user/verify-email", verifyEmail);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.post("/user/login", loginUser);
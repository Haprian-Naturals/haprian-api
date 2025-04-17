import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./routes/userRoutes.js";
import { productRouter } from "./routes/productRoute.js";
import { cartRouter } from "./routes/cartRoute.js";

//Database connection
async function connectionDatabase() {
  try {
      await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log("Database is connected");
  } catch (error) {
      console.error("Database connection error:", error.message); // Log the error message
      throw new Error("Database is NOT connected!!"); // Adjusted to only throw a new error with the message
  }
}

connectionDatabase();

// CREATE AN EXPRESS APP
const app = express();

// USE GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter)

// LISTEN FOR INCOMING REQUESTS
const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
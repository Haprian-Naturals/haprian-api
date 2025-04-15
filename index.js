import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./routes/userRoutes.js";


//Database connection
async function connectionDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected");
  } catch (error) {
    throw new Error("Database is NOT connected!!", error);
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

// LISTEN FOR INCOMING REQUESTS
const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
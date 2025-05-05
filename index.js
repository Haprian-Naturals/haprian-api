import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import router from "./routes/index.js";

//Database connection
// async function connectionDatabase() {
//   try {
//       await mongoose.connect(process.env.MONGO_URI, {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//       });
//       console.log("Database is connected");
//   } catch (error) {
//       console.error("Database connection error:", error.message); // Log the error message
//       throw new Error("Database is NOT connected!!"); // Adjusted to only throw a new error with the message
//   }
// }

await mongoose.connect(process.env.MONGO_URI)
.then(data => console.log('Database connected'))
.catch(err => console.log('error'))

// CREATE AN EXPRESS APP
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  
];

app.use(
  cors({
    origin: allowedOrigins,
    
  })
);

app.options("*", cors());

// USE GLOBAL MIDDLEWARES
app.use(express.json());


// ROUTES
app.use(router);

// LISTEN FOR INCOMING REQUESTS
const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
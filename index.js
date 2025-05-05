import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import router from "./routes/index.js";

await mongoose.connect(process.env.MONGO_URI)
.then(data => console.log('Database connected'))
.catch(err => console.log('error'))

// CREATE AN EXPRESS APP
const app = express();

// Enable CORS for all routes or specific origins
app.use(cors({
  origin: 'http://localhost:5173', // Allow your development origin
  methods: ['GET', 'POST', 'OPTIONS'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

// USE GLOBAL MIDDLEWARES
app.use(express.json());

// ROUTES
app.use(router);

// LISTEN FOR INCOMING REQUESTS
const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
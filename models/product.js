import { Schema, model,Types } from "mongoose";
import normalize from "normalize-mongoose";


// Define the category enum values
const CategoryEnum = ["hair care", "skin care", "natural oil"];

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: [{ type: String, required: true }],
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: CategoryEnum, //Ensure only valid category value
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean
    },
    userId: { type: Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);


productSchema.plugin(normalize);

export const ProductModel = model("Product", productSchema)
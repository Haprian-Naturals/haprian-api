import { Schema } from "mongoose";
import { Types, model } from "mongoose";
import normalize from "normalize-mongoose";

const orderSchema = new Schema({
  items: [
    {
      productId: { type: Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],

  totalPrice: { type: Number, required: true },
  delivery: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  contact: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
});

orderSchema.plugin(normalize);
export const OrderModel = model("Order", orderSchema);

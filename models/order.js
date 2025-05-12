import { Schema } from "mongoose";
import { Types, model } from "mongoose";
import normalize from "normalize-mongoose";

const orderSchema = new Schema({
  items: [
    { type: Types.ObjectId, ref: "Product" },
  ],
   quantity: { type: Number, default: 1 } ,

  totalPrice: { type: Number, required: true },
});


orderSchema.plugin(normalize);
export const OrderModel = model("Order", orderSchema);

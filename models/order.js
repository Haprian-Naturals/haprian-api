import { Schema } from "mongoose";
import { Types, model } from "mongoose";
import normalize from "normalize-mongoose";

const itemSchema = new Schema({
  productId: { type:Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
});

const orderSchema = new Schema({
  items: [itemSchema],
  totalPrice: { type: Number, required: true }
});
  

orderSchema.plugin(normalize);
itemSchema.plugin(normalize);
export const OrderModel = model("Order", orderSchema);

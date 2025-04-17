import { Schema } from "mongoose";
import { Types, model } from "mongoose";
import normalize from "normalize-mongoose"

const cartItemSchema = new Schema({
    itemId: { type: Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true } 
});

const cartSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User' },
    items: [cartItemSchema]
});
cartSchema.plugin(normalize);
export const CartModel = model('Cart', cartSchema);
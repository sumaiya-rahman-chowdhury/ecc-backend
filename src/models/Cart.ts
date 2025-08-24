import { Schema, model, Types } from "mongoose";
const ItemSchema = new Schema(
  {
    variantId: { type: Types.ObjectId, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: true }
);

const CartSchema = new Schema(
  {
    token: { type: String, unique: true, index: true },
    items: [ItemSchema],
    promoCode: { type: String, uppercase: true, trim: true, default: null },
    currency: { type: String, default: "USD" },
  },
  { timestamps: true }
);

export default model("Cart", CartSchema);

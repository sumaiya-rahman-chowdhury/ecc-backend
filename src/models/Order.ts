import { Schema, model, Types } from "mongoose";
const LineSchema = new Schema(
  {
    productId: Types.ObjectId,
    variantId: Types.ObjectId,
    title: String,
    sku: String,
    unitPrice: Number,
    quantity: Number,
    lineTotal: Number,
  },
  { _id: true }
);

const OrderSchema = new Schema(
  {
    cartToken: String,
    lines: [LineSchema],
    subtotal: Number,
    discount: Number,
    total: Number,
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["created", "paid", "cancelled"],
      default: "created",
    },
    email: String, 
    shippingAddress: Object,
  },
  { timestamps: true }
);

export default model("Order", OrderSchema);

import { Schema, model } from "mongoose";
const PromoSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
    },
    type: { type: String, enum: ["percent", "fixed"], required: true },
    value: { type: Number, required: true, min: 0 },
    startsAt: Date,
    endsAt: Date,
    minSubtotal: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    maxUsesPerCart: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default model("Promo", PromoSchema);

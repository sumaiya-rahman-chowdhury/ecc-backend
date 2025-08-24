import { Schema, model, Types } from "mongoose";
const VariantSchema = new Schema({
  sku: { type: String, unique: true, required: true },
  title: String,
  price: { type: Number, required: true, min: 0 },     
  attributes: { type: Map, of: String }               
},{ _id: true });

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  variants: [VariantSchema],
  active: { type: Boolean, default: true }
},{ timestamps:true });

export default model("Product", ProductSchema);

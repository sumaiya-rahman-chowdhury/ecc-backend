import { Router } from "express";
import Order from "../models/Order";
const r = Router();

r.get("/", async (_req,res)=> {
  const orders = await Order.find().sort({ createdAt:-1 }).limit(100);
  res.json({ data: orders });
});

r.get("/:id", async (req,res)=> {
  const o = await Order.findById(req.params.id);
  if(!o) return res.status(404).json({ error:{ code:"NOT_FOUND", message:"Order not found" }});
  res.json({ data: o });
});

export default r;

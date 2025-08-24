import { Router } from "express";
import { z } from "zod";
import { validate } from "../shared/validate";
import Order from "../models/Order";
import { priceCartByToken } from "./priceCart";

const r = Router();

r.get("/preview", async (req:any,res)=>{
  const priced = await priceCartByToken(req.cartToken);
  res.json({ data: priced });
});

r.post("/place",
  validate(z.object({ body: z.object({
    email: z.string().email(),
    shippingAddress: z.record(z.any()).optional()
  }) })),
  async (req:any,res)=>{
    const priced = await priceCartByToken(req.cartToken);
    if(priced.lines.length === 0) return res.status(400).json({ error:{ code:"EMPTY_CART", message:"Cart is empty" } });

    const order = await Order.create({
      cartToken: priced.token,
      lines: priced.lines,
      subtotal: priced.subtotal,
      discount: priced.discount,
      total: priced.total,
      currency: priced.currency,
      email: req.body.email,
      shippingAddress: req.body.shippingAddress ?? null
    });

    res.status(201).json({ data: order });
});

export default r;

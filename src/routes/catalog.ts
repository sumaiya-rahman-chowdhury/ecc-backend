import { Router } from "express";
import Product from "../models/Product";
const r = Router();

r.get("/products", async (req, res) => {
  const { q, tag } = req.query as any;
  const match: any = { active: true };
  if (q) match.title = { $regex: q, $options: "i" };
  if (tag) match.tags = tag;
  const products = await Product.find(match).select(
    "title tags variants.sku variants.title variants.price"
  );
  res.json({ data: products });
});

r.get("/products/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p)
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "Product not found" } });
  res.json({ data: p });
});

export default r;

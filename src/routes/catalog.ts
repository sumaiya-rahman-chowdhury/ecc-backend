import { Router } from "express";
import { z } from "zod";
import Product from "../models/Product";
import { validate } from "../shared/validate";

const r = Router();

// GET all products
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

// GET product by ID
r.get("/products/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p)
    return res
      .status(404)
      .json({ error: { code: "NOT_FOUND", message: "Product not found" } });
  res.json({ data: p });
});

// POST create new product
r.post(
  "/products",
  validate(
    z.object({
      body: z.object({
        title: z.string().min(1),
        tags: z.array(z.string()).optional(),
        variants: z
          .array(
            z.object({
              sku: z.string().min(1),
              title: z.string().min(1),
              price: z.number().int().min(0),
            })
          )
          .min(1),
        active: z.boolean().optional().default(true),
      }),
    })
  ),
  async (req: any, res) => {
    const { title, tags, variants, active } = req.body;
    const product = await Product.create({ title, tags, variants, active });
    res.status(201).json({ data: product });
  }
);

export default r;

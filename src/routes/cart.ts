import { Router } from "express";
import { z } from "zod";
import Cart from "../models/Cart";
// import Product from "../models/Product";
import { validate } from "../shared/validate";
import { HttpError } from "../shared/errors";

const r = Router();

async function getOrCreateCart(token: string) {
  let cart = await Cart.findOne({ token });
  if (!cart) cart = await Cart.create({ token, items: [] });
  return cart;
}

r.get("/", async (req: any, res) => {
  const cart = await getOrCreateCart(req.cartToken);
  res.json({ data: cart });
});

r.post(
  "/items",
  validate(
    z.object({
      body: z.object({
        variantId: z.string(),
        quantity: z.number().int().min(1),
      }),
    })
  ),
  async (req: any, res) => {
    const cart = await getOrCreateCart(req.cartToken);
    const { variantId, quantity } = req.body;
    const exists = cart.items.find(
      (i: any) => i.variantId.toString() === variantId
    );
    if (exists) exists.quantity += quantity;
    else cart.items.push({ variantId, quantity });
    await cart.save();
    res.status(201).json({ data: cart });
  }
);

r.patch(
  "/items/:itemId",
  validate(
    z.object({
      params: z.object({ itemId: z.string() }),
      body: z.object({ quantity: z.number().int().min(1) }),
    })
  ),
  async (req: any, res) => {
    const cart = await getOrCreateCart(req.cartToken);
    const item = cart.items.id(req.params.itemId);
    if (!item) throw new HttpError(404, "Item not found", "ITEM_NOT_FOUND");
    item.quantity = req.body.quantity;
    await cart.save();
    res.json({ data: cart });
  }
);

r.delete("/items/:itemId", async (req: any, res) => {
  const cart = await getOrCreateCart(req.cartToken);
  const item = cart.items.id(req.params.itemId);
  if (!item) return res.status(204).end();
  item.deleteOne();
  await cart.save();
  res.status(204).end();
});

r.post(
  "/apply-promo",
  validate(z.object({ body: z.object({ code: z.string().min(1) }) })),
  async (req: any, res) => {
    const cart = await getOrCreateCart(req.cartToken);
    cart.promoCode = req.body.code.toUpperCase();
    await cart.save();
    res.json({ data: cart });
  }
);

export default r;

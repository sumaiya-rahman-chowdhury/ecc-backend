import { Router } from "express";
import Promo from "../models/Promo";
const r = Router();

r.get("/", async (_req,res)=> {
  const promos = await Promo.find().select("-__v");
  res.json({ data: promos });
});

export default r;

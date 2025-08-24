import { Router } from "express";
import cartToken from "../middleware/cartToken";
import catalog from "./catalog";
import cart from "./cart";
import promos from "./promos";
import checkout from "./checkout";
import orders from "./orders";

const r = Router();
r.use("/catalog", catalog);
r.use("/cart", cartToken, cart);
r.use("/promos", promos);
r.use("/checkout", cartToken, checkout);
r.use("/orders", orders);
export default r;

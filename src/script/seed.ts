import mongoose from "mongoose";
import Product from "../models/Product";
import Promo from "../models/Promo";
import dotenv from "dotenv";
dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);


(async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  await Product.deleteMany({});
  await Promo.deleteMany({});

  const prod = await Product.create({
    title: "T-Shirt",
    tags: ["apparel"],
    variants: [
      {
        sku: "TS-RED-M",
        title: "Red / M",
        price: 1999,
        attributes: { color: "Red", size: "M" },
      },
      {
        sku: "TS-RED-L",
        title: "Red / L",
        price: 1999,
        attributes: { color: "Red", size: "L" },
      },
    ],
  });

  await Promo.create([
    { code: "WELCOME10", type: "percent", value: 10, active: true },
    {
      code: "FLAT500",
      type: "fixed",
      value: 500,
      startsAt: new Date(Date.now() - 864e5),
      endsAt: new Date(Date.now() + 7 * 864e5),
      active: true,
      minSubtotal: 3000,
    },
  ]);

  console.log("seeded", prod.id);
  process.exit(0);
})();

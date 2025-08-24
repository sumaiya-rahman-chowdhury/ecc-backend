import Cart from "../models/Cart";
import Promo from "../models/Promo";

export async function priceCartByToken(token: string) {
  const [priced] = await Cart.aggregate([
    { $match: { token } },
    { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "products",
        let: { vId: "$items.variantId" },
        pipeline: [
          { $unwind: "$variants" },
          { $match: { $expr: { $eq: ["$variants._id", "$$vId"] } } },
          {
            $project: {
              _id: 0,
              productId: "$_id",
              title: "$title",
              sku: "$variants.sku",
              unitPrice: "$variants.price",
              variantId: "$variants._id",
            },
          },
        ],
        as: "variant",
      },
    },
    { $unwind: { path: "$variant", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        lineTotal: { $multiply: ["$items.quantity", "$variant.unitPrice"] },
      },
    },
    {
      $group: {
        _id: "$token",
        token: { $first: "$token" },
        currency: { $first: "$currency" },
        promoCode: { $first: "$promoCode" },
        lines: {
          $push: {
            productId: "$variant.productId",
            variantId: "$variant.variantId",
            title: "$variant.title",
            sku: "$variant.sku",
            unitPrice: "$variant.unitPrice",
            quantity: "$items.quantity",
            lineTotal: "$lineTotal",
          },
        },
        subtotal: { $sum: "$lineTotal" },
      },
    },
    { $addFields: { subtotal: { $ifNull: ["$subtotal", 0] } } },
  ]);

  if (!priced)
    return {
      token,
      lines: [],
      subtotal: 0,
      discount: 0,
      total: 0,
      currency: "USD",
    };

  let discount = 0;
  if (priced.promoCode) {
    const now = new Date();
    const promo = await Promo.findOne({
      code: priced.promoCode,
      active: true,
      $or: [{ startsAt: { $exists: false } }, { startsAt: { $lte: now } }],
      $or_ends: undefined,
    } as any).or([{ endsAt: { $exists: false } }, { endsAt: { $gte: now } }]); // workaround for TS

    if (promo && priced.subtotal >= (promo.minSubtotal ?? 0)) {
      discount =
        promo.type === "percent"
          ? Math.floor(priced.subtotal * (promo.value / 100))
          : Math.min(promo.value, priced.subtotal);
    } else {
      discount = 0;
    }
  }
  const total = priced.subtotal - discount;
  return { ...priced, discount, total };
}

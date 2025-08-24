import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";

export const CART_COOKIE = "cart_token";
export default function cartToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.cookies[CART_COOKIE];
  if (!token) {
    token = uuid();
    res.cookie(CART_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  }
  (req as any).cartToken = token;
  next();
}

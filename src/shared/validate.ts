import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "./errors";

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      // parse body only
      if (schema.shape.body) {
        req.body = schema.shape.body.parse(req.body);
      }
      if (schema.shape.params) {
        req.params = schema.shape.params.parse(req.params);
      }
      if (schema.shape.query) {
        req.query = schema.shape.query.parse(req.query);
      }
      next();
    } catch (e) {
      const ze = e as ZodError;
      throw new HttpError(
        422,
        "Validation failed",
        "VALIDATION_ERROR",
        ze.flatten()
      );
    }
  };

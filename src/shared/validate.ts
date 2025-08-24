import { ZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "./errors";

export const validate =
  (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      Object.assign(req, parsed);
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

import { Request, Response, NextFunction } from "express";
export function notFound(req: Request, res: Response){ res.status(404).json({ error:{ code:"NOT_FOUND", message:"Route not found" } }); }
export function errorHandler(err:any, req:Request, res:Response, next:NextFunction){
  const status = err.status ?? 400;
  res.status(status).json({ error:{ code: err.code ?? "BAD_REQUEST", message: err.message, details: err.details ?? null } });
}
export class HttpError extends Error { code?:string; status:number; details?:any; constructor(status:number, message:string, code?:string, details?:any){ super(message); this.status=status; this.code=code; this.details=details; } }

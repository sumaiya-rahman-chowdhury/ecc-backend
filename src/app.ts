import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser"; 

import routes from "./routes";
import { errorHandler, notFound } from "./shared/errors";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;

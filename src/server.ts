import express from "express";
import { scopePerRequest } from "awilix-express";
import { container } from "./container";
import healthRoutes from "./routes/health.routes";

export const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use(scopePerRequest(container));

  app.use("/", healthRoutes);

  return app;
};

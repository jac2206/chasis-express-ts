import express from "express";
import { scopePerRequest } from "awilix-express";
import { container } from "./config/container";
import v1Routes from "./infraestructure/http/routes/v1";
import healthRouters from "./infraestructure/http/routes/health.routes";

export const createServer = () => {
  const app = express();

  app.use(express.json());

  app.use(scopePerRequest(container));

  app.use("/", healthRouters);
  app.use("/v1", v1Routes);

  return app;
};

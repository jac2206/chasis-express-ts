import { Router } from "express";
import { container } from "../../../../config/container";
import type { AuthController } from "../../../controllers/v1/auth.controller";
import { registry } from "../../../docs/registry";
import { registerRoute } from "../../../docs/route-builder";
import {
  clientCredentialsRequestSchema,
  clientCredentialsResponseSchema,
  createServiceClientRequestSchema,
  createServiceClientResponseSchema,
  rotateServiceClientResponseSchema,
  serviceClientParamsSchema,
  serviceClientStatusResponseSchema,
} from "../../../schemas/auth.schema";
import { authenticateJWT } from "../../middlewares/auth.middleware";
import { authorizeScopes } from "../../middlewares/scope.middleware";
import {
  loginUserRequestSchema,
  loginUserResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
} from "../../../schemas/user.schema";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

const controller = () => container.resolve<AuthController>("authController");

registerRoute(router, registry, {
  method: "post",
  path: "/login",
  swaggerPath: "/v1/auth/login",
  tag: "Auth",
  bodySchema: loginUserRequestSchema,
  responseSchema: loginUserResponseSchema,
  middlewares: [validate({ body: loginUserRequestSchema })],
  handler: (req, res) => controller().login(req, res),
});

registerRoute(router, registry, {
  method: "post", path: "/service-clients", swaggerPath: "/v1/auth/service-clients", tag: "Auth",
  bodySchema: createServiceClientRequestSchema, responseSchema: createServiceClientResponseSchema,
  isProtected: true, middlewares: [authenticateJWT, authorizeScopes(["service-clients:manage"]), validate({ body: createServiceClientRequestSchema })],
  customResponses: { 201: { description: "Created" } },
  handler: (req, res) => controller().createServiceClient(req, res),
});

registerRoute(router, registry, {
  method: "post", path: "/service-clients/:clientId/rotate-secret", swaggerPath: "/v1/auth/service-clients/{clientId}/rotate-secret", tag: "Auth",
  paramsSchema: serviceClientParamsSchema, responseSchema: rotateServiceClientResponseSchema,
  isProtected: true, middlewares: [authenticateJWT, authorizeScopes(["service-clients:manage"]), validate({ params: serviceClientParamsSchema })],
  handler: (req, res) => controller().rotateServiceClientSecret(req, res),
});

registerRoute(router, registry, {
  method: "patch", path: "/service-clients/:clientId/disable", swaggerPath: "/v1/auth/service-clients/{clientId}/disable", tag: "Auth",
  paramsSchema: serviceClientParamsSchema, responseSchema: serviceClientStatusResponseSchema,
  isProtected: true, middlewares: [authenticateJWT, authorizeScopes(["service-clients:manage"]), validate({ params: serviceClientParamsSchema })],
  handler: (req, res) => controller().disableServiceClient(req, res),
});

registerRoute(router, registry, {
  method: "post",
  path: "/refresh",
  swaggerPath: "/v1/auth/refresh",
  tag: "Auth",
  bodySchema: refreshTokenRequestSchema,
  responseSchema: refreshTokenResponseSchema,
  middlewares: [validate({ body: refreshTokenRequestSchema })],
  handler: (req, res) => controller().refresh(req, res),
});

registerRoute(router, registry, {
  method: "post",
  path: "/client-credentials",
  swaggerPath: "/v1/auth/client-credentials",
  tag: "Auth",
  bodySchema: clientCredentialsRequestSchema,
  responseSchema: clientCredentialsResponseSchema,
  middlewares: [validate({ body: clientCredentialsRequestSchema })],
  handler: (req, res) => controller().clientCredentials(req, res),
});

export default router;

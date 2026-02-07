import { Router } from "express";
import { container } from "../../../config/container";
import { HealthController } from "../../controllers/health.controller";

const router = Router();

router.get("/health", (req, res) => {
  const controller = container.resolve<HealthController>("healthController");
  controller.getHealth(req, res);
});

export default router;

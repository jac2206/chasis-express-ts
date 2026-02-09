import { Router } from "express";
import { container } from "../../../../config/container";
import { GenericController } from "../../../controllers/v1/generic.controller";

const router = Router();

router.get("/", (req, res) => {
  const controller = container.resolve<GenericController>("genericController");
  controller.getGeneric(req, res);
});
router.post("/", (req, res) => {
  const controller = container.resolve<GenericController>("genericController");
  controller.postGeneric(req, res);
});

export default router;

import { Router } from "express";
import { container } from "../../../../config/container";
import { GenericController } from "../../../controllers/generic.controller";

const router = Router();

router.get("/", (req, res) => {
  const controller = container.resolve<GenericController>("genericController");
  controller.getGeneric(req, res);
});

export default router;

import { Router } from "express";
import genericRoutes from "./generic.routes";

const router = Router();

router.use("/generic", genericRoutes);

export default router;

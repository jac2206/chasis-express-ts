import { Router } from "express";
import genericRoutes from "./generic.routes";
import usersRoutes from "./users.routes";

const router = Router();

router.use("/generic", genericRoutes);
router.use("/users", usersRoutes);

export default router;

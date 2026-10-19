import { Router } from "express";
import genericRoutes from "./generic.routes";
import usersRoutes from "./users.routes";
import authRoutes from "./auth.routes";

const router = Router();
//probar
router.use("/generic", genericRoutes);
router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

export default router;

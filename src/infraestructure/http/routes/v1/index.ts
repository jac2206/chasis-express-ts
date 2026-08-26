import { Router } from 'express';
import genericRoutes from './generic.routes';
import usersRoutes from './users.routes';

const router = Router();
//probar
router.use('/generic', genericRoutes);
router.use('/users', usersRoutes);

export default router;

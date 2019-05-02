import { Router } from 'express';
import * as ctrl from './ctrl';

const router = Router();

router.get('/login', ctrl.login);
router.get('/oauth', ctrl.oauth);

export default router;

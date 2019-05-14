import { Router } from 'express';
import * as ctrl from './ctrl';
import auth from '../../middlewares/auth.middle';

const router = Router({ mergeParams: true });

router.use(auth);
router.post('/', ctrl.addTodo);
router.get('/', ctrl.getTodos);
router.patch('/:todo', ctrl.updateTodo);
router.delete('/:todo', ctrl.deleteTodo);

export default router;

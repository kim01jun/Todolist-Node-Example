import { Response, Request, Router } from 'express';
import todo from './todo';
import user from './user';

const router = Router();

router.get('/', (req: Request, res: Response) => res.status(200).json({ result: 'OK' }))
  .use('/user', user)
  .use('/:id', todo);

export default router;

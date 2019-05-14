import { Response, Request, Router } from 'express';
import todo from './todo';
import auth from './auth';

const router = Router();

router.get('/', (req: Request, res: Response) => res.status(200).json({ result: 'OK' }))
  .use('/auth', auth)
  .use('/:id', todo);

export default router;

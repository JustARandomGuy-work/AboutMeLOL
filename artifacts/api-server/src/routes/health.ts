import { Request, Response, Router } from 'express';

const router = Router();

// Make sure req and res are typed like this:
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

export default router;

import express, { Request, Response } from 'express';

// Initialise an instance of Express's `Router`.
// @see https://expressjs.com/en/4x/api.html#router
const router = express.Router();

router.get('', (req: Request, res: Response) => {
  // Simple default response
  res.json({
    status: 'OK',
  });
});

router.get('/time', (req: any, res: Response) => {
  // Resolve time service from container
  const time = req.container.resolve('time');
  // Return time
  res.json({
    epoch: time.now(),
  });
});

export default router;

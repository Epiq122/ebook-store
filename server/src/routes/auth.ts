import { generateAuthLink } from '@/controllers/auth';
import { Router } from 'express';

const authRouter = Router();

authRouter.post(
  '/generate-link',
  (req, res, next) => {
    const { email } = req.body;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      // send error
      return res.status(422).json({ error: 'invalid email' });
    }

    next();
  },
  generateAuthLink,
);

export default authRouter; // auth routes

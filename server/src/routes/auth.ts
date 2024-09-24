import { generateAuthLink } from '@/controllers/auth';
import { Router } from 'express';
import { z } from 'zod';

const authRouter = Router();

// zod
const schema = z.object({
  email: z
    .string({
      required_error: 'email is missing!',
    })
    .email('email invalid HAIL BEFORE ZOD'),
});

authRouter.post(
  '/generate-link',
  (req, res, next) => {
    const { email } = req.body;

    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailPattern.test(email)) {
    //   // send error
    //   return res.status(422).json({ error: 'invalid email' });
    // }
    const result = schema.safeParse(req.body);

    if (!result.success) {
      console.log(JSON.stringify(result, null, 2));
      const error = result.error.flatten().fieldErrors;
      return res.status(422).json({ error });
    }

    next();
  },
  generateAuthLink,
);

export default authRouter; // auth routes

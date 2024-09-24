import { Router } from 'express';

const authRouter = Router();

authRouter.post('/generate-link', (req, res) => {
  // generate auth link
  // send link to the users email
});

export default authRouter; // auth routes

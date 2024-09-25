import { RequestHandler } from 'express';
import crypto from 'crypto';

export const generateAuthLink: RequestHandler = (req, res) => {
  // generate auth link
  // send link to the users email

  /*
  1. generate unique token for every user
  2. store token in database securely
  3. create a link with the token and user information
  4. send the link to the user
  5. user clicks on the link and is redirected to the login page
 */

  //1.
  const token = crypto.randomBytes(36).toString('hex');

  //2.

  console.log(req.body);

  res.json({ ok: true });
};

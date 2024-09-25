import { RequestHandler } from 'express';
import crypto from 'crypto';
import VerificationTokenModel from '@/models/verificationToken';
import UserModel from '@/models/user';

export const generateAuthLink: RequestHandler = async (req, res) => {
  // generate auth link
  // send link to the users email

  /*
  1. generate unique token for every user
  2. store token in database securely
  3. create a link with the token and user information
  4. send the link to the user
  5. user clicks on the link and is redirected to the login page
 */

  const { email } = req.body;
  let user = await UserModel.findOne({ email });

  if (!user) {
    user = await UserModel.create({ email });
  }

  const token = crypto.randomBytes(36).toString('hex');
  await VerificationTokenModel.create<{ userId: string }>({
    userId: user._id.toString(),
    token,
  });

  console.log(req.body);

  res.json({ ok: true });
};

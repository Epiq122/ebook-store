import { RequestHandler } from 'express';
import nodemailer from 'nodemailer';
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

  const userId = user._id.toString();

  // if user already has a token, delete it
  await VerificationTokenModel.findOneAndDelete({
    userId,
  });

  const token = crypto.randomBytes(36).toString('hex');
  await VerificationTokenModel.create<{ userId: string }>({
    userId,
    token,
  });

  // Looking to send emails in production? Check out our Email API/SMTP product!
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const link = `http://localhost:8989/auth/verify?token=${token}&userId=${userId}`;

  await transport.sendMail({
    to: user.email,
    from: 'robprojects122@gmail.com',
    subject: 'Verify your email',
    html: `
    <div>
           <p>Please click on <a href="${link}">this link </a> to verify your email address.</p>
    </div>
    `,
  });

  console.log(req.body);

  res.json({ message: 'please check your email for verification link' });
};

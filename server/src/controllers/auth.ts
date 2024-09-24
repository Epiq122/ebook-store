import { RequestHandler } from 'express';

export const generateAuthLink: RequestHandler = (req, res) => {
  // generate auth link
  // send link to the users email

  console.log(req.body);

  res.json({ ok: true });
};

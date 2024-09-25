import { RequestHandler } from 'express';
import { ZodRawShape, z } from 'zod';

export const emailValidationSchema = {
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'invalid email type',
    })
    .email('invalid email'),
};

export const validate = <T extends ZodRawShape>(obj: T): RequestHandler => {
  return (req, res, next) => {
    const schema = z.object(obj);

    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data;
      next();
    } else {
      const error = result.error.flatten().fieldErrors;
      return res.status(422).json({ error });
    }
  };
};

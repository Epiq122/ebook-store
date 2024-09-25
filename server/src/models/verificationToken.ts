import { model, Schema } from 'mongoose';

const verificationTokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now(),
    expires: 60 * 60 * 24 * 7, // 7 days
  },
});

const VerificationTokenModel = model(
  'verificationToken',
  verificationTokenSchema,
);

export default VerificationTokenModel;

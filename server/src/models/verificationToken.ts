import { model, Schema } from 'mongoose';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

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

verificationTokenSchema.pre('save', function (next) {
  if (this.isModified('token')) {
    const salt = genSaltSync(10);
    this.token = hashSync(this.token, salt);
  }
  next();
});

verificationTokenSchema.methods.compare = function (token: string) {
  return compareSync(token, this.token);
};

const VerificationTokenModel = model(
  'verificationToken',
  verificationTokenSchema,
);

export default VerificationTokenModel;

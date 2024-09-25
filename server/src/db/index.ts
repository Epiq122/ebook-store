import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI is not set');
}

export const dbConnect = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(() => {
      console.error('Error connecting to MongoDB');
    });
};

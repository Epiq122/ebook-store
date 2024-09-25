import '@/db/connect';
import express from 'express';
import authRouter from '@/routes/auth';

const app = express();

// app.use((req, res, next) => {
//   req.on('data', (chunk) => {
//     req.body = JSON.parse(chunk);
//     next();
//   });
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  '/auth',

  authRouter,
);

const port = process.env.PORT || 8989;

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});

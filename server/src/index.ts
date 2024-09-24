import express from 'express';

const app = express();
const port = process.env.PORT || 8989;

app.get('/', (req, res) => {
  res.send('welcome to my nightmare');
});
app.get('/about', (req, res) => {
  res.send('welcome to my nightmare thats about');
});

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});

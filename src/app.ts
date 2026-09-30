import express from 'express';

const app = express();
app.listen(3000, () => {
  console.log('Server is successfully running on port 3000');
});

app.get('/user', [
  (req, res, next) => {
    console.log('Hello from user route 1');
    // res.send('Hello from user route 1');
    next();
  },
  (req, res, next) => {
    console.log('Hello from user route 2');
    // res.send('Hello from user route 2');
    next();
  },
  (req, res) => {
    console.log('Hello from user route 3');
    res.send('Hello from user route 3');
    next();
  },
]);

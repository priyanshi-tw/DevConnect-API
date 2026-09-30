import express from 'express';
import { adminAuth, userAuth } from './middlewares/auth.js';
const app = express();

app.listen(3000, () => {
  console.log('Server is successfully running on port 3000');
});

//handle auth middleware
app.use('/admin', adminAuth);

app.get('/admin/getAllData', (req, res) => {
  res.send('All data sent');
});

app.delete('/admin/deleteUser', (req, res) => {
  res.send(`User deleted successfully`);
});

app.post('/user/login', (req, res) => {
  res.send('User logged in successfully');
});

app.get('/user', userAuth, (req, res) => {
  res.send('User data sent');
});

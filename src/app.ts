import express from 'express';
import { connectDB } from './config/database.js';
import { User } from './models/user.js';

const app = express();

connectDB()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(3000, () => {
      console.log('Server is successfully running on port 3000');
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });

app.post('/singup', async (req, res) => {
  const user = new User({
    firstName: 'Anushka',
    lastName: 'Sharma',
    emailId: 'anushka.sharma@example.com',
    password: 'password123',
    age: 30,
    gender: 'Female',
  });

  try {
    await user.save();
    res.send('User created successfully');
  } catch (error) {
    res.status(400).send('Error creating user: ' + (error as Error).message);
  }
});

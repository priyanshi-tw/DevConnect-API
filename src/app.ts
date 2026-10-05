import express from 'express';
import { connectDB } from './config/database.js';
import { User } from './models/user.js';

const app = express();

app.use(express.json());

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

app.get('/user', async (req, res) => {
  const userEmail = req.body.emailId as string;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send('User not found');
      return;
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(500).send('Error retrieving user: ' + (error as Error).message);
  }
});

// app.get('/user', async (req, res) => {
//   const userEmail = req.body.emailId as string;
//   try {
//     const users = await User.findOne({ emailId: userEmail });
//     if (!users) {
//       res.status(404).send('User not found');
//       return;
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(500).send('Error retrieving user: ' + (error as Error).message);
//   }
// });

app.get('/feed', async (req, res) => {
  try {
    const feed = await User.find({});
    res.send(feed);
  } catch (error) {
    res.status(500).send('Error retrieving feed: ' + (error as Error).message);
  }
});
app.post('/signup', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send('User created successfully');
  } catch (error) {
    res.status(400).send('Error creating user: ' + (error as Error).message);
  }

  console.log(req.body);
});

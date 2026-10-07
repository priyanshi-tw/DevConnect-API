import express from 'express';
import { connectDB } from './config/database.js';
import { User } from './models/user.js';
import { validateSingupData } from './utils/validation.js';
import bcrypt from 'bcrypt';

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
    res.status(400).send('Error retrieving user: ' + (error as Error).message);
  }
});

app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.send(user);
  } catch (error) {
    res.status(400).send('Error retrieving user: ' + (error as Error).message);
  }
});

app.delete('/user', async (req, res) => {
  const userId = req.body.userId as string;
  try {
    await User.findByIdAndDelete(userId);

    res.send('User deleted successfully');
  } catch (error) {
    res.status(400).send('Something went wrong ' + (error as Error).message);
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
//     res.status(400).send('Error retrieving user: ' + (error as Error).message);
//   }
// });

app.get('/feed', async (req, res) => {
  try {
    const feed = await User.find({});
    res.send(feed);
  } catch (error) {
    res.status(400).send('Error retrieving feed: ' + (error as Error).message);
  }
});

app.patch('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  // const emailId = req.body.emailId as string;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ['age', 'gender', 'photoUrl', 'about', 'skills'];

    const isValidOperation = Object.keys(data).every((update) => ALLOWED_UPDATES.includes(update));
    if (!isValidOperation) {
      return res.status(400).send('Invalid updates!');
    }
    if (data?.skills?.length > 10) {
      return res.status(400).send('Skills cannot be more than 10');
    }
    const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
    // const user = await User.findByIdAndUpdate(userId, data, { returnDocument: 'after' });
    // const user = await User.findOneAndUpdate({ emailId: emailId }, data, { new: true });
    res.send('User updated successfully: ' + user);
  } catch (error) {
    res.status(400).send('Something went wrong ' + (error as Error).message);
  }
});

app.post('/signup', async (req, res) => {
  try {
    validateSingupData(req);
    const { password, firstName, lastName, emailId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);
    // req.body.password = hashedPassword;
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send('User created successfully');
  } catch (error) {
    res.status(400).send('Error creating user: ' + (error as Error).message);
  }

  console.log(req.body);
});

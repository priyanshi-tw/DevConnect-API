import express from 'express';

const app = express();
app.listen(3000, () => {
  console.log('Server is successfully running on port 3000');
});

app.get('/user/:userId/:name', (req, res) => {
  console.log(req.params);
  res.send('abc');
});

app.get('/user', (req, res) => {
  res.send({ firstname: 'Priyanshi', lastname: 'Savalia' });
});
//app.use will match all the HTTPS method API calls
app.use('/hello/3', (req, res) => {
  res.send('Hello3  from the server!');
});

app.use('/hello', (req, res) => {
  res.send('Hello hello hello from the server!');
});

app.use('/hello/2', (req, res) => {
  res.send('Hello2  from the server!');
});
app.delete('/user', (req, res) => {
  res.send('Delete user from the server!');
});
// app.use("/", (req, res) => {
//   res.send("Hello from the server!");
// });

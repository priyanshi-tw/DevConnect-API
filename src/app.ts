import express from "express";

const app = express();
app.listen(3000, () => {
  console.log("Server is successfully running on port 3000");
});

app.use("/hello", (req, res, next) => {
  res.send("Hello from the server!");
});

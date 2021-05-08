require('dotenv').config();
const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const authRouter = require('./routers/auth');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
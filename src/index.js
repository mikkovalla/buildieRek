require('dotenv').config();
const express = require('express');
require('./db/mongoose');
const http = require('http')
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const authRouter = require('./routers/auth');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRouter);
app.use(taskRouter);
app.use(authRouter);

const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
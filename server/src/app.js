const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const listName = require('./routers/listName');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../config/dev.env'),
});

require('./db/mongoose');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(listName);
module.exports = app;

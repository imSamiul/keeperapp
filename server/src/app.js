const express = require('express');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const listName = require('./routers/listName');

require('dotenv').config({
  path: path.resolve(__dirname, '../config/prod.env'),
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

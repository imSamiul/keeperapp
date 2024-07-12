const mongoose = require('mongoose');
const Task = require('./task');

const listNameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'tasks',
      trim: true,
      lowercase: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  { timestamps: true },
);

const ListName = mongoose.model('ListName', listNameSchema);
module.exports = ListName;

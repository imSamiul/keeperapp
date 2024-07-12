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

listNameSchema.pre(
  'findOneAndDelete',
  async function deleteTasksWithList(next) {
    const list = this;
    try {
      // 'this' refers to the document being removed
      await Task.deleteMany({ list: list._id });
      next();
    } catch (error) {
      next(error);
    }
  },
);

const ListName = mongoose.model('ListName', listNameSchema);
module.exports = ListName;

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      // lowercase: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
    },
  },
  { timestamps: true },
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

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
    today: {
      type: Date,
      default: null,
    },
    listName: {
      type: String,
      required: true,
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'List',
    },
  },
  { timestamps: true },
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

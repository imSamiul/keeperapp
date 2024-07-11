const express = require('express');

const Task = require('../model/task');
const ListName = require('../model/listName');
const auth = require('../middleware/auth');

const router = new express.Router();
// GET:
router.get('/tasks/:listNameId', auth, async (req, res) => {
  const { listNameId } = req.params;

  try {
    const listWithTasks = await ListName.findOne({
      owner: req.user._id,
      _id: listNameId,
    }).populate('tasks');

    res.status(201).send({ listWithTasks });
  } catch (error) {
    res.status(500).send({ message: error.toString() });
  }
});

router.get('/tasks/edit/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, owner: req.user._id });

    if (!task) {
      return res.status(400).send({ message: 'Task not found' });
    }

    return res.status(201).send({ task });
  } catch (error) {
    return res.status(500).send({ message: error.toString() });
  }
});

// POST:
router.post('/tasks', auth, async (req, res) => {
  const { title, completed, listName } = req.body;

  const createTask = new Task({
    title,
    completed,
    owner: req.user._id,
  });
  try {
    const findList = await ListName.findOne({
      title: listName,
      owner: req.user._id,
    });

    if (!findList) {
      return res.status(400).send({ message: 'List name not found' });
    }
    const savedTask = await createTask.save();
    const updateList = await ListName.findOneAndUpdate(
      { title: listName, owner: req.user._id },
      { $push: { tasks: savedTask._id } },
      { new: true },
    );
    return res.status(201).send({ savedTask, updateList });
  } catch (error) {
    return res.status(400).send({ message: error.toString() });
  }
});

// PATCH:
// Check or uncheck task
router.patch('/tasks/check/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, owner: req.user._id });

    if (!task) {
      return res.status(400).send({ message: 'Task not found' });
    }

    task.completed = !task.completed;
    await task.save();

    return res.status(201).send({ task });
  } catch (error) {
    return res.status(500).send({ message: error.toString() });
  }
});
// Edit task
router.patch('/tasks/edit/:id', auth, async (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  const allowedUpdates = ['title', 'completed'];
  const updates = Object.keys(updatedTask);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    return res.status(400).send({ message: 'Invalid updates!' });
  }

  try {
    const task = await Task.findOne({ _id: id, owner: req.user._id });
    if (!task) {
      return res.status(400).send({ message: 'Task not found' });
    }
    updates.forEach((update) => {
      task[update] = updatedTask[update];
    });
    await task.save();
    return res.status(201).send({ task });
  } catch (error) {
    return res.status(500).send({ message: error.toString() });
  }
});

// DELETE:
router.delete('/tasks/:listId/:id', auth, async (req, res) => {
  const { listId, id } = req.params;
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });
    if (!res) {
      return res.status(400).send({ message: 'Task not found' });
    }
    const newList = await ListName.findOneAndUpdate(
      { _id: listId },
      { $pull: { tasks: id } },
    );
    return res.status(201).send({ deletedTask, newList });
  } catch (error) {
    return res.status(500).send({ message: error.toString() });
  }
});

module.exports = router;

const express = require('express');

const Task = require('../model/task');
const User = require('../model/user');
const ListName = require('../model/listName');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
  const { title, completed, listName } = req.body;
  const createTask = new Task({
    title,
    completed,
    listName,
  });
  try {
    const findList = await ListName.findOne({
      title: listName,
      owner: req.user._id,
    });

    if (!findList) {
      return res.status(400).send({ error: 'List name not found' });
    }
    const savedTask = await createTask.save();
    const updateList = await ListName.findOneAndUpdate(
      { title: listName, owner: req.user._id },
      { $push: { tasks: savedTask._id } },
      { new: true },
    );
    res.status(201).send({ savedTask, updateList });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

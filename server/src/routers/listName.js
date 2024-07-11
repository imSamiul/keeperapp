const express = require('express');
const ListName = require('../model/listName');
const auth = require('../middleware/auth');

const router = new express.Router();

// POST:
// Create new list name
router.post('/listNames', auth, async (req, res) => {
  const { title } = req.body;
  const duplicateList = await ListName.findOne({ title, owner: req.user._id });
  if (duplicateList) {
    return res.status(400).send({ message: 'List name already exists' });
  }
  const createList = new ListName({ title, owner: req.user._id });
  try {
    const savedList = await createList.save();

    return res.status(201).send({ title: savedList.title });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.toString() });
  }
});

// GET:
// Get list names
router.get('/listNames', auth, async (req, res) => {
  try {
    const listNames = await ListName.find({ owner: req.user._id }).populate(
      'tasks',
    );
    const listNamesArray = listNames.map((list) => ({
      id: list._id,
      title: list.title,
      tasks: list.tasks,
    }));

    res.status(201).send({ listNamesArray, user: req.user });
  } catch (error) {
    res.status(500).send({ message: error.toString() });
  }
});

// PATCH:
// Edit list name
router.patch('/listNames/edit/:listId', auth, async (req, res) => {
  const { listId } = req.params;

  const updateListObj = req.body;
  const allowedUpdates = ['title'];
  const updates = Object.keys(updateListObj);

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    return res.status(400).send({ message: 'Invalid updates' });
  }

  try {
    const listNameObj = await ListName.findOne({
      _id: listId,
      owner: req.user._id,
    });

    if (!listNameObj) {
      return res.status(400).send({ message: 'List not found' });
    }
    updates.forEach((update) => {
      listNameObj[update] = updateListObj[update];
    });
    await listNameObj.save();
    return res.status(201).send({ listNameObj });
  } catch (error) {
    return res.status(500).send({ message: error.toString() });
  }
});

module.exports = router;

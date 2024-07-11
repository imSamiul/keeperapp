const express = require('express');

const ListName = require('../model/listName');
const auth = require('../middleware/auth');
const User = require('../model/user');

const router = new express.Router();
// POST:
router.post('/listNames', auth, async (req, res) => {
  const { title } = req.body;
  const duplicateList = await ListName.findOne({ title, owner: req.user._id });
  if (duplicateList) {
    return res.status(400).send({ message: 'List name already exists' });
  }
  const createList = new ListName({ title, owner: req.user._id });
  try {
    const savedList = await createList.save();

    res.status(201).send({ title: savedList.title });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.toString() });
  }
});

// GET:
router.get('/listNames', auth, async (req, res) => {
  try {
    const listNames = await ListName.find({ owner: req.user._id }).populate(
      'tasks',
    );
    const listNamesArray = listNames.map((list) => {
      return { id: list._id, title: list.title, tasks: list.tasks };
    });

    res.status(201).send({ listNamesArray, user: req.user });
  } catch (error) {
    res.status(500).send({ message: error.toString() });
  }
});

// PATCH:

router.patch('/listNames/edit/:listName', auth, async (req, res) => {
  const { listName } = req.params;
  const updateListObj = req.body;
  const allowedUpdates = ['title'];
  const updates = Object.keys(updateListObj);

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    res.status(400).send({ message: 'Invalid updates' });
  }

  try {
    const listNameObj = await ListName.findOne({
      title: listName,
      owner: req.user._id,
    });

    if (!listNameObj) {
      return res.status(400).send({ message: 'List not found' });
    }
    updates.forEach((update) => (listNameObj[update] = updateListObj[update]));
    await listNameObj.save();
    res.status(201).send({ listNameObj });
  } catch (error) {
    res.status(500).send({ message: error.toString() });
  }
});

module.exports = router;

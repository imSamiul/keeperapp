const express = require('express');

const User = require('../model/user');

const router = new express.Router();

router.post('/users/register', async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = new User({ name, email, password });

  try {
    const createUserSave = await createUser.save();
    if (createUserSave) {
      const token = await createUser.generateAuthToken();
      res.status(201).send({ user: createUser, token });
    }
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).send({ message: 'Email is already registered' });
    } else {
      res.status(500).send({ message: error });
    }
  }
});
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginSuccessfulUser = await User.findByCredentials(email, password);
    if (loginSuccessfulUser) {
      const token = await loginSuccessfulUser.generateAuthToken();
      res.status(201).send({ user: loginSuccessfulUser, token });
    }
  } catch (error) {
    res.status(403).send({ message: error.toString() });
  }
});
module.exports = router;

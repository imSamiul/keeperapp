const express = require('express');

const User = require('../model/user');
const auth = require('../middleware/auth');
const ListName = require('../model/listName');
const mailSender = require('../utils/sendMail');

const OTP = require('../model/otp');
const findExistingOTP = require('../utils/findExistingOtp');

const router = new express.Router();

// POST:
// send OTP
router.post('/users/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).send({ message: 'User already registered' });
    }

    const otp = await findExistingOTP();
    const otpBody = new OTP({ email, otp });
    const savedOTP = await otpBody.save();

    return res.status(200).send({
      message: 'OTP sent successfully',
      email: savedOTP.email,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});
// create new user
router.post('/users/register', async (req, res) => {
  const { name, email, password } = req.body;
  const createUser = new User({ name, email, password });

  try {
    // const findEmail = await User.findOne({ email });
    // if (findEmail) {
    //   return res.status(409).send({ message: 'Email is already registered' });
    // }
    const createUserSave = await createUser.save();

    if (createUserSave) {
      const newList = new ListName({
        name: 'tasks',
        owner: createUserSave._id,
      });
      await newList.save();
      const token = await createUser.generateAuthToken();
      const sendMail = await mailSender(
        createUser.email,
        'Welcome to Keeper',
        otpMail(),
      );
      console.log('Email sent successfully: ', sendMail);
      res.status(201).send({ user: createUser, token, sendMail });
    }
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(409).send({ message: 'Email is already registered' });
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
    res.status(500).send({ message: error.toString() });
  }
});
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token,
    );
    await req.user.save();
    res.send({ message: 'Logged out', status: 200 });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});
module.exports = router;

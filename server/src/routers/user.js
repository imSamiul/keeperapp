const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');

const User = require('../model/user');
const auth = require('../middleware/auth');
const ListName = require('../model/listName');

const OTP = require('../model/otp');
const findExistingOTP = require('../utils/findExistingOtp');

const router = new express.Router();

// POST:
// send OTP
router.post('/users/register/send-otp', async (req, res) => {
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
// match and verify OTP
router.post('/users/register/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const existingOTP = await OTP.findOne({ email, otp });

    if (existingOTP) {
      // OTP is valid
      const token = jwt.sign({ email }, process.env.OTP_VERIFY_TOKEN, {
        expiresIn: '5m',
      });
      res
        .status(200)
        .send({ success: true, message: 'OTP verification successful', token });
    } else {
      // OTP is invalid
      res.status(400).send({ message: 'OTP is not valid' });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});
// create new user
router.post('/users/register', async (req, res) => {
  const { otpToken, name, password } = req.body;

  try {
    if (!otpToken) {
      return res.status(400).send({ message: 'OTP token is required' });
    }
    const decoded = jwt.verify(otpToken, process.env.OTP_VERIFY_TOKEN);
    const { email } = decoded;
    const createUser = new User({ name, email, password });
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(409).send({ message: 'Email is already registered' });
    }
    const createUserSave = await createUser.save();

    if (createUserSave) {
      const newList = new ListName({
        name: 'tasks',
        owner: createUserSave._id,
      });
      await newList.save();
      const token = await createUser.generateAuthToken();

      return res.status(201).send({ user: createUser, token });
    }
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(409).send({ message: 'Email is already registered' });
    } else {
      res.status(500).send({ message: error.toString() });
    }
    return null;
  }
  return null;
});
// Login user
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
// Logout user
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

// PATCH:
// Add avatar
const storage = multer.memoryStorage();
const avatar = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file'));
    }
    return cb(undefined, true);
  },
});
router.patch(
  '/profile/avatar',
  auth,
  avatar.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    try {
      User.findByIdAndUpdate(req.user.id, { avatar: buffer }, { new: true });

      res.status(200).send({ message: 'Avatar uploaded successfully' });
    } catch (error) {
      res.status(500).send({ message: error.toString() });
    }
  },
);
module.exports = router;

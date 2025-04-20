const express = require('express');

const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const { findFileType } = require('../utils/findFileType');

const User = require('../model/user');
const auth = require('../middleware/auth');
const ListName = require('../model/listName');

const OTP = require('../model/otp');
const findExistingOTP = require('../utils/findExistingOtp');

const router = new express.Router();

// GET:
// Get user profile
router.get('/users/me', auth, async (req, res) => {
  try {
    const base64Avatar = req.user.avatar
      ? req.user.avatar.toString('base64')
      : null;
    const getFileType = await findFileType();

    const fileTypeResult = base64Avatar
      ? await getFileType.fileTypeFromBuffer(req.user.avatar)
      : null;
    res.send({
      user: req.user,
      avatar: base64Avatar,
      fileType: fileTypeResult && fileTypeResult.ext,
    });
  } catch (error) {
    res.status(500).send({ message: error.toString() });
  }
});

// POST:
// // send OTP
// router.post('/users/register/send-otp', async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(409).send({ message: 'User already registered' });
//     }

//     const otp = await findExistingOTP();
//     const otpBody = new OTP({ email, otp });
//     const savedOTP = await otpBody.save();

//     return res.status(200).send({
//       message: 'OTP sent successfully',
//       email: savedOTP.email,
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).send({ message: error.message });
//   }
// });
// // match and verify OTP
// router.post('/users/register/verify-otp', async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const existingOTP = await OTP.findOne({ email, otp });

//     if (existingOTP) {
//       // OTP is valid
//       const token = jwt.sign({ email }, process.env.OTP_VERIFY_TOKEN, {
//         expiresIn: '5m',
//       });
//       res
//         .status(200)
//         .send({ success: true, message: 'OTP verification successful', token });
//     } else {
//       // OTP is invalid
//       res.status(400).send({ message: 'OTP is not valid' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.toString() });
//   }
// });
// create new user
router.post('/users/register', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'User already registered' });
    }
    const newUser = new User({
      email,
      password,
      name,
    });
    const createUser = await newUser.save();

    if (createUser) {
      const newList = new ListName({
        name: 'tasks',
        owner: createUser._id,
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

// Configure Multer with memory storage and file size limit
const storage = multer.memoryStorage();
const avatar = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file (jpg, jpeg, png)'));
    }
    return cb(undefined, true);
  },
});

// Route for uploading avatar
router.patch(
  '/users/me/avatar',
  auth,
  avatar.single('avatar'),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error('No file uploaded');
      }

      // Resize the image using Sharp
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 360, height: 360 })
        .png()
        .toBuffer();

      // Update the user's avatar in the database
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { avatar: buffer },
        { new: true },
      );
      const base64Avatar = user.avatar.toString('base64');
      const getFileType = await findFileType();

      const fileTypeResult = await getFileType.fileTypeFromBuffer(buffer);

      res
        .status(200)
        .send({ avatar: base64Avatar, fileType: fileTypeResult.ext });
    } catch (error) {
      res.status(500).send({ message: error.toString() });
    }
  },
  (error, req, res, next) => {
    // Handle Multer errors

    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res
          .status(400)
          .send({ message: 'File too large. Max size is 5MB.' });
      }
    }

    // Handle other errors (e.g., file type, no file uploaded)
    return res.status(400).send({ message: error.message });
  },
);

router.patch('/users/me', auth, async (req, res) => {
  const updateUserData = req.body;
  const allowedUpdates = ['name'];
  const updates = Object.keys(updateUserData);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    return res.status(400).send({ message: 'Invalid updates' });
  }
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    updates.forEach((update) => {
      user[update] = updateUserData[update];
    });
    await user.save();
    return res.status(201).send({ user });
  } catch (error) {
    return res.status(500).send({ message: error.toString() });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
      validate: (value) => {
        if (validator.contains(value.toLowerCase(), 'password')) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);
//
userSchema.methods.toJSON = function toJSON() {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function generateAuthToken() {
  const user = this;

  // ... rest of your logic to generate and store the token (uncommented)
  const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_TOKEN);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//
userSchema.statics.findByCredentials = async function findByCredentials(
  email,
  password,
) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Email or password is incorrect');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Email or password is incorrect');
  }
  return user;
};

// set the middleware up for hashing password before saving
userSchema.pre('save', async function hashPassword(next) {
  const user = this; // this gives to individual user that i will save
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('users', userSchema);
module.exports = User;

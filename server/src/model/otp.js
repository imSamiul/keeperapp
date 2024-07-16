const mongoose = require('mongoose');
const mailSender = require('../utils/sendMail');
const otpMail = require('../utils/mailTemplate');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 30, // The document will be automatically deleted after 5 minutes of its creation time
  },
  // TODO: make 30 to 5
});
// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      'Verify your email for Keeper',
      otpMail(otp),
    );
    return mailResponse;
  } catch (error) {
    console.log('Error occurred while sending email: ', error);
    throw new Error('Error occurred while sending email');
  }
}
otpSchema.pre('save', async function sendOtp(next) {
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;

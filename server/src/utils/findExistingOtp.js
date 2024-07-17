const otpGenerator = require('otp-generator');
const OTP = require('../model/otp');

async function findExistingOTP() {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const result = await OTP.findOne({ otp });
  if (result) {
    return findExistingOTP();
  }
  return otp;
}
module.exports = findExistingOTP;

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../config/dev.env'),
});

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, USER } =
  process.env;

// create a new OAuth2 client from google
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
// set credentials to the OAuth2 client
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function getTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken,
    },
  });
  return transporter;
}

const mailSender = async (email, title, body) => {
  try {
    const transporter = await getTransporter();
    const mailOptions = {
      from: {
        name: 'keeper3041.netlify.app',
        address: 'keeper3041.netlify.app',
      },
      to: email,
      subject: title,
      html: body,
    };

    // Send emails to users
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    return error;
  }
};
module.exports = mailSender;

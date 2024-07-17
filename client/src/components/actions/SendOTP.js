import { redirect } from "react-router-dom";

import { sendOTP } from "../../services/apiUsers";
import store from "../../store";
import { addOtpEmail } from "../../util/auth";

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  const errors = {};
  if (email.length < 1) {
    errors.error = "Email must not be empty.";
  } else if (email.includes("@") === false) {
    errors.error = "Email must be valid.";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const emailObj = {
    email,
  };
  const res = await sendOTP(emailObj);
  console.log(res);
  const userMail = res.email;
  addOtpEmail(userMail);
  return redirect("./verify-otp");
}

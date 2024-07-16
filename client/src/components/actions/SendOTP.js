import { redirect } from "react-router-dom";
import { setOtpEmail } from "../../pages/users/userSlice";
import { sendOTP } from "../../services/apiUsers";
import store from "../../store";

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  const errors = {};
  if (email.length < 1) {
    errors.error = "Email must not be empty.";
  }
  if (email.includes("@") === false) {
    errors.error = "Email must be valid.";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const emailObj = {
    email,
  };
  // const res = await sendOTP(emailObj);
  // const userMail = res.email;
  store.dispatch(setOtpEmail("samiul15-3041@diu.edu.bd"));
  return redirect("./verify-otp");
}

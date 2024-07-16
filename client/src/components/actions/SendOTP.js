import { setOtpEmail } from "../../pages/users/userSlice";
import { sendOTP } from "../../services/apiUsers";
import store from "../../store";

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  const errors = {};
  if (email.length < 1) {
    errors.message = "Email must not be empty.";
  }
  if (email.includes("@") === false) {
    errors.message = "Email must be valid.";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const emailObj = {
    email,
  };
  const res = await sendOTP(emailObj);
  const userMail = res.email;
  store.dispatch(setOtpEmail(userMail));
  return null;
}

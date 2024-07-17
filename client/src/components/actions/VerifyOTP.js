import { getOtpEmail } from "../../util/auth";

export async function action({ request }) {
  const data = await request.formData();
  const otp = data.get("otp");
  const otpEmail = getOtpEmail();

  const errors = {};
  if (otp.length < 1) {
    errors.error = "OTP must not be empty.";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  return null;
}

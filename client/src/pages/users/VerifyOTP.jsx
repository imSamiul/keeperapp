import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { getOtpEmail } from "../../util/auth";

function VerifyOTP() {
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const otpEmail = getOtpEmail();
  const actionData = useActionData();
  const navigation = useNavigation();

  useEffect(() => {
    if (!otpEmail) {
      navigate(-1);
    }
    if (navigation.state === "idle" && actionData)
      if (actionData.error) {
        setError(actionData.error);
      }
  }, [otpEmail, navigate, actionData, navigation.state]);

  return (
    <div className="w-3/4 ">
      <h1 className="text-xl font-medium text-[#14213d] ">
        An email with OTP has been sent to{" "}
        <span className=" font-bold text-[#fca311]">{otpEmail}</span>. Submit it
        here before it expires.
      </h1>

      <Form method="POST">
        <div className="flex items-center justify-center flex-col gap-3">
          <Input
            classNames="bg-[#e5e5e5] mt-4 w-full text-lg text-center "
            type="text"
            placeholder="OTP here"
            value={OTP}
            onChange={(e) => {
              setOTP(e.target.value);
              setError("");
            }}
            name="otp"
          ></Input>
          {error && <p className="text-red-500">{error}</p>}
          <Button classNames="text-base py-2 bg-[#fca311] text-white hover:bg-white hover:text-black">
            Verify
          </Button>
        </div>
      </Form>
      <p className="text-lg mt-6 text-center">
        Already have an account?
        <Link to="/login" className="text-[#fca311] ml-2">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default VerifyOTP;

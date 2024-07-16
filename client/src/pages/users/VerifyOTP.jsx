import { Form } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { useSelector } from "react-redux";

function VerifyOTP() {
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const otpEmail = useSelector((state) => state.user.otpEmail);

  // TODO: add error for verify otp page
  return (
    <Form className="w-3/4 ">
      <h1 className="text-xl font-medium text-[#14213d] ">
        An email with OTP has been sent to{" "}
        <span className=" font-bold text-[#fca311]">{otpEmail}</span>. Submit it
        here before it expires.
      </h1>
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
          name="email"
        ></Input>
        <Button classNames="text-base py-2 bg-[#fca311] text-white hover:bg-white hover:text-black">
          Verify
        </Button>
      </div>
    </Form>
  );
}

export default VerifyOTP;

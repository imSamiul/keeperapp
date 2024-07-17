import { useEffect, useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { getOtpEmail, getOtpToken } from "../../util/auth";

function Register() {
  const [formInputValue, setFormInputValue] = useState({
    name: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState("");
  const actionData = useActionData();
  const navigation = useNavigation();
  const otpEmail = getOtpEmail();
  const otpToken = getOtpToken();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormInputValue((preFormData) => {
      return {
        ...preFormData,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (!otpToken) {
      navigate(-1);
    }
    if (navigation.state === "idle" && actionData)
      if (actionData.error) {
        setError(actionData.error);
      }
  }, [otpToken, navigate, actionData, navigation.state]);

  return (
    <div className="  w-3/4">
      <h1 className="text-xl font-medium text-[#14213d] ">
        One more step to go. Please provide username and password for{" "}
        <span className=" font-bold text-[#fca311]">{otpEmail}</span>.
      </h1>
      <Form method="POST" className="pt-5 flex flex-col gap-3">
        <Input
          classNames="  bg-[#e5e5e5]  w-full text-lg border-none"
          placeholder="Your name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formInputValue.name}
        ></Input>
        <Input
          classNames="  bg-[#e5e5e5]  w-full text-lg border-none"
          placeholder="Your password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formInputValue.password}
        ></Input>
        <Input
          classNames="  bg-[#e5e5e5]  w-full text-lg border-none"
          placeholder="Re-enter your password"
          type="password"
          name="rePassword"
          onChange={handleChange}
          value={formInputValue.rePassword}
        ></Input>
        {error && <p className="text-red-500">{error}</p>}
        <Button classNames="text-base py-2 bg-[#fca311] text-white hover:bg-white hover:text-black">
          Sign Up
        </Button>
      </Form>
      {/* 
      <div className=" mt-8 mb-4 flex items-center justify-between">
        <div className="border-black border h-0 w-full"></div>
        <p className="text-center text-lg font-medium mx-1">Or</p>
        <div className="border-black border h-0 w-full"></div>
      </div> */}
      {/* 
      <button className="btn border-none bg-[#27ae60] text-white w-full h-auto py-3 min-h-0 hover:text-black hover:outline-1  hover:border-black hover:border-solid hover:border-st btn-disabled ">
        <i className="fa-brands fa-google"></i>
        <span>Google</span>
      </button> */}

      <p className="text-lg mt-6 text-center">
        Already have an account?
        <Link to="/login" className="text-[#fca311] ml-2">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Register;

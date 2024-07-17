import { useEffect, useState } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Login() {
  const [formInputValue, setFormInputValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const actionData = useActionData();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "idle" && actionData) {
      if (actionData.error) {
        setError(actionData.error);
      }
    }
  }, [navigation.state, actionData]);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormInputValue((preFormData) => {
      return {
        ...preFormData,
        [name]: value,
      };
    });
  }
  return (
    <div className=" w-3/4">
      <h1 className=" text-3xl font-medium text-[#14213d]">
        Start your day quickly by
        <br />
        <span className=" font-bold text-[#fca311] ">Sign In</span>
      </h1>
      <Form method="POST" className="pt-5 flex flex-col gap-6">
        <Input
          classNames=" bg-[#e5e5e5] w-full text-lg "
          placeholder="Your email"
          type="email"
          name="email"
          onChange={handleChange}
          value={formInputValue.email}
        ></Input>
        <Input
          classNames=" bg-[#e5e5e5] w-full text-lg "
          placeholder="Your password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formInputValue.password}
        ></Input>
        <Button classNames="text-base py-2 bg-[#fca311] text-white hover:bg-white hover:text-black">
          Login
        </Button>
      </Form>

      {/* <div className=" mt-8 mb-4 flex items-center justify-between">
        <div className="border-black border h-0 w-full"></div>
        <p className="text-center text-lg font-medium mx-1">Or</p>
        <div className="border-black border h-0 w-full"></div>
      </div>

      <button className="btn border-none bg-[#27ae60] text-white w-full h-auto py-3 min-h-0 hover:text-black hover:outline-1  hover:border-black hover:border-solid hover:border-st btn-disabled">
        <i className="fa-brands fa-google"></i>
        <span>Google</span>
      </button> */}
      {error && <p className="text-red-500">{error}</p>}
      <p className="text-lg mt-6 text-center">
        Don't have an account?
        <Link to="/register" className="text-[#fca311] ml-2">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;

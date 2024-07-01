import { useState } from "react";
import { Form, Link } from "react-router-dom";
import Input from "../../components/ui/Input";

function Login() {
  const [formInputValue, setFormInputValue] = useState({
    email: "",
    password: "",
  });
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
    <div className="font-figtree">
      <h1 className=" text-2xl md:text-4xl font-extrabold">Sign In</h1>
      <Form method="POST" className="pt-5 flex flex-col gap-6">
        <Input
          classNames=" bg-blue-100 "
          placeholder="Your email"
          type="email"
          name="email"
          onChange={handleChange}
          value={formInputValue.email}
        ></Input>
        <Input
          className="input bg-blue-100 p-5 h-0 focus:border-none border-none focus:outline-none"
          placeholder="Your password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formInputValue.password}
        ></Input>
        <button className="btn bg-[#C425D9] border-none py-3 text-white min-h-0 h-auto hover:text-black hover:outline-1  hover:border-black hover:border-solid hover:border-st">
          Login
        </button>
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

      <p className="text-lg mt-6">
        Don't have an account?
        <Link to="/register" className="text-blue-500 ml-2">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { Form, Link } from "react-router-dom";

function Register() {
  const [formInputValue, setFormInputValue] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
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
    <div className="pt-6 font-figtree">
      <h1 className=" text-2xl md:text-4xl font-extrabold">Register</h1>
      <Form method="POST" className="pt-5 flex flex-col gap-6">
        <input
          className="input bg-blue-100 p-5 h-0 focus:border-none border-none focus:outline-none"
          placeholder="Your name"
          type="text"
          name="name"
          onChange={handleChange}
          required
          value={formInputValue.name}
        ></input>
        <input
          className="input bg-blue-100 p-5 h-0 focus:border-none border-none focus:outline-none"
          placeholder="Your email"
          type="email"
          name="email"
          onChange={handleChange}
          value={formInputValue.email}
          required
        ></input>
        <input
          className="input bg-blue-100 p-5 h-0 focus:border-none border-none focus:outline-none"
          placeholder="Your password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formInputValue.password}
          required
        ></input>
        <input
          className="input bg-blue-100 p-5 h-0 focus:border-none border-none focus:outline-none"
          placeholder="Re-enter your password"
          type="password"
          name="rePassword"
          onChange={handleChange}
          value={formInputValue.rePassword}
          required
        ></input>
        <button className="btn bg-[#C425D9] border-none py-3 text-white min-h-0 h-auto hover:text-black hover:outline-1  hover:border-black hover:border-solid hover:border-st">
          Sign Up
        </button>
      </Form>

      <div className=" mt-8 mb-4 flex items-center justify-between">
        <div className="border-black border h-0 w-full"></div>
        <p className="text-center text-lg font-medium mx-1">Or</p>
        <div className="border-black border h-0 w-full"></div>
      </div>

      <button className="btn border-none bg-[#27ae60] text-white w-full h-auto py-3 min-h-0 hover:text-black hover:outline-1  hover:border-black hover:border-solid hover:border-st btn-disabled ">
        <i className="fa-brands fa-google"></i>
        <span>Google</span>
      </button>

      <p className="text-lg mt-6">
        Already have an account?
        <Link to="/login" className="text-blue-500 ml-2">
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default Register;

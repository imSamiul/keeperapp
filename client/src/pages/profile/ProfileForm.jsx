import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Form, Link, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

function ProfileForm() {
  const data = useLoaderData();
  const [formInputValue, setFormInputValue] = useState({ name: "" });
  const { name, email } = data;

  useEffect(() => {
    setFormInputValue({ name, email });
  }, [name, email]);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormInputValue({ ...formInputValue, [name]: value });
  }

  return (
    <Form method="POST">
      <div className="label">
        <span className="label-text text-lg">Email:</span>
      </div>
      <Input
        type="text"
        classNames="disabled:text-black disabled:bg-gray-400 w-full"
        value={email}
        disabled
      />
      <div className="label">
        <span className="label-text text-lg">Name:</span>
      </div>
      <Input
        type="text"
        classNames="text-black bg-white w-full"
        value={formInputValue.name}
        name="name"
        onChange={handleInputChange}
      />
      <div className="label">
        <span className="label-text text-lg">Password:</span>
      </div>
      <Input
        type="password"
        classNames="disabled:text-black disabled:bg-gray-400 w-full"
        value="Samiul"
        disabled
      />
      <div className="mt-5 flex justify-between">
        <Button classNames="bg-[#fca311] text-white hover:bg-white hover:text-black border-none py-2 text-md">
          Update
        </Button>
        <Link
          to="/todo"
          className="btn bg-[#fca311] text-white hover:bg-white hover:text-black border-none py-2 text-md  shadow-none   min-h-6 h-auto  rounded-sm  "
        >
          Home
        </Link>
      </div>
    </Form>
  );
}

export default ProfileForm;

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Form } from "react-router-dom";

function ProfileForm() {
  return (
    <Form method="POST">
      <div className="label">
        <span className="label-text text-lg">Email:</span>
      </div>
      <Input
        type="text"
        classNames="disabled:text-black disabled:bg-gray-400 w-full"
        placeholder="samiulkarimprodhan@gmail.com"
        disabled
      />
      <div className="label">
        <span className="label-text text-lg">Name:</span>
      </div>
      <Input
        type="text"
        classNames="text-black bg-white w-full"
        value="Samiul"
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
      <div className="mt-5">
        <Button classNames="bg-[#fca311] text-white hover:bg-white hover:text-black border-none py-2 text-md">
          Update
        </Button>
      </div>
    </Form>
  );
}

export default ProfileForm;

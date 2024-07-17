import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";

function EmailVerify() {
  const [email, setEmail] = useState("");
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
  console.log(navigation.state);
  return (
    <>
      {navigation.state === "loading" && <p>Loading...</p>}
      <div className="w-3/4 ">
        <h1 className="text-3xl font-medium text-[#14213d] leading-10">
          Welcome! Please enter your email to get started with{" "}
          <span className="font-shantellSans font-bold text-[#fca311]">
            Keeper.
          </span>
        </h1>

        <Form method="POST">
          <div className="flex items-center justify-center flex-col gap-3">
            <Input
              classNames="bg-[#e5e5e5] mt-4 w-full text-lg "
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              name="email"
            ></Input>
            {error && <p className="text-red-500">{error}</p>}
            <Button classNames="text-base py-2 bg-[#fca311] text-white hover:bg-white hover:text-black">
              Send OTP
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
    </>
  );
}

export default EmailVerify;

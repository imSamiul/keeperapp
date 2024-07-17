import { Form, useActionData, useNavigation } from "react-router-dom";

import Button from "../../../components/ui/Button";
import { useEffect, useState } from "react";
import Input from "../../../components/ui/Input";
import { useSelector } from "react-redux";

function AddToDo() {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const listName = useSelector((state) => state.listNames.listNameHeader);

  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (navigation.state === "idle" && actionData) {
      if (actionData.error) {
        setError(actionData.error);
      }
      setTitle("");
    }
  }, [navigation.state, actionData]);
  return (
    <Form method="POST" className=" flex w-full gap-2">
      <input type="hidden" name="listName" value={listName} />
      <Input
        id="title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        classNames="bg-white shadow-md w-full font-shantellSans text-xl"
        placeholder="Add new task"
      />

      <Button
        type="submit"
        name="intent"
        value="addTask"
        classNames="text-base py-2 md:py-2 bg-[#fca311] text-white hover:bg-white hover:text-black "
        iconClassNames="fa-solid fa-clipboard-list"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add"}
      </Button>
      {error && <p>{error}</p>}
    </Form>
  );
}

export default AddToDo;

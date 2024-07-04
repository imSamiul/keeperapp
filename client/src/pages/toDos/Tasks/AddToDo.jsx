import { Form, useActionData, useNavigation } from "react-router-dom";

import Button from "../../../components/ui/Button";
import { useEffect, useState } from "react";
import Input from "../../../components/ui/Input";

function AddToDo() {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const actionData = useActionData();
  const navigation = useNavigation();
  useEffect(() => {
    if (navigation.state === "idle" && actionData) {
      if (actionData.error) {
        setError(actionData.error);
      }
      setTitle("");
    }
  }, [navigation.state, actionData]);
  return (
    <Form method="POST">
      <Input
        id="title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
      />

      <Button type="submit" name="intent" value="addTask">
        Add
      </Button>
      {error && <p>{error}</p>}
    </Form>
  );
}

export default AddToDo;

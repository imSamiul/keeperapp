import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useEffect, useState } from "react";

function AddList({
  btnClassNames,
  inputClassNames,
  iconClassNames,
  placeholder,
}) {
  const [listName, setListName] = useState("");
  const [error, setError] = useState("");
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (navigation.state === "idle" && actionData) {
      if (actionData.message) {
        setError(actionData.message);
      }
      setListName("");
    }
  }, [navigation.state, actionData]);

  return (
    <Form method="POST" className="flex flex-col gap-2">
      <Input
        name="listName"
        type="text"
        placeholder={placeholder}
        classNames={inputClassNames}
        value={listName}
        onChange={(e) => {
          setListName(e.target.value);
          setError("");
        }}
      />
      <Button
        classNames={btnClassNames}
        iconClassNames={iconClassNames}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Add new List"}
      </Button>
      {error && <p>{error}</p>}
    </Form>
  );
}

export default AddList;

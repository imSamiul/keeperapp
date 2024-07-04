import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useEffect, useState } from "react";

function AddList({ btnClassNames, inputClassNames, iconClassNames }) {
  const [listName, setListName] = useState("");
  const actionData = useActionData();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "idle" && actionData) {
      setListName("");
    }
  }, [navigation.state, actionData]);

  return (
    <Form method="POST" className="flex flex-col gap-2">
      <Input
        name="listName"
        type="text"
        classNames={inputClassNames}
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <Button classNames={btnClassNames} iconClassNames={iconClassNames}>
        Add new List
      </Button>
    </Form>
  );
}

export default AddList;

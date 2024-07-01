import { Form } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

function AddList({ btnClassNames, inputClassNames, iconClassNames }) {
  return (
    <Form method="POST" className="flex flex-col gap-2">
      <Input name="listName" type="text" classNames={inputClassNames} />
      <Button classNames={btnClassNames} iconClassNames={iconClassNames}>
        Add new List
      </Button>
    </Form>
  );
}

export default AddList;

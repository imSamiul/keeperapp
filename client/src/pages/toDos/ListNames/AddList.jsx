import { Form } from "react-router-dom";
import Input from "../../../components/ui/Input";

function AddList({ classNames }) {
  return (
    <Form method="POST">
      <Input name="listName" type="text" classNames={classNames} />

      <button>+ Add new List </button>
    </Form>
  );
}

export default AddList;

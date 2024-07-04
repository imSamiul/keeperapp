import { Form } from "react-router-dom";

import Button from "../../../components/ui/Button";

function AddToDo() {
  return (
    <Form method="POST">
      <input id="title" type="text" name="title" />

      <Button>Add</Button>
    </Form>
  );
}

export default AddToDo;

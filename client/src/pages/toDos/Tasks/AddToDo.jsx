import { Form } from "react-router-dom";
import store from "../../../store";
import { addTodo } from "./todoSlice";

function AddToDo({ listName }) {
  return (
    <Form>
      <p>
        <input type="hidden" name="listName" value={listName} />
        <input id="title" type="text" name="title" />
      </p>
      <button>Add</button>
    </Form>
  );
}

export default AddToDo;

export async function action({ request }) {
  const data = await request.formData();
  const toDoData = {
    title: data.get("title"),
    listName: data.get("listName"),
  };
  store.dispatch(addTodo(toDoData));
}

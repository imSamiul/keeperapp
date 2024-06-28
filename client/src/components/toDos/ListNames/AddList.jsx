import { Form } from "react-router-dom";
import { createList } from "../../../services/apiListNames";
import store from "../../../store";
import { createNewList } from "./listNamesSlice";

function AddList() {
  return (
    <Form method="POST">
      <input name="listName" type="text" /> <button>+ Add new List </button>
    </Form>
  );
}

export default AddList;

export async function action({ request }) {
  const data = await request.formData();
  const listNameData = data.get("listName");

  const listNameObj = {
    title: listNameData,
  };

  const newListItem = await createList(listNameObj);

  store.dispatch(createNewList(newListItem.title));

  return null;
}

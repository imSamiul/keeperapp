import { createNewList } from "../../pages/toDos/ListNames/listNamesSlice";
import { createList } from "../../services/apiListNames";
import store from "../../store";

export async function action({ request }) {
  const data = await request.formData();
  const listNameData = data.get("listName");

  const listNameObj = {
    title: listNameData,
  };

  const newListItem = await createList(listNameObj);

  store.dispatch(createNewList(newListItem.title));

  return { success: true };
}

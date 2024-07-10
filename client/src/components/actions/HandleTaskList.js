import { createNewList } from "../../pages/toDos/ListNames/listNamesSlice";
import { createList } from "../../services/apiListNames";
import store from "../../store";

export async function action({ request }) {
  const data = await request.formData();
  const listNameData = data.get("listName");

  // PATCH: edit task list name
  // if(request.method === "PATCH") {
  //   const listId = data.get("listId");
  //   // const listName = await createList(listNameData, listId);
  //   return null;
  // }
  const errors = {};
  if (listNameData.length < 1) {
    errors.message = "List name must be at least 1 character";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const listNameObj = {
    title: listNameData,
  };

  const newListItem = await createList(listNameObj);

  store.dispatch(createNewList(newListItem.title));

  return { success: true };
}

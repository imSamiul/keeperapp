import { redirect } from "react-router-dom";
import { createNewList } from "../../pages/toDos/ListNames/listNamesSlice";
import { createList, editListName } from "../../services/apiListNames";
import store from "../../store";

export async function action({ request }) {
  const data = await request.formData();
  const listName = data.get("listName");

  // PATCH: edit task list name
  if (request.method === "PATCH") {
    const title = data.get("title");
    const listNameData = {
      title: title,
    };

    const updateListName = await editListName(listName, listNameData);
    const newUrl = updateListName.listNameObj.title
      .replace(/\s+/g, "-")
      .toLowerCase();

    return redirect(`/todo/${newUrl}`);
  }
  const errors = {};
  if (listName.length < 1) {
    errors.message = "List name must be at least 1 character";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const listNameObj = {
    title: listName,
  };

  const newListItem = await createList(listNameObj);

  store.dispatch(createNewList(newListItem.title));

  return { success: true };
}

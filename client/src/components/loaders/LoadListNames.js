import { redirect } from "react-router-dom";
import { getTaskList } from "../../services/apiListNames";
import { getAuthToken } from "../../util/auth";
import store from "../../store";
import { setDefaultTasksId } from "../../pages/toDos/ListNames/listNamesSlice";

export async function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/register");
  }

  const { listNamesArray, user } = await getTaskList();

  store.dispatch(setDefaultTasksId(listNamesArray[0].id));

  return { taskList: listNamesArray, user };
}

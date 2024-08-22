import { redirect } from "react-router-dom";
import { getTaskList } from "../../services/apiListNames";
import { getAuthToken } from "../../util/auth";
import store from "../../store";
import { setDefaultTasksId } from "../../pages/toDos/ListNames/listNamesSlice";
import { addAvatar, addUser } from "../../pages/users/userSlice";

export async function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/register");
  }

  const { listNamesArray, user, avatar, fileType } = await getTaskList();

  store.dispatch(setDefaultTasksId(listNamesArray[0].id));
  store.dispatch(addUser(user));
  store.dispatch(addAvatar({ avatar, fileType }));

  return { taskList: listNamesArray, user };
}

import { redirect } from "react-router-dom";
import { getTaskList } from "../../services/apiListNames";
import { getAuthToken } from "../../util/auth";

export async function loader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/register");
  }

  const { listNamesArray, user } = await getTaskList();

  return { taskList: listNamesArray, user };
}

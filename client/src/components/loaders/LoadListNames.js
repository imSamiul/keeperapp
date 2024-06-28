import { getTaskList } from "../../services/apiListNames";

export async function loader() {
  const taskList = await getTaskList();

  return taskList.listNamesArray;
}

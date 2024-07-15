import { changeHeader } from "../../pages/toDos/ListNames/listNamesSlice";
import { getFixedTask } from "../../services/apiTasks";
import store from "../../store";

export async function loader({ params }) {
  const { fixedTaskName } = params;
  const task = await getFixedTask(fixedTaskName);
  const fixedTasks = task.fixedTasks;
  store.dispatch(changeHeader(fixedTaskName));
  return fixedTasks;
}

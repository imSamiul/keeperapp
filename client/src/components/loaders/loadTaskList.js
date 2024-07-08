import { loadTasks } from "../../pages/toDos/Tasks/todoSlice";
import { getListTasks } from "../../services/apiTasks";
import store from "../../store";

export async function loader({ params }) {
  const { listName } = params;

  const listTasks = await getListTasks(listName);

  const { _id, tasks } = listTasks.task;

  store.dispatch(loadTasks(tasks));

  return { id: _id, tasks };
}

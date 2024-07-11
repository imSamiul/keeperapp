import { loadTasks } from "../../pages/toDos/Tasks/todoSlice";
import { getListTasks } from "../../services/apiTasks";
import store from "../../store";

export async function loader({ params }) {
  const { listName } = params;

  const listTasks = await getListTasks(listName);
  console.log(listTasks);

  const { _id, tasks } = listTasks.task;

  store.dispatch(loadTasks(tasks));
  // id: id of list name and tasks: list of tasks
  return { id: _id, tasks };
}

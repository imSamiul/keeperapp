import { changeHeader } from "../../pages/toDos/ListNames/listNamesSlice";
import { loadTasks } from "../../pages/toDos/Tasks/todoSlice";
import { getListTasks } from "../../services/apiTasks";
import store from "../../store";

export async function loader({ params }) {
  const { listNameId } = params;

  const listWithTasks = await getListTasks(listNameId);

  const { _id, title, tasks } = listWithTasks.listWithTasks;

  store.dispatch(loadTasks(tasks));
  store.dispatch(changeHeader(title));
  // id: id of list name and tasks: list of tasks
  return { id: _id, title, tasks };
}

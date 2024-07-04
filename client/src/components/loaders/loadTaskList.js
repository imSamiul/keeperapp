import { getListTasks } from "../../services/apiTasks";

export async function loader({ params }) {
  const { listName } = params;

  const listTasks = await getListTasks(listName);

  const tasks = listTasks.task.tasks;

  return { tasks };
}

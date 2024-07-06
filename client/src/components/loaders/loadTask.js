import { getTask } from "../../services/apiTasks";

export async function loader({ params }) {
  const { taskId } = params;
  const task = await getTask(taskId);

  return task;
}

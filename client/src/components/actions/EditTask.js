import { handleCompleteTask } from "../../services/apiTasks";

export async function action({ request, params }) {
  const data = await request.formData();
  const { id, completed } = data;

  if (completed) {
    const task = await handleCompleteTask(id);
    console.log(task);
    return null;
  }

  return null;
}

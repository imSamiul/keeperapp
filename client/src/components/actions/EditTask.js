import { redirect } from "react-router-dom";
import { handleCompleteTask, updateTask } from "../../services/apiTasks";

export async function action({ request, params }) {
  const { taskId } = params;
  const data = await request.formData();
  const checkTask = data.get("checkTask");
  const title = data.get("title");
  const checked = data.get("checked") === "on";

  if (checkTask) {
    await handleCompleteTask(taskId);

    return redirect("..");
  }

  const taskObj = {
    title: title,
    completed: checked,
  };

  const task = await updateTask(taskId, taskObj);
  console.log(task);

  return redirect("..");
}

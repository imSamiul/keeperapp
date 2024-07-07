import { redirect } from "react-router-dom";
import { handleCompleteTask, updateTask } from "../../services/apiTasks";

export async function action({ request, params }) {
  console.log("called");
  const { taskId } = params;
  const data = await request.formData();
  const checkTask = data.get("checkTask");
  const title = data.get("title");
  const checked = data.get("checked") === "on";
  console.log(data);

  if (checkTask) {
    const task = await handleCompleteTask(taskId);
    console.log(task);

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

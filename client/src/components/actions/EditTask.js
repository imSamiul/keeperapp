import { redirect } from "react-router-dom";
import { handleCompleteTask } from "../../services/apiTasks";

export async function action({ request, params }) {
  console.log("called");
  const { taskId } = params;
  const data = await request.formData();
  const checked = data.get("checked");

  if (checked) {
    const task = await handleCompleteTask(taskId);
    console.log(task);
    return redirect("..");
  }

  return redirect("..");
}

import { redirect } from "react-router-dom";
import { handleCompleteTask } from "../../services/apiTasks";

export async function action({ request, params }) {
  const data = await request.formData();
  const id = data.get("id");
  const checked = data.get("checked");

  if (checked) {
    const task = await handleCompleteTask(id);
    console.log(task);
    return redirect("..");
  }

  return null;
}

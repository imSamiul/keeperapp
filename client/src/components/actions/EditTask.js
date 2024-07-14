import { redirect } from "react-router-dom";
import { handleCompleteTask, updateTask } from "../../services/apiTasks";
import { getLastSecondBeforeTomorrow } from "../utils/time";

export async function action({ request, params }) {
  const { taskId } = params;
  const data = await request.formData();
  const checkTask = data.get("checkTask");
  const title = data.get("title");

  const checked = data.get("checked") === "on";
  const btnIntent = data.get("intent");

  if (checkTask) {
    await handleCompleteTask(taskId);

    return redirect("..");
  }
  let taskObj = {
    title: title,
    completed: checked,
  };
  if (btnIntent === "addToday") {
    taskObj = {
      title: title,
      completed: checked,
      today: getLastSecondBeforeTomorrow(),
    };
  }
  if (btnIntent === "removeToday") {
    taskObj = {
      title: title,
      completed: checked,
      today: "",
    };
  }

  const task = await updateTask(taskId, taskObj);
  console.log(task);

  return redirect("..");
}

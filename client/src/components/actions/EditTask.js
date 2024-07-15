import { redirect } from "react-router-dom";
import { handleCompleteTask, updateTask } from "../../services/apiTasks";

export async function action({ request, params }) {
  const { taskId } = params;
  const data = await request.formData();
  const checkTask = data.get("checkTask");
  const title = data.get("title");
  const listName = data.get("listName");

  const checked = data.get("checked") === "on";
  const btnIntent = data.get("intent");

  if (checkTask) {
    await handleCompleteTask(taskId);

    return redirect("..");
  }
  let taskObj = {
    title: title,
    completed: checked,
    listName: listName,
  };

  if (btnIntent === "addToday") {
    taskObj = {
      ...taskObj,
      today: Date.now(),
    };
  }
  if (btnIntent === "removeToday") {
    taskObj = {
      ...taskObj,
      today: "",
    };
  }

  const task = await updateTask(taskId, taskObj);
  console.log(task);

  return redirect("..");
}

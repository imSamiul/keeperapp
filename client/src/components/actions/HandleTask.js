import { addTodo } from "../../pages/toDos/Tasks/todoSlice";
import {
  createTask,
  deleteTask,
  handleCompleteTask,
} from "../../services/apiTasks";
import store from "../../store";

export async function action({ request }) {
  const data = await request.formData();
  const taskId = data.get("taskId");
  const listId = data.get("listId");

  // PATCH: complete task
  if (request.method === "PATCH") {
    const task = await handleCompleteTask(taskId);
    console.log(task);
    return null;
  }
  // DELETE: delete task
  if (request.method === "DELETE") {
    const task = await deleteTask(listId, taskId);
    return task;
  }

  // POST: add task
  const btnIntent = data.get("intent");
  const title = data.get("title");
  const listName = data.get("listName");

  // check if task is empty
  let message = {};
  if (title.length < 1) {
    message.error = "Task must be at least 1 character";
  }
  if (Object.keys(message).length > 0) {
    return message;
  }
  const toDoData = {
    title,
    listName,
    completed: false,
  };
  if (btnIntent === "addTask") {
    const newTask = await createTask(toDoData);
    store.dispatch(addTodo(newTask.savedTask));
    message.success = "Task added successfully!";
    return message;
  }
}

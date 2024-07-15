import { addTodo } from "../../pages/toDos/Tasks/todoSlice";
import {
  createTask,
  deleteTask,
  handleCompleteTask,
} from "../../services/apiTasks";
import store from "../../store";

export async function action({ request, params }) {
  const data = await request.formData();
  const taskId = data.get("taskId");

  let listId = params.listNameId;

  // PATCH: complete task
  if (request.method === "PATCH") {
    const task = await handleCompleteTask(taskId);
    console.log(task);
    return null;
  }
  // DELETE: delete task
  if (request.method === "DELETE") {
    const deleteListId = data.get("deleteListId");
    const task = await deleteTask(deleteListId, taskId);
    return task;
  }

  // POST: add task
  const btnIntent = data.get("intent");
  const title = data.get("title");
  let listName = data.get("listName");

  // check if task is empty
  let message = {};
  if (title.length < 1) {
    message.error = "Task must be at least 1 character";
  }
  if (Object.keys(message).length > 0) {
    return message;
  }
  let toDoData = {
    title,
    listName,
    listId,
    completed: false,
    today: null,
  };

  if (listName === "Today's Tasks") {
    toDoData = {
      ...toDoData,
      listName: "tasks",
      listId: store.getState().listNames.defaultTaskId,
      today: Date.now(),
    };
  }

  if (btnIntent === "addTask") {
    const newTask = await createTask(toDoData);
    store.dispatch(addTodo(newTask.savedTask));
    message.success = "Task added successfully!";
    return message;
  }
}

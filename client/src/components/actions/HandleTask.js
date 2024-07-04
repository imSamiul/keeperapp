import { addTodo } from "../../pages/toDos/Tasks/todoSlice";
import { createTask } from "../../services/apiTasks";
import store from "../../store";

export async function action({ request, params }) {
  const { listName } = params;
  const modifyListName = listName.replace(/-/g, " ");
  const data = await request.formData();
  const btnIntent = data.get("intent");
  const title = data.get("title");

  let message = {};
  if (title.length < 1) {
    message.error = "Task must be at least 1 character";
  }
  if (Object.keys(message).length > 0) {
    return message;
  }

  const toDoData = {
    title,
    listName: modifyListName,
    completed: false,
  };
  if (btnIntent === "addTask") {
    const newTask = await createTask(toDoData);

    store.dispatch(addTodo(newTask));
    message.success = "Task added successfully!";
    return message;
  }
}

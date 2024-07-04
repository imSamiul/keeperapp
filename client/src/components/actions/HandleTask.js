import { addTodo } from "../../pages/toDos/Tasks/todoSlice";
import { createTask } from "../../services/apiTasks";
import store from "../../store";

export async function action({ request, params }) {
  const { listName } = params;
  const modifyListName = listName.replace(/-/g, " ");
  const data = await request.formData();
  const btnIntent = data.get("intent");

  const toDoData = {
    title: data.get("title"),
    listName: modifyListName,
    completed: false,
  };
  if (btnIntent === "addTask") {
    const newTask = await createTask(toDoData);
    store.dispatch(addTodo(newTask));
    return { success: true };
  }
}

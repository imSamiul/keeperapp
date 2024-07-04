import { addTodo } from "../../pages/toDos/Tasks/todoSlice";
import store from "../../store";

export async function action({ request, params }) {
  const { listName } = params;
  console.log(listName);
  const data = await request.formData();
  const toDoData = {
    title: data.get("title"),
    listName: listName,
    completed: false,
  };
  store.dispatch(addTodo(toDoData));
}

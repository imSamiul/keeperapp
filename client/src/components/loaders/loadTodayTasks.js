import { changeHeader } from "../../pages/toDos/ListNames/listNamesSlice";
import { getTodayTasks } from "../../services/apiTasks";
import store from "../../store";

export async function loader() {
  const todayTasks = await getTodayTasks();
  store.dispatch(changeHeader("Today's Tasks"));
  return todayTasks;
}

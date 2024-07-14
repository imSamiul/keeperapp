import { getTodayTasks } from "../../services/apiTasks";

export async function loader() {
  const todayTasks = await getTodayTasks();
  return todayTasks;
}

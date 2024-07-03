import { getListTasks } from "../../services/apiTasks";

export async function loader({ request, params }) {
  const { listName } = params;
  console.log(listName);
  const listTasks = await getListTasks(listName);
  return listTasks;
}

import { getListTasks } from "../../services/apiTasks";

export async function loader({ params }) {
  const { listName } = params;

  // const listTasks = await getListTasks(listName);
  // console.log(listTasks);
  return null;
}

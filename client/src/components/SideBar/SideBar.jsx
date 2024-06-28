import { Link, useRouteLoaderData } from "react-router-dom";
import { getTaskList } from "../../services/apiListNames";
import SideBarList from "./SideBarList";

function SideBar() {
  const taskListNames = useRouteLoaderData("todo");

  return (
    <div className="drawer-side h-full  ">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="bg-blue-200 h-full p-4 w-80">
        <Link to="/todo">Keeper</Link>
        <SideBarList taskListNames={taskListNames} />
      </div>
    </div>
  );
}

export default SideBar;

export async function loader() {
  const taskList = await getTaskList();

  return taskList.listNamesArray;
}

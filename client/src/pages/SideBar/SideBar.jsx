import { Link, useRouteLoaderData } from "react-router-dom";
import { getTaskList } from "../../services/apiListNames";
import SideBarList from "./SideBarList";
import AddList from "../toDos/ListNames/AddList";

function SideBar() {
  const fetchListNames = useRouteLoaderData("todo");
  const taskListNames = [
    { id: "all tasks", title: "All Tasks" },
    ...fetchListNames,
  ];

  const modifyListNames = taskListNames.map((listName) => {
    let lowerCaseString = listName.title.toLowerCase();
    let resultString = lowerCaseString.replace(/\s+/g, "-");
    return { id: listName.title, title: listName.title, url: resultString };
  });

  return (
    <div className="drawer-side  rounded-l-lg h-full">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="bg-[#e5e5e5] h-full py-8 px-9 w-80 ">
        <h3 className="font-alegreya text-3xl mb-6 font-semibold">Menu</h3>
        <AddList
          inputClassNames="w-full max-w-xs bg-white"
          btnClassNames="w-full py-2.5"
        />
        <SideBarList taskListNames={modifyListNames} />
      </div>
    </div>
  );
}

export default SideBar;

export async function loader() {
  const taskList = await getTaskList();

  return taskList.listNamesArray;
}

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
      <div className="bg-[#e5e5e5] h-full py-8 px-9 w-80 flex flex-col">
        <div>
          <h3 className="font-alegreya text-3xl mb-6 font-semibold flex-1">
            Menu
          </h3>
          <div className="flex-1">
            <AddList
              inputClassNames="w-full max-w-xs bg-white"
              btnClassNames="w-full text-base py-3 md:py-2.5"
            />
          </div>
        </div>
        <div className="my-4 flex-[9] rounded-md bg-[#14213d]  bg-opacity-5  overflow-hidden scrollbar">
          <SideBarList taskListNames={modifyListNames} />
        </div>
        <div className="flex justify-around w-full flex-1 items-center">
          <h1>Settings</h1>
          <h1>Log Out</h1>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

export async function loader() {
  const taskList = await getTaskList();

  return taskList.listNamesArray;
}

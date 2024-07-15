import { Outlet, useRouteLoaderData } from "react-router-dom";
import AddToDo from "./AddToDo";
import TaskList from "./TaskList";

function Task() {
  const data = useRouteLoaderData("listName");

  // id: id of list name and tasks: list of tasks
  const { tasks } = data;
  return (
    <div className="bg-[#fca311] h-full bg-opacity-10 p-5">
      <AddToDo />

      <div className="flex gap-2 flex-col-reverse md:flex-row mt-2">
        <TaskList tasks={tasks} />
        <Outlet />
      </div>
    </div>
  );
}

export default Task;

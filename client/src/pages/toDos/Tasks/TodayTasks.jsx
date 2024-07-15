import { Outlet, useLoaderData } from "react-router-dom";
import TaskList from "./TaskList";
import AddToDo from "./AddToDo";

function TodayTasks() {
  const todayTasks = useLoaderData();
  console.log(todayTasks.todayTasks);

  return (
    <div className="bg-[#fca311] h-full bg-opacity-10 p-5">
      <AddToDo />
      <TaskList tasks={todayTasks.todayTasks}></TaskList>
      <Outlet />
    </div>
  );
}

export default TodayTasks;

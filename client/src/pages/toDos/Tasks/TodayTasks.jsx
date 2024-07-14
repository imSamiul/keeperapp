import { useLoaderData } from "react-router-dom";
import TaskList from "./TaskList";

function TodayTasks() {
  const todayTasks = useLoaderData();
  console.log(todayTasks.todayTasks);

  return (
    <div className="bg-[#fca311] h-full bg-opacity-10 p-5">
      <TaskList tasks={todayTasks.todayTasks}></TaskList>
    </div>
  );
}

export default TodayTasks;

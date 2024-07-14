import { useLoaderData } from "react-router-dom";
import TaskList from "./TaskList";

function TodayTasks() {
  const todayTasks = useLoaderData();
  console.log(todayTasks.todayTasks);

  return (
    <div>
      <TaskList tasks={todayTasks.todayTasks}></TaskList>
    </div>
  );
}

export default TodayTasks;

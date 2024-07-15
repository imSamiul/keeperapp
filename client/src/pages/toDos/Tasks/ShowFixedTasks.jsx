import React from "react";
import { useLoaderData } from "react-router-dom";
import TaskList from "./TaskList";

function ShowFixedTasks() {
  const fixedTasks = useLoaderData();

  return (
    <div>
      <TaskList tasks={fixedTasks}></TaskList>
    </div>
  );
}

export default ShowFixedTasks;

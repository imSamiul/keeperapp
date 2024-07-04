import React from "react";
import { useLoaderData } from "react-router-dom";

function TaskList() {
  const data = useLoaderData();
  const tasks = data.tasks || [];

  return (
    <div>
      {tasks
        .sort((a, b) => a.completed - b.completed) // Sort tasks with completed ones first
        .map((task) => (
          <div
            key={task.title}
            className="flex items-center gap-2 p-2 bg-white mt-2 rounded-md shadow-md"
          >
            <input
              type="checkbox"
              className="checkbox border-[#fca311] [--chkbg:#fca311] [--chkfg:white] checked:border-none"
              checked={task.completed}
            />
            <p
              className={`font-shantellSans text-xl text-black ${
                task.completed && "line-through"
              }`}
            >
              {task.title}
            </p>
          </div>
        ))}
    </div>
  );
}

export default TaskList;

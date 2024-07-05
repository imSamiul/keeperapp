import { useLoaderData, useSubmit } from "react-router-dom";
import Button from "../../../components/ui/Button";

function TaskList() {
  const data = useLoaderData();
  const submit = useSubmit();
  const tasks = data.tasks;

  function handleCompleteTask(e) {
    submit({ id: e.target.name }, { method: "PATCH" });
  }

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
              checked={!task.completed}
              onChange={handleCompleteTask}
              name={task._id}
            />
            <p
              className={`font-shantellSans text-xl text-black ${
                task.completed && "line-through"
              }`}
            >
              {task.title}
            </p>
            <Button iconClassNames="fa-solid fa-pen-to-square"></Button>
          </div>
        ))}
    </div>
  );
}

export default TaskList;

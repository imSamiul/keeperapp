function Task() {
  const tasks = [
    { title: "task1", completed: true },
    { title: "task2", completed: false },
    { title: "task3", completed: false },
    { title: "task4", completed: false },
    { title: "task5", completed: false },
    { title: "task6", completed: false },
    { title: "task7", completed: false },
    { title: "task8", completed: false },
    { title: "task9", completed: false },
    { title: "task10", completed: true },
    { title: "task11", completed: true },
    { title: "task12", completed: true },
    { title: "task13", completed: true },
    { title: "task14", completed: true },
    { title: "task15", completed: true },
    { title: "task16", completed: true },
    { title: "task17", completed: true },
    { title: "task18", completed: true },
    { title: "task19", completed: true },
    { title: "task20", completed: true },
  ];

  return (
    <div className="bg-[#fca311] bg-opacity-10 p-5">
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

export default Task;

import AddToDo from "./AddToDo";
import TaskList from "./TaskList";

function Task() {
  return (
    <div className="bg-[#fca311] bg-opacity-10 p-5">
      <AddToDo />
      <TaskList />
    </div>
  );
}

export default Task;

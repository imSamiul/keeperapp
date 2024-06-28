import { useSelector } from "react-redux";
import AddToDo from "./AddToDo";
import { useNavigate } from "react-router-dom";
import AddList from "../ListNames/AddList";

function AllTasks() {
  const toDos = useSelector((state) => state.todo.toDos);
  const navigate = useNavigate();

  const handleDivClick = (toDo) => {
    navigate(`/todo/${toDo.listName}`);
  };

  return (
    <>
      <AddList />
      {toDos.map((toDo) => {
        return (
          <div key={toDo.listName} className="border relative">
            <h2>{toDo.listName}</h2>
            <AddToDo listName={toDo.listName} />
            <div>
              {toDo.tasks.map((task) => {
                return (
                  <li key={task.id}>
                    {task.title}
                    {task.completed ? "Completed" : "Not Completed"}
                  </li>
                );
              })}
            </div>
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => handleDivClick(toDo)}
            ></div>
          </div>
        );
      })}
    </>
  );
}

export default AllTasks;

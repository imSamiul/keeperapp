import { useSelector } from "react-redux";
import AddToDo from "./AddToDo";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import AddList from "../ListNames/AddList";

function AllTasks() {
  const toDos = useSelector((state) => state.todo.toDos);
  const navigate = useNavigate();
  const listNamesData = useRouteLoaderData("todo");

  const handleDivClick = (toDo) => {
    navigate(`/todo/${toDo.listName}`);
  };

  return (
    <>
      <h1 className="font-alegreya font-semibold text-3xl my-8 px-4">
        All Tasks
      </h1>

      {listNamesData.map((listNameData) => {
        return (
          <div key={listNameData.id} className="border relative">
            <h2>{listNameData.title}</h2>
            <AddToDo listName={listNameData.title} />
            <div>
              {listNameData.tasks.map((task) => {
                return (
                  <li key={task._id}>
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

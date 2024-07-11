import { useRouteLoaderData, useSubmit } from "react-router-dom";
import LinkButton from "../../../components/ui/LinkButton";
import Checkbox from "../../../components/ui/Checkbox";
import Modal from "../../../components/ui/Modal";

function TaskList() {
  const data = useRouteLoaderData("listName");
  const submit = useSubmit();
  // id: id of list name and tasks: list of tasks
  const { id: listId, tasks } = data;

  function handleCompleteTask(e) {
    const taskId = e.target.name;
    submit({ taskId }, { method: "PATCH" });
  }
  function handleDeleteTask(taskId) {
    submit({ listId, taskId }, { method: "DELETE" });
  }

  return (
    <div className="flex-[8]">
      {tasks
        .sort((a, b) => a.completed - b.completed) // Sort tasks with completed ones first
        .map((task) => (
          <div
            key={task._id}
            className="flex mt-2 p-2 bg-white  rounded-md shadow-md justify-between"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                className=" border-[#fca311] [--chkbg:#fca311] [--chkfg:white]"
                checked={task.completed}
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
            </div>
            <div className="flex gap-3">
              <LinkButton to={task._id} state={location.pathname}>
                <i className="fa-solid fa-pen-to-square fa-xl"></i>
              </LinkButton>

              <Modal
                iconClassNames="fa-solid fa-trash-can  fa-lg"
                btnClassNames="p-3 bg-[#fca311] text-white hover:bg-white hover:text-black "
                actionBtnTitle={["Delete", "Cancel"]}
                handleModalAction={() => handleDeleteTask(task?._id)}
                task={task}
              >
                <h1 className="text-lg lg:text-xl">
                  Are you sure want to delete
                  <span className="font-semibold"> {task.title} </span>?
                </h1>
              </Modal>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TaskList;

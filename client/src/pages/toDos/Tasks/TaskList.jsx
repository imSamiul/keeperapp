import { useSubmit } from "react-router-dom";
import LinkButton from "../../../components/ui/LinkButton";
import Checkbox from "../../../components/ui/Checkbox";
import Modal from "../../../components/ui/Modal";

function TaskList({ tasks }) {
  const submit = useSubmit();

  function handleCheckCompleteTask(taskId) {
    submit({ taskId, checkTitle: "completeTask" }, { method: "PATCH" });
  }
  function handleCheckImportantTask(taskId) {
    submit({ taskId, checkTitle: "importantTask" }, { method: "PATCH" });
  }
  function handleDeleteTask(taskId, deleteListId) {
    submit({ taskId, deleteListId }, { method: "DELETE" });
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
                onChange={() => handleCheckCompleteTask(task._id)}
                name="checkComplete"
              />
              <p
                className={`font-shantellSans text-xl text-black ${
                  task.completed && "line-through"
                }`}
              >
                {task.title}
              </p>
              <p className="font-shantellSans text-black/50">
                -{task.listName}
              </p>
              {task.today && (
                <p className="bg-[#fca311] text-white px-2 rounded-md">Today</p>
              )}
            </div>
            <div className="flex gap-3">
              <label className="swap swap-flip">
                {/* this hidden checkbox controls the state */}

                <input
                  type="checkbox"
                  onChange={() => handleCheckImportantTask(task._id)}
                  checked={task.important}
                  name="checkImportant"
                />

                <div className="swap-on">
                  <i className="fa-solid fa-star"></i>
                </div>
                <div className="swap-off">
                  <i className="fa-regular fa-star"></i>
                </div>
              </label>

              <LinkButton to={`/todo/${task.listId}/${task._id}`}>
                <i className="fa-solid fa-pen-to-square fa-xl"></i>
              </LinkButton>

              <Modal
                iconClassNames="fa-solid fa-trash-can  fa-lg"
                btnClassNames="p-3 bg-[#fca311] text-white hover:bg-white hover:text-black "
                actionBtnTitle={["Delete", "Cancel"]}
                handleModalAction={() =>
                  handleDeleteTask(task?._id, task?.listId)
                }
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

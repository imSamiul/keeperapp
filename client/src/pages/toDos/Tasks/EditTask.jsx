import { Form, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Checkbox from "../../../components/ui/Checkbox";
import { useSelector } from "react-redux";
import { formatTimestamp } from "../../../util/time";

function EditTask() {
  const data = useLoaderData();
  const task = data.task;
  const submit = useSubmit();
  const navigate = useNavigate();

  const [addToday, setAddToday] = useState(false);
  const [title, setTitle] = useState(task.title);

  const listName = useSelector((state) => state.listNames.listNameHeader);

  // Control the input field
  function handleTask(e) {
    setTitle(e.target.value);
  }
  // Set the title to the task title in initial render and when task title changes
  useEffect(() => {
    setTitle(task.title);
    setAddToday(task.today);
  }, [task.title, task.today]);
  //  Handle task complete checkbox
  function handleCompleteTask() {
    submit({ checkTask: true }, { method: "PATCH" });
  }

  return (
    <Form
      method="PATCH"
      className="flex-[3] bg-white h-fit rounded-md overflow-hidden"
    >
      <h3 className="text-xl font-medium py-2 px-4 bg-[#e5e5e5] ">Edit</h3>
      <div className="py-4 px-2">
        <div className="flex items-center gap-2 ">
          <Checkbox
            className=" border-[#fca311] [--chkbg:#fca311] [--chkfg:white]"
            checked={task.completed}
            name="checked"
            onChange={handleCompleteTask}
          />
          <input
            type="text"
            name="title"
            onChange={handleTask}
            value={title}
            className="input py-1 px-0 h-auto rounded-sm border-t-0 border-r-0 border-l-0 border-b-2 border-[#fca311] w-full font-shantellSans text-xl focus:border-[#fca311] focus:outline-none "
          ></input>
          <input
            type="hidden"
            name="listName"
            value={task.listName ? task.listName : listName}
          />
          <input type="hidden" name="taskId" value={task._id} />
        </div>

        <div className="mt-2 flex gap-2 items-center justify-end">
          <button
            className="btn h-auto min-h-6 rounded-sm p-2 text-md hover:bg-[#e5e5e5]  hover:border-solid bg-[#14213d] text-white hover:text-black"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <Button
            classNames="p-2 text-md bg-[#fca311] text-white hover:bg-[#e5e5e5] hover:text-black "
            iconClassNames="fa-solid fa-check"
            disabled={task.title === title}
          >
            Update
          </Button>
        </div>

        <div className="mt-3">
          <Button
            classNames={`${
              addToday
                ? "hover:bg-[#e5e5e5] border-solid border-black hover:border-solid bg-[#14213d] text-white hover:text-black"
                : "bg-[#fca311] text-white hover:bg-white hover:text-black"
            } py-2 w-full`}
            iconClassNames="fa-solid fa-sun"
            name="intent"
            value={addToday ? "removeToday" : "addToday"}
          >
            {addToday ? "Remove from today" : "Add to today"}
          </Button>
        </div>
        <p className="text-center mt-3 text-black/50">
          Created at: {formatTimestamp(task.createdAt)}
        </p>
      </div>
    </Form>
  );
}

export default EditTask;

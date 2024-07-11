import {
  Form,
  useLoaderData,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import Input from "../../../components/ui/Input";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import Checkbox from "../../../components/ui/Checkbox";
import LinkButton from "../../../components/ui/LinkButton";

function EditTask() {
  const data = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();

  const task = data.task;
  const [title, setTitle] = useState(task.title);

  function handleTask(e) {
    setTitle(e.target.value);
  }
  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);

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
        </div>

        <div className="mt-2 flex gap-2 items-center justify-end">
          <button
            className="btn h-auto min-h-6 rounded-sm p-2 text-md hover:bg-[#e5e5e5]  hover:border-solid"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <Button
            classNames="p-2 text-md bg-[#fca311] text-white hover:bg-white hover:text-black "
            iconClassNames="fa-solid fa-check"
            disabled={task.title === title}
          >
            Update
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default EditTask;

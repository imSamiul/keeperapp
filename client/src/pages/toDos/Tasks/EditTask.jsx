import { Form, useLoaderData } from "react-router-dom";
import Input from "../../../components/ui/Input";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";

function EditTask() {
  const data = useLoaderData();
  const [title, setTitle] = useState(data.task.title);

  function handleTask(e) {
    setTitle(e.target.value);
  }
  useEffect(() => {
    setTitle(data.task.title);
  }, [data.task.title]);

  return (
    <Form className="flex-[3] bg-white h-fit rounded-md overflow-hidden">
      <h3 className="text-xl font-medium py-2 px-4 bg-[#e5e5e5] ">Edit</h3>
      <div className="py-4 px-2">
        <div className="flex items-center gap-2 ">
          <input type="checkbox" />
          <input
            type="text"
            name="title"
            onChange={handleTask}
            value={title}
            className="input py-1 px-0 h-auto rounded-sm border-t-0 border-r-0 border-l-0 border-b-2 border-[#fca311] w-full font-shantellSans text-xl "
          ></input>
        </div>
        <Button>Cancel</Button>
        <Button>Update</Button>
      </div>
    </Form>
  );
}

export default EditTask;

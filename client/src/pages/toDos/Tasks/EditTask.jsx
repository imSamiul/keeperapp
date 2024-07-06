import { useLoaderData } from "react-router-dom";
import Input from "../../../components/ui/Input";
import { useEffect, useState } from "react";

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
    <div className="flex-[1] bg-white h-fit p-2">
      <Input
        type="text"
        name="title"
        value={title}
        onChange={handleTask}
        classNames="bg-[#e5e5e5]"
      />
    </div>
  );
}

export default EditTask;

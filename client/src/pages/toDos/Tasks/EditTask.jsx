import Input from "../../../components/ui/Input";

function EditTask() {
  return (
    <div className="flex-[1] bg-white h-fit p-2">
      <Input type="text" name="title" value="Task title" />
    </div>
  );
}

export default EditTask;

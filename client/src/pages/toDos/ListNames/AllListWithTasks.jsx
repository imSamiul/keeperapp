import { useRouteLoaderData } from "react-router-dom";
import ListItem from "./ListItem";

function AllListWithTasks() {
  const { taskList: listNamesData, user } = useRouteLoaderData("todo");

  return (
    <div className="px-4 py-4">
      <h1 className="pb-5 font-alegreya text-4xl font-medium  capitalize">
        Hello {user.name},
      </h1>
      <div className="grid  md:grid-cols-3  gap-5 ">
        {listNamesData.map((listNameData) => {
          return <ListItem key={listNameData.id} listNameData={listNameData} />;
        })}
      </div>
    </div>
  );
}

export default AllListWithTasks;

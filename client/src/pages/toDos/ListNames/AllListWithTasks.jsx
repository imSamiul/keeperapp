import { useRouteLoaderData } from "react-router-dom";
import ListItem from "./ListItem";

function AllListWithTasks() {
  const listNamesData = useRouteLoaderData("todo");

  return (
    <div className="grid  md:grid-cols-3  gap-5 px-4 py-4 bg-cover ">
      {listNamesData.map((listNameData) => {
        return <ListItem key={listNameData.id} listNameData={listNameData} />;
      })}
    </div>
  );
}

export default AllListWithTasks;

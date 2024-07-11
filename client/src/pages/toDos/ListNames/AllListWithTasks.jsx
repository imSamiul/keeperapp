import { useRouteLoaderData } from "react-router-dom";
import ListItem from "./ListItem";
import AddList from "./AddList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetHeader } from "./listNamesSlice";

function AllListWithTasks() {
  const { taskList: listNamesData, user } = useRouteLoaderData("todo");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetHeader());
  }, [dispatch]);

  return (
    <div className="px-4 py-4">
      <h1 className="pb-5 font-alegreya text-4xl font-medium  capitalize">
        Hello {user.name},
      </h1>
      <div className="grid  md:grid-cols-3  gap-5 ">
        <div className="bg-[#fca311] bg-opacity-20 rounded-md p-5">
          <div className="border-dashed border-2 border-[#fca311] py-2 px-4 h-full rounded-md overflow-hidden">
            <h3 className="font-shantellSans text-xl font-semibold mb-5">
              Add a new list of tasks ?
            </h3>
            <AddList
              inputClassNames="bg-white"
              placeholder="Add list name here"
              btnClassNames="w-full text-base py-2 md:py-2 bg-[#fca311] text-white hover:bg-white hover:text-black "
              iconClassNames="fa-solid fa-plus"
            />
          </div>
        </div>
        {listNamesData.map((listNameData) => {
          return <ListItem key={listNameData.id} listNameData={listNameData} />;
        })}
      </div>
    </div>
  );
}

export default AllListWithTasks;

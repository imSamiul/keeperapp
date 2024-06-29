import { NavLink } from "react-router-dom";

function SideBarList({ taskListNames }) {
  return (
    <div className="my-4 ">
      <div className="rounded-md h-[300px] overflow-auto scrollbar ">
        {taskListNames.map((listName) => {
          return (
            <div key={listName.id} className="flex flex-col  ">
              <NavLink
                to={`${listName.url}`}
                className="font-figtree py-2 px-5 bg-[#14213d] bg-opacity-5  hover:bg-[#14213d] hover:text-white "
              >
                {listName.title}
              </NavLink>
            </div>
          );
        })}
      </div>
      <h1>Settings</h1>
    </div>
  );
}

export default SideBarList;

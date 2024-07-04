import { NavLink } from "react-router-dom";

function SideBarList({ taskListNames }) {
  return (
    <div className="overflow-auto scrollbar h-full  ">
      {taskListNames.map((listName) => {
        return (
          <div key={listName.id} className="flex flex-col  ">
            <NavLink
              to={`${listName.url}`}
              className={({ isActive }) =>
                `font-figtree py-2 px-5 capitalize  ${
                  isActive
                    ? "bg-opacity-100 bg-[#14213d] text-white"
                    : "hover:bg-[#14213d] hover:text-black hover:bg-opacity-30"
                }`
              }
            >
              {listName.title}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}

export default SideBarList;

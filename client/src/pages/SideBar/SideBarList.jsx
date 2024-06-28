import { NavLink } from "react-router-dom";

function SideBarList({ taskListNames }) {
  return (
    <div className="my-4">
      <ul>
        {taskListNames.map((listName) => {
          return (
            <li key={listName.id}>
              <NavLink to={`${listName.title}`} className="px-2">
                {listName.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBarList;

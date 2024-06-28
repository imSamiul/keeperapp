import { NavLink } from "react-router-dom";

function SideBarList({ taskListNames }) {
  return (
    <div>
      <ul>
        {taskListNames.map((listName) => {
          return (
            <li key={listName}>
              <NavLink to={`${listName}`}>{listName}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBarList;

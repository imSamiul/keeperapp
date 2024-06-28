import { NavLink } from "react-router-dom";

function SideBarList({ taskListNames }) {
  return (
    <div>
      <ul>
        {taskListNames.map((listName) => {
          return (
            <li key={listName.id}>
              <NavLink to={`${listName.title}`}>{listName.title}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBarList;

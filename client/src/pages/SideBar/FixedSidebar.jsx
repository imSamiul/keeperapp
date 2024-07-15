import { NavLink } from "react-router-dom";
const navLinks = [
  { to: "/todo", title: "Today" },
  { to: "/todo/all-tasks", title: "All Tasks" },
  { to: "/todo/fixed-tasks/important", title: "Important" },
  { to: "/todo/fixed-tasks/completed", title: "Completed" },
  { to: "/todo/fixed-tasks/uncompleted", title: "Uncompleted" },
];
function FixedSidebar() {
  return (
    <div className="flex flex-col">
      {navLinks.map((link) => {
        return (
          <NavLink
            key={link.title}
            to={link.to}
            end
            className={({ isActive }) =>
              `font-figtree py-2 px-5  ${
                isActive
                  ? "bg-opacity-100 bg-[#14213d] text-white"
                  : "hover:bg-[#14213d] hover:text-black hover:bg-opacity-30"
              }`
            }
          >
            {link.title}
          </NavLink>
        );
      })}
    </div>
  );
}

export default FixedSidebar;

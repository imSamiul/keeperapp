import { NavLink } from "react-router-dom";
const navLinks = [
  { to: "/todo", title: "All Tasks" },
  { to: "/todo/today", title: "Today" },
  { to: "/todo/important", title: "Important" },
  { to: "/todo/completed", title: "Complete" },
  { to: "/todo/incomplete", title: "Incomplete" },
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

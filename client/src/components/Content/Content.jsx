import { Outlet } from "react-router-dom";

function Content() {
  return (
    <div className="overflow-auto h-full scrollbar">
      <Outlet />
    </div>
  );
}

export default Content;

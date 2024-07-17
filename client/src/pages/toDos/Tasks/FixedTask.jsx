import { Outlet } from "react-router-dom";

function FixedTask() {
  return (
    <div className="bg-[#fca311] h-full bg-opacity-10 p-5">
      <Outlet />
    </div>
  );
}

export default FixedTask;

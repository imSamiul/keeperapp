import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

function Content() {
  return (
    <div className="overflow-auto h-full scrollbar">
      <Header />
      <Outlet />
    </div>
  );
}

export default Content;

import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

function Content({ toggleDrawer }) {
  return (
    <div className="overflow-hidden scrollbar ">
      <div className="overflow-auto h-screen">
        <Header toggleDrawer={toggleDrawer} />

        <Outlet />
      </div>
    </div>
  );
}

export default Content;

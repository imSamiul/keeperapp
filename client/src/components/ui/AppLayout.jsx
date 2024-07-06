import SideBar from "../../pages/SideBar/SideBar";
import Content from "../Content/Content";

import NavBar from "./NavBar";

function AppLayout() {
  return (
    <div id="content" className="  font-figtree  ">
      <NavBar />
      <div className="  bg-[#ffffff] md:rounded-lg h-[calc(100vh-64px)]">
        <div className="drawer lg:drawer-open   h-full rounded-lg  ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />

          <div className="drawer-content overflow-hidden  md:rounded-r-lg">
            <Content />
          </div>

          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

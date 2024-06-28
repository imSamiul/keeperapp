import SideBar from "../../pages/SideBar/SideBar";
import Content from "../Content/Content";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="bg-[#14213d]">
      <Header />
      <div className="container mx-auto  h-screen bg-[#ffffff] rounded-lg ">
        <div className="drawer lg:drawer-open h-full  gap-5 ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ">
            <Content />
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

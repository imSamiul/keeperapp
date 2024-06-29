import SideBar from "../../pages/SideBar/SideBar";
import Content from "../Content/Content";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="bg-[#14213d] px-4 pb-8 h-screen">
      <Header />
      <div className="container mx-auto  mb-8 bg-[#ffffff] rounded-lg h-5/6">
        <div className="drawer lg:drawer-open  gap-5 h-full rounded-lg ">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />

          <div className="drawer-content overflow-hidden  rounded-lg">
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

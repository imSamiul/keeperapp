import SideBar from "../components/SideBar/SideBar";
import Content from "../components/Content/Content";

function AppLayout() {
  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="drawer lg:drawer-open h-full  gap-5">
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
  );
}

export default AppLayout;

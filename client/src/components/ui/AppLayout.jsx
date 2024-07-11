import { useEffect, useState } from "react";
import SideBar from "../../pages/SideBar/SideBar";
import Content from "../Content/Content";

import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { resetHeader } from "../../pages/toDos/ListNames/listNamesSlice";

function AppLayout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  function toggleDrawer() {
    setOpen((prev) => !prev);
  }
  useEffect(() => {
    console.log("reset header");
    dispatch(resetHeader());
  }, [dispatch]);

  return (
    <div id="content" className="  font-figtree  ">
      <NavBar />
      <div className="  bg-[#ffffff] md:rounded-lg h-[calc(100vh-64px)]">
        <div className="drawer lg:drawer-open   h-full rounded-lg  ">
          <input
            id="my-drawer-2"
            type="checkbox"
            className="drawer-toggle "
            checked={open}
            readOnly
          />

          <div className="drawer-content overflow-hidden  ">
            <Content toggleDrawer={toggleDrawer} />
          </div>

          <SideBar toggleDrawer={toggleDrawer} />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

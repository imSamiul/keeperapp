import { useEffect, useState } from "react";
import SideBar from "../../pages/SideBar/SideBar";
import Content from "../Content/Content";
import Header from "./Header";

function AppLayout() {
  return (
    <div
      id="content"
      className="bg-[#14213d] px-4  pb-5 h-screen  font-figtree"
    >
      <Header />
      <div className="container mx-auto   h-[85%] bg-[#ffffff] rounded-lg ">
        <div className="drawer lg:drawer-open   h-full rounded-lg mb-10">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />

          <div className="drawer-content overflow-hidden  rounded-r-lg">
            <Content />
          </div>

          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

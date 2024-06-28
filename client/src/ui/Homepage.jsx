import React from "react";
import backgroundImage from "../assets/99440742-c256-45d5-83ed-3eba65361063.jpg";
import { Outlet } from "react-router-dom";

function Homepage() {
  return (
    <div className="bg-[#2D1C40] h-lvh font-figtree md:px-4">
      <div className="container mx-auto flex md:gap-6 items-center justify-center h-full flex-col md:flex-row">
        <div
          className="flex-[2] md:flex-[3] w-full md:h-5/6 bg-cover md:rounded-[48px]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="flex-[3] md:flex-[2] bg-white h-5/6 md:rounded-[48px] flex justify-center items-center flex-col w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Homepage;

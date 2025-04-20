import { useEffect, useState } from "react";
import SideBar from "../../pages/SideBar/SideBar";
import Content from "../Content/Content";
import NavBar from "./NavBar";
import { useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout({ setLoaded }) {
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigation = useNavigation();
  useEffect(() => {
    setLoaded(true);
  }, [navigation.state, setLoaded]);

  function toggleDrawer() {
    setOpen((prev) => !prev);
  }

  return (
    <>
      {navigation.state === "loading" || isLoggingOut === true ? (
        <Loader />
      ) : (
        <div id="content" className="  font-figtree  ">
          <NavBar />
          <div className="  bg-[#ffffff] md:rounded-lg  ">
            <div className="drawer lg:drawer-open    rounded-lg  h-[calc(100vh-65px)]">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle "
                checked={open}
                readOnly
              />

              <div className="drawer-content overflow-hidden  h-full  ">
                <Content toggleDrawer={toggleDrawer} />
              </div>

              <SideBar
                toggleDrawer={toggleDrawer}
                setIsLoggingOut={setIsLoggingOut}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppLayout;

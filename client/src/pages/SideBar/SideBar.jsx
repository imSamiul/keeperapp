import { useNavigate, useRouteLoaderData } from "react-router-dom";

import SideBarList from "./SideBarList";
import AddList from "../toDos/ListNames/AddList";
import Modal from "../../components/ui/Modal";
import { logout } from "../../services/apiUsers";
import FixedSidebar from "./FixedSidebar";
import { removeAuthToken } from "../../util/auth";

function SideBar({ toggleDrawer, setIsLoggingOut }) {
  const { taskList: fetchListNames } = useRouteLoaderData("todo");
  const navigate = useNavigate();

  const modifyListNames = fetchListNames.map((listName) => {
    return { id: listName.id, title: listName.title, url: listName.id };
  });

  async function handleLogout() {
    setIsLoggingOut(true);
    const logOut = await logout();
    console.log(logOut);
    if (logOut === 200) {
      setIsLoggingOut(false);
      removeAuthToken();
      // localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <div className="drawer-side h-full mt-14  lg:mt-0  rounded-l-lg z-50">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
        onClick={toggleDrawer}
      ></label>
      <div className="bg-[#e5e5e5] h-[calc(100vh-64px)] lg:h-full py-4 px-9 w-80 flex flex-col ">
        <button
          className="btn h-auto min-h-6 w-fit rounded-none border-none outline-none border-0 text-lg font-normal my-2 self-end shadow-none  lg:hidden"
          onClick={toggleDrawer}
        >
          <i className="fa-solid fa-chevron-left fa-md text-[#fca311]"></i>
          <span>Back</span>
        </button>
        <div className="flex-1">
          <AddList
            inputClassNames="w-full max-w-xs bg-white"
            btnClassNames="w-full text-base py-2 md:py-2 bg-[#fca311] text-white hover:bg-white hover:text-black border-none "
            iconClassNames="fa-solid fa-plus"
            placeholder="Add list name here"
          />
        </div>

        <div className="my-2  flex-[3] rounded-md bg-[#14213d]  bg-opacity-5 ">
          <FixedSidebar />
        </div>
        <div className="mb-4 flex-[9] rounded-md bg-[#14213d]  bg-opacity-5  overflow-hidden scrollbar">
          <SideBarList taskListNames={modifyListNames} />
        </div>
        <div className="flex justify-around w-full flex-1 items-center">
          {/* <h1>Settings</h1> */}
          <Modal
            btnClassNames="w-full text-base py-3 md:py-2.5 bg-[#fca311] text-white hover:bg-white hover:text-black border-none "
            iconClassNames="fa-solid fa-right-from-bracket"
            btnTitle="Log Out"
            actionBtnTitle={["Yes", "No"]}
            handleModalAction={handleLogout}
          >
            <div className="flex items-center gap-3 mb-4">
              <i className="fa-solid fa-right-from-bracket fa-xl"></i>
              <h3 className="text-2xl font-semibold ">Logout</h3>
            </div>

            <p className="text-xl">Are you sure want to log out?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

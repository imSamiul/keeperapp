import { useNavigate, useRouteLoaderData } from "react-router-dom";

import SideBarList from "./SideBarList";
import AddList from "../toDos/ListNames/AddList";
import Modal from "../../components/ui/Modal";
import { logout } from "../../services/apiUsers";
import FixedSidebar from "./FixedSidebar";

function SideBar() {
  const fetchListNames = useRouteLoaderData("todo");
  const navigate = useNavigate();

  const modifyListNames = fetchListNames.map((listName) => {
    let lowerCaseString = listName.title.toLowerCase();
    let resultString = lowerCaseString.replace(/\s+/g, "-");
    return { id: listName.title, title: listName.title, url: resultString };
  });

  async function handleLogout() {
    const logOut = await logout();
    console.log(logOut);
    if (logOut === 200) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <div className="drawer-side h-full mt-14  lg:mt-0  rounded-l-lg ">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="bg-[#e5e5e5] h-[calc(100vh-48px)] lg:h-full py-4 px-9 w-80 flex flex-col ">
        <div>
          <div className="flex-1">
            <AddList
              inputClassNames="w-full max-w-xs bg-white"
              btnClassNames="w-full text-base py-2 md:py-2"
              iconClassNames="fa-solid fa-plus"
            />
          </div>
        </div>
        <div className="my-2  flex-[3] rounded-md bg-[#14213d]  bg-opacity-5 ">
          <FixedSidebar />
        </div>
        <div className="mb-4 flex-[9] rounded-md bg-[#14213d]  bg-opacity-5  overflow-hidden scrollbar">
          <SideBarList taskListNames={modifyListNames} />
        </div>
        <div className="flex justify-around w-full flex-1 items-center">
          <h1>Settings</h1>
          <Modal
            btnClassNames="w-full text-base py-3 md:py-2.5 "
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

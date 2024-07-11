import { useParams, useSubmit } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";

function Header({ toggleDrawer }) {
  const listNameHeader = useSelector((state) => state.listNames.listNameHeader);

  const [toggleInput, setToggleInput] = useState(false);
  const [listName, setListName] = useState(listNameHeader || "");
  const [initialListName, setInitialListName] = useState("All Tasks"); // Initial state
  const submit = useSubmit();
  const params = useParams(); // Use the entire params object

  // const navigate = useNavigate();
  // const location = useLocation();
  // const prevLocation = useRef(location.pathname);

  useEffect(() => {
    setListName(listNameHeader);
  }, [listNameHeader]);

  // Resolve naming conflict and set initial state
  // useEffect(() => {
  //   if (params.listName) {
  //     const formattedListName = params.listName.replace("-", " ");
  //     setListName(formattedListName);
  //     setInitialListName(formattedListName);
  //   } else {
  //     setListName("All Tasks");
  //   }
  // }, [params.listName]);
  // if (listName) {
  //   setListName((prev) => prev.replace("-", " "));
  // }

  // to check if the list name is editing or not
  function handleToggleEditListName() {
    setToggleInput((prev) => !prev);
  }
  // to submit the edited list name
  function handleEditListName() {
    submit({ id: params.listNameId, title: listName }, { method: "PATCH" });
    setToggleInput((prev) => !prev);
  }
  // to change input value
  function handleListNameValue(e) {
    setListName(e.target.value);
  }
  // useEffect(() => {
  //   const handlePopstate = () => {
  //     const currentLocation = location.pathname;
  //     if (currentLocation !== prevLocation.current) {
  //       // Redirect to a specific URL when back button is pressed
  //       navigate("/todo");
  //     }
  //   };

  //   window.addEventListener("popstate", handlePopstate);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopstate);
  //   };
  // }, [navigate, location]);

  return (
    <div className="flex md:gap-5 w-full bg-[#fca311] bg-opacity-80 ">
      <div className="flex items-center  mx-3 gap-2">
        <label
          htmlFor="my-drawer-2"
          className=" drawer-button lg:hidden cursor-pointer"
          onClick={toggleDrawer}
        >
          <i className="fa-solid fa-bars text-2xl"></i>
        </label>
        <input
          className={`input bg-transparent font-shantellSans font-semibold text-2xl md:text-4xl my-3 md:my-5 px-2 capitalize border-0 outline-none focus:outline-none focus:border-0 w-full rounded-none hover:cursor-text ${
            toggleInput ? "border-b focus:border-b border-black" : ""
          }`}
          disabled={!toggleInput}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          onBlur={handleEditListName}
          name="listName"
          value={listName}
          onChange={handleListNameValue}
        ></input>
        {toggleInput && (
          <Button
            iconClassNames="fa-solid fa-check"
            classNames="bg-[#14213d] text-white md:text-base py-2"
            onClick={handleEditListName}
            disabled={listName === listNameHeader || listName === ""}
          >
            Done
          </Button>
        )}
      </div>
      {!toggleInput && listName !== "All Tasks" && (
        <div className="w-full flex p-5 gap-2 md:gap-3  justify-end">
          <Button
            classNames="bg-[#14213d] text-white md:text-base w-fit"
            iconClassNames="fa-solid fa-pen-to-square"
            onClick={handleToggleEditListName}
          ></Button>
          {/* <Modal>
            <h1 className="text-lg lg:text-xl">
              Are you sure want to delete
              <span className="font-semibold"> {listName} </span>?
            </h1>
          </Modal> */}
          <Button
            classNames="bg-[#14213d] text-white md:text-base w-fit"
            iconClassNames="fa-solid fa-trash-can"
          ></Button>
        </div>
      )}
    </div>
  );
}

export default Header;

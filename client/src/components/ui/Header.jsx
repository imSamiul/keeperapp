import { useParams } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";

function Header({ toggleDrawer }) {
  const [toggleInput, setToggleInput] = useState(false);
  let { listName } = useParams();
  if (listName) {
    listName = listName.replace("-", " ");
  }
  function handleToggleEditListName() {
    setToggleInput((prev) => !prev);
  }
  function handleEditListNam() {
    setToggleInput((prev) => !prev);
  }

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
          className={`input bg-transparent font-shantellSans font-semibold text-2xl md:text-4xl my-3 md:my-5 px-2 capitalize border-0 outline-none focus:outline-none focus:border-0 w-full rounded-none ${
            toggleInput ? "border-b focus:border-b border-white" : ""
          }`}
          disabled={!toggleInput}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          onBlur={() => setToggleInput((prev) => !prev)}
          value={listName ? listName : "All Tasks"}
        ></input>
        {toggleInput && (
          <Button
            iconClassNames="fa-solid fa-check"
            classNames="bg-[#14213d] text-white md:text-base py-2"
            onClick={handleEditListNam}
          >
            Done
          </Button>
        )}
      </div>
      {!toggleInput && (
        <div className="w-full flex p-5 gap-2 md:gap-3  justify-end">
          <Button
            classNames="bg-[#14213d] text-white md:text-base w-fit"
            iconClassNames="fa-solid fa-pen-to-square"
            onClick={handleToggleEditListName}
          ></Button>
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

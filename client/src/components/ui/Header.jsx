import { useParams, useSubmit } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";

function Header({ toggleDrawer }) {
  const [toggleInput, setToggleInput] = useState(false);
  const [listName, setListName] = useState("All Tasks");
  const [initialListName, setInitialListName] = useState("All Tasks"); // Initial state
  const submit = useSubmit();
  const params = useParams(); // Use the entire params object

  // Resolve naming conflict and set initial state
  useEffect(() => {
    if (params.listName) {
      const formattedListName = params.listName.replace("-", " ");
      setListName(formattedListName);
      setInitialListName(formattedListName);
    }
  }, [params.listName]);
  // if (listName) {
  //   setListName((prev) => prev.replace("-", " "));
  // }
  function handleToggleEditListName() {
    setToggleInput((prev) => !prev);
  }

  function handleEditListName() {
    submit({ title: listName, listName: initialListName }, { method: "PATCH" });
    setToggleInput((prev) => !prev);
  }
  function handleListNameValue(e) {
    setListName(e.target.value);
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
          className={`input bg-transparent font-shantellSans font-semibold text-2xl md:text-4xl my-3 md:my-5 px-2 capitalize border-0 outline-none focus:outline-none focus:border-0 w-full rounded-none hover:cursor-text ${
            toggleInput ? "border-b focus:border-b border-white" : ""
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

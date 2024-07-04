import { useParams } from "react-router-dom";

function Header() {
  let { listName } = useParams();
  if (listName) {
    listName = listName.replace("-", " ");
  }

  return (
    <div className="flex items-center w-full bg-[#fca311] bg-opacity-80">
      <label htmlFor="my-drawer-2" className="drawer-button lg:hidden ml-3">
        <i className="fa-solid fa-bars fa-lg"></i>
      </label>
      <h1 className="font-shantellSans font-semibold text-2xl md:text-4xl my-3 md:my-5 px-4 w-full text-center capitalize ">
        {listName ? listName : "All Tasks"}
      </h1>
    </div>
  );
}

export default Header;

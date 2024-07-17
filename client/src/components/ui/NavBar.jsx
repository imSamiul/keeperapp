import logoImage from "../../assets/icons/to-do-list.png";

function NavBar() {
  return (
    <div className="bg-[#14213d] h-14 md:h-16  flex items-center sticky top-0 ">
      <img src={logoImage} className="h-10 ml-4 " />
      <h1 className=" text-white font-alegreya text-2xl md:text-4xl font-bold">
        Keeper
      </h1>
    </div>
  );
}

export default NavBar;

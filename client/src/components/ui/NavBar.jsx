import { Link } from "react-router-dom";
import logoImage from "../../assets/icons/to-do-list.png";

function NavBar() {
  return (
    <div className="bg-[#14213d] h-14 md:h-16 flex justify-between  sticky top-0 z-10">
      <div className="flex items-center ml-4">
        <img src={logoImage} className="h-10  " />
        <h1 className=" text-white font-alegreya text-2xl md:text-4xl font-bold">
          Keeper
        </h1>
      </div>
      <Link to="/profile" className="flex items-center text-white gap-2 mr-4">
        <div className="avatar placeholder">
          <div className="bg-white text-black w-10 rounded-full">
            <span className="text-xl ">S</span>
          </div>
        </div>
        <h1 className="text-xl">Samiul</h1>
      </Link>
    </div>
  );
}

export default NavBar;

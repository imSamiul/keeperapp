import { Link } from "react-router-dom";
import logoImage from "../../assets/icons/to-do-list.png";
import { useSelector } from "react-redux";

function NavBar() {
  const { user, avatarObj } = useSelector((state) => state.user);

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
            {avatarObj.avatar ? (
              <img
                src={`data:image/${avatarObj.fileType};base64,${avatarObj.avatar}`}
                alt="avatar"
              ></img>
            ) : (
              <span className="text-xl ">{user.name[0]}</span>
            )}
          </div>
        </div>
        <h1 className="text-xl">{user.name}</h1>
      </Link>
    </div>
  );
}

export default NavBar;

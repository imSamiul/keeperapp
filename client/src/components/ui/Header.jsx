import logoImage from "../../assets/icons/to-do-list.png";
function Header() {
  return (
    <div className="py-4 md:py-6 flex items-center justify-center ">
      <img src={logoImage} className="h-10 md:h-14 md:min-w-14 " />
      <h1 className="text-center text-white font-alegreya text-3xl md:text-4xl font-bold">
        Keeper
      </h1>
    </div>
  );
}

export default Header;

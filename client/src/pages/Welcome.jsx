import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="w-3/4 xl:w-1/2">
      <h1 className="text-2xl md:text-4xl font-extrabold mb-5 text-center">
        Keeper
      </h1>
      <p className="text-sm lg:text-base text-center leading-6">
        Stay Organized, Get Things Done: Keeper . A todo list app is a digital
        task management tool designed to help users organize and prioritize
        their daily activities and responsibilities.
      </p>
      <Link
        to="/login"
        className="btn bg-[#C425D9] mt-7 w-full border-none text-white text-xl hover:text-black hover:outline-1 hover:border-black hover:border-solid hover:border-st"
      >
        Get Started
      </Link>
    </div>
  );
}

export default Welcome;

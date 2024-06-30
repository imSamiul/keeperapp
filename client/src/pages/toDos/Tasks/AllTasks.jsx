import AllListWithTasks from "../ListNames/AllListWithTasks";

function AllTasks() {
  return (
    <>
      <div className="flex items-center w-full bg-[#fca311] bg-opacity-70">
        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden ml-3">
          <i className="fa-solid fa-bars"></i>
        </label>
        <h1 className="font-shantellSans font-semibold text-4xl my-5 px-4 w-full text-center ">
          All Tasks
        </h1>
      </div>

      <AllListWithTasks />
    </>
  );
}

export default AllTasks;

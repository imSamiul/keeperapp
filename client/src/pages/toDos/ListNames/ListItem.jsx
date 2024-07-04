import { useNavigate } from "react-router-dom";

function ListItem({ listNameData }) {
  const navigate = useNavigate();

  const handleDivClick = (listName) => {
    let lowerCaseString = listName.toLowerCase();
    let resultString = lowerCaseString.replace(/\s+/g, "-");

    navigate(`/todo/${resultString}`);
  };

  return (
    <div
      key={listNameData.id}
      className="min-h-60 max-h-60   bg-[#fca311] bg-opacity-20 rounded-md font-shantellSans p-5"
      onClick={() => handleDivClick(listNameData.title)}
    >
      <div className="border-dashed border-2 border-[#fca311] py-2 px-4 h-full rounded-md overflow-hidden">
        <h2 className="text-lg font-semibold underline underline-offset-4 decoration-wavy capitalize">
          {listNameData.title}
        </h2>
        <div className="mt-4 ">
          {listNameData.tasks.map((task) => {
            return (
              <div
                key={task._id}
                className="text-lg flex items-center border-none gap-2 mt-2"
              >
                <div>{task.completed ? "✔️" : "❌"}</div>
                <div className=" border-solid border-b-emerald-800 border-b w-full">
                  {task.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListItem;

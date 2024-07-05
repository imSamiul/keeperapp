import {useLoaderData, useRouteLoaderData, useSubmit} from "react-router-dom";
import LinkButton from "../../../components/ui/LinkButton";
import Modal from "../../../components/ui/Modal";

function TaskList() {
    const data = useRouteLoaderData("listName");
    const submit = useSubmit();
    const tasks = data.tasks;

    function handleCompleteTask(e) {
        submit({id: e.target.name}, {method: "PATCH"});
    }

    return (
        <div>
            {tasks
                .sort((a, b) => a.completed - b.completed) // Sort tasks with completed ones first
                .map((task) => (
                    <div
                        key={task.title}
                        className="flex  p-2 bg-white mt-2 rounded-md shadow-md justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="checkbox border-[#fca311] [--chkbg:#fca311] [--chkfg:white] checked:border-none"
                                checked={task.completed}
                                onChange={handleCompleteTask}
                                name={task._id}
                            />
                            <p
                                className={`font-shantellSans text-xl text-black ${
                                    task.completed && "line-through"
                                }`}
                            >
                                {task.title}
                            </p>
                        </div>
                        <LinkButton to={task._id}>
                            <i className="fa-solid fa-pen-to-square fa-xl"></i>
                        </LinkButton>

                    </div>
                ))}
        </div>
    );
}

export default TaskList;

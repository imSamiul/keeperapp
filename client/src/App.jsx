import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Welcome from "./pages/Welcome";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import AppLayout from "./components/ui/AppLayout";
import AllTasks from "./pages/toDos/Tasks/AllTasks";
import Task from "./pages/toDos/Tasks/Task";
import EditTask from "./pages/toDos/Tasks/EditTask";
import ErrorPage from "./pages/Error";
import TodayTasks from "./pages/toDos/Tasks/TodayTasks";
import { checkAuthToken } from "./util/auth";

// React Router DOM action
import { action as loginUser } from "./components/actions/LoginUser";
import { action as registerUser } from "./components/actions/RegisterUser";
import { action as handleTaskList } from "./components/actions/HandleTaskList";
import { action as handleTask } from "./components/actions/HandleTask";
import { action as editTask } from "./components/actions/EditTask";

// React Router DOM loader function
import { loader as loadListNames } from "./components/loaders/LoadListNames";
import { loader as loadTaskList } from "./components/loaders/loadTaskList";
import { loader as loadTask } from "./components/loaders/loadTask";
import { loader as loadTodayTasks } from "./components/loaders/loadTodayTasks";
import { loader as loadFixedTasks } from "./components/loaders/loadFixedTasks";
import FixedTask from "./pages/toDos/Tasks/FixedTask";
import ShowFixedTasks from "./pages/toDos/Tasks/ShowFixedTasks";
import Otp from "./pages/users/Otp";

const router = createBrowserRouter([
  {
    element: <Homepage />,
    loader: checkAuthToken,
    children: [
      { index: true, element: <Welcome /> },
      { element: <Login />, path: "/login", action: loginUser },
      { element: <Register />, path: "/register", action: registerUser },
      { element: <Otp />, path: "/otp" },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/todo",
    element: <AppLayout />,
    id: "todo",
    loader: loadListNames,
    action: handleTaskList,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodayTasks />,
        loader: loadTodayTasks,
        action: handleTask,
      },

      {
        path: "all-tasks",
        element: <AllTasks />,
        action: handleTaskList,
      },
      {
        path: "fixed-tasks",
        element: <FixedTask />,
        children: [
          {
            path: ":fixedTaskName",
            element: <ShowFixedTasks />,
            loader: loadFixedTasks,
            action: handleTask,
          },
        ],
      },

      {
        path: ":listNameId",
        element: <Task />,
        action: handleTask,
        loader: loadTaskList,
        id: "listName",
        children: [
          {
            path: ":taskId",

            element: <EditTask />,
            loader: loadTask,
            action: editTask,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

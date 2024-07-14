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
import TodayTasks from "./pages/toDos/Tasks/TodayTasks";

const router = createBrowserRouter([
  {
    element: <Homepage />,
    loader: checkAuthToken,
    children: [
      { element: <Welcome />, path: "/" },
      { element: <Login />, path: "/login", action: loginUser },
      { element: <Register />, path: "/register", action: registerUser },
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
      },
      {
        path: "all-tasks-with-list",
        element: <AllTasks />,
        action: handleTaskList,
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

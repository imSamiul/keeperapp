import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Welcome from "./pages/Welcome";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import AppLayout from "./components/ui/AppLayout";
import AllTasks from "./pages/toDos/Tasks/AllTasks";
import Task from "./pages/toDos/Tasks/Task";

// React Router DOM action
import { action as loginUser } from "./components/actions/LoginUser";
import { action as registerUser } from "./components/actions/RegisterUser";
import { action as addTaskList } from "./components/actions/AddTaskList";
import { action as handleTask } from "./components/actions/HandleTask";

// React Router DOM loader function
import { loader as loadListNames } from "./components/loaders/LoadListNames";
import ErrorPage from "./pages/Error";
import { checkAuthToken } from "./util/auth";
import { loader as loadTaskList } from "./components/loaders/loadTaskList";
import EditTask from "./pages/toDos/Tasks/EditTask";

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
    action: addTaskList,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AllTasks />,
        action: addTaskList,
      },
      {
        path: ":listName",
        element: <Task />,
        action: handleTask,
        loader: loadTaskList,
        id: "listName",
        children: [
          {
            path: ":taskName",

            element: <EditTask />,
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

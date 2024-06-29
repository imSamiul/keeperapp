import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Welcome from "./pages/Welcome";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Error from "./components/ui/Error";
import AppLayout from "./components/ui/AppLayout";
import AllTasks from "./pages/toDos/Tasks/AllTasks";
import Task from "./pages/toDos/Tasks/Task";

// React Router DOM action
import { action as loginUser } from "./components/actions/LoginUser";
import { action as registerUser } from "./components/actions/RegisterUser";
import { action as addTaskList } from "./components/actions/AddTaskList";

// React Router DOM loader function
import { loader as loadListNames } from "./components/loaders/LoadListNames";

const router = createBrowserRouter([
  {
    element: <Homepage />,
    children: [
      { element: <Welcome />, path: "/" },
      { element: <Login />, path: "/login", action: loginUser },
      { element: <Register />, path: "/register", action: registerUser },
    ],
    errorElement: <Error />,
  },
  {
    path: "/todo",
    element: <AppLayout />,
    id: "todo",
    loader: loadListNames,
    action: addTaskList,
    children: [
      {
        index: true,
        element: <AllTasks />,
        action: addTaskList,
      },
      {
        path: "all-tasks",
        element: <AllTasks />,
        action: addTaskList,
      },
      {
        path: ":listName",
        element: <Task />,
        // loader: loadTask,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

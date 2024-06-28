import Login from "./components/users/Login";
import Register from "./components/users/Register";
import { action as registerUser } from "./actions/RegisterUser";
import { action as loginUser } from "./actions/LoginUser.js";
import Welcome from "./ui/Welcome";
import Homepage from "./ui/Homepage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Error from "./ui/Error.jsx";

import AppLayout from "./ui/AppLayout.jsx";
import AllTasks from "./components/toDos/Tasks/AllTasks.jsx";

// import { loader as loadTask } from "./components/toDos/Task.jsx";
import { action as addTaskList } from "./components/toDos/ListNames/AddList.jsx";
import Task from "./components/toDos/Tasks/Task.jsx";
import { loader as loadListNames } from "./components/SideBar/SideBar.jsx";

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
    children: [
      {
        index: true,
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
  // async function registerUser(userData) {
  //   try {
  //     const res = await fetch("http://localhost:3000/users/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
  return <RouterProvider router={router} />;
}

export default App;

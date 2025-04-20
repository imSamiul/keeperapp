import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
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
import FixedTask from "./pages/toDos/Tasks/FixedTask";
import ShowFixedTasks from "./pages/toDos/Tasks/ShowFixedTasks";
import { checkAuthToken } from "./util/auth";
import EmailVerify from "./pages/users/EmailVerify";
import VerifyOTP from "./pages/users/VerifyOTP";
import ErrorPageAuthentication from "./pages/users/ErrorPageAuthentication";
import Loader from "./components/ui/Loader";
import MyProfile from "./pages/profile/MyProfile";

// React Router DOM action
import { action as loginUser } from "./components/actions/LoginUser";
import { action as registerUser } from "./components/actions/RegisterUser";
import { action as handleTaskList } from "./components/actions/HandleTaskList";
import { action as handleTask } from "./components/actions/HandleTask";
import { action as editTask } from "./components/actions/EditTask";
import { action as sendOTP } from "./components/actions/SendOTP";
import { action as verifyOTP } from "./components/actions/VerifyOTP";
import { action as handleUserProfileUpdate } from "./components/actions/EditProfileForm";

// React Router DOM loader function
import { loader as loadListNames } from "./components/loaders/LoadListNames";
import { loader as loadTaskList } from "./components/loaders/loadTaskList";
import { loader as loadTask } from "./components/loaders/loadTask";
import { loader as loadTodayTasks } from "./components/loaders/loadTodayTasks";
import { loader as loadFixedTasks } from "./components/loaders/loadFixedTasks";
import { loader as loadUserProfileDetails } from "./components/loaders/loadUserProfileDetails";
import { Bounce, ToastContainer } from "react-toastify";

const wireRouter = (setLoaded) =>
  createBrowserRouter([
    {
      element: <Homepage setLoaded={setLoaded} />,
      loader: checkAuthToken,
      children: [
        { index: true, element: <Welcome /> },
        {
          element: <Login />,
          path: "/login",
          action: loginUser,
          errorElement: <ErrorPageAuthentication />,
        },
        {
          path: "/register",
          children: [
            {
              index: true,
              element: <EmailVerify />,
              action: sendOTP,
            },
            { path: "verify-otp", element: <VerifyOTP />, action: verifyOTP },
            {
              path: "register-user",
              element: <Register />,
              action: registerUser,
            },
          ],
          errorElement: <ErrorPageAuthentication />,
        },
      ],
      errorElement: <ErrorPage setLoaded={setLoaded} />,
    },
    {
      path: "/todo",
      element: <AppLayout setLoaded={setLoaded} />,
      id: "todo",
      loader: loadListNames,
      action: handleTaskList,
      errorElement: <ErrorPage setLoaded={setLoaded} />,
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
    {
      path: "/profile",
      element: <MyProfile setLoaded={setLoaded} />,
      errorElement: <ErrorPage setLoaded={setLoaded} />,
      loader: loadUserProfileDetails,
      action: handleUserProfileUpdate,
    },
  ]);

function App() {
  const [pageLoaded, setLoaded] = useState(false);
  return (
    <>
      {!pageLoaded ? <Loader /> : null}
      <RouterProvider router={wireRouter(setLoaded)} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        transition={Bounce}
        stacked
      />
    </>
  );
}

export default App;

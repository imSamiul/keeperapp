import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './components/ui/AppLayout';
import Loader from './components/ui/Loader';
import ErrorPage from './pages/Error';
import Homepage from './pages/Homepage';
import Welcome from './pages/Welcome';
import MyProfile from './pages/profile/MyProfile';
import AllTasks from './pages/toDos/Tasks/AllTasks';
import EditTask from './pages/toDos/Tasks/EditTask';
import FixedTask from './pages/toDos/Tasks/FixedTask';
import ShowFixedTasks from './pages/toDos/Tasks/ShowFixedTasks';
import Task from './pages/toDos/Tasks/Task';
import TodayTasks from './pages/toDos/Tasks/TodayTasks';
import ErrorPageAuthentication from './pages/users/ErrorPageAuthentication';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import { checkAuthToken } from './util/auth';

// React Router DOM action
import { action as handleUserProfileUpdate } from './components/actions/EditProfileForm';
import { action as editTask } from './components/actions/EditTask';
import { action as handleTask } from './components/actions/HandleTask';
import { action as handleTaskList } from './components/actions/HandleTaskList';
import { action as loginUser } from './components/actions/LoginUser';
import { action as registerUser } from './components/actions/RegisterUser';

// React Router DOM loader function
import { Bounce, ToastContainer } from 'react-toastify';
import { loader as loadListNames } from './components/loaders/LoadListNames';
import { loader as loadFixedTasks } from './components/loaders/loadFixedTasks';
import { loader as loadTask } from './components/loaders/loadTask';
import { loader as loadTaskList } from './components/loaders/loadTaskList';
import { loader as loadTodayTasks } from './components/loaders/loadTodayTasks';
import { loader as loadUserProfileDetails } from './components/loaders/loadUserProfileDetails';

const wireRouter = (setLoaded) =>
  createBrowserRouter([
    {
      element: <Homepage setLoaded={setLoaded} />,
      loader: checkAuthToken,
      children: [
        { index: true, element: <Welcome /> },
        {
          element: <Login />,
          path: '/login',
          action: loginUser,
          errorElement: <ErrorPageAuthentication />,
        },
        {
          path: '/register',
          element: <Register />,
          action: registerUser,
          errorElement: <ErrorPageAuthentication />,
        },
      ],
      errorElement: <ErrorPage setLoaded={setLoaded} />,
    },
    {
      path: '/todo',
      element: <AppLayout setLoaded={setLoaded} />,
      id: 'todo',
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
          path: 'all-tasks',
          element: <AllTasks />,
          action: handleTaskList,
        },
        {
          path: 'fixed-tasks',
          element: <FixedTask />,
          children: [
            {
              path: ':fixedTaskName',
              element: <ShowFixedTasks />,
              loader: loadFixedTasks,
              action: handleTask,
            },
          ],
        },

        {
          path: ':listNameId',
          element: <Task />,
          action: handleTask,
          loader: loadTaskList,
          id: 'listName',
          children: [
            {
              path: ':taskId',

              element: <EditTask />,
              loader: loadTask,
              action: editTask,
            },
          ],
        },
      ],
    },
    {
      path: '/profile',
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
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme='colored'
        transition={Bounce}
        stacked
      />
    </>
  );
}

export default App;

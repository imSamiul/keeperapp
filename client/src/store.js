import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./pages/toDos/Tasks/todoSlice";
import userReducer from "./pages/users/userSlice";
import listNamesReducer from "./pages/toDos/ListNames/listNamesSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    listNames: listNamesReducer,
  },
});

export default store;

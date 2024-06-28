import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./components/toDos/Tasks/todoSlice";
import userReducer from "./components/users/userSlice";
import listNamesReducer from "./components/toDos/ListNames/listNamesSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    user: userReducer,
    listNames: listNamesReducer,
  },
});

export default store;

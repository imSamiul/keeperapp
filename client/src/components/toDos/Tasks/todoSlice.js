import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toDos: [
    {
      listName: "tasks",
      tasks: [
        {
          id: 1,
          title: "Learn React",
          completed: false,
          listName: "tasks",
        },
        {
          id: 2,
          title: "Learn Redux",
          completed: false,
          listName: "tasks",
        },
      ],
    },
    {
      listName: "course",
      tasks: [
        {
          id: 3,
          title: "Learn Redux Toolkit",
          completed: false,
          listName: "course",
        },
      ],
    },
  ],
  taskList: ["tasks", "course"],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action) {
      const findToDo = state.toDos.find(
        (todo) => todo.listName === action.payload.listName
      );
      if (findToDo) {
        findToDo.tasks.push({
          id: findToDo.tasks.length + 1,
          title: action.payload.title,
          completed: false,
          listName: action.payload.listName,
        });
        return;
      }
      console.log(findToDo);
      state.toDos.push({
        listName: action.payload.listName,
        tasks: [
          {
            id: 1,
            title: action.payload.title,
            completed: false,
            listName: action.payload.listName,
          },
        ],
      });
    },
    addNewList(state, action) {
      state.taskList.push(action.payload);
    },
  },
});

export const { addTodo, addNewList } = todoSlice.actions;
export default todoSlice.reducer;

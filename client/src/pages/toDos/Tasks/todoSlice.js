import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.tasks.push({
        title: action.payload.title,
        completed: false,
        id: action.payload._id,
        owner: action.payload.owner,
      });
      return;
    },

    addNewList(state, action) {
      state.taskList.push(action.payload);
    },
  },
});

export const { addTodo, addNewList } = todoSlice.actions;
export default todoSlice.reducer;

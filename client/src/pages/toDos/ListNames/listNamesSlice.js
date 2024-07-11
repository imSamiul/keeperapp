import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listNameHeader: "All Tasks",
  listNames: [],
};

const listNamesSlice = createSlice({
  name: "listNames",
  initialState,
  reducers: {
    createNewList(state, action) {
      state.listNames.push(action.payload);
    },
    changeHeader(state, action) {
      state.listNameHeader = action.payload;
    },
    resetHeader(state) {
      state.listNameHeader = "All Tasks";
    },
  },
});
export const { createNewList, changeHeader, resetHeader } =
  listNamesSlice.actions;
export default listNamesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: "All Tasks",
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
      state.header = action.payload;
    },
  },
});
export const { createNewList } = listNamesSlice.actions;
export default listNamesSlice.reducer;

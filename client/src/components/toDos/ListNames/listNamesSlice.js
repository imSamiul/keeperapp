import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listNames: [],
};

const listNamesSlice = createSlice({
  name: "listNames",
  initialState,
  reducers: {
    createNewList(state, action) {
      state.listNames.push(action.payload);
    },
  },
});
export const { createNewList } = listNamesSlice.actions;
export default listNamesSlice.reducer;

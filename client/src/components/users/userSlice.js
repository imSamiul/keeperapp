import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    addUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = {};
    },
    removeToken(state) {
      state.token = "";
    },
  },
});

export const { setToken, addUser, removeUser, removeToken } = userSlice.actions;
export default userSlice.reducer;

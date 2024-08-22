import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  avatarObj: {},
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
    addAvatar(state, action) {
      state.avatarObj = action.payload;
    },
  },
});

export const {
  setToken,
  addUser,
  removeUser,
  removeToken,
  setOtpEmail,
  addAvatar,
} = userSlice.actions;
export default userSlice.reducer;

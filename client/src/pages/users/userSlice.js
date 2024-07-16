import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  otpEmail: "",
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
    setOtpEmail(state, action) {
      state.otpEmail = action.payload;
    },
  },
});

export const { setToken, addUser, removeUser, removeToken, setOtpEmail } =
  userSlice.actions;
export default userSlice.reducer;

import {createSlice} from "@reduxjs/toolkit";

export const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState: {
    user: null,
  },
  reducers: {
    passwordRecovery: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {passwordRecovery} = passwordResetSlice.actions;

export const passwordResetUser = (state) => state.user.user;

export default passwordResetSlice.reducer;

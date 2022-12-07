import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  app: "none",
  biometric: false,
  
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    chooseApp: (state, action) => {
      state.app = action.payload;
    },
    // fingerPrint: (state, action) => {
    //   state.biometric = action.payload
    // },
  },
});

export const { chooseApp } = appSlice.actions;

export default appSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    notificationSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    notificationFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
  },
});

export const {
  notificationPending,
  notificationSuccess,
  notificationFailure,
} = notificationSlice.actions;
export default notificationSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  success: "",
  error: "",
};
const branchAtmSlice = createSlice({
  name: "branchAtm",
  initialState,
  reducers: {
    branchAtmPending: (state) => {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = "";
        state.success = "";
      }
    },
    branchAtmSuccess: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success = payload;
        state.error = "";
      }
    },
    branchAtmFailure: (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.success= ""
        state.error = payload;
      }
    },
   
  },
});

export const {
  branchAtmPending,
  branchAtmSuccess,
  branchAtmFailure,
  
} = branchAtmSlice.actions;
export default branchAtmSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateLoading: "idle",
  countryLoading: "idle",
  stateSuccess: "",
  countrySuccess: "",
  stateError: "",
  countryError: ""
};
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    statePending: (state) => {
      if (state.stateLoading === "idle") {
        state.stateLoading = "pending";
        state.error = "";
        state.stateSuccess = "";
      }
    },
    stateSuccess: (state, { payload }) => {
      if (state.stateLoading === "pending") {
        state.stateLoading = "idle";
        state.stateSuccess = payload;
        state.error = "";
      }
    },
    stateFailure: (state, { payload }) => {
      if (state.stateLoading === "pending") {
        state.stateLoading = "idle";
        state.stateSuccess= ""
        state.stateError = payload;
      }
    },
    countryPending: (state) => {
        if (state.countryLoading === "idle") {
          state.countryLoading = "pending";
          state.countryError = "";
          state.countrySuccess = "";
        }
      },
      countrySuccess: (state, { payload }) => {
        console.log(payload, "country payload")
        if (state.countryLoading === "pending") {
          state.countryLoading = "idle";
          state.countrySuccess = payload;
          state.countryError = "";
        }
      },
      countryFailure: (state, { payload }) => {
        if (state.countryLoading === "pending") {
          state.countryLoading = "idle";
          state.countrySuccess= ""
          state.countryError = payload;
        }
      },
 
  },
});

export const {
  statePending,
  stateSuccess,
  stateFailure,
  countryPending,
  countryFailure,
  countrySuccess
} = addressSlice.actions;
export default addressSlice.reducer;

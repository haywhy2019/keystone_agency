import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../../helperFunctions/asyncStorage";


const initialState = {
  showBalance: false,
  
};

export const showBalanceSlice = createSlice({
  name: "show",
  initialState,
  reducers: {
    showBalance: (state, action) => {
      state.showBalance = action.payload;
    },
   
  },
});

export const { showBalance } = showBalanceSlice.actions;

export default showBalanceSlice.reducer;

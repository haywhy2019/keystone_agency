import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { createHeader,axiosNoAuth } from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";

const initialState={
    loading:false,
    fetchedData:{},
    error:""
}

const fetchDailyLimits=createAsyncThunk('dailyLimit/fetchLimit',async ()=>{
    let token = await getItem("token");

    const { timestamp, apiKey } = createHeader();
    const headers = {
        timestamp: timestamp,
        API_KEY: apiKey,
        authtoken: token,
    };

    return axiosNoAuth.get("/Limit", {
        headers: headers,
      })
      .then((response)=>response.data)
})

const dailyLimitSlice= createSlice({
    name:"dailyLimit",
    initialState,
    extraReducers:builder=>{
        builder.addCase(fetchDailyLimits.pending,state=>{
            state.loading=true;
        })
        builder.addCase(fetchDailyLimits.fulfilled,(state,action)=>{
            state.loading=false
            state.fetchedData=action.payload
            state.error=""
        })
        builder.addCase(fetchDailyLimits.rejected,(state,action)=>{
            state.loading=false
            state.fetchedData=[]
            state.error=action.error.message
        })
    }

})

export {
    fetchDailyLimits
}


export default dailyLimitSlice.reducer;
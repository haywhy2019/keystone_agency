import { createHeader, axiosNoAuth } from "../../../api";
import {
  branchAtmPending,
  branchAtmFailure,
  branchAtmSuccess,
} from "../slice/branchAndAtmSlice"





const getBranchAtmAction = (payload) => async (dispatch) => {
 
  const {timestamp, apiKey} = createHeader()

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
  };
  dispatch(branchAtmPending());
  try {
    const res = await axiosNoAuth.get(`/BranchAndATM/getlist`, {
      headers: headers,
    });

    if (res.status === 200) {
      dispatch(branchAtmSuccess(res.data));
    } else {
      dispatch(branchAtmFailure("Something went wrong"));
    }
  } catch (err) {
    dispatch(branchAtmFailure(err.message || "Something went wrong"));
  }
};

export { getBranchAtmAction };

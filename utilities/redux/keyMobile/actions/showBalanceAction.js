import {
  showBalance
} from "../slice/showBalanceSlice";

import { setItem} from "../../../asyncStorage";





const showBalanceAction = (payload) => async (dispatch) => {
 
  dispatch(showBalance(payload));
  await setItem("showBalance", payload);
 
};

export { showBalanceAction };

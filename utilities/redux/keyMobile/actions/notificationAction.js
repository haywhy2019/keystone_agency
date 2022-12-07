import { createHeader, axiosNoAuth } from "../../../api";
import { notificationPending, notificationFailure, notificationSuccess} from "../slice/notificationSlice";

import { getItem } from "../../../helperFunctions/asyncStorage";

const notificationAction = (payload) => async (dispatch) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
 
  dispatch(notificationPending());
  try {
    const res = await axiosNoAuth.get(`/Notification/get`,{
      headers: headers,
    });
console.log(res, "res notification")
    if (res.status === 200) {
      dispatch(notificationSuccess(res.data));
    } else {
      dispatch(notificationFailure("Something went wrong"));
    }
  } catch (err) {
    dispatch(notificationFailure(err.message || "Something went wrong"));
  }
};

export { notificationAction };

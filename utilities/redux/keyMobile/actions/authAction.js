import { axiosNoAuth, createHeader } from "../../../api";
import {
  loginPending,
  loginSuccess,
  loginFailure,
  resetError,
  sessionTimeout
} from "../../allApps/slice/authSlice";
import { defaultAccount } from "../slice/selectAccountSlice";
import { chooseApp } from "../../allApps/slice/appSlice";
import { setItem } from "../../../helperFunctions/asyncStorage";
import { notificationAction } from "./notificationAction";
import getPhoneDetails from "../../../hooks/getPhoneDetails"






const loginAction = (payload) => async (dispatch) => {
  const [deviceName, deviceManufacturer, deviceDetail, devicePlatform,deviceVersion,deviceSerial,deviceId] = getPhoneDetails()
 const {timestamp, apiKey} = createHeader()

const headers = {
  "timestamp": timestamp,
  "API_KEY": apiKey
}

console.log(headers, "headers")
  dispatch(loginPending());
  try {
    const res = await axiosNoAuth.post(
      "/userlogin/authenticate",

      {
        username: payload.username,
        password: payload.password,
        source: "mobile",
        mobiledevicedetails: deviceDetail,
        devicemanufacturer: deviceManufacturer,
        deviceplatform: devicePlatform,
        mobiledeviceid: deviceId,
        deviceserial: deviceSerial,
        deviceversion: deviceVersion,
      },
      {
       headers: headers
 
     }
    );
    
    if (res.data.ResponseCode === "00") {
      console.log(res.data, "auth success")
      dispatch(loginSuccess(res.data));
      dispatch(chooseApp("keyMobile"));
      dispatch(defaultAccount(res.data.accounts[0]))
      setItem("username", payload.username);
      setItem("password", payload.password);
      setItem('token',res.data.jWTTokenResponse.Token)
     dispatch(notificationAction())
     const tokenTime = Date.parse(res.data.jWTTokenResponse.TokenExpiryDate)
     const expiredTime = new Date(tokenTime - (1000 * 60 * 2))
   let intervalId
   intervalId = setInterval(() => {
      const now = new Date()
      if(now >= expiredTime){
       dispatch(sessionTimeout())
       return clearInterval(intervalId)
      }
    
    }, 1000 * 60 * 1)
    } else {
      dispatch(loginFailure(res.data.ResponseDescription || "An error occured"));
      setTimeout(() => dispatch(resetError()), 6000)
    }

  } catch (err) {
    dispatch(loginFailure(err.message || "Something went wrong"));
    setTimeout(() => dispatch(resetError()), 6000)
  }
};

export { loginAction };

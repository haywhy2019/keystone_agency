import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";

const validateOtpAction = async (payload) => {
  let token = await getItem("token");
 
 const {timestamp, apiKey} = createHeader()
  

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post("/Operations/ValidateUserOTP", payload, {
    headers: headers,
  }).catch((err) => err)
};

export { validateOtpAction };

import { axiosNoAuth , createHeader} from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";

const sendOtpAction = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/OTP/Send`, payload, {
    headers: headers,
  })
};

export { sendOtpAction };

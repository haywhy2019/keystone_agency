import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";


const resetPin = async(payload) => {
  let token = await getItem("token");
  
  const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

  return axiosNoAuth.post("/Operations/ConfirmPinReset", payload, {
      headers: headers,
    })
    .catch((err) => err);
};

export {resetPin};

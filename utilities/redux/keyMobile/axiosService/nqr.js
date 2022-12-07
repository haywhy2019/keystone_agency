import { axiosNoAuth , createHeader} from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";


const scanNqrAction = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/NQR/Merchantinfo`, payload, {
    headers: headers,
  }).catch((err) => err)
};

const paymentNqrAction = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/NQR/Makepayment/Fixed`, payload, {
    headers: headers,
  }).catch((err) => err)
};

export { scanNqrAction, paymentNqrAction };


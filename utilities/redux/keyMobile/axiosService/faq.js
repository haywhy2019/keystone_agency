import { axiosNoAuth , createHeader} from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";

const faqAction = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.get(`/Operations/GetMobileAPPFaq`,{
    headers: headers,
  }).catch((err) => err)
};

export { faqAction };

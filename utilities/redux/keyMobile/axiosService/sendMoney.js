import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";

const sendMoneyKeyStoneAction = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/Transactions/IntrafundTransfer`, payload, {
    headers: headers,
  })
};

const sendMoneyOthersAction = async (payload) => {
    let token = await getItem("token");
   
 const {timestamp, apiKey} = createHeader()
   
  
    const headers = {
      timestamp: timestamp,
      API_KEY: apiKey,
      authtoken: token,
  
    };
    return axiosNoAuth.post(`/Transactions/InterfundTransfer`, payload, {
      headers: headers,
    })
  };

  const validateTPinAction = async (payload) => {
    let token = await getItem("token");
   
 const {timestamp, apiKey} = createHeader()
  
  
    const headers = {
      timestamp: timestamp,
      API_KEY: apiKey,
      authtoken: token,
  
    };
    return axiosNoAuth.post(`/Transactions/ValidateTpin`, payload, {
      headers: headers,
    }).catch((err) => err)
  };

export { sendMoneyKeyStoneAction, sendMoneyOthersAction , validateTPinAction};

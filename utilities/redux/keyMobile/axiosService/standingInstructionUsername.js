import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";

const standingInstructionUsernameAction = async(payload) => {
    let token = await getItem("token");
  
    const {timestamp, apiKey} = createHeader()

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

  return axiosNoAuth.get(`/StandingInstruction`, {
      headers: headers,
    })
    .catch((err) => err);
};

const setStandingInstruction=async(payload)=>{
  let token = await getItem("token");
  
  const {timestamp, apiKey} = createHeader()

const headers = {
  timestamp: timestamp,
  API_KEY: apiKey,
  authtoken: token,

};

return axiosNoAuth.post(`/StandingInstruction/Add`, payload,{
    headers: headers,
  })
  // .catch((err) => err);
}


const  deleteStandingInstruction = async(payload) => {
  let token = await getItem("token");

  const {timestamp, apiKey} = createHeader()

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

return axiosNoAuth.post(`/StandingInstruction/Cancel`,payload, {
    headers: headers,
  })
  
};


export { 
  standingInstructionUsernameAction,
  setStandingInstruction,
  deleteStandingInstruction  };
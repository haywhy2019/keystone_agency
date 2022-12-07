import { axiosNoAuth } from "../../../api";
import { createHeader } from "../../../api";

const registerClientAction = async (payload) => {
   
    const {timestamp, apiKey} = createHeader()
  
    const headers = {
      timestamp: timestamp,
      API_KEY: apiKey,
  
    };
    return axiosNoAuth.post(`/UserRegistration/Step1`,payload,{
      headers: headers,
    }) //due to the way the error was coming from the backend, catch was omitted here
  };

  const customerOnboardingAction=async(payload)=>{
    const {timestamp, apiKey} = createHeader()
  
    const headers = {
      timestamp: timestamp,
      API_KEY: apiKey,
    };

    return axiosNoAuth.post(`/UserRegistration/Step2`,payload,{
      headers: headers,
    })

  }
  
  export { registerClientAction,customerOnboardingAction };

  
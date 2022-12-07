import { axiosNoAuth , createHeader} from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";

const getFixedDepositTypes = async () => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,
  };
  
  return axiosNoAuth.get(`/FD/Types`,{
    headers: headers,
  }).catch((err) => err)
};

const getFixedDepositProducts = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,
  };
  
  return axiosNoAuth.get(`/FD/Products?investmenttype=${payload}`,{
    headers: headers,
  }).catch((err) => err)
};

const getInterestRate = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,
  };
  
  return axiosNoAuth.post(`/FD/Rate`,payload,{
    headers: headers,
  }).catch((err) => err)
};

const createNewInvestementAction = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,
  };

  return axiosNoAuth.post(`/FD/Book`,{
    headers: headers,
  }).catch((err) => err)
};

export {
  createNewInvestementAction,
  getFixedDepositTypes,
  getFixedDepositProducts,
  getInterestRate
 };

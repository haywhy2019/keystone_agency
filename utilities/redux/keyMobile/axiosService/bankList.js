import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";

const bankListAction = async(payload) => {
    let token = await getItem("token");
  
 const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

  return axiosNoAuth.get(`/Enquiry/GetNigerianBanks`, {

      headers: headers,
    })
    .catch((err) => err);
};

const bankPossibleListAction = async(payload) => {
  let token = await getItem("token");

const {timestamp, apiKey} = createHeader()

const headers = {
  timestamp: timestamp,
  API_KEY: apiKey,
  authtoken: token,

};

return axiosNoAuth.get(`/Enquiry/GetPossibleBanks?nubanaccountNo=${payload}`, {

    headers: headers,
  })
  .catch((err) => err);
};

export {bankListAction , bankPossibleListAction};

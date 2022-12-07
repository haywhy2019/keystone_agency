import { axiosNoAuth } from "../../../api";
import { getItem } from "../../../helperFunctions/asyncStorage";
import { createHeader } from "../../../api";

const dailyLimitAction = async(payload) => {
    let token = await getItem("token");

    const { timestamp, apiKey } = createHeader();
    const headers = {
        timestamp: timestamp,
        API_KEY: apiKey,
        authtoken: token,
    };

    return axiosNoAuth.get("/Limit", {
        headers: headers,
      })
      .then((response)=>response.data)
};

export {dailyLimitAction };

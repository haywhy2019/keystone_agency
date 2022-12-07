import { createHeader, axiosNoAuth } from "../../../api";
import {
  statePending,
  stateFailure,
  stateSuccess,
  countryPending,
  countryFailure,
  countrySuccess,
} from "../slice/addressSlice";

const getStateAction = (payload) => async (dispatch) => {
  const { timestamp, apiKey } = createHeader();

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
  };
  dispatch(statePending());
  try {
    const res = await axiosNoAuth.get(`/Enquiry/state`, {
      headers: headers,
    });
    console.log(res, "state res");
    if (res.status === 200) {
      dispatch(stateSuccess(res.data));
    } else {
      dispatch(stateFailure("Something went wrong"));
    }
  } catch (err) {
    console.log(err, "state res");

    dispatch(stateFailure(err.message || "Something went wrong"));
  }
};

const getCountryAction = (payload) => async (dispatch) => {
  const { timestamp, apiKey } = createHeader();

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
  };
  dispatch(countryPending());
  try {
    const res = await axiosNoAuth.get(`/Enquiry/country`, {
      headers: headers,
    });

    if (res.status == 200) {
      dispatch(countrySuccess(res.data));
    } else {
      dispatch(countryFailure("Something went wrong"));
    }
  } catch (err) {
    dispatch(countryFailure(err.message || "Something went wrong"));
  }
};

export { getStateAction, getCountryAction };

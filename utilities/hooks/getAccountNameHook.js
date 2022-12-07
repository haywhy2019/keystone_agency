import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SpinnerImage } from '../../components';
import { accountNameAction } from '../redux/keyMobile/axiosService/accountNameEnq';

const getAccountNameHook = (bankDetails,payload) => {
  const [crAccountName, setCrAccountName] = useState('');
  const [loadingAccountName, setLoadingAccountName] = useState(false);
  const getAccountName = (payload) => {
    setLoadingAccountName(true);
    accountNameAction(payload)
      .then((res) => {
        console.log(res,'account name')
        if (res.data.status == "00") {
          setCrAccountName(res.data.accountname);
        } else {
          setCrAccountName("An error occured");
        }
      })
      .catch((err) => {
        console.log(err, "errorrr");
        setCrAccountName("An error occured");
      })
      .finally(() => setLoadingAccountName(false));
  };

        // console.log(bankDetails, payload, 'account name')
      useEffect(() => {
        if(bankDetails){
            getAccountName(payload)
        }else{
          setCrAccountName("")
        }
      },[bankDetails])
      
  return [crAccountName, loadingAccountName]
}

export default getAccountNameHook
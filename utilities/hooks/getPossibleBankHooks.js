import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { bankPossibleListAction, bankListAction } from '../redux/keyMobile/axiosService/bankList';
import { SpinnerImage } from '../../components';

const getPossibleBankHooks = (accountNo) => {
    const [bankList, setBankList] = useState([]);
    const [errors, setErrors] = useState({});
    const [searchBank, setSearchBank] = useState("");
    const [bankListModal, setBankListModal] = useState(false);
  const [loadingBank, setLoadingBank] = useState(false);


    const getPossibleBank = (accountNo) => {
        setLoadingBank(true)
        bankPossibleListAction(accountNo)
          .then((res) => {
            console.log(res, "possible bank")
            if (res.status == 200) {
              setBankList(res.data);
              setSearchBank(res.data)
              setBankListModal(true)
            } else {
                console.log( "erro bank 01")
              setBankList([
                { BankName: "An error occured", BankCode: "An error occured" },
              ]);
              setSearchBank([{ BankName: "An error occured", BankCode: "An error occured" }])
            }
          })
          .catch((err) => {
            console.log(err, "erro bank")
            setBankList([
              { BankName: "An error occured", BankCode: "An error occured" },
            ]);
          }).finally(() => setLoadingBank(false));
      };

      console.log(loadingBank, "bankkeeee")
      let checkAccountNo = /^\d{10}$/;
      useEffect(() => {
        if(accountNo.match(checkAccountNo)){
          getPossibleBank(accountNo)
        }
    
      },[accountNo])
      
  return [bankList, bankListModal, loadingBank]
}

export default getPossibleBankHooks
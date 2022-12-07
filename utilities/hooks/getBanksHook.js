import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { bankPossibleListAction, bankListAction } from '../redux/keyMobile/axiosService/bankList';
import { SpinnerImage } from '../../components';

const getBanksHook= (show) => {
    const [allBankList, setBankList] = useState([]);
    const [errors, setErrors] = useState({});
    const [searchBank, setSearchBank] = useState("");
    const [loadingAllBanks, setLoadingBank] = useState(false);


    const getAllBanks = () => {
        
        setLoadingBank(true)
        bankListAction()
          .then((res) => {
            console.log(res, "possible bank")
            if (res.status == 200) {
              setBankList(res.data);
      
            } else {
            
              setBankList([
                { BankName: "An error occured", BankCode: "An error occured" },
              ]);

            }
          })
          .catch((err) => {
         
            setBankList([
              { BankName: "An error occured", BankCode: "An error occured" },
            ]);
          }).finally(() => setLoadingBank(false));
      };

      useEffect(() => {
        if(show){
          getAllBanks()
        }else{
          setBankList([])
        }
    
      },[show])
      
  return [allBankList,  loadingAllBanks]
}

export default getBanksHook


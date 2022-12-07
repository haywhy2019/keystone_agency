import { bankPossibleListAction, bankListAction } from '../redux/keyMobile/axiosService/bankList';

const getPossibleBankUtil = (accountNo) => {

    bankPossibleListAction(accountNo)
          .then((res) => {
            console.log(res, "possible bank")
            if (res.status == 200) {
                
                return res.data
            } else {
                console.log( "erro bank 01")
                
                return "An error occured"
            }
          })
          .catch((err) => {
            console.log(err, "erro bank")
            
            return "an error occured"
          })

}

export default getPossibleBankUtil
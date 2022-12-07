import { Keyboard } from "react-native";
import {
    bankListAction,
    bankPossibleListAction,
  } from "../../utilities/redux/keyMobile/axiosService/bankList";

const getBankUtil=()=>{

    bankListAction()
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

export default getBankUtil
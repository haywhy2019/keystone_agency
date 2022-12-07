import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { isAndroid, GLOBAL_STYLE ,COLORS, FONTS} from '../../../constants';
import uuid from "react-native-uuid";
import { updateBankingLimitAction } from '../../../utilities/redux/keyMobile/axiosService/changingBankingLimit';
import { dailyLimitAction } from '../../../utilities/redux/keyMobile/axiosService/mobileBankingLimit';

//components
import ChangeBankingLimit from '../../components/ChangeBankingLimit';
import { Input,DropDownInput,  CustomButton, CustomSnackBar,AuthenticationDropDown, SpinnerImage} from '../../../components';

//redux
import { useSelector } from "react-redux";

//formik
import { Formik, useFormik } from "formik";
import * as yup from 'yup';

//for token
const tokenSchema= yup.object({
  token: yup.string().required('This field is required')
      .min(6,'Enter only 6 digits in the field')
      .max(6,'Enter only 6 digits in the field'),
})

//for OTP
const OTPSchema= yup.object({
  OTP: yup.string().required('This field is required')
      .min(4,'Enter only 4 digits in the field')
      .max(4,'Enter only 4 digits in the field'),
})

//for Pin
const pinSchema= yup.object({
  Pin: yup.string().required('This field is required')
      .min(4,'Enter only 4 digits in the field')
      .max(4,'Enter only 4 digits in the field'),
})

//for card 
const cardSchema= yup.object({
  cardNumber: yup.string().required('This is required')
      .min(6,'Enter only 6 digits in the field')
      .max(6,'Enter only 6 digits in the field')
})

//if no verification option has been picked
const nonSchema= yup.object({
  isVerificationPicked: yup.boolean().required('This is required').test('check verification method','Please pick a verification option',(value)=>value===true)
  
})


const EditBankingLimit = ({navigation}) => {
  const [cumulativeDaily, setCumulativeDaily]=useState("")
  const [cumulativeSingle, setCumulativeSingle]=useState("")
  const [keyToKeyDaily,setKeyToKeyDaily]=useState("")
  const [keyToKeySingle,setKeyToKeySingle]=useState("")
  const [otherBankDaily,setOtherBankDaily]=useState("")
  const [otherBankSingle,setOtherBankSingle]=useState("")
  const [foreignCurrencyDaily,setForeignCurrencyDaily]=useState("")
  const [foreignCurrencySingle,setForeignCurrencySingle]=useState("")
  const [billPaymentsDaily,setBillPaymentsDaily]=useState("")
  const [billPaymentsSingle,setBillPaymentsSingle]=useState("")
  const [airtimeDataDaily,setAirtimeDataDaily]=useState("")
  const [airtimeDataSingle,setAirtimeDataSingle]=useState("")
  const [POSDaily,setPOSDaily]=useState("")
  const [POSSingle,setPOSSingle]=useState("")
  const [ATMDaily,setATMDaily]=useState("")
  const [ATMSingle,setATMSingle]=useState("")
  const [WebDaily,setWebDaily]=useState("")
  const [WebSingle,setWebSingle]=useState("")

  const id = uuid.v4();
  const {accountno}= useSelector((state)=>state.selectedAccount.accountDetails)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(false)
  const [errorMessage,setErrorMessage]=useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [allLimits,setAllLimits]=useState({})

  const [usingDebitCard,setUsingDebitCard]=useState(false);
  const [usingToken,setUsingToken]=useState(false);
  const [isUsingOTP,setIsUsingOTP]=useState(false);
  const [usingPin,setUsingPin]=useState(false)
  const [isVerificationPicked,setIsVerificationPicked]=useState(false)
  

  const fetchDailyLimit=()=>{
    setLoading(true)

    dailyLimitAction()
      .then((res) => {
        // console.log(res,'resss')
        if(res.status==200 ){
          console.log('mimi')
        }
        setAllLimits(res)
        setKeyToKeyDaily(res.Internallimit.toString())
        setOtherBankDaily(res.Otherbanklimit.toString())
        setAirtimeDataDaily(res.Topuptranslimit.toString())


        // setKeyToKeyDaily(res.DailyTransactionLimit.toString())
        setKeyToKeySingle(res.Transactionlimit.toString())
        // setOtherBankDaily(res.DailyTransactionLimit.toString())
        setOtherBankSingle(res.Transactionlimit.toString())
        setForeignCurrencyDaily(res.DailyTransactionLimit.toString())
        setForeignCurrencySingle(res.Transactionlimit.toString())
        setBillPaymentsDaily(res.DailyTransactionLimit.toString())
        setBillPaymentsSingle(res.Transactionlimit.toString())
        // setAirtimeDataDaily(res.DailyTransactionLimit.toString())
        setAirtimeDataSingle(res.Transactionlimit.toString())
        setCumulativeDaily(res.DailyTransactionLimit.toString())
        setCumulativeSingle(res.Transactionlimit.toString())
      })
      .catch((err) => {
        console.log(err.response.data, "error")
        Keyboard.dismiss()
        setErrorMessage(
            err.response.data.Message || "An error occured"
        );
      })
      .finally(()=>setLoading(false))
  }

  const checkAuthenticationType=()=>{
    if(usingDebitCard){
      return "withcard"
    }else if(usingPin){
      return "withpin"
    }else if(usingToken){
      return "withtoken"
    }
  }

  const submitUpdate=(authDetails)=>{
    const {
      cardNumber,
      cardPin,
      cardMonthYear,
      cardCVV,
      OTP,
      token,
      Pin
    }=authDetails

    if(Number(cumulativeDaily)<0 || Number(cumulativeSingle)<0 || Number(airtimeDataDaily)<0
    || Number(otherBankDaily)<0 || Number(keyToKeyDaily)<0
    ){
      return setErrorMessage('Please Limit cannot be less than 0')
    }

    const payload={
      "RequestID": id,
      "TransactionLimit": cumulativeSingle,
      "DailyTransLimit": cumulativeDaily,
      "TopupTransLimit": airtimeDataDaily,
      "OtherBankLimit": otherBankDaily,
      "internalLimit": keyToKeyDaily,
      "Tpin": Pin,
      "token": token,
      "LastCardSixDigit": cardNumber,
      "accountNo": accountno,
      "ValidID": "",
      "Selfie": "",
      "Signature": "",
      "AuthType": checkAuthenticationType(),
      "RequestStatus": "",
      "RequestDate": new Date(),
      "DateApproved": new Date(),
      "ApprovedBy": ""
    }

    // console.log(payload)
    setLoading(true)
    updateBankingLimitAction(payload)
      .then(response=>{
        if(response.data.ResponseCode==="00"){
          // console.log(response)
          navigation.goBack()
        }else{
          // console.log(response)
          setErrorMessage(response.data.ResponseDescription)
        }
      })
      .catch((error)=>{
        console.log(error,'error')
        setErrorMessage("An error occured")
      }).finally(()=>{
        
        // setTimeout(()=>setErrorMessage(""),4000)
        setLoading(false)
      })

  }

  

  useEffect(()=>{
    fetchDailyLimit()
  },[])

  if(loading){
    return <SpinnerImage/>
  }

  return (
<View style={{flex: 1}}>
  <ScrollView
    contentContainerStyle={{
      flexGrow: 1,
      // justifyContent: "space-between",
  
    }}
    style={GLOBAL_STYLE.background}
  >
    <ChangeBankingLimit
      label={"Cumulative"}
      compStateDaily={cumulativeDaily}
      compSetStateDaily={setCumulativeDaily}
      compStateSingle={cumulativeSingle}
      compSetStateSingle={setCumulativeSingle}
    />

    <ChangeBankingLimit
      label={"Keystone to Keystone"}
      compStateDaily={keyToKeyDaily}
      compSetStateDaily={setKeyToKeyDaily}
      compStateSingle={keyToKeySingle}
      compSetStateSingle={setKeyToKeySingle}
      editableDaily={true}
      editableSingle={false}
    />

    <ChangeBankingLimit
      label={'Other Bank'}
      compStateDaily={otherBankDaily}
      compSetStateDaily={setOtherBankDaily}
      compStateSingle={otherBankSingle}
      compSetStateSingle={setOtherBankSingle}
      editableDaily={true}
      editableSingle={false}
    />

    <ChangeBankingLimit
      label={'Foreign Currency'}
      compStateDaily={foreignCurrencyDaily}
      compSetStateDaily={setForeignCurrencyDaily}
      compStateSingle={foreignCurrencySingle}
      compSetStateSingle={setForeignCurrencySingle}
      editableDaily={false}
      editableSingle={false}
    />

    <ChangeBankingLimit
      label={'Bill Payments'}
      compStateDaily={billPaymentsDaily}
      compSetStateDaily={setBillPaymentsDaily}
      compStateSingle={billPaymentsSingle}
      compSetStateSingle={setBillPaymentsSingle}
      editableDaily={false}
      editableSingle={false}
    />

    <ChangeBankingLimit
      label={'Airtime & Data'}
      compStateDaily={airtimeDataDaily}
      compSetStateDaily={setAirtimeDataDaily}
      compStateSingle={airtimeDataSingle}
      compSetStateSingle={setAirtimeDataSingle}
      editableDaily={true}
      editableSingle={false}
    />

    {/* <ChangeBankingLimit
      label={'POS'}
      compStateDaily={POSDaily}
      compSetStateDaily={setPOSDaily}
      compStateSingle={POSSingle}
      compSetStateSingle={setPOSSingle}
    /> */}

    {/* <ChangeBankingLimit
      label={'ATM'}
      compStateDaily={ATMDaily}
      compSetStateDaily={setATMDaily}
      compStateSingle={ATMSingle}
      compSetStateSingle={setATMSingle}
    /> */}

    {/* <ChangeBankingLimit
      label={'Web'}
      compStateDaily={WebDaily}
      compSetStateDaily={setWebDaily}
      compStateSingle={WebSingle}
      compSetStateSingle={setWebSingle}
    /> */}


    <Formik
      initialValues={{
        cardNumber:'',
        cardPin:'',
        cardMonthYear:'',
        cardCVV:'',
        OTP:'',
        Pin:'',
        token:'',
        isVerificationPicked
    }}
      enableReinitialize={true}
      validationSchema={(usingDebitCard && cardSchema) || (usingToken && tokenSchema) || (isUsingOTP && OTPSchema) || (usingPin && pinSchema)|| nonSchema}
      onSubmit={(values) => {
          // console.log(values)
          submitUpdate(values)
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => {
        // console.log(errors, "error");

        return (
          <>
          <AuthenticationDropDown
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              errors={errors}
              setUsingDebitCard={setUsingDebitCard}
              setUsingToken={setUsingToken}
              setIsUsingOTP={setIsUsingOTP}
              setUsingPin={setUsingPin}
              setIsVerificationPicked={setIsVerificationPicked}
              dropDownOptions={[
                { label: "Pin", value: "Pin" },
                { label: "Debit Card", value: "Debit Card" },
                { label: "Hard or Soft Token", value: "Hard or Soft Token" },
              ]}
              
          />
          <CustomButton
            buttonText="Continue"
            buttonContainerStyle={styles.button}
            onPress={()=>handleSubmit()}
          />
          </>
        );
      }}
    </Formik>


  </ScrollView>
  <CustomSnackBar show={errorMessage} message={errorMessage}/>
  </View>
  )
}

export default EditBankingLimit 

const styles = StyleSheet.create({

  menuCardContainerText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
    fontFamily: FONTS.normal,
  },

  button: {
    marginVertical: 30,
    marginTop:'4%'
  },
})
  



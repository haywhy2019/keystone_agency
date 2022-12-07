import { StyleSheet, Text, View, ScrollView,TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import getUserHook from "../../../utilities/hooks/getUserHook";
import { Formik } from "formik";
import * as Yup from "yup";
import NumberFormat from "react-number-format";
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { AntDesign,Ionicons,Entypo } from '@expo/vector-icons';

//components
import { BillsReceipt, DailySingleLimitSlide, MenuImageLeftIconRight} from "../../components";
import { 
  Input, 
  CustomButton, 
  SpinnerImage,
  AccountCard, 
  InfoIconCard, 
  AuthenticationDropDown, 
  BottomNotification, 
  DropDownInput,
  CustomSnackBar} from "../../../components";
import ToggleSwitch from "toggle-switch-react-native";

//redux
import { useSelector } from "react-redux";
import { paymentNqrAction } from "../../../utilities/redux/keyMobile/axiosService/nqr";
import { scanNqrAction } from "../../../utilities/redux/keyMobile/axiosService/nqr";


const validationSchema = Yup.object().shape({
  account: Yup.number().required("Required"),
  merchantName: Yup.string().required("Unable to fetch merchant name. try again"),
  pin: Yup.number().required("Required"),
  amount: Yup.number().required("Required"),

});

const NqrPayment = ({ route,navigation }) => {
  const { nqrString } = route.params;
  // console.log(nqrString, "string");
  const [user] = getUserHook();

  const { accounts, DailyUtilizedLimit, dailytranslimit, bvn } = useSelector(
    (state) => state.auth.user
  );

  const [loading, setLoading] = useState(false);
  const [nqr, setNqr] = useState("");
  const [error, setError]  = useState("");
  const [pinSecureInput, setPinSecureInput]=useState(true)
  const [savingBeneficiary,setSavingBeneficiary]=useState(false)

  //actions in modal
  const [isModalOpen, setIsModalOpen]=useState(false);
  const [showReceipt,setShowReceipt]=useState(false)
  const [notice, setNotice]  = useState(false);

  //for the authentication drop down
  const [usingDebitCard,setUsingDebitCard]=useState(false);
  const [usingToken,setUsingToken]=useState(false);

  const transactionReceipt = () => {
    setNotice(false)
    setIsModalOpen(false)
    setShowReceipt(true)
    }
 
  //console.log("accounts", accounts, srcAccount)
  const getMerchantdetails = () => {
    // console.log(nqrString,'nqr String')
    // setLoading(true)
    // scanNqrAction({mch_no:nqrString})
    //   .then((res) => {
    //     console.log(res.data, "nqr ressss------");
    //     if(res?.data?.responseCode== "00"){
    //       setNqr(res.data)
    //     }else{
    //       setError("An error occured")
    //     }
        
        
    //   })
    //   .catch((err) => {
    //     console.log(err, "errr");
    //     setError(err.message || "An error occured")
    //   }).finally(() => setLoading(false));
  };

  useEffect(() => {
    getMerchantdetails();
  }, []);

  if(loading) {
    return <SpinnerImage />
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={{paddingVertical:20}}>
      <AccountCard data={accounts} />

      <View style={{paddingHorizontal:20,flex:1}}>
        <DailySingleLimitSlide spentColor/>
        <Input
          value={"GOD IS GOOD"}
          editable={false}
          icon={<AntDesign name="questioncircle" size={16} color={COLORS.grey} />}
        />
        <Formik
          initialValues={{
            amount:'',
            senderNarration:'',
            pin:'',
            cardNumber:'',
            cardMonthYear:'',
            cardCVV:'',
            cardPin:'',
            OTP:'',
            token:''
          }}
          onSubmit={()=>{

          }}
        >
          {({values,handleBlur,handleChange,handleSubmit,errors,touched})=>{
            return(
              <>
              <Input
                placeholder={'Enter Amount'}
                placeholderTextColor={COLORS.grey}
                inputCustomStyle={{borderWidth:0.3}}
                icon={<AntDesign name="questioncircle" size={16} color={COLORS.grey} />}
                value={values.amount}
                onChangeText={handleChange('amount')}
                keyboardType='numeric'
                onBlur={handleBlur('amount')}
                error={ errors.amount}
              />
              <DropDownInput
                data={[{label:'Sender', value:'Sender'},{label:'Receiver/Merchant', value:'Receiver/Merchant'}]}
                placeholder={'Enter Fee Bearer'}
                placeholderStyle={[GLOBAL_STYLE.h4,{color:COLORS.grey}]}
                labelField="label"
                valueField="value"
                onChange={(item)=>{

                }}
              />
              <Input
                placeholder={'Sender/Narration'}
                placeholderTextColor={COLORS.grey}
                inputCustomStyle={{borderWidth:0.3}}
                icon={<AntDesign name="questioncircle" size={16} color={COLORS.grey} />}
                value={values.senderNarration}
                onChangeText={handleChange('senderNarration')}
                keyboardType='numeric'
                onBlur={handleBlur('senderNarration')}
                error={ errors.senderNarration}
              />
              <Input
                placeholder={'Enter Transaction PIN'}
                placeholderTextColor={COLORS.grey}
                inputCustomStyle={{borderWidth:0.3}}
                value={values.pin}
                onChangeText={handleChange('pin')}
                keyboardType='numeric'
                onBlur={handleBlur('pin')}
                error={ errors.pin}
                secureTextEntry={pinSecureInput}
                icon={
                  pinSecureInput ? (
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => setPinSecureInput(!pinSecureInput)}
                    >
                      <Ionicons
                        name="eye"
                        size={16}
                        color={COLORS.grey}
                        
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => setPinSecureInput(!pinSecureInput)}
                    >
                      <Ionicons
                        name="eye-off"
                        size={16}
                        color={COLORS.grey}
                        
                      />
                    </TouchableOpacity>
                  )
                }
              />

              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text>Save Customer</Text>
                <ToggleSwitch
                    isOn={savingBeneficiary}
                    onColor={COLORS.primaryBlue}
                    offColor={COLORS.grey}
                    // label="Save Beneficiary"
                    labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
                    size="small"
                    onToggle={() => setSavingBeneficiary(!savingBeneficiary)}
                  />
              </View>

              

              <CustomButton
               buttonText={'CONFIRM'}
               buttonContainerStyle={{marginTop:30}}
               onPress={()=>setIsModalOpen(true)}
              />

              <Modal
                visible={isModalOpen}
                transparent={true}
                >
                  <View style={{flex:1, backgroundColor:'rgba(0,0,0,0.5)', paddingHorizontal:15}}>
                    <TouchableOpacity style={{flex:1}} onPress={()=>setIsModalOpen(false)}/>
                    <ScrollView contentContainerStyle={styles.mainView}>
                      <Text style={[GLOBAL_STYLE.h2Bold]}>Authorize Transaction</Text>
                      <Text style={[GLOBAL_STYLE.h4,{marginVertical:20}]}>You are about to send</Text>
                      <Text style={[GLOBAL_STYLE.h1Bold]}>N5000.00</Text>
                      <Text style={[GLOBAL_STYLE.h3,{marginVertical:15}]}>To</Text>
                      <Text style={[GLOBAL_STYLE.h4Bold]}>6213439987 | Olalekan Aminu</Text>
                      <Text style={[GLOBAL_STYLE.h4Bold]}>Keystone Bank Plc</Text>

                      <AuthenticationDropDown
                        containerStyle={{width:'100%'}}
                        values={values}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        setUsingDebitCard={setUsingDebitCard}
                        setUsingToken={setUsingToken}
                      />

                      <View style={styles.information}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Entypo name="dot-single" size={24} color={COLORS.grey} />
                          <Text style={[GLOBAL_STYLE.h5,{color:COLORS.grey}]}>SMS OTP</Text>
                        </View>
                        <Text style={[GLOBAL_STYLE.h5,{color:COLORS.grey}]}>
                          ( Maximum Daily Limit - <Text style={[GLOBAL_STYLE.h5Bold,{color:COLORS.primaryBlue}]}>N200,000</Text> )
                          </Text>
                      </View>

                      <View style={styles.information}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Entypo name="dot-single" size={24} color={COLORS.grey} />
                          <Text style={[GLOBAL_STYLE.h5,{color:COLORS.grey}]}>SMS OTP</Text>
                        </View>
                        <Text style={[GLOBAL_STYLE.h5,{color:COLORS.grey}]}>
                          ( Maximum Daily Limit - <Text style={[GLOBAL_STYLE.h5Bold,{color:COLORS.primaryBlue}]}>N500,000</Text> )
                          </Text>
                      </View>

                      <View style={styles.information}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                          <Entypo name="dot-single" size={24} color={COLORS.grey} />
                          <Text style={[GLOBAL_STYLE.h5,{color:COLORS.grey}]}>SMS OTP</Text>
                        </View>
                        <Text style={[GLOBAL_STYLE.h5,{color:COLORS.grey}]}>
                          ( Maximum Daily Limit on Account )
                          </Text>
                      </View>

                      <View style={{flex:1}}/>
                      <CustomButton
                        buttonText={'SUBMIT'}
                        buttonContainerStyle={{marginTop:30,width:'100%'}}
                        onPress={()=>setNotice(true)}
                      />

                      <BottomNotification 
                        show={notice}
                        headerText="Transaction Successful"
                        // infoText={`you have successfully sent ${success.amount} to ${success.CustomerName}`}
                        infoText={`you have successfully sent 9000 to Tola`}
                        onPress={transactionReceipt}
                        buttonText={"Continue"}
                        />
                    </ScrollView>
                  </View>

              </Modal>
              
              </>
            )
          }}
        </Formik>
      </View>

      <CustomSnackBar show={error} message={error}/>

      <BillsReceipt 
        show={showReceipt}
        item={false}
        onPress={() => navigation.replace("Home")}
      />
    </ScrollView>
  );
};

export default NqrPayment;

const styles = StyleSheet.create({
  button:{alignSelf: "stretch", marginBottom: 20},
  scrollContainer:{
    flex:1,
    backgroundColor:'white'
  },
  mainView:{
    flexGrow:1,
    minHeight:'75%',
    backgroundColor:'white',
    padding:20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    alignItems:'center'
  },
  information:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});

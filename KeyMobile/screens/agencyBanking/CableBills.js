import { useState } from 'react';
import {  StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    Pressable,
    Modal,
    FlatList,
    Keyboard,
    SafeAreaView,
    TouchableOpacity} from 'react-native';
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../constants";
import { AntDesign,Ionicons,Entypo,FontAwesome5  } from "@expo/vector-icons";
import { Formik } from "formik";

//redux
import { useSelector } from "react-redux";

//components
import {
    DropDownInput,
    Input,
    CustomButton,
    SpinnerImage,
    CustomSnackBar,
    AuthenticationDropDown,
    BottomNotification,
    AccountCard,
} from "../../../components";
import ToggleSwitch from "toggle-switch-react-native";

const CableBills=()=>{
    const [pinSecureInput, setPinSecureInput]=useState(true)
    const [savingBeneficiary,setSavingBeneficiary]=useState(false);
    const [theBillerName,setBillerName]=useState(null);
    const [theBillerNameFocus,setBillerNameFocus]=useState(null);
  
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

    const { accounts} = useSelector((state) => state.auth.user);

    return(
    <ScrollView
     contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start",paddingTop:20 },
      ]}
    >
        <AccountCard data={accounts} />

        <Formik
        initialValues={{
            billerName:'',
            account: '',
            network: '',
            customerId: '',
            amount: '',
            transferPin: "",
        }}
        enableReinitialize={true}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
        
        
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
        }) =>{
          return(
            <View style={{paddingHorizontal:20,paddingBottom:20,flex:1}}>
                <DropDownInput
                  data={[{label:'Spectranet',value:'Spectranet'},{label:'Smile',value:'Smile'}]}
                  labelCustomStyle={styles.inputLabel}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Biller Name"
                  value={theBillerName}
                  onFocus={() => setBillerNameFocus(true)}
                  onBlur={() => setBillerNameFocus(false)}
                  onChange={item => {
                    setBillerName(item.value)
                    setBillerNameFocus(false)
                    }}
                  placeholderStyle={{ color: COLORS.grey, fontSize: 14 }}
                />

                <Input
                  placeholder={'Enter Customer\'s Smart Card Number'}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{borderWidth:0.3}}
                  icon={null}
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  keyboardType='numeric'
                  onBlur={handleBlur('amount')}
                  error={ errors.amount}
                />

                <Input
                  placeholder={'Enter Amount'}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{borderWidth:0.3}}
                  icon={null}
                  value={values.amount}
                  onChangeText={handleChange('amount')}
                  keyboardType='numeric'
                  onBlur={handleBlur('amount')}
                  error={ errors.amount}
                />
                
                <Input
                  placeholder={'Enter Agent Code'}
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

                <View style={{flex:1}}/>

                <CustomButton
                buttonText={'PAY'}
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
              
              </View>
          )
        }}
      </Formik>
    </ScrollView>
    )
}

export default CableBills;

const styles = StyleSheet.create({
    iconBg: {
      width: 60,
      height: 60,
      backgroundColor: COLORS.white,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 5,
    },
    listHeaderContainer: {
      width: "100%",
      paddingHorizontal: "5%",
      paddingVertical: 15,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: COLORS.secondaryBlue2,
    },
    button: {
      marginVertical: 30,
    },
    formError: {
      color: "red",
      fontSize: 10,
      marginTop: -15,
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
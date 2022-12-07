import {useState} from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity, Modal  } from "react-native";
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { AntDesign,Ionicons,Entypo } from '@expo/vector-icons';
import { Formik } from "formik";

//components
import { DailySingleLimitSlide } from '../../components';
import { Input, CustomButton, SpinnerImage,AccountCard, InfoIconCard, AuthenticationDropDown, BottomNotification, } from "../../../components";
import ToggleSwitch from "toggle-switch-react-native";

//redux
import { useSelector } from "react-redux";

const AgencyTransfer=({navigation})=>{
    const [pinSecureInput, setPinSecureInput]=useState(true)
    const [savingBeneficiary,setSavingBeneficiary]=useState(false)
    const [beneficiaryName,setBeneficiaryName]=useState('')
    const [selectCustomer, setSelectCustomer]= useState(false)
  
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
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{paddingVertical:20}}>
            <AccountCard data={accounts} />
            
            
            <View style={{paddingHorizontal:20,flex:1}}>
              <DailySingleLimitSlide spentColor/>
              <Formik
                initialValues={{
                  accountNumber:'',
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
                  label={beneficiaryName}
                  placeholder={'Enter Beneficiary\'s Account Number '}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{borderWidth:0.3}}
                  icon={<AntDesign name="questioncircle" size={16} color={COLORS.grey} />}
                  value={values.accountNumber}
                  onChangeText={handleChange('accountNumber')}
                  keyboardType='numeric'
                  onBlur={handleBlur('accountNumber')}
                  error={ errors.accountNumber}
                />
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                  <Text style={{marginRight:15}}>Select Customer</Text>
                  <ToggleSwitch
                      isOn={selectCustomer}
                      onColor={COLORS.primaryBlue}
                      offColor={COLORS.grey}
                      // label="Save Beneficiary"
                      labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
                      size="small"
                      onToggle={() => setSelectCustomer(!selectCustomer)}
                    />
                </View>
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
                buttonText={'CONTINUE'}
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
        </ScrollView>
    )
}

export default AgencyTransfer;

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
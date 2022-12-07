import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Modal,
  FlatList,
  Keyboard,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../../constants";
import { AntDesign, FontAwesome,Ionicons,Entypo,FontAwesome5  } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import * as Yup from "yup";
import { Formik } from "formik";
import uuid from "react-native-uuid";
import NumberFormat from "react-number-format";

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
  
} from "../../../../components";
import { MenuImageLeftIconRight } from "../../../components";
import {
  MtnIcon,
  GloIcon,
  EtisalatIcon,
  AirtelIcon,
  AddressBookIcon,
  AvatarIcon,
  KeyMobileLogoRoundSVG,
  HouseIcon,
  HomeHomeIcon,
  HomeIcon
} from "../../../../constants/icons";
import ToggleSwitch from "toggle-switch-react-native";
import KeyLogo from "../../../../assets/images/logo.png";

import getUserHook from "../../../../utilities/hooks/getUserHook";
import { validateTPinAction } from "../../../../utilities/redux/keyMobile/axiosService/sendMoney";
import { airTimeAction } from "../../../../utilities/redux/keyMobile/axiosService/mobileTopup";
const billerList = [
  {
    zain: {
      billerid: "901",
      billername: "Airtel Mobile Top-Up",

      shortName: "ZainMTU",
      productCode: "6280510421",
    },
    eti: {
      billerid: "120",
      billername: "Etisalat Recharge Top-Up",

      shortName: "ETILA",

      productCode: "6280510490",
    },

    glo: {
      billerid: "402",
      billername: "Glo QuickCharge",

      shortName: "GLOQCK",

      productCode: "628051045",
    },
    mtn: {
      billerid: "109",
      billername: "MTN e-Charge Prepaid",

      shortName: "MTNVTU",

      productCode: "628051043",
    },
  },
];

const dummyContacts=[
  {
    networkLogo:<MtnIcon/>,
    phoneNumber:'587309049494'
  },
  {
    networkLogo:<MtnIcon/>,
    phoneNumber:'587309049494'
  },
  {
    networkLogo:<MtnIcon/>,
    phoneNumber:'587309049494'
  }
]

const SecondTab = () => {
  const [pinSecureInput, setPinSecureInput]=useState(true)
  const [savingBeneficiary,setSavingBeneficiary]=useState(false)
  const [beneficiaryName,setBeneficiaryName]=useState('')
  const [selectCustomer, setSelectCustomer]= useState(false)
  const [customerNetwork, setCustomerNetwork]= useState(null);
  const [customerNetworkFocus, setCustomerNetworkFocus]= useState(false);

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

  const [user] = getUserHook();
  const [errors, setErrors] = useState({});


  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const { accounts, DailyUtilizedLimit, dailytranslimit, bvn } = useSelector(
    (state) => state.auth.user
  );

  const validationSchema = Yup.object().shape({
    account: Yup.number().required("Required"),
    network: Yup.object().required("Required"),
    phoneNumber: Yup.number().required("Required"),
    amount: Yup.string().required("Required"),
    transferPin: Yup.number().required("Required"),
  });

  const toggleSwitch = () => setSaveToBill(!saveToBill);
  const toggleModal = () => setModalVisible(!modalVisible);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const contact = data;
          setContacts(contact);
          setSearchContacts(contact);
        }
      } else {
        setErrors("permission not granted");
      }
    })();
  }, []);

  const selectLocalContact = (item) => {
    const number =
      item.phoneNumbers == undefined || null
        ? ""
        : item.phoneNumbers[0]?.number;

    
    setPhoneNumber(number);
    setModalVisible(false);
  };
  const DisplayPhoneNumber = (item, index) => {
    return (
      <Pressable
        style={{
          paddingVertical: 15,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.primaryBlue,
          height: 60,
        }}
        onPress={() => selectLocalContact(item)}
      >
        <View
          style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-start" }]}
        >
          <AntDesign
            name="user"
            size={20}
            color={COLORS.primaryBlue2}
            style={{ marginRight: 20 }}
          />
          <Text style={[GLOBAL_STYLE.h2, { color: COLORS.primaryBlue2 }]}>
            {item.name}
          </Text>
        </View>
      </Pressable>
    );
  };

  const filterContacts = (textToSearch) => {
    setSearchContacts(
      contacts.filter((item) =>
        item.name.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
  };

  const selectBiller = (item, biller) => {
    setNetwork(item);
    setBillerInfo(biller);
  };

  if (loading) {
    return <SpinnerImage />;
  }


  return (
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start",paddingTop:20 },
      ]}
    >
       <AccountCard data={accounts} />
      <Text style={[GLOBAL_STYLE.h6,{paddingHorizontal:20, marginVertical:10}]}>Kindly note that you will need to download and onboard on  the 
        CBN eNaira wallet app to createyour eNaira username  and password </Text>

      <Formik
        initialValues={{
          account: '',
          network: '',
          phoneNumber: '',
          amount: '',
          transferPin: "",
          narration:'',
          email:''
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
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
                  placeholder={'Narration'}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{borderWidth:0.3}}
                  icon={null}
                  value={values.narration}
                  onChangeText={handleChange('narration')}
                  onBlur={handleBlur('narration')}
                  error={ errors.narration}
                />

                <Input
                  placeholder={'Enter Email Address'}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{borderWidth:0.3}}
                  icon={null}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={ errors.email}
                />

                <Input
                  placeholder={'Enter Password'}
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


                <View style={{flex:1}}/>

                <CustomButton
                buttonText={'SUBMIT'}
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
  );
};

export default SecondTab;

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
  },
  transferStyle:{
    height:50, 
    backgroundColor:COLORS.grey2, 
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10,
    marginBottom:10
  }
});

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Switch,
    Modal,
    FlatList,
    Pressable,
    Image,
    Keyboard,
    SafeAreaView,
  } from "react-native";
  import React, { useState, useEffect, useRef } from "react";
  import {
    CustomButton,
    AccountCard,
    Input,
    DropDownInput,
    BottomNotification,
    SpinnerImage,
    CustomSnackBar,
    InputAmount,
  } from "../../../components";
  import NumberFormat from "react-number-format";
  import {
    PaymentSummary,
    PaymentReceipt,
    DailySingleLimitSlide,
    NoDataFound,
    ModalList,
    EmptyList,
    SelectBeneficiaryCard,
    BankListItemCard,
    TwoFactorAuth,
  } from "../../components";
  import { COLORS, GLOBAL_STYLE, FONTS, images, SIZES } from "../../../constants";
  import { useSelector } from "react-redux";
  import { ChangeLimitIcon } from "../../../constants/icons";
  import { beneficiaryListAction } from "../../../utilities/redux/keyMobile/axiosService/beneficiaryList";
  import {
    bankListAction,
    bankPossibleListAction,
  } from "../../../utilities/redux/keyMobile/axiosService/bankList";
  import { accountNameAction } from "../../../utilities/redux/keyMobile/axiosService/accountNameEnq";
  import getUserHook from "../../../utilities/hooks/getUserHook";
  import uuid from "react-native-uuid";
  import { thousandOperator } from "../../../utilities/helperFunctions/thousandOperator";
  import ToggleSwitch from "toggle-switch-react-native";
  import {
    sendMoneyKeyStoneAction,
    sendMoneyOthersAction,
    validateTPinAction,
  } from "../../../utilities/redux/keyMobile/axiosService/sendMoney";
  import { AntDesign, FontAwesome } from "@expo/vector-icons";
  import * as Yup from "yup";
  import { Formik } from "formik";
  import SendAuthText from "../../components/SendTwoAuthText";
  import { stringToNumber } from "../../../utilities/helperFunctions/formatAmount";
  const validationSchema = Yup.object().shape({
    transferType: Yup.string().required("Required"),
    creditAccount: Yup.number().required("Required"),
    amount: Yup.string().required("Required"),
    transferPin: Yup.number().required("Required"),
    accountName: Yup.string().required("Unable to fetch account name, try again later"),

  });
  
  const otpValidationSchema = Yup.object().shape({
    otp: Yup.number().required("Required"),
  });
  
  const cardValidationSchema = Yup.object().shape({
    cardNo: Yup.number().required("Required"),
    cardNo: Yup.number().required("Required"),
    cardDate: Yup.number().required("Required"),
    cardPin: Yup.number().required("Required"),
    cvv: Yup.number().required("Required"),
  });
  
  const verficationSchema = Yup.object().shape({
    verification: Yup.string().required("Required"),
  });

  
  const SendKeyStone = ({ navigation, route }) => {
    const { type } = route.params;
    const [user] = getUserHook();
    const [crAccountName, setCrAccountName] = useState("");
    const [crAccountNameErr, setCrAccountNameErr] = useState("");

    const [drAccountName, setDrAccountName] = useState("");
    const [loading, setLoading] = useState(false);
    const [transferType, setTransferType] = useState("");
    const [beneficiaryAcct, SetBeneficiaryAcct] = useState("");
    const [amount, setAmount] = useState("");
    const [narration, setNarration] = useState("");
    const [addBeneficiary, setAddBeneficiary] = useState(false);
    const [useBeneficiary, setUseBeneficiary] = useState(false);
    const [bankList, setBankList] = useState(null);
    const [beneficiary, setBeneficiary] = useState("");
    const [beneficaryLoading, setBeneficiaryLoading] = useState(false);
    const [beneficaryErr, setBeneficiaryErr] = useState(false);
    const [transferPin, setTransferPin] = useState("");
    const [transferSuccess, setTransferSuccess] = useState("");
    const [transferErr, setTransferErr] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [bankModal, setBankModal] = useState(false);
    const [showPaymentSummary, setShowPaymentSummary] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPaymentReceipt, setShowPaymentReceipt] = useState(false);
    const [errors, setErrors] = useState("");
    const [searchBank, setSearchBank] = useState("");
    const [showAuth, setShowAuth] = useState(false);
    const [authType, setAuthType] = useState("");
  
    const id = uuid.v4();
  
    const {
      accounts,
      bvn,
    } = useSelector((state) => state.auth.user);
  
    const selectedAccount = useSelector(
      (state) => state.selectedAccount.accountDetails
    );
  
  
  
    const toggleAddBeneficiary = () => setAddBeneficiary(!addBeneficiary);
    const toggleModal = () => {
      if (useBeneficiary) {
        setUseBeneficiary(false);
        setCrAccountName("");
      } else {
        setUseBeneficiary(true);
        setModalVisible(!modalVisible);
      }
    };
  
  
    const selectHandler = (index, item) => {
      console.log(item, "item")
      setModalVisible(false);
      if (item.accountname !== "An Error occured") {
        SetBeneficiaryAcct(beneficiary[index].accountnumber);
        setUseBeneficiary(true);
        setCrAccountName(beneficiary[index].accountname);
        if (item.bankname == "Keystone Bank") {
          setTransferType("Keystone Bank");
          console.log("keystone")
        } else {
          setTransferType("Other Bank");
        
        }
      } else {
        setUseBeneficiary(false);
      }
    };
    
  
   
  
    const renderBeneficiaryList = ({ item, index }) => {
      return (
        <SelectBeneficiaryCard
          onPress={() => selectHandler(index, item)}
          item={item}
        />
      );
    };
  
    const sendTransactionHandler = (authType, authPin) => {
      setTransferErr("");
      
        let payload = {
          "CrAccountNo": beneficiaryAcct,
          "DrAccountNo": selectedAccount.accountno,
          "TransactionType": transferType,
          "RequestId": id,
          "Amount": amount,
          "Narration": narration,
          "SaveBeneficiary": addBeneficiary,
          "BankCode":  "082",
          "AuthRequest": {
            "TPin": transferPin,
            "SecondFa": authPin,
            "SecondFaType": authType,
            "CardAccountNumber": "string"
          },
          "Source": "mobile",
        };
      
      console.log(transferType, "type")
      setLoading(true);
      sendMoneyKeyStoneAction(payload)
      .then((res) => {
        console.log(res, "rsssss");
        if (res.data.status == "00") {
          // setTransferSuccess(res.data);
          // setSuccess(true);
          navigation.replace("SendMoneySuccess",{crAccountName,amount,item:res.data})

        } else {
          console.log("")
          setTransferErr(res.data.statusmessage);
          setTimeout(() => {
            setTransferPin("");
            setTransferErr("");
          }, 4000);
        }
      })
      .catch((err) => {
        const {response, message} = err
        setTransferErr("An error occured");
        setTransferPin("");
      })
      .finally(() => {
        setLoading(false);
      });
      
    };
  
    // get beneficiary
    const getBenficiary = () => {
      setBeneficiaryLoading(true);
      beneficiaryListAction(user)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data, "benelist")
            setBeneficiary(res.data.filter(item => item.bankcode == "082"));
          } else {
            setBeneficiary([
              { accountname: "An Error occured", bankname: "Try again" },
            ]);
          }
        })
        .catch((err) => {
          setBeneficiary([
            { accountname: "An Error occured", bankname: "Try again" },
          ]);
        })
        .finally(() => setBeneficiaryLoading(false));
    };
  
   
   
    let checkAccountNo = /^\d{10}$/;
  
    // get account name
    const getAccountName = () => {
      const payload = {
        requestid: id,
        accountno: beneficiaryAcct,
        source: "mobile",
        bankcode: "082",
        username: user,
      };
      setLoading(true);
      accountNameAction(payload)
        .then((res) => {
          if (res.data.status == "00") {
            setCrAccountName(res.data.accountname);
          } else {
            console.log(res.data, "account name err");
            setCrAccountNameErr(res.data.statusmessage || "An error occured");
          }
        })
        .catch((err) => {
          console.log(err, "account name err keystone");
          setCrAccountName("An error occured");
        })
        .finally(() => setLoading(false));
    };
  
    useEffect(() => {
      setTransferType(type);
  
    }, []);
    useEffect(() => {
      if (user) {
        getBenficiary();
      }
  
      if (beneficiaryAcct.match(checkAccountNo)) {
        getAccountName();
       
      }
    }, [user, beneficiaryAcct, useBeneficiary,]);
  
  
    if (loading) {
      return <SpinnerImage />;
    }
    return (
      <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={GLOBAL_STYLE.scrollViewGlobalNopadding}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView />
        <View style={{ marginVertical: 10 }}>
          <AccountCard data={accounts} />
          {!selectedAccount && (
            <Text style={styles.formError}>Please select source account</Text>
          )}
        </View>
  
        <Formik
          initialValues={{
            transferType: transferType,
            creditAccount: beneficiaryAcct,
            amount: amount,
            transferPin: transferPin,
            narration: narration,
            accountName: crAccountName
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(amount, values.amount, "amount", amount > 10000)
            if(stringToNumber(values.amount) > 10000){
                setShowAuth(true);
            }else {
                sendTransactionHandler()
            }
            
            
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
            console.log(errors, "error");
  
            return (
              <View style={{ paddingHorizontal: "5%", marginBottom: 20 }}>
                <DailySingleLimitSlide navigation={navigation} />
  
                <View style={[GLOBAL_STYLE.rowBetween, styles.selectBeneficiary]}>
                  <ToggleSwitch
                    isOn={useBeneficiary}
                    onColor={COLORS.primaryBlue}
                    offColor={COLORS.grey}
                    label="Select Beneficiary"
                    labelStyle={GLOBAL_STYLE.h4}
                    size="small"
                    onToggle={toggleModal}
                  />
                </View>
 
                  <Input
                    label={crAccountName ? crAccountName : crAccountNameErr}
                    placeholder="Beneficiary Account"
                    value={values.creditAccount}
                    onChangeText={ useBeneficiary ? null : (text) => SetBeneficiaryAcct(text)}
                    onBlur={handleBlur("creditAccount")}
                    keyboardType="numeric"
                    error={
                      errors.creditAccount &&
                      touched.creditAccount &&
                      errors.creditAccount
                    }
                    placeholderTextColor={COLORS.primaryBlue}
                  />
              
                <NumberFormat
                  value={amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (
                    <Input
                      placeholder="Enter amount"
                      onChangeText={(text) => setAmount(text)}
                      value={value}
                      placeholderTextColor={COLORS.primaryBlue}
                      error={errors.amount && touched.amount && errors.amount}
                      onBlur={handleBlur("amount")}
                      keyboardType="numeric"
                      icon={
                        <Text style={{ color: COLORS.primaryBlue2 }}>
                          {"\u20A6"}
                        </Text>
                      }
                    />
                  )}
                />
  
                <Input
                  placeholder="Narration"
                  value={values.narration}
                  onBlur={handleBlur("narration")}
                  onChangeText={(text) => setNarration(text)}
                  placeholderTextColor={COLORS.primaryBlue}
                />
  
                <Input
                  placeholder="Enter PIN"
                  value={values.transferPin}
                  onBlur={handleBlur("transferPin")}
                  onChangeText={(text) => setTransferPin(text)}
                  keyboardType="numeric"
                  error={
                    errors.transferPin &&
                    touched.transferPin &&
                    errors.transferPin
                  }
                  placeholderTextColor={COLORS.primaryBlue}
                  secureTextEntry={true}
                  maxLength={4}
                />
                <View style={[GLOBAL_STYLE.rowBetween, styles.selectBeneficiary]}>
                  <ToggleSwitch
                    isOn={addBeneficiary}
                    onColor={COLORS.primaryBlue}
                    offColor={COLORS.grey}
                    label="Save Beneficiary"
                    labelStyle={GLOBAL_STYLE.h4}
                    size="small"
                    onToggle={toggleAddBeneficiary}
                  />
                </View>
            
                <CustomButton
                  buttonText={"Send"}
                  // onPress={transactionSummaryHandler}
                  onPress={handleSubmit}
                  buttonContainerStyle={{ marginVertical: 20 }}
                />
                <View>
                  <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                  >
                    <FlatList
                      ListHeaderComponent={
                        <Text style={styles.listHeaderText}>
                          Select Source Account
                        </Text>
                      }
                      ListHeaderComponentStyle={{
                        ...styles.allAccountCardContainer,
                        ...{ borderBottomWidth: 0 },
                      }}
                      data={beneficiary}
                      renderItem={renderBeneficiaryList}
                      keyExtractor={(item, index) => index}
                      ListEmptyComponent={
                        <EmptyList emptyText={"No saved beneficiary"} />
                      }
                    />
                  </Modal>
                </View>
              </View>
            );
          }}
        </Formik>
  
   
        <Formik
          initialValues={{
            otp: "",
            token: "",
            cardNo: "",
            cardDate: "",
            cvv: "",
            cardPin: "",
            verification: authType,
          }}
          enableReinitialize={true}
          validationSchema={
            authType == "SMS OTP" || authType == "Hard or Soft Token"
              ? otpValidationSchema
              : authType == "Debit Card"
              ? cardValidationSchema
              : verficationSchema
          }
          onSubmit={(values) => {
             setShowAuth(false)
             console.log(values.otp, values.verification, "test")
             sendTransactionHandler(values.verification, values.otp)
  
  
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
            console.log(errors, "error");
  
            return (
              <TwoFactorAuth
                title={"Authorize Transaction"}
                dropDownOptions={[
                  { label: "SMS OTP", value: "SMS OTP" },
                  { label: "Debit Card", value: "Debit Card" },
                  { label: "Hard or Soft Token", value: "Hard or Soft Token" },
                ]}
                onChange={(item) => {
                  setAuthType(item.label);
                  // setShowInfo(false)
                }}
                authType={authType}
                dropdownValue={values.verification}
                component={
                  <SendAuthText
                    data={{ amount, crAccountName, beneficiaryAcct, bankName: "Keystone" }}
                  />
                }
                onSubmit={handleSubmit}
                onClose={() => setShowAuth(false)}
                lgHeight
                info
                show={showAuth}
                error={errors}
                onChangeOtp={handleChange("otp")}
                otpValue={values.otp}
                onBlur={handleBlur("otp")}
              />
            );
          }}
        </Formik>
      </ScrollView>
      <CustomSnackBar 
                show={transferErr} message={transferErr} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    showLimitContainer: {
      height: 5,
      borderRadius: 5,
      backgroundColor: COLORS.grey,
    },
    showAmountSpentContainer: {
      height: 5,
      borderRadius: 5,
      backgroundColor: COLORS.primaryBlue,
      marginTop: -5,
    },
    selectBeneficiary: {
      justifyContent: "flex-end",
      alignItems: "center",
      // marginTop: -20,
    },
    selectBeneficiaryText: {
      color: COLORS.primaryBlue,
    },
  
    allAccountCardContainer: {
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 15,
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: COLORS.secondaryBlue2,
    },
    accountDetailsContainer: {
      flexDirection: "row",
    },
    accountNameText: {
      color: COLORS.primaryBlue,
      fontFamily: FONTS.normal,
      fontSize: 16,
    },
    accountTypeText: {
      color: COLORS.grey,
      fontFamily: FONTS.normal,
      marginRight: 5,
    },
    accountNoText: {
      color: COLORS.primaryBlue,
      fontFamily: FONTS.normal,
      marginRight: 5,
    },
    listHeaderText: {
      fontFamily: FONTS.bold,
      color: COLORS.primaryBlue,
      fontSize: 16,
    },
    logoImage: {
      width: 40,
      height: 40,
      marginRight: 20,
    },
    formError: {
      color: "red",
      fontSize: 10,
      paddingHorizontal: "5%",
    },
  });
  export default SendKeyStone;
  
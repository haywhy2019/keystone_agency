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
    bankName: Yup.string().required("Required"),
    amount: Yup.string().required("Required"),
    accountName: Yup.string().required("Unable to fetch account name, try again later"),
    transferPin: Yup.number().required("Required"),
  });
  
  const otpValidationSchema = Yup.object().shape({
    otp: Yup.number().required("Required"),
  });
  
  const cardValidationSchema = Yup.object().shape({
    otp: Yup.number().required("Required")
    .test('len', 'Must be exactly 6 digits', val => val.toString().length === 6)
    

   
  });
  // const cardValidationSchema = Yup.object().shape({
  //   cardNo: Yup.number().required("Required"),
  //   cardNo: Yup.number().required("Required"),
  //   cardDate: Yup.number().required("Required"),
  //   cardPin: Yup.number().required("Required"),
  //   cvv: Yup.number().required("Required"),
  // });
  
  const verficationSchema = Yup.object().shape({
    verification: Yup.string().required("Required"),
  });
 
  
  const SendOtherBank = ({ navigation, route }) => {
    const { type } = route.params;
    const [user] = getUserHook();
    const [crAccountName, setCrAccountName] = useState("");
    const [crAccountNameErr, setCrAccountNameErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [transferType, setTransferType] = useState("");
    const [beneficiaryAcct, SetBeneficiaryAcct] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankDetails, setBankDetails] = useState("");
    const [amount, setAmount] = useState("");
    const [narration, setNarration] = useState("");
    const [addBeneficiary, setAddBeneficiary] = useState(false);
    const [useBeneficiary, setUseBeneficiary] = useState(false);
    const [bankList, setBankList] = useState([]);
    const [beneficiary, setBeneficiary] = useState("");
    const [beneficaryLoading, setBeneficiaryLoading] = useState(false);
    const [transferPin, setTransferPin] = useState("");
    const [transferErr, setTransferErr] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [bankModal, setBankModal] = useState(false);
    const [showPaymentSummary, setShowPaymentSummary] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPaymentReceipt, setShowPaymentReceipt] = useState(false);
    const [errors, setErrors] = useState("");
    const [searchBank, setSearchBank] = useState([]);
    const [search, setSearch]  = useState("");
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
  
    let ownAccountArray = accounts.filter(
      (item) => item.accountno != selectedAccount.accountno
    );
  
    const toggleAddBeneficiary = () => setAddBeneficiary(!addBeneficiary);
    const toggleModal = () => {
      if (useBeneficiary) {
        setUseBeneficiary(false);
        setTransferType("");
        SetBeneficiaryAcct("");
        setCrAccountName("");
        setBankName("");
      } else {
        setUseBeneficiary(true);
        setModalVisible(!modalVisible);
      }
    };
  
   
    const selectHandler = (index, item) => {
      setModalVisible(false);
      if (item.accountname !== "An Error occured") {
        SetBeneficiaryAcct(beneficiary[index].accountnumber);
        setBankDetails(beneficiary[index]);
        setBankName(beneficiary[index].bankname);
        setUseBeneficiary(true);
        setCrAccountName(beneficiary[index].accountname);
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
  
    const renderBankList = ({ item }) => {
      return (
        <BankListItemCard
          onPress={() => selectBeneficairyBankDetails(item)}
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
          "BankCode":  bankDetails.BankCode,
          "AuthRequest": {
            "TPin": transferPin,
            "SecondFa": authPin,
            "SecondFaType": authType,
            "CardAccountNumber": selectedAccount.accountno
          },
          "Source": "mobile",
        
        };
      
      setLoading(true);
        sendMoneyOthersAction(payload)
          .then((res) => {
            if (res.data.status == "00") {
          navigation.replace("SendMoneySuccess",{crAccountName,amount,item:res.data})
           
            } else {
              setTransferErr(res.data.statusmessage);
              setTransferPin("");
            }
          })
          .catch((err) => {
            console.log(err, "errror")
            const {response , message} = err
            setTransferErr("An error occured");
            setTimeout(() => setTransferErr(""),5000)
            setTransferPin("");
          })
          .finally(() => setLoading(false));
      
    };

    console.log(loading, "loadingff")
  
    // get beneficiary
    const getBenficiary = () => {
      setBeneficiaryLoading(true);
      beneficiaryListAction(user)
        .then((res) => {
          if (res.status == 200) {
            setBeneficiary(res.data.filter(item => item.bankcode != "082"));
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
  
    // get bank
    const getBank = () => {
      Keyboard.dismiss();
      bankListAction()
        .then((res) => {
          if (res.status == 200) {
            setBankList(res.data);
            setSearchBank(res.data);
          } else {
            setBankList([
              { BankName: "An error occured", BankCode: "An error occured" },
            ]);
            setSearchBank([
              { BankName: "An error occured", BankCode: "An error occured" },
            ]);
          }
        })
        .catch((err) => {
          setBankList([
            { BankName: "An error occured", BankCode: "An error occured" },
          ]);
        });
    };
  
    //get possible bank
    const getPossibleBank = () => {
      setLoading(true);
      bankPossibleListAction(beneficiaryAcct)
        .then((res) => {
          if (res.status == 200) {
            setBankList(res.data);
            setSearchBank(res.data);
            setBankModal(true);
          } else {
            setBankList([
              { BankName: "An error occured", BankCode: "An error occured" },
            ]);
            setSearchBank([
              { BankName: "An error occured", BankCode: "An error occured" },
            ]);
          }
        })
        .catch((err) => {
          setBankList([
            { BankName: "An error occured", BankCode: "An error occured" },
          ]);
        })
        .finally(() => setLoading(false));
    };
    let checkAccountNo = /^\d{10}$/;
  
    // get account name
    const getAccountName = () => {
      const payload = {
        requestid: id,
        accountno: beneficiaryAcct,
        source: "mobile",
        bankcode: bankDetails?.BankCode ,
        username: user,
      };
      setLoading(true);
      accountNameAction(payload)
        .then((res) => {
          console.log(res, "account name res")
          if (res.data.status == "00") {
            setCrAccountName(res.data.accountname);
          } else {
            setCrAccountNameErr("An error occurred");
          }
        })
        .catch((err) => {
          setCrAccountNameErr("An error occurred");
        
        })
        .finally(() => setLoading(false));
    };

    const toggleBankModal = () => setBankModal(!bankModal);
  
    const selectBeneficairyBankDetails = (item) => {
      
      setBankName(item.BankName);
      setBankDetails(item);
      setBankModal(false);
    };
  
    //search bank
    const filterBankName = (textToSearch) => {
      setSearchBank(
        bankList.filter((item) =>
          item.BankName.toLowerCase().includes(textToSearch.toLowerCase())
        )
      );
      setSearch(textToSearch)
    };
  
    useEffect(() => {
      setTransferType(type);
  
    }, []);
    useEffect(() => {
      if (user) {
        getBenficiary();
      }
  
      if (beneficiaryAcct.match(checkAccountNo) && bankName) {
        if (!useBeneficiary) {
          getAccountName();
        }
       
      }
    }, [user, beneficiaryAcct, useBeneficiary, bankName]);
  
    useEffect(() => {
      if (
        beneficiaryAcct.match(checkAccountNo) && !useBeneficiary
      ) {
        getPossibleBank();
      }
    }, [beneficiaryAcct]);
  
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
            accountName: crAccountName,
            transferType: transferType,
            creditAccount: beneficiaryAcct,
            bankName: bankName,
            amount: amount,
            transferPin: transferPin,
            narration: narration
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if(stringToNumber(values.amount) > 10000){
                setShowAuth(true);
            }else {
                sendTransactionHandler(); 
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
                { useBeneficiary ? (
                  <View>
                    <Input
                      label={crAccountName ? crAccountName : ""}
                      placeholder="Beneficiary Account"
                      value={values.creditAccount}
                      onBlur={handleBlur("creditAccount")}
                      error={
                        errors.creditAccount &&
                        touched.creditAccount &&
                        errors.creditAccount
                      }
                      placeholderTextColor={COLORS.primaryBlue}
                    />
  
                    <Input
                      // label="Bank name "
                      placeholder="Beneficiary Bank"
                      value={values.bankName}
                      error={
                        errors.bankName && touched.bankName && errors.bankName
                      }
                    />
                  </View>
                ) : (
                  <View>
                    <Input
                      label={crAccountName || crAccountNameErr}
                      placeholder="Beneficiary account"
                      value={beneficiaryAcct}
                      onBlur={handleBlur("creditAccount")}
                      onChangeText={(text) => SetBeneficiaryAcct(text)}
                      keyboardType="numeric"
                      error={ crAccountNameErr ? (errors.accountName &&
                        touched.accountName &&
                        errors.accountName) :
                       ( errors.creditAccount &&
                        touched.creditAccount &&
                        errors.creditAccount)
                      }
                      placeholderTextColor={COLORS.primaryBlue}
                    />
                    {/* {bankName ? (
                      <Input
                        placeholder="Select Bank"
                        value={values.bankName}
                        onBlur={handleBlur("bankName")}
                        error={
                          errors.bankName && touched.bankName && errors.bankName
                        }
                        placeholderTextColor={COLORS.primaryBlue}
                        icon={
                          <FontAwesome
                            name="bank"
                            size={16}
                            color={COLORS.primaryBlue2}
                            onPress={() => setBankModal(true)}
                          />
                        }
                      />
                    ) : null} */}
                  </View>
                )}
  
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
                  // label="Transaction Narrative"
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
  
        <View>
          <Modal
            visible={bankModal}
            animationType="slide"
            onRequestClose={toggleBankModal}
          >
            <View style={{ marginHorizontal: "5%" }}>
              <FlatList
                ListHeaderComponent={
                  <Input
                    icon={
                      <FontAwesome name="search" size={16} color={COLORS.grey} />
                    }
                    placeholder="search"
                    value={search}
                    onChangeText={(text) => filterBankName(text)}
                  />
                }
                data={searchBank}
                renderItem={renderBankList}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={
                  <Pressable onTouchStart={getBank}>
                    <Text
                      style={[
                        GLOBAL_STYLE.h4Bold,
                        {
                          color: COLORS.primaryBlue2,
                          textAlign: "center",
                          paddingVertical: 10,
                        },
                      ]}
                    >
                      See more
                    </Text>
                  </Pressable>
                }
              />
            </View>
          </Modal>
        </View>
  
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
                    data={{ amount, crAccountName, beneficiaryAcct, bankName }}
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
           show={transferErr} message={transferErr} 
         
           />
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
  export default SendOtherBank;
  
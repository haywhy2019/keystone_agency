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
  SafeAreaView
} from "react-native";
import React, { useEffect, useState } from "react";
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../constants";
import {
  DropDownInput,
  Input,
  CustomButton,
  SpinnerImage,
  CustomSnackBar,
  BottomNotification,
  AccountCard,
} from "../../../components";

import { useSelector } from "react-redux";
import { thousandOperator } from "../../../utilities/helperFunctions/thousandOperator";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import ToggleSwitch from "toggle-switch-react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import uuid from "react-native-uuid";
import { BillsReceipt, ModalList, ListItemCard } from "../../components";
import getUserHook from "../../../utilities/hooks/getUserHook";
import { validateTPinAction } from "../../../utilities/redux/keyMobile/axiosService/sendMoney";
import {
  billCategoryOptionAction,
  billItemsAction,
  billPaymentAction,
  billValidateAction,
} from "../../../utilities/redux/keyMobile/axiosService/billsPayment";
import { billsBeneficiaryListAction } from "../../../utilities/redux/keyMobile/axiosService/beneficiaryList";
import NumberFormat from "react-number-format";
import { TouchableOpacity } from "react-native-gesture-handler";

const BillsPayment = ({ navigation, route }) => {
  const { id, inputAmount, fieldLabel1, fieldLabel2, fieldLabel3 } =
    route.params;
  const [user] = getUserHook();
  const [errors, setErrors] = useState("");
  const [netWork, setNetwork] = useState("");
  const [srcAccount, setSrcAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [billOptions, setBillOptions] = useState("");
  const [billPackage, setBillPackage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPackage, setModalPackage] = useState(false);
  const [selectBill, setSelectBill] = useState("");
  const [selectPackage, setSelectPackage] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [notice, setNotice] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [saveToBill, setSaveToBill] = useState(false);
  const [billerInfo, setBillerInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [editAmount, setEditAmount] = useState(false);
  const [schedulePayment, setSchedulePayment] = useState(false);
  const [useBeneficiary, setUseBeneficiary] = useState(false);
  const [beneficiaryList, setBeneficiaryList] = useState(false);
  const [list, setList ] = useState("")
  const [showBeneficiary, setShowBeneficiary] = useState(false)



  const { accounts, phoneno, email, CustomerName } = useSelector(
    (state) => state.auth.user
  );

  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails
  );

  const validationSchema = Yup.object().shape({
    account: Yup.number().required("Required"),
    bill: Yup.object().required("Required"),
    package: Yup.object().required("Required"),
    amount: Yup.string().required("Required"),
    cardNo: Yup.string().required("Required"),
    // transferPin: Yup.number().required("Required"),
  });

  const validationSchema2 = Yup.object().shape({
    account: Yup.number().required("Required"),
    bill: Yup.object().required("Required"),
    package: Yup.object().required("Required"),
    amount: Yup.string().required("Required"),
    cardNo: Yup.string().required("Required"),
    transferPin: Yup.number().required("Required"),
  });


 

  const toggleSwitch = () => setSaveToBill(!saveToBill);
  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleModalPackage = () => setModalPackage(!modalPackage);

  const getBillOptions = () => {
    setLoading(true);
    billCategoryOptionAction(id)
      .then((res) => {
        if (res.status == 200) {
          setBillOptions(res.data);
        } else {
          setErrors("An error occured");
        }
      })
      .catch((err) => {
        setErrors(err.message || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  const getBillItem = (billerid) => {
    setLoading(true);
    billItemsAction(billerid)
      .then((res) => {
        if (res.status == 200) {
          setBillPackage(res.data.paymentitems);
        } else {
          setError("An error occured. can't fetch package");
        }
      })
      .catch((err) => {
        setError(err.message || "An error occured. cant't fetch package");
      })
      .finally(() => setLoading(false));
  };

  const getbillsBeneficiary = (user) => {
    setLoading(true);
    billsBeneficiaryListAction(user)
      .then((res) => {
        if ((res.status = 200)) {
          setList(res.data);
        } else {
          setError("An error occured");
        }
      })
      .catch((err) => {
        setError(err.message || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      getBillOptions();
    }
    if(user) {
      getbillsBeneficiary(user)
    }
   
  }, [user]);

  
  const selectBillOption = (item) => {
    setSelectBill(item);
    setModalVisible(false);
    getBillItem(item.billerid);
  };
  const selectBillPackage = (item) => {
    setModalPackage(false);
    setSelectPackage(item);
  };

  const DisplayBillOptions = (item, index) => {
    return (
      <Pressable
        style={{
          paddingVertical: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.primaryBlue,
          height: 60,
        }}
        onPress={() => selectBillOption(item)}
      >
        <View
          style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-start" }]}
        >
          <Text style={[GLOBAL_STYLE.h2, { color: COLORS.primaryBlue2 }]}>
            {item.billername}
          </Text>
        </View>
      </Pressable>
    );
  };
const selectBillerBeneficiary = (item) => {
setSelectBill({beneficiary:"Beneficiary"})
setSelectPackage(item)
setCardNo(item.billercustomerid)
setShowBeneficiary(false)
}


const toggleBeneficiary = () => {
  if(useBeneficiary){
    setShowBeneficiary(false)
    setUseBeneficiary(false)
  setSelectBill(false)
  setCardNo(false)
  }else{
    setShowBeneficiary(true)
    setUseBeneficiary(true)
  }
  }




  const beneficiaryItem = ({ item }) => {
    return (
      <ListItemCard
        item={item}
        itemName={
          `${item.alias}  ${item.paymentitemname 
          } `
         
        }
        onPress={() => selectBillerBeneficiary(item)}
      />
    );
  };

  const DisplayBillPackage = (item, index) => {
    return (
      <Pressable
        style={{
          paddingVertical: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.primaryBlue,
          height: 60,
        }}
        onPress={() => selectBillPackage(item)}
      >
        <View
          style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-start" }]}
        >
          <Text style={[GLOBAL_STYLE.h2, { color: COLORS.primaryBlue2 }]}>
            {item.paymentitemname}
          </Text>
        </View>
      </Pressable>
    );
  };

  const transactionReceipt = () => {
    setNotice(false);
    setShowReceipt(true);
  };

  console.log(selectBill, "bill", selectPackage, "select packeage")

  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={[
          GLOBAL_STYLE.scrollViewGlobalNopadding,
          { justifyContent: "flex-start", marginTop: 10 },
        ]}
      >

        <AccountCard />
        <Formik
          initialValues={{
            account: selectedAccount.accountno,
            bill: selectBill,
            package: selectPackage,
            cardNo: cardNo,
            amount:
              selectPackage.amount > 0
                ? thousandOperator(selectPackage.amount)
                : amount,
            transferPin: "",
          }}
          enableReinitialize={true}
          validationSchema={customerName ? validationSchema2 : validationSchema}
          onSubmit={(values) => {
            const id = uuid.v4();

            const payload = {
              username: user,
              paymentname: selectPackage.paymetItemName,
              billerName: selectBill.billername,
              billerid: selectBill.billerid,
              Source: "mobile",
              AccountNo: srcAccount,
              customerId: values.cardNo,
              customerMobile: phoneno,
              customerEmail: email,
              amount: selectPackage.amount,
              requestReference: id,
              CustomerName: CustomerName,
              AuthRequest: {
                TPin: values.transferPin,
                SecondFa: "string",
                SecondFaType: "string",
                CardAccountNumber: "string",
              },
            };
            const verifyPayload = {
              customerId: values.cardNo,
              paymentCode: values.package?.paymentCode,
            };

            Keyboard.dismiss();
            setLoading(true);
            setError("");
            setSuccess("");
            if (customerName) {
              billPaymentAction(payload)
                .then((res) => {
                  if (res?.data?.responseCode == "00") {
                    setSuccess(res.data.responseMessage);
                    setNotice(true);
                  } else {
                    setError(res.data.responseMessage);
                  }
                })
                .catch((err) => {
                  setError(res.data.ResponseDescription || "An error occured");
                })
                .finally(() => setLoading(false));
            } else {
              billValidateAction(verifyPayload)
                .then((res) => {
                  if (res.data.ResponseStatus == "00") {
                    setCustomerName(res.data.fullName);
                  } else {
                    setError(res.data.ResponseMsg);
                  }
                })
                .catch((err) => {
                  setError("An error occured");
                })
                .finally(() => setLoading(false));
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
              <View style={{ marginHorizontal: "5%", marginTop: 20 }}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <View pointerEvents="none">
                    <Input
                      placeholder={fieldLabel1 ? fieldLabel1 : "Bill category"}
                      editable={false}
                      onPress={null}
                      onBlur={handleBlur("bill")}
                      value={useBeneficiary ? selectBill.beneficiary : values.bill.billername}
                      error={errors.bill && touched.bill && errors.bill}
                      placeholderTextColor={COLORS.primaryBlue}
                      icon={
                        <FontAwesome
                          name="chevron-down"
                          size={16}
                          color={COLORS.grey}
                        />
                      }
                    />
                  </View>
                </TouchableOpacity>
                <View
                      style={[
                        GLOBAL_STYLE.rowBetween,
                        { justifyContent: "flex-end" },
                      ]}
                    >
                    <ToggleSwitch
                      isOn={useBeneficiary}
                      onColor={COLORS.primaryBlue}
                      offColor={COLORS.primaryBlue2}
                      label="Select from Beneficiary"
                      labelStyle={GLOBAL_STYLE.h4}
                      size="small"
                      onToggle={toggleBeneficiary}
                    />
                    </View>
                {selectBill ? (
                  <View>           
                    <TouchableOpacity onPress={() => setModalPackage(true)}>
                      <View pointerEvents="none">
                        <Input
                          placeholder={

                            fieldLabel2 ? fieldLabel2 : "Biller package"
                          }
                          editable={false}
                          onBlur={handleBlur("package")}
                          value={useBeneficiary ? selectPackage.paymentitemname : values.package.paymentitemname}
                          error={
                            errors.package && touched.package && errors.package
                          }
                          placeholderTextColor={COLORS.primaryBlue}
                          icon={
                            <FontAwesome
                              name="chevron-down"
                              size={16}
                              color={COLORS.grey}
                            />
                          }
                        />
                      </View>
                    </TouchableOpacity>

                    <Input
                    label={customerName}
                      placeholder={selectBill?.customerfield1 || "Card number"}
                      onChangeText={(text) => setCardNo(text)}
                      onBlur={handleBlur("cardNo")}
                      keyboardType="numeric"
                      value={values.cardNo}
                      error={errors.cardNo && touched.cardNo && errors.cardNo}
                      placeholderTextColor={COLORS.primaryBlue}
                    />

                    <NumberFormat
                      value={values.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      renderText={(value) => (
                        <Input
                          placeholder="Amount"
                          keyboardType="numeric"
                          // onChangeText={handleChange("amount")}
                          onChangeText={(text) => setAmount(text)}
                          onBlur={handleBlur("amount")}
                          value={value}
                          error={
                            errors.amount && touched.amount && errors.amount
                          }
                          placeholderTextColor={COLORS.primaryBlue}
                          icon={
                            <Text style={{ color: COLORS.primaryBlue2 }}>
                              {"\u20A6"}
                            </Text>
                          }
                        />
                      )}
                    />
            

                    <View
                      style={[
                        GLOBAL_STYLE.rowBetween,
                        { justifyContent: "flex-end" },
                      ]}
                    >
                      <ToggleSwitch
                        isOn={saveToBill}
                        onColor={COLORS.primaryBlue}
                        offColor={COLORS.primaryBlue2}
                        label="Save to bill list"
                        labelStyle={{
                          color: COLORS.primaryBlue,
                          fontWeight: "900",
                        }}
                        size="small"
                        onToggle={toggleSwitch}
                      />
                    </View>

                    {customerName ? (
                      <View>
                        <Input
                          placeholder="Enter PIN"
                          keyboardType="numeric"
                          onChangeText={handleChange("transferPin")}
                          onBlur={handleBlur("transferPin")}
                          value={values.transferPin}
                          secureTextEntry={true}
                          maxLength={4}
                          error={
                            errors.transferPin &&
                            touched.transferPin &&
                            errors.transferPin
                          }
                          placeholderTextColor={COLORS.primaryBlue}
                        />
                           <View
                      style={[
                        GLOBAL_STYLE.rowBetween,
                        { justifyContent: "flex-end" },
                      ]}
                    >
                        <ToggleSwitch
                          isOn={schedulePayment}
                          onColor={COLORS.primaryBlue}
                          offColor={COLORS.primaryBlue2}
                          label="Schedule payment"
                          labelStyle={{
                            color: COLORS.primaryBlue,
                            fontWeight: "900",
                          }}
                          size="small"
                          onToggle={() => setSchedulePayment(!schedulePayment)}
                        />
                        </View>
                        <CustomButton
                          buttonText="Confirm"
                          onPress={handleSubmit}
                          buttonContainerStyle={styles.button}
                        />
                      </View>
                    ) : (
                      <CustomButton
                        buttonText="Submit"
                        onPress={handleSubmit}
                        buttonContainerStyle={styles.button}
                      />
                    )}
                  </View>
                ) : null}
              </View>
            );
          }}
        </Formik>
        <View>
          <Modal
            visible={modalVisible}
            animationType="slide"
            onRequestClose={toggleModal}
          >
            <View style={{ marginHorizontal: "5%" }}>
              <FlatList
                data={billOptions}
                renderItem={({ item, index }) =>
                  DisplayBillOptions(item, index)
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </Modal>
        </View>
        <View>
          <Modal
            visible={modalPackage}
            animationType="slide"
            onRequestClose={toggleModalPackage}
          >
            <View style={{ marginHorizontal: "5%" }}>
              <FlatList
                data={billPackage}
                renderItem={({ item, index }) =>
                  DisplayBillPackage(item, index)
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </Modal>
        </View>

        <View>
          <Modal
            visible={showBeneficiary}
            animationType="slide"
            onRequestClose={() => setShowBeneficiary(!showBeneficiary)}
          >
            <View style={{ marginHorizontal: "5%" }}>
              <FlatList
                data={list}
                renderItem={beneficiaryItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </Modal>
        </View>

        <BillsReceipt
          show={showReceipt}
          item={success}
          onPress={() => navigation.replace("Home")}
        />

        <BottomNotification
          show={notice}
          headerText="Transaction Successful"
          infoText={`you have successfully sent ${success.amount} to ${success.CustomerName}`}
          onPress={transactionReceipt}
          buttonText={"Continue"}
        />
      </ScrollView>
      <CustomSnackBar show={error} message={error} />
    </View>
  );
};

export default BillsPayment;

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
});

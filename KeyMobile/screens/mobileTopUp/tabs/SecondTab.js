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
} from "react-native";
import React, { useEffect, useState } from "react";
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../../constants";
import {
  DropDownInput,
  Input,
  CustomButton,
  SpinnerImage,
  CustomSnackBar,
  AccountCard,
} from "../../../../components";
import { ModalList } from "../../../components";
import { useSelector } from "react-redux";
import {
  MtnIcon,
  GloIcon,
  EtisalatIcon,
  AirtelIcon,
  AddressBookIcon,
  AvatarIcon,
} from "../../../../constants/icons";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import ToggleSwitch from "toggle-switch-react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import uuid from "react-native-uuid";

import getUserHook from "../../../../utilities/hooks/getUserHook";
import { validateTPinAction } from "../../../../utilities/redux/keyMobile/axiosService/sendMoney";
import {
  airTimeAction,
  dataPlanAction,
  dataAction,
} from "../../../../utilities/redux/keyMobile/axiosService/mobileTopup";
import { TouchableOpacity } from "react-native-gesture-handler";
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

const SecondTab = () => {
  const [user] = getUserHook();
  const [errors, setErrors] = useState({});

  const [netWork, setNetwork] = useState("");
  const [srcAccount, setSrcAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [contacts, setContacts] = useState("");
  const [searchContacts, setSearchContacts] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDataPlan, setModalDataPlan] = useState(false);
  const [saveToBill, setSaveToBill] = useState(false);
  const [billerInfo, setBillerInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [dataPlan, setDataPlan] = useState([]);
  const [selectPlan, setSelectPlan] = useState([]);

  const { accounts, DailyUtilizedLimit, dailytranslimit, bvn } = useSelector(
    (state) => state.auth.user
  );

  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails.accountno
  );

  const validationSchema = Yup.object().shape({
    account: Yup.number().required("Required"),
    // network: Yup.object().required("Required"),
    phoneNumber: Yup.number().required("Required"),
    amount: Yup.object().required("Required"),
    transferPin: Yup.number().required("Required"),
  });

  const toggleSwitch = () => setSaveToBill(!saveToBill);
  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleDataModal = () => setModalDataPlan(!modalDataPlan);

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

  const getDataPlan = () => {
    setLoading(true);
    dataPlanAction(phoneNumber)
      .then((res) => {
        if (res.status == 200) {
          setDataPlan(res.data.products);
          setBillerInfo(res.data.opts);
          setModalDataPlan(true)
        } else {
          setDataPlan([{ error: "an error occured" }]);
        }
      })
      .catch((err) => {
        setError(err.message || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  let checkPhoneNo = /^\d{11}$/;
  useEffect(() => {
    if (phoneNumber.replace(/ /g, "").match(checkPhoneNo)) {
      getDataPlan();
    }
  }, [phoneNumber]);

  const selectLocalContact = (item) => {
    const number =
      item.phoneNumbers == undefined || null
        ? ""
        : item.phoneNumbers[0]?.number;

    setPhoneNumber(number);
    setModalVisible(false);
  };

  const selectDataPlan = (item) => {
    setAmount(item);
    setModalDataPlan(false);
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

  const DisplayDataPlan = ({item, index}) => {
    return (
      <Pressable
        style={{
          paddingVertical: 15,
          borderTopWidth: 0.5,
          borderTopColor: COLORS.primaryBlue,
          height: 60,
        }}
        onPress={() => selectDataPlan(item)}
      >
        <View
          style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-start" }]}
        >
          <Text style={[GLOBAL_STYLE.h2, { color: COLORS.primaryBlue2, marginLeft: 10 }]}>
            {item?.data_amount?.length >= 4
              ? `${item?.data_amount / 1000}GB `
              : `${item?.data_amount}MB`}{" "}
            for {item?.topup_currency}
            {item?.price}
          </Text>
        </View>
      </Pressable>
    );
  };

  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <View style={{flex: 1}}>
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start" },
      ]}
    >
      <View style={{ marginVertical: 10 }}>
        <AccountCard data={accounts} />
      </View>
      <Formik
        initialValues={{
          account: selectedAccount,
          network: billerInfo,
          phoneNumber: phoneNumber,
          amount: amount,
          transferPin: "",
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const id = uuid.v4();
          const dataPayload = {
              "product_id": amount.product_id,
            "uniqueRef": id,
              "debitAccount": selectedAccount,
              "beneficiaryPhone":  phoneNumber.replace(/ /g, ""),
              "amount":  amount.price,
              "telco": billerInfo.operator,
              "source": "mobile",
              "username": user,
              "AuthRequest": {
                "TPin": values.transferPin,
                "SecondFa": "string",
                "SecondFaType": "string",
                "CardAccountNumber": "string"
              
            }
          };

          Keyboard.dismiss();
          setLoading(true);
          setError("");
          setSuccess("");
                dataAction(dataPayload)
                  .then((res) => {
                    console.log(res, "data res")
                    if (res?.data?.reponseCode == "00") {
                      setSuccess(res.data.responseMsg);
                    } else {
                      setError(res.data.responseMsg);
                    }
                  })
                  .catch((err) => {
                    const {message, response} = err
                    console.log(err, "data err")
                    setError(response.data.Message || "An error occured");
                  })
                  .finally(() => setLoading(false));
              
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
        }) => (
          <View style={{ marginHorizontal: "5%", marginTop: 20 }}>
          
            <Input
              placeholder="Phone number"
              keyboardType="numeric"
              // onChangeText={handleChange("phoneNumber")}
              onChangeText={(text) => setPhoneNumber(text)}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              error={
                errors.phoneNumber && touched.phoneNumber && errors.phoneNumber
              }
              placeholderTextColor={COLORS.primaryBlue}
              icon={<AddressBookIcon onPress={() => setModalVisible(true)} />}
            />

            <ModalList 
              placeholder="Select Data Plan"
              onRequestClose={()=> setModalDataPlan(false)}
              value={
                amount == ""
                  ? "Select Data Plan"
                  : amount?.data_amount?.length >= 4
                  ? `${amount.data_amount / 1000}GB for ${
                      amount.topup_currency
                    } ${amount.price}`
                  :
                   `${amount.data_amount}MB for ${amount.topup_currency} ${amount.price}`
              }
              data={dataPlan}
              renderItem={DisplayDataPlan}
              icon={
               
                <FontAwesome
                  name="chevron-down"
                  size={16}
                  color={COLORS.grey}
                />
             
            }
            visible={modalDataPlan}
            setVisible={() => setModalDataPlan(true)}
            error={errors.amount && touched.amount && errors.amount}

            />
            {/* <View
              style={[GLOBAL_STYLE.rowBetween, { justifyContent: "flex-end" }]}
            >
              <ToggleSwitch
                isOn={saveToBill}
                onColor={COLORS.primaryBlue}
                offColor={COLORS.primaryBlue2}
                label="Save beneficiary"
                labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
                size="small"
                onToggle={toggleSwitch}
              />
            </View> */}
            <Input
              placeholder="Enter PIN"
              keyboardType="numeric"
              onChangeText={handleChange("transferPin")}
              onBlur={handleBlur("transferPin")}
              value={values.transferPin}
              secureTextEntry={true}
              error={
                errors.transferPin && touched.transferPin && errors.transferPin
              }
              placeholderTextColor={COLORS.primaryBlue}
              maxLength={4}
            />
            <CustomButton
              buttonText="Submit"
              onPress={handleSubmit}
              buttonContainerStyle={styles.button}
            />
          </View>
        )}
      </Formik>

      <View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={toggleModal}
        >
          <SafeAreaView />
          <View style={{ marginHorizontal: "5%" }}>
            <FlatList
              ListHeaderComponent={
                <Input
                  icon={
                    <FontAwesome name="search" size={16} color={COLORS.grey} />
                  }
                  placeholder="search"
                  value={searchContacts}
                  onChangeText={(text) => filterContacts(text)}
                />
              }
              data={searchContacts}
              renderItem={({ item, index }) => DisplayPhoneNumber(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </View>
      {/* <View>
        <Modal
          visible={modalDataPlan}
          animationType="slide"
          onRequestClose={toggleDataModal}
        >
          <View style={{ marginHorizontal: "5%" }}>
            <FlatList
              data={dataPlan}
              ListEmptyComponent={
                <Text style={[GLOBAL_STYLE.h4Bold, { textAlign: "center" }]}>
                  An error occured, try again later
                </Text>
              }
              renderItem={({ item, index }) => DisplayDataPlan(item, index)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </Modal>
      </View> */}
     
    </ScrollView>
    <CustomSnackBar
        show={error || success}
        message={error || success}
        success={success ? success : false}
      />
    </View>
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
});

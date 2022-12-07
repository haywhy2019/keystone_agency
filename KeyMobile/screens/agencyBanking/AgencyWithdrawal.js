import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  StatusBar
} from "react-native";
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { Formik } from "formik";

//components
import { DailySingleLimitSlide, TwoFactorAuth } from "../../components";
import SendAuthText from "../../components/SendTwoAuthText";

import {
  Input,
  CustomButton,
  SpinnerImage,
  AccountCard,
  InfoIconCard,
  AuthenticationDropDown,
  BottomNotification,
} from "../../../components";
import ToggleSwitch from "toggle-switch-react-native";

//redux
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

const verficationSchema = Yup.object().shape({
  verification: Yup.string().required("Required"),
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
const AgencyWithdrawal = () => {
  const navigation = useNavigation()
  const [pinSecureInput, setPinSecureInput] = useState(true);
  const [savingBeneficiary, setSavingBeneficiary] = useState(false);
  const [selectCustomer, setSelectCustomer] = useState(false);

  //actions in modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [notice, setNotice] = useState(false);

  //for the authentication drop down
  const [usingDebitCard, setUsingDebitCard] = useState(false);
  const [usingToken, setUsingToken] = useState(false);

  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState("");

  const transactionReceipt = () => {
    setNotice(false);
    setIsModalOpen(false);
    setShowReceipt(true);
  };

  const { accounts } = useSelector((state) => state.auth.user);

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      
      <AccountCard data={accounts} />

      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <DailySingleLimitSlide spentColor />
        <Formik
          initialValues={{
            accountNumber: "",
            senderNarration: "",
            pin: "",
            cardNumber: "",
            cardMonthYear: "",
            cardCVV: "",
            cardPin: "",
            OTP: "",
            token: "",
          }}
          onSubmit={() => {}}
        >
          {({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
          }) => {
            return (
              <>
                <Input
                  placeholder={"Customer's Account Number "}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{ borderWidth: 0.3 }}
                  icon={
                    <AntDesign
                      name="questioncircle"
                      size={16}
                      color={COLORS.grey}
                    />
                  }
                  value={values.accountNumber}
                  onChangeText={handleChange("accountNumber")}
                  keyboardType="numeric"
                  onBlur={handleBlur("accountNumber")}
                  error={errors.accountNumber}
                />
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Text style={{ marginRight: 15 }}>Select Customer</Text>
                  <ToggleSwitch
                    isOn={selectCustomer}
                    onColor={COLORS.primaryBlue}
                    offColor={COLORS.grey}
                    // label="Save Beneficiary"
                    labelStyle={{
                      color: COLORS.primaryBlue,
                      fontWeight: "900",
                    }}
                    size="small"
                    onToggle={() => setSelectCustomer(!selectCustomer)}
                  />
                </View>
                <Input
                  placeholder={"Enter Amount"}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{ borderWidth: 0.3 }}
                  icon={
                    <AntDesign
                      name="questioncircle"
                      size={16}
                      color={COLORS.grey}
                    />
                  }
                  value={values.amount}
                  onChangeText={handleChange("amount")}
                  keyboardType="numeric"
                  onBlur={handleBlur("amount")}
                  error={errors.amount}
                />
                <Input
                  placeholder={"Sender/Narration"}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{ borderWidth: 0.3 }}
                  icon={
                    <AntDesign
                      name="questioncircle"
                      size={16}
                      color={COLORS.grey}
                    />
                  }
                  value={values.senderNarration}
                  onChangeText={handleChange("senderNarration")}
                  onBlur={handleBlur("senderNarration")}
                  error={errors.senderNarration}
                />
                <Input
                  placeholder={"Enter Agent Code"}
                  placeholderTextColor={COLORS.grey}
                  inputCustomStyle={{ borderWidth: 0.3 }}
                  value={values.pin}
                  onChangeText={handleChange("pin")}
                  keyboardType="numeric"
                  onBlur={handleBlur("pin")}
                  error={errors.pin}
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
                        <Ionicons name="eye" size={16} color={COLORS.grey} />
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

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Save Customer</Text>
                  <ToggleSwitch
                    isOn={savingBeneficiary}
                    onColor={COLORS.primaryBlue}
                    offColor={COLORS.grey}
                    // label="Save Beneficiary"
                    labelStyle={{
                      color: COLORS.primaryBlue,
                      fontWeight: "900",
                    }}
                    size="small"
                    onToggle={() => setSavingBeneficiary(!savingBeneficiary)}
                  />
                </View>

                <View style={{ flex: 1 }} />

                <CustomButton
                  buttonText={"CONTINUE"}
                  buttonContainerStyle={{ marginTop: 30 }}
                  onPress={() => setShowAuth(true)}
                />
              </>
            );
          }}
        </Formik>
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
          navigation.navigate("Home")
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
                  data={{
                    amount: "5000",
                    crAccountName: "Tola Segun",
                    beneficiaryAcct: "1234567890",
                    bankName: "Segun Tola",
                  }}
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
  );
};

export default AgencyWithdrawal;

const styles = StyleSheet.create({
  button: { alignSelf: "stretch", marginBottom: 20 },
  scrollContainer: {
    backgroundColor: "white",
  },
  mainView: {
    flexGrow: 1,
    minHeight: "75%",
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  information: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import {
  DropDownShowInfo,
  NameAndLabel,
  TwoFactorAuth,
  SendTwoAuthText
} from "../../../components";
import { COLORS, GLOBAL_STYLE } from "../../../../constants";
import { CustomButton } from "../../../../components";
import * as Yup from "yup";
import { Formik } from "formik";
import uuid from "react-native-uuid";

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

const MultipleSummary = () => {
  const id = uuid.v4();
  const [showAuth, setShowAuth] = useState(false);
  const [authType, setAuthType] = useState("");
  const data = [
    {
      accountName: "ogunsola segun",
      bankName: "GTB",
      accountNo: "1234567890",
      formattedAmount: "12,000",
      narration: "testing",
    },
    {
      accountName: "ogunsola segun",
      bankName: "GTB",
      accountNo: "1234567890",
      formattedAmount: "12,000",
      narration: "testing",
    },
    {
      accountName: "ogunsola segun",
      bankName: "GTB",
      accountNo: "1234567890",
      formattedAmount: "12,000",
      narration: "testing",
    },
    {
      accountName: "ogunsola segun",
      bankName: "GTB",
      accountNo: "1234567890",
      formattedAmount: "12,000",
      narration: "testing",
    },
    {
      accountName: "ogunsola segun",
      bankName: "GTB",
      accountNo: "1234567890",
      formattedAmount: "12,000",
      narration: "testing",
    },
  ];
  const DropDownInfo = () => (
    <View>
      <Text style={GLOBAL_STYLE.h4}>Transfer Name | Family (x2)</Text>
      <Text style={[GLOBAL_STYLE.h4, { color: COLORS.grey }]}>
        Total Transfer | N50,000.00
      </Text>
    </View>
  );

  const TransferSummary = ({ item }) => (
    <View
      style={{
        marginTop: 15,
        backgroundColor: COLORS.grey2,
        borderRadius: 8,
        paddingHorizontal: "5%",
      }}
    >
      <NameAndLabel
        label="Beneficiary"
        resp={item.accountName?.slice(0, 20)}
        customTextStyle={{ color: COLORS.grey }}
        customBorderStyle={{ borderBottomColor: COLORS.grey }}
      />
      <NameAndLabel
        label="Bank Name"
        resp={item.bankName}
        customTextStyle={{ color: COLORS.grey }}
        customBorderStyle={{ borderBottomColor: COLORS.grey }}
      />
      <NameAndLabel
        label="Acc. Number"
        resp={item.accountNo}
        customTextStyle={{ color: COLORS.grey }}
        customBorderStyle={{ borderBottomColor: COLORS.grey }}
      />
      <NameAndLabel
        label="Amount"
        resp={item.formattedAmount}
        customTextStyle={{ color: COLORS.grey }}
        customBorderStyle={{ borderBottomColor: COLORS.grey }}
      />
      <NameAndLabel
        label="Narration"
        resp={item.narration}
        customTextStyle={{ color: COLORS.grey }}
        bottom
      />
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobal,
        { justifyContent: "flex-start" },
      ]}
    >
      <View style={{}}>
        <Text style={GLOBAL_STYLE.h2Bold}>Review information</Text>
      </View>
      <View style={GLOBAL_STYLE.columnBetween}>
        <DropDownShowInfo
          label={<DropDownInfo />}
          showInfo={TransferSummary}
          data={data}
        />
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
            setShowAuth(false);
            console.log(values.otp, values.verification, "test");
            sendTransactionHandler(values.verification, values.otp);
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
                component={ <SendTwoAuthText
                    data={{
                      amount: "50000",
                      crAccountName: "10",
                      beneficiaryAcct: "Beneficiaries",
                      bankName: "",
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
        <CustomButton
          buttonText={"Send money"}
          buttonContainerStyle={{ marginVertical: 20 }}
          onPress={() => setShowAuth(true)}
        />
      </View>
    </ScrollView>
  );
};

export default MultipleSummary;

const styles = StyleSheet.create({});

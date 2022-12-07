import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Input, DropDownInput, CustomButton } from "../../components";
import { GLOBAL_STYLE, COLORS, SIZES } from "../../constants";
import TwoFactorAuthText from "./TwoFactorAuthText";
import { Dialog } from "react-native-simple-dialogs";
import { sendOtpAction } from "../../utilities/redux/keyMobile/axiosService/sendOtp";
import getUserHook from "../../utilities/hooks/getUserHook";
import uuid from "react-native-uuid";

const TwoFactorAuth = ({
  title,
  component,
  show,
  smsValue,
  onClose,
  onSubmit,
  info,
  lgHeight,
  authType,
  dropDownOptions,
  onChange,
  dropdownValue,
  error,
  onChangeOtp,
  otpValue
}) => {
  const [user] = getUserHook();
  const [visible, setVisible] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [otpSendRes, setOtpSendRes]  = useState(true);
console.log(error, "erro")


console.log(authType, "auth type")
const id = uuid.v4();

const payload = {
  username: user,
  action: "SendOTP",
  requestId: id,
  source: "mobile",
};
useEffect(() => {
  if(authType == "SMS OTP"){
sendOtpAction(payload)
.then(res => {
  console.log(res, "2 auth send otp")
  if(res.data.ResponseCode == "00"){
setOtpSendRes(res.data.ResponseDescription)
  }else {
    setOtpSendRes("An error occured, Try again later.")
  }
  console.log(res, "two auth res")
}).catch(err => {
  setOtpSendRes("An error occured, Try again later.")
  console.log(err, "two auth err")
})
  }
  if(authType != "SMS OTP"){
    setOtpSendRes("")
  }
},[authType, onChange])
  return (
    <View>
      <Dialog
        visible={show}
        title={title}
        titleStyle={[GLOBAL_STYLE.h2Bold, { textAlign: "center" }]}
        onTouchOutside={onClose}
        dialogStyle={{
          borderRadius: 10,
          height:
            authType == "Debit Card"
              ? SIZES.responsiveHeight("80%")
              : lgHeight
              ? SIZES.responsiveHeight("70%")
              : SIZES.responsiveHeight("50%"),
        }}
      >
        <ScrollView>
          <View style={styles.component}>{component}</View>

          <DropDownInput
            placeholderStyle={GLOBAL_STYLE.h4}
            placeholder="Select Verification Option"
            data={dropDownOptions}
            labelField="label"
            valueField="value"
            onChange={onChange}
            value={dropdownValue}
            error={error?.verification}
          />
          {authType &&
          ((authType == "SMS OTP") || (authType == "Hard or Soft Token") || (authType == "Debit Card")) ? (
            <Input
              containerMargin={{ marginBottom: 5 }}
              placeholder={authType == "Debit Card" ? `Enter ${authType} Last 6 Digit` : `Enter ${authType}` }
              value={otpValue}
                onChangeText={onChangeOtp}
              placeholderTextColor={COLORS.primaryBlue}
              error={otpSendRes ? otpSendRes : error?.otp}
              keyboardType={"numeric"}
              secureTextEntry={authType == "Debit Card" ? true : false}
             
            />
          ) : authType == "Pan Card" ? (
            <View>
              <Input
                containerMargin={{ marginBottom: 5 }}
                placeholder={"Card Number"}
                value={smsValue}
                //   onChangeText={onChangeSMS}
                placeholderTextColor={COLORS.primaryBlue}
                error={error?.cardNo}
              />
              <View style={[GLOBAL_STYLE.rowBetween]}>
                <View style={{ width: "45%" }}>
                  <Input
                    containerMargin={{ marginBottom: 5 }}
                    placeholder={"MM/YYYY"}
                    value={smsValue}
                    //   onChangeText={onChangeSMS}
                    placeholderTextColor={COLORS.primaryBlue}
                    error={error?.cardDate}
                  />
                </View>
                <View style={{ width: "45%" }}>
                  <Input
                    containerMargin={{ marginBottom: 5 }}
                    placeholder={"CVV"}
                    value={smsValue}
                    //   onChangeText={onChangeSMS}
                    placeholderTextColor={COLORS.primaryBlue}
                    error={error?.cvv}
                  />
                </View>
              </View>
              <Input
                containerMargin={{ marginBottom: 5 }}
                placeholder={"Card Pin"}
                value={smsValue}
                //   onChangeText={onChangeSMS}
                placeholderTextColor={COLORS.primaryBlue}
                error={error?.cardPin}
              />
            </View>
          ) : null}
          {/* use info to show auth type details and showinfo to toggle it off */}
          {info && showInfo && (
            <View>
              <TwoFactorAuthText
                label="SMS OTP "
                text="Maximum Daily Limit -"
                amount="N200,000"
              />
              <TwoFactorAuthText
                label="Debit Card"
                text="Maximum Daily Limit -"
                amount="N500,000"
              />
              <TwoFactorAuthText
                label="Hard or Soft Token"
                text="(Maximum Daily Limit on Account)"
              />
            </View>
          )}
          
            <CustomButton
              onPress={() => {
                setVisible(false);
                onSubmit();
              }}
              buttonText={"Submit"}
              buttonContainerStyle={{ marginTop: SIZES.responsiveHeight("5%") }}
            />
         
        </ScrollView>
      </Dialog>
    </View>
  );
};

export default TwoFactorAuth;

const styles = StyleSheet.create({
  component: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

import { View, StyleSheet, ScrollView, Keyboard,Text, Image } from "react-native";

import { StatusBar } from "expo-status-bar";

import {
  images,
  COLORS,
  FONTS,
  GLOBAL_STYLE,
  isAndroid,
} from "../../../constants";
import {
  CustomButton,
  Input,
  SpinnerImage,
  CustomSnackBar,
  DropDownInput
} from "../../../components";

import { MenuLeftRightIcon, TwoFactorAuth ,MenuImageLeftIconRight} from "../../components";

import { PinCircleIcon } from "../../../constants/icons";
import { ChangePin } from "../profile";
import Profile from "../profile";
import React, { useState, useEffect } from "react";
import { object } from "yup";
import getUserHook from "../../../utilities/hooks/getUserHook";
import uuid from "react-native-uuid";
import { sendOtpAction } from "../../../utilities/redux/keyMobile/axiosService/sendOtp";
import AgencyBankingPin from "./AgencyBankingPin";
const PinMenu = ({ navigation, route }) => {
  const [user] = getUserHook();
  const [screen, setScreen] = useState({});
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [showAuth, setShowAuth]= useState(false);
  const id = uuid.v4();
  const sendPinOtp = (screen) => {
    setScreen({ screen: "ChangePin", label: "Enter Password" });

  
    const payload = {
      username: user,
      action: "ChangePin",
      requestId: id,
      source: "mobile",
    };
    Keyboard.dismiss();
    setLoading(true);
    sendOtpAction(payload)
      .then((res) => {
        console.log(res, "resss")
        if (res.data.ResponseCode == "00") {
          
          navigation.navigate(screen, { user, id });
        } else {
          setOtpError(res.data.ResponseMessage);
        }
      })
      .catch((err) => {
        setOtpError(err.messsage || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <View style={{flex: 1}}>
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <StatusBar style={isAndroid ? "light" : "dark"} />
      <View style={styles.backgroundImgContainer}>
        <MenuImageLeftIconRight
          label="Change Pin"
          screen="ChangePin"
          leftIcon={
            <Image
              source={images.keyMobileLogoRound}
              style={styles.logoImage}
            />}
          onPress={() => sendPinOtp("ChangePin")}
        />
        <MenuImageLeftIconRight
          label="PIN Reset Mobile"
          screen="PIN Reset Mobile"
          leftIcon={
            <Image
              source={images.keyMobileLogoRound}
              style={styles.logoImage}
            />}
          onPress={() => sendPinOtp("ResetPin")}
          // onPress={() => setShowAuth(true)}
        />
            {/* <MenuImageLeftIconRight
          label="Change Pin Debit Card"
          screen="Pin Reset Mobile"
          leftIcon={
            <Image
              source={images.keyMobileLogoRound}
              style={styles.logoImage}
            />}
          // onPress={() => sendPinOtp("ResetPin")}
          onPress={() => setShowAuth(true)}
        />
           <MenuImageLeftIconRight
          label="Pin Reset Debit Card"
          screen="pin Reset Mobile"
          leftIcon={
            <Image
              source={images.keyMobileLogoRound}
              style={styles.logoImage}
            />}
          // onPress={() => sendPinOtp("ResetPin")}
          onPress={() => setShowAuth(true)}
        />
          <MenuImageLeftIconRight
          label="Agency Banking Pin"
          screen="AgencyBankingPin"
          leftIcon={
            <Image
              source={images.keyMobileLogoRound}
              style={styles.logoImage}
            />}
          // onPress={() => sendPinOtp("ResetPin")}
          onPress={() => navigation.navigate("AgencyBankingPin")}
        /> */}
      </View>

      <TwoFactorAuth
        title={"User Authorization"}
        component={
          <Text
            style={[GLOBAL_STYLE.h5, { width: "90%", textAlign: "center" }]}
          >
            Kindly select any of the verification method to view card details
          </Text>
        }
        onSubmit={() => {navigation.navigate("ResetPin", { user,});
         setShowAuth(false)}}
        onClose={() => setShowAuth(false)}
        show={showAuth}
      />
   
    </ScrollView>
    <CustomSnackBar 
      show={otpError}
      message={otpError}
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

  container1: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  backgroundImg: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  headerContainer: {
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    textAlign: "center",
  },
  headerText1: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginBottom: 20,
  },
  headerText2: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.normal,
  },
  backgroundImgContainer: {
    flex: 1,
  },
  afterBgImage: {
    flex: 3,
    paddingHorizontal: "8%",
    backgroundColor: COLORS.white,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  accountText: {
    color: COLORS.grey,
    fontFamily: FONTS.normal,
  },
  loginText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    marginLeft: 5,
  },
  button: {
    marginVertical: 30,
  },
  logoImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
export default PinMenu;

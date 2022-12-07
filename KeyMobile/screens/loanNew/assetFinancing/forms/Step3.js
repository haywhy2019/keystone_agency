import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  CustomButton,
  Input,
  CustomDropDown,
  DropDownInput,
  BottomNotification,
} from "../../../../../components";
import Checkbox from "expo-checkbox";
import { FONTS, COLORS, GLOBAL_STYLE, SIZES } from "../../../../../constants";
import { useSelector } from "react-redux";
import { MoneyBagIcon } from "../../../../../constants/icons";
import { useNavigation } from "@react-navigation/native";
import { StepperIndicator } from "../../../../components";
const Step3 = () => {
  const navigation = useNavigation();
  const [showNotification, setShowNotification] = useState(false);
  const [success, setSuccess] = useState(false);

  const hideNotification = () => {
    setShowNotification(false);
  };
  console.log(showNotification, "shoe");
  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLE.scrollViewGlobal}>
      <View>
       <StepperIndicator  stepCount={3} currentPosition={3}/>

        <Text style={[GLOBAL_STYLE.h3Bold, styles.textSpacing]}>
          Apply for Loan
        </Text>

        <Text style={[GLOBAL_STYLE.h4, styles.textSpacing]}>
          Maximum Loan Amount
        </Text>

        <Text style={[GLOBAL_STYLE.h0Bold, { textAlign: "center" }]}>
          ₦5,000,000.00
        </Text>
        <Text style={[GLOBAL_STYLE.h4, { textAlign: "center" }]}>
          Monthly Interest rate:{" "}
          <Text style={{ color: COLORS.primaryYellow2 }}>2%</Text>
        </Text>

        <Input
          placeholder="Enter Loan Amount"
          placeholderTextColor={COLORS.primaryBlue}
        />

        <DropDownInput
          placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
          labelField="label"
          valueField="value"
          placeholder={"Select payment plan"}
        />

<View style={styles.paymentCard}>
        <View>
          <Text style={[GLOBAL_STYLE.h4]}>Estimated Monthly Repayment</Text>
          <Text style={[GLOBAL_STYLE.h2Bold, { marginTop: 20 }]}>₦5,500</Text>
        </View>

        <MoneyBagIcon />
      </View>
      </View>

   

      <View>
        <CustomButton
          buttonText={"Apply"}
          onPress={() => setShowNotification(true)}
          buttonContainerStyle={{ marginBottom: 20 }}
        />
      </View>
      <BottomNotification
        show={showNotification}
        hide={hideNotification}
        customStyle={{ top: "40%" }}
        headerText="Confirm OTP"
        infoText="Enter the OTP sent to 
        phone number linked to your account"
        input={<Input placeholder="Enter otp" securedText={true} />}
        buttonText="Submit"
        onPress={() => {
          setShowNotification(false);
          setSuccess(true);
        }}
      />
      <BottomNotification
        show={success}
        headerText=" Application in Process"
        infoText="  Once approved, we’ll contact you shortly and deposit your loan into your Keystone Account. Thank you!"
        buttonText="Continue"
        onPress={() => {
          navigation.replace("LoanDashBoard");
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textSpacing: {
    textAlign: "center",
    marginBottom: SIZES.responsiveHeight("3%"),
  },
  paymentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: COLORS.grey2,
    borderRadius: 5,
    padding: 5,
    marginTop: 20,
  },
});

export default Step3;

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { CustomButton, Input, DropDownInput } from "../../../../../components";
import { ModalList, BankListItemCard, StepperIndicator } from "../../../../components";
import { COLORS, FONTS, GLOBAL_STYLE, SIZES } from "../../../../../constants";
import { loanAccountDetailAction } from "../../../../../utilities/redux/keyMobile/actions/loanActions";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import StepIndicator from "react-native-step-indicator";

import { FontAwesome } from "@expo/vector-icons";

const Step1 = ({navigation}) => {
  const dispatch = useDispatch();
  const [acctNo, setAcctNo] = useState("");
  const [bankModal, setBankModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const [selectedAcct, SetSelectedAcct] = useState("");
  let accountdigit = /^\d{10}$/;

  const { accounts } = useSelector((state) => state.auth.user);
  const accountDetails = useSelector((state) => state.loan.success);

  // useEffect(() => {
  //   if (acctNo.match(accountdigit)) {
  //     dispatch(loanAccountDetailAction(acctNo));
  //     console.log("working");
  //   }
  // }, [acctNo]);
  const bankItem = ({ item }) => {
    return <BankListItemCard item={item} onPress={() => selectBank(item)} />;
  };

  const toggleChecked = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (accountDetails) {
      SetSelectedAcct(accountDetails.NUBANACCOUNTNO);
    }
  }, [accountDetails]);

  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: COLORS.primaryBlue,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: COLORS.primaryBlue,
    stepStrokeUnFinishedColor: COLORS.primaryBlue,
    separatorFinishedColor: COLORS.primaryBlue,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: COLORS.primaryBlue,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#aaaaaa",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#aaaaaa",
  };

  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLE.scrollViewGlobal}>
       <StepperIndicator  stepCount={2} currentPosition={1}/>
      
        <View>
        
        <Text style={[GLOBAL_STYLE.h3Bold, { textAlign: "center" }]}>
          Check Eligibility
        </Text>
       
          <Text style={[GLOBAL_STYLE.h4, { textAlign: "center" }]}>
            We'd Love to know your salary details
          </Text>

          <Input
            placeholder="Account number"
            labelCustomStyle={styles.inputLabel}
            placeholderTextColor={COLORS.primaryBlue}
          />

          <ModalList
            placeholder="Select bank"
            // value={values.bank.BankName}
            // error={""}
            icon={
              <Pressable
                onPress={() => {
                  //   setBankModal(true);
                }}
                style={{
                  height: 45,
                  width: 40,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  name="bank"
                  size={16}
                  color={COLORS.primaryBlue2}
                />
              </Pressable>
            }
            // visible={bankModal}
            onRequestClose={() => setBankModal(false)}
            // data={bankList}
            // renderItem={({ item, index }) =>
            //   DisplayBank(item, index)
            // }
            renderItem={bankItem}
            emptyListText={
              <Text style={GLOBAL_STYLE.h4Bold}>An error occured</Text>
            }
            // error={errors.bank && touched.bank && errors.bank}
          />

          <Input
            placeholder="Phone number"
            labelCustomStyle={styles.inputLabel}
            placeholderTextColor={COLORS.primaryBlue}
          />

          <Text
            style={[
              GLOBAL_STYLE.h6,
              { color: COLORS.grey, textAlign: "center" },
            ]}
          >
            * The phone number linked to the account details you have provided*
          </Text>

          <Pressable onPress={toggleChecked} style={styles.checkContainer}>
            <Checkbox
              style={styles.checkbox}
              value={checked}
              onValueChange={toggleChecked}
              color={checked ? COLORS.primaryBlue : undefined}
            />
            <View>
            <Text style={[GLOBAL_STYLE.h6,{marginLeft: 10, width: SIZES.responsiveWidth("85%")}]}>
              I agree that the account information provided above should be used
              to request for my account statement through third parties
              appointed by the bank and my loan repayment may be deducted from
              my account automatically from any BVN accounts linked to me in
              case of any default in loan repayment.  </Text>
              <Text style={[GLOBAL_STYLE.h6]}>  <Text style={{color: COLORS.error}}>*</Text> Please note that a fee
              will be charged for this service <Text style={{color: COLORS.error}}>*</Text></Text>
            </View>
           
 
            
           
          </Pressable>
        </View>
      
   

      <View style={styles.button}>
        <CustomButton
          buttonText={"Continue"}
          buttonContainerStyle={{marginBottom: 20}}
            onPress={() => navigation.navigate("MicroLendingForm2")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  indicator: {
    paddingHorizontal: "10%",
    paddingVertical: 30,
  },
  checkText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
  },
  checkContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  button:{
    flex: 1, alignSelf:'stretch', 
    justifyContent: "flex-end", 
marginTop: 10}
});

export default Step1;

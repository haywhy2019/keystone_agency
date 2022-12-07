// import 'react-native-gesture-handler';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../../../constants";
import React, { useState, useEffect } from "react";
import {Input, DropDownInput, CustomButton, DatePicker} from "../../../components/";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Preview from "./Preview";

const Multiple2 = ({ navigation, route }) => {
  const { transferName, number } = route.params;
  console.log(transferName, number, "param");
  const [currentStep, setCurrentStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);
  const [show, setShow] = useState(true)


  const swipeFromLeftOpen = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      
      return alert(`Swipe from left ${currentStep}`);
    }
    setShow(false)
    return alert("first form");
  };
  const swipeFromRightOpen = () => {
    if (currentStep < number) {
      setCurrentStep(currentStep + 1);
      return alert(`Swipe from right ${currentStep}`);
    }
    setShow(false)
    return alert("last form");
  };

  console.log(currentStep, "all step")

  const formHandler = () => {
    if(currentStep == number) {
      navigation.navigate("preview")
    }else {
      console.log("next form")
    }
  }

  const Forms = () => {
    const data1 = [
      { label: "Keystone", value: "keystone" },
      { label: "Other Banks", value: "other banks" },
    ];
    const data2 = [
      { label: "Account 1", value: "Account 1" },
      { label: "Account 2", value: "Account 2" },
    ];
    return (
      <View style={styles.formContainer}>
        <Text style={styles.step}>
          Step {currentStep}/ {number}
        </Text>
        <DropDownInput
          items={data1}
          placeholder="Select the type of Transfer"
          open={open}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          zIndex={3000}
          zIndexInverse={1000}
        />
        <DropDownInput
          items={data1}
          placeholder="Select Account to debit"
          open={open1}
          setOpen={setOpen1}
          value={value}
          setValue={setValue}
          zIndex={2000}
          zIndexInverse={2000}
        />
        <DatePicker
          placeholder="Select Delivery Date"
          customStyling={styles.customDatePicker}
        />
        <DropDownInput
          items={data1}
          placeholder="Specify Beneficairy Bank"
          searchable={true}
          searchPlaceholder="Search Bank..."
        />
        <Input placeholder="Account Name" inputCustomStyle={styles.input} />
        <Input
          placeholder="Enter Beneficiary Account number"
          inputCustomStyle={styles.input}
        />
        <Input placeholder="Enter Amount" inputCustomStyle={styles.input} />
        <Input
          placeholder="Enter Description"
          inputCustomStyle={styles.input}
        />
        <Text style={styles.next}>Slide to the next page</Text>
        <CustomButton
          buttonText="Continue"
          buttonContainerStyle={styles.button}
          onPress={formHandler}
        />
      </View>
    );
  };

 
  return (
    <ScrollView style={styles.container}>
      <Swipeable
        renderLeftActions={Forms}
        renderRightActions={Forms}
        onSwipeableRightOpen={swipeFromRightOpen}
        onSwipeableLeftOpen={swipeFromLeftOpen}
      >
        <Forms />
      </Swipeable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  step: {
    color: COLORS.primaryBlue,
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 15,
  },
  customDatePicker: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 10,
    marginVertical: 10,
  },
  formContainer: {
    paddingHorizontal: "10%",
    marginTop: 10,
    paddingBottom: "5%",
    width: "100%",
  },
  input: {
    marginBottom: 0,
    marginTop: 0,
  },
  next: {
    textAlign: "center",
    color: COLORS.primaryBlue,
    paddingVertical: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default Multiple2;

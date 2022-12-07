import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import {Input, DropDownInput, CustomButton, DatePicker} from "../../../components/";

const Single = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [value, setValue] = useState(null);

  const data1 = [
    { label: "Keystone", value: "keystone" },
    { label: "Other Banks", value: "other banks" },
  ];
  const data2 = [
    { label: "Account 1", value: "Account 1" },
    { label: "Account 2", value: "Account 2" },
  ];
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
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
        <CustomButton buttonText="Submit" buttonContainerStyle={styles.button} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  customDatePicker: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 10,
    marginVertical: 10,
  },
  container: {
    paddingHorizontal: "10%",
    marginTop: 10
  },
  input: {
    marginBottom: 0,
    marginTop: 0
  },
  button: {
marginTop: 70
  }
});

export default Single;

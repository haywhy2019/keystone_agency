import { View, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { CustomButton, DatePicker} from "../../components/";


const Report = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  return (
    <View>
      <View style={styles.container1}>
        <View style={styles.container2}>
          <DatePicker />
          <Text style={styles.seperator}> - </Text>
          <DatePicker />
        </View>
        <CustomButton buttonText="Search" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row'
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
  },
  seperator: {
    fontSize: 30,
  },
});

export default Report;

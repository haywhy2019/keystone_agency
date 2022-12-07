import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Button, Snackbar } from "react-native-paper";
import { COLORS , SIZES} from "../constants";

const CustomSnackBar = ({ show, message , customStyle, success, top}) => {
  
  const [visible, setVisible] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  snackMessage
  const onDismissSnackBar = () => {
    setVisible(false)
    setSnackMessage("")
  }
 

  useEffect(() => {
  setVisible(show)
  setSnackMessage(message)
  }, [show, message]);
  return (
   
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        // action={{
        //   label: 'Undo',
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
        duration={3000}
        wrapperStyle={customStyle ? customStyle : top ? styles.top : styles.bottom}
        style={{ backgroundColor: success ? COLORS.primaryBlue: COLORS.error}}
      >
        {snackMessage}
      </Snackbar>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  hide: {
    display: "none",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
   
  },
  top: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 10,
   
  }
});

export default CustomSnackBar;

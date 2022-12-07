import { Text, TouchableOpacity, StyleSheet, View, Keyboard,Pressable  } from "react-native";
import React from "react";
import { COLORS , FONTS} from "../constants";

export default function CustomButton({
  buttonText,
  buttonTextStyle,
  buttonContainerStyle,
  onPress,
  icon,
  disable
}) {
  return (
    <Pressable
    onTouchStart={disable ? null : onPress}
      // onPress={onPress}
      style={disable ? styles.disabledButton : { ...styles.defaultButton, ...buttonContainerStyle }}
    >
      <Text style={{ ...styles.label, ...buttonTextStyle }}>{buttonText}</Text>
      <View style={icon ? styles.icon : styles.hideIcon}>{icon}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: COLORS.primaryBlue,
    height: 50,
    borderRadius: 5,
    justifyContent: "space-around",
  },
  disabledButton: {
    backgroundColor: COLORS.grey2,
    height: 50,
    borderRadius: 5,
    justifyContent: "space-around",
  },
  label: {
    textAlign: "center",
    color: COLORS.white,
   fontFamily: FONTS.bold,
   textTransform: "uppercase"
  },
  icon: {},
  hideIcon: {
    display: "none",
  },
});

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { GLOBAL_STYLE } from "../../constants";
import { ImageIcon, ImageIconTwo } from "../../constants/icons";
const AccountOfficerBar = ({ onPress, leftIcon, rightIcon, label, header }) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    >
      <View style={[GLOBAL_STYLE.rowBetween, styles.container]}>
        <View style={styles.iconBg}>{leftIcon}</View>

        <View style={[GLOBAL_STYLE.rowBetween, { flexDirection: "column" }]}>
          <Text style={[GLOBAL_STYLE.h5]}>{header}</Text>
          <Text style={[GLOBAL_STYLE.h5, { color: COLORS.grey }]}>{label}</Text>
        </View>
      </View>

  
    </TouchableOpacity>
  );
};

export default AccountOfficerBar;

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.grey2,
    paddingVertical: 20,
    borderTopWidth: 0.6,
    // borderBottomWidth: 0.6,
    alignItems: "center",
    paddingHorizontal: "5%",
    justifyContent: "flex-start",
  },
  iconBg: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.grey2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GLOBAL_STYLE, COLORS } from "../../constants";

const TwoFactorAuthText = ({ label, text, amount }) => (
  <View style={GLOBAL_STYLE.rowBetween}>
    <View style={[GLOBAL_STYLE.rowBetween, { alignItems: "center" }]}>
      <View
        style={{
          height: 5,
          width: 5,
          backgroundColor: COLORS.grey,
          borderRadius: 10,
          marginRight: 5,
        }}
      ></View>
      <Text style={[GLOBAL_STYLE.h6, { color: COLORS.grey }]}>{label}</Text>
    </View>
    {amount ? (
      <Text style={[GLOBAL_STYLE.h6, { color: COLORS.grey }]}>
        ({text}
        <Text style={GLOBAL_STYLE.h6}>{amount}</Text>)
      </Text>
    ) : (
      <Text style={[GLOBAL_STYLE.h6, { color: COLORS.grey }]}>{text}</Text>
    )}
  </View>
);

export default TwoFactorAuthText;

const styles = StyleSheet.create({});

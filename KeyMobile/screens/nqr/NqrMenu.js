import { View, Text } from "react-native";
import React from "react";
import { MenuOptionsCard } from "../../components";
import { GLOBAL_STYLE, isAndroid } from "../../../constants";
import { StatusBar } from "expo-status-bar";

const NqrMenu = ({ navigation }) => {
  return (
    <View style={GLOBAL_STYLE.background}>
        <StatusBar style={isAndroid ? "light" : "dark"} />

      <View style={{ marginTop: 15 }}>
        <MenuOptionsCard
          label="Scan NQR"
          screen="NqrScan"
          navigation={navigation}
        />
      </View>
      <MenuOptionsCard
        label="Generate NQR"
        screen="NqrCreatePayments"
        navigation={navigation}
      />
    </View>
  );
};

export default NqrMenu;

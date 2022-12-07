import { View, Text } from "react-native";
import React from "react";
import MenuOptionsCard from "../../components/MenuOptionsCard";


const Payments = ({ navigation }) => {
  return (
    <View>
      <MenuOptionsCard label="Single" navigation={navigation} screen="single" />
      <MenuOptionsCard
        label="Multiple"
        navigation={navigation}
        screen="multiple"
      />
      <MenuOptionsCard label="Upload" navigation={navigation} screen="upload" />
    </View>
  );
};

export default Payments;

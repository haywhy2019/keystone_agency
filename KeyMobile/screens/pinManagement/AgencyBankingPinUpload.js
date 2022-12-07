import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { useSelector } from "react-redux";

//components
import {
  DropDownInput,
  Input,
  CustomButton,
  OptionBox,
  AccountCard,
  CustomFilePicker,
} from "../../../components";

const AgencyBankingPinUpload = () => {
  const customerDetails = useSelector((state) => state.auth.user);
  return (
    <ScrollView style={styles.scrollContainer}>
      <AccountCard data={customerDetails.accounts} />
      <View style={{ flexGrow: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
        <DropDownInput  placeholder={"Select State"} />

        <DropDownInput  placeholder="Select Branch" />

        <View style={{ paddingVertical: 15 }}>
          <CustomFilePicker label={"Upload ID (Front & Back)"} />
          <CustomFilePicker label={"Upload ID (Front & Back)"} />
        </View>
        <CustomButton
          buttonText="submit"
          buttonContainerStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    paddingBottom: 40,
  },
});
export default AgencyBankingPinUpload;

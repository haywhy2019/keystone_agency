import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { MenuImageLeftIconRight, TwoFactorAuth } from "../../components";
import { GLOBAL_STYLE, COLORS, images } from "../../../constants";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  SendMoneyMutipleIcon,
  SendMoneyForiegnIcon,
  SendMoneyPhoneIcon
} from "../../../constants/icons";
import { useNavigation } from "@react-navigation/native";


const SendMoneyMenu = () => {
    const navigation = useNavigation()
  return (
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start" },
      ]}
    >
      <MenuImageLeftIconRight
        label="Transfer to Own Account"
        leftIcon={
          <View style={styles.iconBg}>
            <AntDesign name="user" size={24} color={COLORS.primaryBlue} />
          </View>
        }
        onPress={() => navigation.navigate("SendOwnAccount",{type: "Own Account"})}
      />
      <MenuImageLeftIconRight
        label="Transfer to Keystone Bank"
        leftIcon={
          <View style={styles.iconBg}>
            <Image
              source={images.keyMobileLogoRound}
              style={{ width: 24, height: 24 }}
            />
          </View>
        }
        onPress={() => navigation.navigate("SendKeystone",{type: "Keystone Bank"})}

      />
      <MenuImageLeftIconRight
        label="Transfer to Other Banks"
        leftIcon={
          <View style={styles.iconBg}>
            <FontAwesome name="bank" size={18} color={COLORS.primaryBlue} />
          </View>
        }
        onPress={() => navigation.navigate("SendOtherBank",{type: "Other Banks"})}

      />
      <MenuImageLeftIconRight
        label="Transfer to Phone Number"
        leftIcon={
          <View style={styles.iconBg}>
            <SendMoneyPhoneIcon />
          </View>
        }
        onPress={() => navigation.navigate("SendPhoneScreen",{type: "Phone number"})}

      />

      <MenuImageLeftIconRight
        label="Transfer to Multiple Accounts"
        leftIcon={
          <View style={styles.iconBg}>
            <SendMoneyMutipleIcon />
          </View>
        }
        onPress={() => navigation.navigate("SendMoneyMultiple",{type: "Multiple Accounts"})}

      />
      <MenuImageLeftIconRight
        label="Foreign Transfer"
        leftIcon={
          <View style={styles.iconBg}>
            <SendMoneyForiegnIcon />
          </View>
        }
        onPress={() => navigation.navigate("SendFxScreen",{type: "Foreign Transfer"})}

      />
    </ScrollView>
  );
};

export default SendMoneyMenu;

const styles = StyleSheet.create({
  iconBg: {
    height: 40,
    width: 40,
    backgroundColor: "#F9FAFC",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

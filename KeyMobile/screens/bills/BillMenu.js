import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import MenuThreeRows from "../../components/MenuThreeRows";
import {
  CableBillsIcon,
  TelIcon,
  InternetBillsIcon,
  GamingBillsIcon,
  DealerBillsIcon,
  ReligionBillsIcon,
  TransportBillsIcon,
  TravelBillsIcon,
  SchoolBillsIcon,
  BillBillsIcon,
  DangoteBillsIcon,
} from "../../../constants/icons";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../constants";

const BillMenu = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start" },
      ]}
    >
      <MenuThreeRows
        firstIcon={<TelIcon />}
        firstText={{ line1: "Airtime", line2: "& Data" }}
        secondIcon={<CableBillsIcon />}
        secondText={{ line1: "Cable" }}
        thirdIcon={
          <AntDesign name="shoppingcart" size={24} color={COLORS.primaryBlue} />
        }
        thirdText={{ line1: "Utility" }}
        onPress1={() => navigation.navigate("MobileTopUpScreen")}
        onPress2={() =>
          navigation.navigate("BillPayment", { id: 2, inputAmount: true })
        }
        onPress3={() =>
          navigation.navigate("BillPayment", { id: 1, inputAmount: true , fieldLabel3: "Meter no"})
        }
      />
      <MenuThreeRows
        firstIcon={<InternetBillsIcon />}
        firstText={{ line1: "Internet", line2: "Services" }}
        secondIcon={<GamingBillsIcon />}
        secondText={{ line1: "Betting", line2: "& Gaming" }}
        thirdIcon={<TransportBillsIcon />}
        thirdText={{ line1: "Transport", line2: "& Toll" }}
        onPress1={() => navigation.navigate("BillPayment", { id: 9 ,fieldLabel3: "Account/User ID"})}
        onPress2={() => navigation.navigate("BillPayment", { id: 41 })}
        onPress3={() => navigation.navigate("BillPayment", { id: 16 ,fieldLabel3: "Customer ID"})}
      />
      <MenuThreeRows
        firstIcon={<DealerBillsIcon />}
        firstText={{ line1: "Dealer", line2: "Payment" }}
        secondIcon={<ReligionBillsIcon />}
        secondText={{ line1: "Religion" }}
        thirdIcon={<TravelBillsIcon />}
        thirdText={{ line1: "Travel", line2: "& Hotel" }}
        onPress1={() => navigation.navigate("ComingSoon")}
        onPress2={() => navigation.navigate("BillPayment", { id: 27 ,fieldLabel1: "Select Religion", fieldLabel2: "Category",fieldLabel3: "No"})}
        onPress3={() => navigation.navigate("BillPayment", { id: 15 ,fieldLabel1: "Select airline", fieldLabel2: "Category",fieldLabel3: "Booking Reference No"})}
      />
      <MenuThreeRows
        firstIcon={<SchoolBillsIcon />}
        firstText={{ line1: "School &", line2: "Association" }}
        secondIcon={<BillBillsIcon />}
        secondText={{ line1: "Bills Payment", line2: "Beneficiary" }}
        thirdIcon={<DangoteBillsIcon />}
        thirdText={{ line: "Dangote", line2: "Payment" }}
        onPress1={() => navigation.navigate("BillPayment",{id})}
        onPress2={() => navigation.navigate("BillBeneficary")}
        onPress3={() => navigation.navigate("ComingSoon")}
      />
    </ScrollView>
  );
};

export default BillMenu;

const styles = StyleSheet.create({
  iconBg: {
    width: 80,
    height: 80,
    elevation: 5,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  menuText: {
    color: COLORS.primaryBlue,
    paddingHorizontal: 5,
    fontSize: 10,
    fontFamily: FONTS.normal,
    textAlign: "center",
    marginTop: 10,
  },
});

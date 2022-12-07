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
  EnquiresIcon,
  DisputeManagementIcon,
  MobileLimitIcon,
  ReceiptsIcon,
  SplashScreenContactUsIcon,
  ReactivateAccountIcon,
  FAQIcon,
  BeneficiaryIcon,
  AccountOfficeIcon,
  PinIcon,
	CardIcon,
  ChequeIcon,
  StandingInstructIcon,
  ContactSelfServiceIcon

} from "../../../constants/icons";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../constants";

const SelfServiceMenu = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start" },
      ]}
    >
      <MenuThreeRows
     

       firstIcon={<MobileLimitIcon />}
       secondIcon={<AccountOfficeIcon />}
       thirdIcon={<CardIcon />}
       firstText={{ line1: "Mobile Banking", line2: "Limit"  }}
       secondText={{line1:'Accounts', line2:'Management'}}
       thirdText={{ line1: "Card" ,line2: "services"}}
       onPress1={() => navigation.navigate("MobileBankingLimit")}
       onPress2={() => navigation.navigate("Accounts")}
       onPress3={() => navigation.navigate("CardServices")}
      />
       <MenuThreeRows
        firstIcon={< PinIcon />}
        secondIcon={<ReceiptsIcon />}
        thirdIcon={<ChequeIcon />}
        firstText={{ line1: "Mobile", line2: "Banking PIN" }}
        secondText={{ line1: "Statement" ,line2: "& Reciepts" }}
        thirdText={{ line1: "Cheque", line2: "Services" }}
        onPress1={() => navigation.navigate("PinMenu")}
        onPress2={() => navigation.navigate("StatementsMainpage")}
        onPress3={() => navigation.navigate("ChequeServicesMenu")}
        //  onPress2={() => navigation.navigate("CardService")}
      />

      <MenuThreeRows
    firstIcon={< StandingInstructIcon />}
    secondIcon={<BeneficiaryIcon />}
     thirdIcon={<EnquiresIcon />}
    firstText={{ line1: "Standing" , line2: "Instructions"}}
    secondText={{  line1: "Manage", line2: "Beneficiary" }}
    thirdText={{ line1: "Enquiries &", line2: "Complaints" }}
    onPress1={() => navigation.navigate("StandingInstructionTabMenu")}
    onPress2={() => navigation.navigate("BeneficiaryMainPage")}
    onPress3={() => navigation.navigate("EnquiresMenu")}
      />

    </ScrollView>
  );
};

export default SelfServiceMenu;

const styles = StyleSheet.create({
  iconBg: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 5,
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

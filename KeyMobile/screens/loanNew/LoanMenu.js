import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { CustomHeader } from "../../components";
import { isAndroid, COLORS, FONTS, GLOBAL_STYLE } from "../../../constants";
import {
  LoanLendindIcon,
  SalaryAdvanceIcon,
  FinancingIcon,
} from "../../../constants/icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

const iconName = [
  // { icon: <LoanLendindIcon />, label: "Micro Lending", screen: "MicroLending" },
  // { icon: <SalaryAdvanceIcon />, label: "Salary Advance" , screen: "SalaryAdvance"},
  // { icon: <FinancingIcon />, label: "Assest Financing", screen: "AssetFinancing"},
///////new design
  { icon: <LoanLendindIcon />, label: "Micro Lending", screen: "MicroLendingForm1" },
  { icon: <SalaryAdvanceIcon />, label: "Salary Advance", screen: "SalaryForm1" },
  { icon: <FinancingIcon />, label: "Assest Financing", screen: "AssetForm1" },



];
const Loan = () => {
const navigation = useNavigation()
  const MenuIconCard = ({item}) => (
    <Pressable
      style={styles.menuIconCard}

      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={[GLOBAL_STYLE.rowBetween,{justifyContent: "flex-start", alignItems: "center"}]}>
      <View>
      {item.icon}
        </View> 
        <Text style={[GLOBAL_STYLE.h3,{marginLeft: 20}]}>{item.label}</Text>
        </View>

   
      <Ionicons name="chevron-forward-outline" size={18} color={COLORS.primaryBlue} />
    </Pressable>
  );


  return (
   
        <FlatList
        contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobalNopadding,{justifyContent: "flex-start"}]}
          data={iconName}
          renderItem={MenuIconCard}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={false}
        />
    
  );
};

const styles = StyleSheet.create({

  menuIconCard: { 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey
  },

  // menuText: {
  //   color: COLORS.primaryBlue,
  //   paddingHorizontal: 5,
  //   fontSize: 10,
  //   fontFamily: FONTS.normal,
  //   textAlign: "center",
  //   marginTop: 10,
  // },

});
export default Loan;

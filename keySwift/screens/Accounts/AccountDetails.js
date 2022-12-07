import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants";

const AccountDetails = () => {
  return (
    <View>
     
      <AccountDetailsCard
        number="6089878900"
        name="TEB WELFARE ACCOUNT"
        accountType="SAVINGS"
        amount="₦ 250,000.00"
      />
         <AccountDetailsCard
        number="6189878900"
        name="ELIZABETH OLISEH"
        accountType="CURRENT"
        amount="₦ 150,000.00"
      />
    </View>
  );
};

export default AccountDetails;

const AccountDetailsCard = ({ number, name, accountType, amount }) => {
  return (
    <View style={styles.container1}>
      <View style={styles.card}>
        <View style={styles.container2}>
          <Text style={styles.container2Text}>{number}</Text>
          <Ionicons
            name="ios-eye-off-sharp"
            size={20}
            color={COLORS.primaryBlue}
          />
        </View>
        <View style={styles.container3}>
        <Text style={styles.container3Text}>{name}</Text>
        </View>
        
        <View style={styles.container4}>
          <Text style={styles.container4Text}>{accountType}</Text>
          <Text style={styles.container4Text}>{amount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    alignItems: "center",
    marginTop: 25
  },
  card: {
    elevation: 10,
    width: "90%",
    backgroundColor: COLORS.white,
    height: 150,
    shadowColor: COLORS.grey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // elevation: 5,
    // overflow: 'hidden'
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  container2Text: {
    color: COLORS.primaryBlue,
    fontSize: 13,
  },
  container3: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondaryBlue2
  },
  container3Text: {
    color: COLORS.primaryBlue,
  
  },
  container4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  container4Text: {
color: COLORS.primaryBlue,
fontWeight: 'bold',
fontSize: 16
  }
});

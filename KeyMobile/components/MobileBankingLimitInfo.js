import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { GLOBAL_STYLE, SIZES, COLORS, FONTS, isAndroid } from "../../constants";
import { spentAmountPercent } from "../../utilities/helperFunctions/getPercentage";
import { thousandOperator } from "../../utilities/helperFunctions/thousandOperator";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const MobileBankingLimitInfo = ({ navigation, data }) => {
  const {
    accounts,
    DailyUtilizedLimit,
    dailytranslimit,
    bvn,
    transactionlimit,
  } = useSelector((state) => state.auth.user);

  const {dailyLimit, utilisedLimit,transLimit}=data
  const spentAmount = spentAmountPercent(dailyLimit, utilisedLimit);
  const amountLeft= dailyLimit-utilisedLimit

  return (
    <View>
      <View style={{ marginTop: 10, marginBottom: 10 }}>
        <View style={[GLOBAL_STYLE.rowBetween, { marginBottom: 7 }]}>
          <View style={GLOBAL_STYLE.rowBetween}>
            <Text style={isAndroid ? GLOBAL_STYLE.h5 : GLOBAL_STYLE.h5}>Daily Limit: </Text>
            <Text style={isAndroid ? GLOBAL_STYLE.h5Bold : GLOBAL_STYLE.h5Bold}>
              ₦{thousandOperator(dailyLimit)}
            </Text>
          </View>
          {
           
              <Text
                style={styles.limitText}
              >
              {amountLeft} Left
              </Text>
           
          }

        </View>

        <View style={styles.showLimitContainer}>

          <View
            style={ [
              styles.showAmountSpentContainer2,
              { width: spentAmount},
            ] }
          />
        </View>

        <View style={GLOBAL_STYLE.rowBetween}>
          <Text style={isAndroid ?  GLOBAL_STYLE.h4Bold : GLOBAL_STYLE.h5Bold} >Transaction Limit:  ₦{thousandOperator(transLimit)}</Text>
        </View>
      </View>
    </View>
  );
};

export default MobileBankingLimitInfo;

const styles = StyleSheet.create({
  showLimitContainer: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.grey,
    overflow:'hidden'
  },
  showAmountSpentContainer: {
    height: 5,
    borderRadius: 5,
    backgroundColor:  COLORS.primaryBlue,
    marginTop: -5,
  },
  showAmountSpentContainer2: {
    height: '100%',
    borderRadius: 5,
    backgroundColor:  COLORS.primaryYellow2,
    // marginTop: -5,
  },
  limitText :{
  ...GLOBAL_STYLE.h5Bold,
  color: COLORS.grey,
  textAlign: "center" 
    },
limitBg: {
  width: isAndroid ? SIZES.responsiveWidth("23%") : SIZES.responsiveWidth("17%"),
  backgroundColor: COLORS.primaryBlue2,
  borderRadius: 5,
  paddingHorizontal:5
}
    
      
   
});

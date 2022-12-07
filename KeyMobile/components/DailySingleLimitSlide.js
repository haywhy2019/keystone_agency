import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { GLOBAL_STYLE, SIZES, COLORS, FONTS, isAndroid } from "../../constants";
import { spentAmountPercent } from "../../utilities/helperFunctions/getPercentage";
import { thousandOperator } from "../../utilities/helperFunctions/thousandOperator";
import { formattedAmount } from "../../utilities/helperFunctions/formatAmount";
import { TouchableOpacity } from "react-native-gesture-handler";

//redux
import { useSelector,useDispatch } from "react-redux";
import { fetchDailyLimits } from "../../utilities/redux/keyMobile/slice/dailyLimitSlice";

const DailySingleLimitSlide = ({ navigation, spentColor }) => {
  const {
    accounts,
    DailyUtilizedLimit,
    dailytranslimit,
    bvn,
    transactionlimit,
  } = useSelector((state) => state.auth.user);
  const {loading,fetchedData,error}= useSelector((state)=>state.dailyLimit)
  const dispatch=useDispatch();
  
 
  const spentAmount = spentAmountPercent(JSON.stringify(fetchedData) !== '{}' ? fetchedData?.DailyTransactionLimit : 100, JSON.stringify(fetchedData) !== '{}' ? fetchedData?.DailyUtilizedLimit : 0);
  
  useEffect(()=>{
    dispatch(fetchDailyLimits())
    
  },[])

  

  return (
    <View>
      <View style={{ marginTop: 10, marginBottom: 30 }}>
        <View style={[GLOBAL_STYLE.rowBetween, { marginBottom: 7 }]}>
          <View style={GLOBAL_STYLE.rowBetween}>
            <Text style={isAndroid ? GLOBAL_STYLE.h5 : GLOBAL_STYLE.h5}>Daily Limit: </Text>
            <Text style={isAndroid ? GLOBAL_STYLE.h5Bold : GLOBAL_STYLE.h5Bold}>
              ₦{loading ? "...Loading":thousandOperator(fetchedData?.DailyTransactionLimit?.toString())}{error && 'Not Available'}
            </Text>
          </View>
          {navigation ? (
            <Pressable
              onPress={() => navigation.navigate("EditBankingLimit")}
              style={styles.limitBg}
            >
              <Text
                style={styles.limitText}
              >
               Change Limit
              </Text>
            </Pressable>
          ) : (
            <View
              style={styles.limitBg}
            >
              <Text
                style={styles.limitText}
              >
                Change Limit
              </Text>
            </View>
          )}

        </View>

        <View style={styles.showLimitContainer}>
          <View
            style={ spentColor ? [
              styles.showAmountSpentContainer2,
              { width: spentAmount  ? SIZES.responsiveWidth(spentAmount) :  SIZES.responsiveWidth("0%")},
            ] : [
              styles.showAmountSpentContainer,
              { width: spentAmount  ? SIZES.responsiveWidth(spentAmount) :  SIZES.responsiveWidth("0%") },
            ]}
          />
        </View>

        <View style={GLOBAL_STYLE.rowBetween}>
          <Text style={isAndroid ?  GLOBAL_STYLE.h4Bold : GLOBAL_STYLE.h5Bold} > ₦{loading ? "...Loading": thousandOperator(fetchedData?.DailyUtilizedLimit?.toString())}{error && 'Not Available'}</Text>
          <Text style={isAndroid ? [GLOBAL_STYLE.h4Bold, { color: COLORS.grey }] : [GLOBAL_STYLE.h5Bold, { color: COLORS.grey }]}>
            ₦{loading ? "...Loading": thousandOperator(fetchedData?.DailyTransactionLimit - fetchedData?.DailyUtilizedLimit)}{error && 'Not Available'} Left
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DailySingleLimitSlide;

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
    height: "100%",
    borderRadius: 5,
    backgroundColor:  COLORS.primaryYellow2,
    // marginTop: -5,
  },
  limitText :
    isAndroid ? {
...GLOBAL_STYLE.h5Bold,
color: "white", textAlign: "center" 
    } : {
      ...GLOBAL_STYLE.h6Bold,
      color: "white", textAlign: "center"
    },
limitBg: {
  width: SIZES.responsiveWidth("23%"),
  backgroundColor: COLORS.primaryBlue2,
  borderRadius: 5,
  paddingHorizontal:5
}
    
      
   
});

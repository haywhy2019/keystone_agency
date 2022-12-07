import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  COLORS,
  FONTS,
  isAndroid,
  SIZES,
  GLOBAL_STYLE,
} from "../../../constants";
import { StatusBar } from "expo-status-bar";
import React, {useState,useEffect} from "react";
import { AccountCard,SpinnerImage } from "../../../components";
import { useSelector } from "react-redux";
import { PenIcon } from "../../.././constants/icons";
import {
  DailySingleLimitSlide,
  MobileBankingLimitInfo,
} from "../../components";
import { dailyLimitAction } from "../../../utilities/redux/keyMobile/axiosService/mobileBankingLimit";
import { spentAmountPercent } from "../../../utilities/helperFunctions/getPercentage";

const keyStoneLimit = {
  daily: "50000",
  spent: "5000",
  left: "45000",
  max: "200000",
};

const MobileBankingLimit = ({ navigation }) => {
  const customerDetails = useSelector((state) => state.auth.user);
  const [loading,setLoading]=useState(false)
  const [cumulativeDaily,setCumulativeDaily]=useState("")
  const [cumulativeSingle,setCumulativeSingle]=useState("")
  const [cumulativeUtilised,setCumulativeUtilised]=useState("")
  const [keyToKeyDaily,setKeyToKeyDaily]=useState("")
  const [keyToKeyDailyUtilised,setKeyToKeyDailyUtilised]=useState("")
  const [otherBankDaily,setOtherBankDaily]=useState("")
  const [otherBankDailyUtilised,setOtherBankDailyUtilised]=useState("")
  const [airtimeDataDaily,setAirtimeDataDaily]=useState("")
  const [airtimeDataDailyUtilised,setAirtimeDataDailyUtilised]=useState("")

  const fetchDailyLimit=()=>{
    setLoading(true)

    dailyLimitAction()
      .then((res) => {
        // console.log(res,'resss')
        if(res.status==200 ){
          console.log('mimi')
          console.log(res,'response')
        }
        

        setCumulativeDaily(res.DailyTransactionLimit.toString())//sets the transaction for the entire day
        setCumulativeSingle(res.Transactionlimit.toString())//sets the transaction for a single transation
        setCumulativeUtilised(res.DailyUtilizedLimit.toString())// sets the total amount the user has spent for the day
        setKeyToKeyDaily(res.Internallimit.toString())
        setKeyToKeyDailyUtilised(res.InternalUtilizedLimit.toString())
        setOtherBankDaily(res.Otherbanklimit.toString())
        setOtherBankDailyUtilised(res.OtherBankUtilizedLimit.toString())
        setAirtimeDataDaily(res.Topuptranslimit.toString())
        setAirtimeDataDailyUtilised(res.TopUpUtilizedLimit.toString())
      })
      .catch((err) => {
        console.log(err.response.data, "error")
        Keyboard.dismiss()
        setErrorMessage(
            err.response.data.Message || "An error occured"
        );
      })
      .finally(()=>setLoading(false))
  }

  useEffect(()=>{
    fetchDailyLimit()
  },[])

  if(loading){
    return <SpinnerImage/>
  }

  return (
    <View style={styles.container}>
      <StatusBar style={isAndroid ? "light" : "auto"} />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginVertical: 10 }}>
          <AccountCard />
        </View>

        <View style={[GLOBAL_STYLE.rowBetween, { paddingHorizontal: "5%" }]}>
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.grey }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.grey }]
              }
            >
              Transfers
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate("EditBankingLimit")}
          >
            <View style={{ marginRight: 5 }}>
              <PenIcon />
            </View>
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue }]
                  : [GLOBAL_STYLE.h4Bold, { color: COLORS.primaryBlue }]
              }
            >
              Edit 
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{backgroundColor: COLORS.grey2,paddingVertical: 10,marginBottom: 10}}>
          <View
            style={{
              paddingHorizontal: "5%",
            }}
          >
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue }]
              }
            >
              Keystone to Keystone
            </Text>
              <MobileBankingLimitInfo data={{dailyLimit:keyToKeyDaily,utilisedLimit:keyToKeyDailyUtilised,transLimit:cumulativeSingle}}/>
          </View>

          <View
            style={{
          
              paddingHorizontal: "5%",
          
            }}
          >
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue }]
              }
            >
              Other Banks
            </Text>

            <MobileBankingLimitInfo data={{dailyLimit:otherBankDaily,utilisedLimit:otherBankDailyUtilised,transLimit:cumulativeSingle}}/>
          </View>

          <View
            style={{
              
              paddingHorizontal: "5%",
          
            }}
          >
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue }]
              }
            >
              Foreign Currency
            </Text>

              <MobileBankingLimitInfo data={{dailyLimit:cumulativeDaily,utilisedLimit:cumulativeUtilised,transLimit:cumulativeSingle}}/>
          </View>
        </View>
     
        <View style={{backgroundColor: COLORS.grey2,paddingVertical: 10,marginBottom: 10}}> 
          <View style={[GLOBAL_STYLE, { paddingVertical: 10 , paddingHorizontal: "5%"}]}>
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.grey }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.grey }]
              }
            >
              Payments
            </Text>
          </View>

          <View
            style={{
            
              paddingHorizontal: "5%",
          
            }}
          >
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue }]
              }
            >
              Bill Payment
            </Text>

              <MobileBankingLimitInfo data={{dailyLimit:cumulativeDaily,utilisedLimit:cumulativeUtilised,transLimit:cumulativeSingle}}/>
          </View>

          <View
            style={{
            
              paddingHorizontal: "5%",
            
            }}
          >
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue }]
              }
            >
              Airtime and Data
            </Text>

              <MobileBankingLimitInfo data={{dailyLimit:airtimeDataDaily,utilisedLimit:airtimeDataDailyUtilised,transLimit:cumulativeSingle}}/>
          </View>
        </View>

        {/* <View style={{backgroundColor: COLORS.lightBlue ,paddingVertical: 10,marginBottom: 10}}>
          <View style={[GLOBAL_STYLE, { paddingVertical: 10 , paddingHorizontal: "5%"}]}>
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.grey }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.grey }]
              }
            >
              Cards
            </Text>
          </View>

          <View
            style={{
            paddingHorizontal: "5%"
            }}
          >
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue }]
              }
            >
              POS
            </Text>

              <MobileBankingLimitInfo data={keyStoneLimit}/>
          </View>

          <View
            style={{
            paddingHorizontal: "5%"
            }}
          >
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue }]
              }
            >
              ATM
            </Text>

            <MobileBankingLimitInfo data={keyStoneLimit}/>
          </View>

          <View
            style={{
            paddingHorizontal: "5%"
            }}
          >
            <Text
              style={
                isAndroid
                  ? [GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue }]
                  : [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue }]
              }
            >
              Web
            </Text>

            <MobileBankingLimitInfo data={keyStoneLimit}/>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  indicator: {
    backgroundColor: COLORS.grey,
    height: 7,
    width: 7,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  indicator2: {
    backgroundColor: COLORS.primaryBlue,
    height: 7,
    width: 7,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  MenuIconCard: {
    height: SIZES.width / 4,
    width: SIZES.width / 4,
    marginHorizontal: isAndroid ? 3 : 5,
    marginVertical: 6,
    elevation: 5,
    // borderWidth: isAndroid ? 0 : 5,
    backgroundColor: "white",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  menuIconText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: "5%",
  },
  heading: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    paddingLeft: "6%",
    paddingVertical: 10,
  },
  noticeCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 5,
    marginVertical: SIZES.responsiveHeight("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: isAndroid ? 5 : 0,
    borderLeftWidth: 6,
    borderLeftColor: COLORS.primaryBlue,
  },
  noticeCardHeading: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
  },
  noticeCardHeadingText: {
    color: COLORS.primaryBlue,
    marginLeft: "10%",
    fontFamily: FONTS.normal,
  },
  noticeCardHeadingIcon: {
    marginLeft: "auto",
  },

  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
    height: 40,
    marginTop: 10,
    marginHorizontal: 20,
  },

  editIcon: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default MobileBankingLimit;

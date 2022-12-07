import { Image,TouchableOpacity,Text} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { isAndroid,images,FONTS,COLORS,SIZES } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


//Screens
import {
  AgencyBankingMenu,
  AgencyCommission,
  AgencyWithdrawal,
  AgencyTransfer,
  AgencyDeposit,
  BuyAirtime,
  AgencyPayBillsMenu,
  InternetServices,
  CableBills,
  UtilityBills,
  BettingBills,
  ENaira,
  StatementsMainpage,
AccountOpening} from "./index"
import { NqrScan,
  NqrMenu,
  NqrTab,
  NqrMerchant,
  NqrCreatePayments,
  NqrPayment } from "./nqr";

const Stack= createNativeStackNavigator();

const AgencyStack=()=>{
    return(
        <Stack.Navigator
            initialRouteName="AgencyHome"
            screenOptions={(navigation,route)=>(
                {
                    headerShown:false,
                    animation: "slide_from_right",
                    headerTitleStyle: {
                      color: isAndroid ? "white" : COLORS.primaryBlue,
                      fontFamily: FONTS.bold,
                      marginTop: 7,
                      fontSize: SIZES.responsiveHeight("2%"),
                    },
                    headerTitleAlign: "center",
                    // headerBackground: () => {
                    //     if (isAndroid) {
                    //       return (
                    //         <Image
                    //           source={images.headerImg}
                    //           style={{ width: "100%", height: "100%" }}
                    //         />
                    //       );
                    //     }
                    //   }, 
                      headerLeft: () => {
                        const navigation=useNavigation()
                        return(
                          <TouchableOpacity
                            style={{ flexDirection: "row", alignItems: "center" }}
                            onPress={() => navigation.goBack()}
                          >
                            <Ionicons
                              name="chevron-back"
                              size={20}
                              color={isAndroid ? COLORS.white : COLORS.primaryBlue}
                            />
                            <Text
                              style={{ color: isAndroid ? COLORS.white : COLORS.primaryBlue }}
                            >
                              Back
                            </Text>
                          </TouchableOpacity>
                      ) 
                    } 
                    
                }
            )}
        >
        <Stack.Screen
            name="AgencyHome"
            component={AgencyBankingMenu}
            options={{ 
                title: "Agency Banking",
                headerLeft: () => {
                    const navigation=useNavigation()
                    return(
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Ionicons
                        name="chevron-back"
                        size={20}
                        color={isAndroid ? COLORS.white : COLORS.primaryBlue}
                        />
                        <Text
                        style={{ color: isAndroid ? COLORS.white : COLORS.primaryBlue }}
                        >
                        Back
                        </Text>
                    </TouchableOpacity>
                ) 
                }  }}
        />
        <Stack.Screen
            name="AgencyWithdrawal"
            component={AgencyWithdrawal}
            options={{title:"Withdrawal"}}
        />
        <Stack.Screen
            name="AgencyTransfer"
            component={AgencyTransfer}
            options={{title:"Transfers"}}
        />
        <Stack.Screen
            name="AgencyDeposit"
            component={AgencyDeposit}
            options={{title:"Deposit"}}
        />
        <Stack.Screen
            name="BuyAirtime"
            component={BuyAirtime}
            options={{title:"Airtime & Data"}}
        />
        <Stack.Screen
            name="AgencyPayBillsMenu"
            component={AgencyPayBillsMenu}
            options={{title:"Pay Bills"}}
        />
        <Stack.Screen
            name="InternetServices"
            component={InternetServices}
            options={{title:"Internet Services"}}
        />
        <Stack.Screen
            name="CableBills"
            component={CableBills}
            options={{title:"Cable"}}
        />
        <Stack.Screen
            name="UtilityBills"
            component={UtilityBills}
            options={{title:"Utility Bills"}}
        />
        <Stack.Screen
            name="BettingBills"
            component={BettingBills}
            options={{title:"BettingBills"}}
        />
        <Stack.Screen
            name="NqrMenu"
            component={NqrTab}
            options={{title:"NQR Payments"}}
        />
        <Stack.Screen
            name="NqrMerchant"
            component={NqrMerchant}
            options={{title:"NQR Payments"}}
        />
        <Stack.Screen
            name="NqrCreatePayments"
            component={NqrCreatePayments}
            options={{title:"NQR Payments"}}
        />
        <Stack.Screen
            name="NqrPayment"
            component={NqrPayment}
            options={{title:"NQR Payments"}}
        />
        <Stack.Screen
            name="AccountOpening"
            component={AccountOpening}
            options={{title:"Account Opening"}}
        />
        <Stack.Screen
            name="ENaira"
            component={ENaira}
            options={{title:"e-Naira"}}
        />
        <Stack.Screen
            name="StatementsMainpage"
            component={StatementsMainpage}
            options={{title:"Statement & Receipts"}}
        />
        <Stack.Screen
            name="AgencyCommission"
            component={AgencyCommission}
            options={{title:"Commissions"}}
        />
        </Stack.Navigator>
    )
}

export default AgencyStack;
import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import KeyMobileTabsNavigator from "./keyMobileTab";
import KeyMobileStack from "./keyMobileStack";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, images, FONTS, isAndroid, SIZES} from "../../constants";
import SendMoney from "../../KeyMobile/screens/sendMoney/SendMoney";
import { Profile } from "../../KeyMobile/screens/profile";
import { LocateUs } from "../../KeyMobile/screens/locateUs";
import {
  MenuIcon,
  NotifcationMesgIcon,
  SendMoneyDrawerIcon,
  SendMoneyPhoneDrawerIcon,
  RewardsDrawerIcon,
  DrawerIcon2,
  DrawerIcon3,
  MobileBankingLimitDrawerIcon,
  AccountSecurityDrawerIcon,
  LocateUsDrawerIcon,
} from "../../constants/icons";
import CustomDrawer from "../../KeyMobile/components/CustomDrawer";
import { useSelector } from "react-redux";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { BillMenu } from "../../KeyMobile/screens/bills";
import ComingSoon from "../../KeyMobile/screens/ComingSoon";
import { LimitMenu } from "../../KeyMobile/screens/TransactionLimit";
import MobileBankingLimit from "../../KeyMobile/screens/mobileBankLimit/MobileBankingLimit";
import RewardStack from "../../KeyMobile/screens/rewards/RewardStack";
import AgencyStack from "../../KeyMobile/screens/agencyBanking/AgencyStack";
import { AgencyWithdrawal , AgencyPayBillsMenu} from "../../KeyMobile/screens/agencyBanking";


const KeyMobileDrawerNavigator = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  const { CustomerName } = useSelector((state) => state.auth.user);
  const splitName = CustomerName?.split(" ");
  const userName = splitName[0]



  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "AgencyHome";
    switch (routeName) {
      case "AgencyHome":
        return `Hi ${userName} `;
      case "Notification":
        return "Notification";
      case "AgencyWithdrawal":
        return "Withdrawal";
      case "AgencyTransfer":
        return "Transfer";
      case "AgencyDeposit":
        return "Deposit";
      case "BuyAirtime":
        return "Airtime & Data"
      case "AgencyPayBillsMenu":
        return "Bills Payment"
      case "NqrMenu":
          return "Nqr";
      case "RewardsMenu":
        return "Rewards/Referrals"
      
    }
  };

  const getHeaderRight = (route, navigation) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    console.log(routeName, "routeName")
    switch (routeName) {
      case "Home":
        return (
          <TouchableOpacity style={{ marginTop: 20, marginRight: 10, }}
          onPress={() => navigation.navigate("Notification")}
          >
            <NotifcationMesgIcon
              height={40}
              color={isAndroid ? "white" : COLORS.primaryBlue}
            />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const getHeaderLeft = (route, navigation) => {
    
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
    switch (routeName) {
      case "Home":
        return (
          <TouchableOpacity onPress={() => {navigation.toggleDrawer()}}>
            <View style={{ marginTop: 20, paddingLeft: 10 }}>
              <MenuIcon
                height={40}
                color={isAndroid ? "white" : COLORS.primaryBlue}
              />
            </View>
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="white" />
            <Text style={{color: "white"}}>Back</Text>
          </TouchableOpacity>
        );
    }
  };



  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={({ navigation, route }) => ({
        drawerActiveBackgroundColor: "white",
        drawerItemStyle: {
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.grey,
          padding: 0,
          marginLeft: 0,
          width: "100%",
        },
        drawerActiveTintColor: COLORS.primaryBlue,
        drawerInactiveTintColor: COLORS.primaryBlue,
        drawerLabelStyle: { marginLeft: -20, fontFamily: FONTS.normal },
        headerTitle: getHeaderTitle(route),
        headerTitleAlign: "center",
        headerShown: true,
        headerTitleStyle: {
          color: isAndroid ? "white" : COLORS.primaryBlue,
          fontFamily: FONTS.bold,
          marginTop: 7,
          fontSize: SIZES.responsiveHeight("2%")
        },
        headerBackground: () => {
          if (isAndroid) {
            return (
              <Image
                source={images.headerImg}
                style={{ width: "100%", height: "100%" }}
              />
            );
          }
        },
   
      })}
    >
      <Drawer.Screen
        name="Home"
        component={KeyMobileStack}
        options={({ navigation, route }) => ({
          drawerIcon: DrawerIcon3,

          drawerLabel: "Home",
          title: getHeaderTitle(route),
          headerTitleAlign: "center",
          // headerShown: false,

          headerBackground: () => {
            if (isAndroid) {
              return (
                <Image
                  source={images.headerImg}
                  style={{ width: "100%", height: "100%" }}
                />
              );
            }
          },
          headerRight: () => getHeaderRight(route, navigation),
          headerLeft: () => getHeaderLeft(route, navigation)
        })}
      />
      <Drawer.Screen
        name="Withdrawal"
        component={AgencyWithdrawal}
        options={({ navigation, route }) => ({
          drawerIcon: SendMoneyDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          headerLeft: () => getHeaderLeft(route, navigation),
          // headerShown: true,
          drawerLabel: "Withdrawal",
       
        })}
      />
      <Drawer.Screen
        name="Bills"
        component={AgencyPayBillsMenu}
        options={({ navigation, route }) => ({
          drawerIcon: SendMoneyPhoneDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          headerLeft: () => getHeaderLeft(route, navigation),
          drawerLabel: "Bills",
         
        })}
      />
    
      <Drawer.Screen
        name="mobileBankingLimit"
        component={MobileBankingLimit}
        options={({ navigation, route }) => ({
          drawerIcon: MobileBankingLimitDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          headerLeft: () => getHeaderLeft(route, navigation),
          drawerLabel: "Mobile Banking Limits",
        })}
      />
      <Drawer.Screen
        name="accountSecurity"
        component={Profile}
        options={({ navigation, route }) => ({
          drawerIcon: AccountSecurityDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          drawerLabel: "Account Security",
          headerLeft: () => getHeaderLeft(route, navigation),
        
        })}
      />
      <Drawer.Screen
        name="locateUs"
        component={LocateUs}
        options={({ navigation, route }) => ({
          drawerIcon: LocateUsDrawerIcon,
          headerTitleStyle: {
            color: isAndroid ? "white" : COLORS.primaryBlue,
            fontFamily: FONTS.bold,
          },
          drawerLabel: "Locate Us",
          headerLeft: () => getHeaderLeft(route, navigation),
        })}
      />
    
    </Drawer.Navigator>
  );
};


export default KeyMobileDrawerNavigator;

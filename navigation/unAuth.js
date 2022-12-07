import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import KeySwiftSignIn from "../keySwift/screens/Login";
import SplashScreen from "../splashScreen/splashScreen";
import KeyMobileSignIn from "../KeyMobile/screens/Login";
import keyMobileQuickLinks from "../KeyMobile/screens/QuickLinks";
import AccountOpening from "../KeyMobile/screens/accountOpening/AccountOpening";
import AccountSummary from "../KeyMobile/screens/accountOpening/AccountSummary";
import Notification from "../KeyMobile/screens/Notification";
import { LocateUs } from "../KeyMobile/screens/locateUs";
import {
  keyMobileResetPassword,
  keyMobileOtp,
  keyMobileResetSuccess,
  keyMobileChangePassword,
} from "../KeyMobile/screens/forgotPassword/index";
import { FaqMenu } from "../KeyMobile/screens/faq";
import { Profile } from "../KeyMobile/screens/profile";
import { RegistrationWelcome,RegistrationOTP,RegistrationCompleting,RegistrationCompleted } from "../KeyMobile/screens/register";

import { NotifcationMesgIcon, MenuIcon } from "../constants/icons";
import { Enquires } from "../KeyMobile/screens/enquires";
import UnauthComingSoon from "../KeyMobile/screens/UnauthComingSoon";
import { isAndroid, images, COLORS, FONTS, SIZES } from "../constants";
import { NavigationContainer } from "@react-navigation/native";

import ZeroData from "../KeyMobile/screens/zeroData/ZeroData";

//should be deleted
import { SendMoney, SendSuccess, SendMoneyMenu , SendMoneyMultiple, MultipleTransfer, MultipleSummary, SendPhone} from "../KeyMobile/screens/sendMoney";
import CreateNewRequest from "../KeyMobile/screens/standingInstructions/CreateNewRequest";
import Pos from "../KeyMobile/screens/pos";
import {Step1, Step2,Step3, Step4} from "../KeyMobile/screens/enrol"

const Stack = createNativeStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const UnAuthScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="splashScreen"
      screenOptions={({ navigation }) => ({
        transitionSpec: {
          open: config,
          close: config,
        },
        animation: "slide_from_right",
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: isAndroid ? "white" : COLORS.primaryBlue,
          fontFamily: FONTS.bold,
          fontSize: SIZES.responsiveHeight('2%')
        },
        headerShown: false,
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
        headerLeft: () => (
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={isAndroid ? COLORS.white : COLORS.primaryBlue}
            />
            <Text
              style={{ color: isAndroid ? COLORS.white : COLORS.primaryBlue }}
            >
              Back
            </Text>
          </Pressable>
        ),
      })}
    >
      <Stack.Screen
        name="splashScreen"
        component={SplashScreen}
        options={{ headerShown: false, headerBackground: null }}
      />

      <Stack.Screen
        name="key swift"
        component={KeySwiftSignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="key mobile"
        component={KeyMobileSignIn}
        options={{ headerShown: false, headerBackground: null }}
      />
      <Stack.Screen
        name="account opening"
        component={AccountOpening}
        options={{
          title: "Account opening",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="account summary"
        component={AccountSummary}
        options={{
          title: "Account summary",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="key mobile reset password"
        component={keyMobileResetPassword}
        options={{ headerShown: false, headerBackground: null }}
      />
      <Stack.Screen
        name="key mobile password otp"
        component={keyMobileOtp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="key mobile reset successful"
        component={keyMobileResetSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="key mobile change password"
        component={keyMobileChangePassword}
        options={{ headerShown: false, headerBackground: null }}
      />
      <Stack.Screen
        name="key mobile quicklinks"
        component={keyMobileQuickLinks}
        options={{
          title: "Quick Link",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="test"
        component={Profile}
        options={{
          title: "test",
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="EnquiresScreen"
        component={Enquires}
        options={{ title: "Enquiries" ,
        headerShown: true,}}
      />
      <Stack.Screen name="ComingSoon"
       component={UnauthComingSoon} 
       
       options={{title: "Coming Soon",
       headerShown: true,
       }}/>
         <Stack.Screen name="Notification"
       component={Notification} 
       
       options={{title: "Notification",
       headerShown: true,
       }}/>

<Stack.Screen name="LocateUs"
       component={LocateUs} 
       
       options={{title: "Locate us",
       headerShown: true,
       }}/>

<Stack.Screen name="FAQ"
       component={FaqMenu} 
       
       options={{title: "FAQ",
       headerShown: true,
       }}/>
      <Stack.Screen 
        name="RegistrationWelcome"
        component={RegistrationWelcome} 
        options={{title: "Registration",headerShown: true}}/>
      <Stack.Screen 
        name="RegistrationOTP"
        component={RegistrationOTP} 
        options={{title: "Registration", headerShown: true}}/>
      <Stack.Screen 
        name="RegistrationCompleting"
        component={RegistrationCompleting} 
        options={{title: "Registration", headerShown: true}}/>
      <Stack.Screen 
        name="RegistrationCompleted"
        component={RegistrationCompleted} 
        options={{title: "Registration", headerShown: true}}/>

<Stack.Screen name="ZeroData"
       component={ZeroData} 
       
       options={{title: "Zero Data",
       headerShown: true,
       }}/>

<Stack.Screen
        name="EnrolStep1"
        component={Step1}
        options={{ title: "Enroll", headerShown: true }}
      />

<Stack.Screen
        name="EnrolStep2"
        component={Step2}
        options={{ title: "Enroll", headerShown: true }}
      />
      <Stack.Screen
        name="EnrolStep3"
        component={Step3}
        options={{ title: "Enroll", headerShown: true }}
      />
        <Stack.Screen
        name="EnrolStep4"
        component={Step4}
        options={{ title: "Enroll", headerShown: true }}
      />

<Stack.Screen
        name="Pos"
        component={Pos}
        options={{ title: "Pos", headerShown: true }}
      />

    </Stack.Navigator>
  );
};

export default UnAuthScreen;

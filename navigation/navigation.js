import "react-native-gesture-handler";
import React, { useContext, useEffect, useState, useRef} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import KeySwiftDrawerNavigator from "./keySwiftNavigation/keySwiftDrawer";
import UnAuthScreen from "./unAuth";
import MyTabs from "./keyMobileNavigation/keyMobileTab";
import KeyMobileDrawerNavigator from "./keyMobileNavigation/keyMobileDrawer";
import BackgroundTimer from "react-native-background-timer";
import { Alert } from "react-native";
import { logout } from "../utilities/redux/allApps/slice/authSlice";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { View, Text } from "react-native";
import { COLORS, GLOBAL_STYLE , isAndroid} from "../constants";
import { SessioneEndedIcon } from "../constants/icons";
import { BackHandler } from "react-native";
import {logoutTimer} from "../utilities/api"
import AgencyStack  from "../KeyMobile/screens/agencyBanking/AgencyStack"

let interval;
function AllNavigation() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [expiryDate, setExpiryDate] = useState(true);

  const appLoggedin = useSelector((state) => state.appLoggedIn.app);
  const userLoggedin = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const { jWTTokenResponse } = useSelector((state) => state.auth.user);
  const expiryTime = jWTTokenResponse?.TokenExpiryDate;
const sessionTimeout = useSelector((state) => state.auth.sessionTimeout);

  const dismissModal = () => {
    setVisible(false);
    dispatch(logout());
  };


useEffect(() => {
  if(userLoggedin && sessionTimeout){
    setVisible(true)
  }
},[sessionTimeout,userLoggedin])
  return (
    <NavigationContainer>
      {userLoggedin &&  (appLoggedin == "keySwift") ? (
        <KeySwiftDrawerNavigator />
      ) : userLoggedin && (appLoggedin == "keyMobile") ? (
        <KeyMobileDrawerNavigator />
      ) : (
        <UnAuthScreen />
      )}

      <ConfirmDialog
        visible={visible}
        title="Alert"
        // onTouchOutside={dismissModal}
        dialogStyle={{
          borderRadius: 5,
          borderLeftWidth: 7,
          borderLeftColor: "#FF725E",
          height: 150,
        }}
        contentStyle={{ paddingVertical: 2 }}
        titleStyle={GLOBAL_STYLE.h2Bold}
        positiveButton={{
          title: "Exit",
          onPress: isAndroid ? () => {
            setVisible(false);
             dispatch(logout());
             BackHandler.exitApp()
          
            } 
             : () => dispatch(logout()),
          titleStyle: { ...GLOBAL_STYLE.h5, color: "#FF725E" },
        }}
        negativeButton={{
          title: "Login",
          onPress: dismissModal,
          titleStyle: { ...GLOBAL_STYLE.h5 },
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {/* <SessioneEndedIcon /> */}

          <Text style={[GLOBAL_STYLE.h5]}>
            Session expired. please login to continue
          </Text>
        </View>
      </ConfirmDialog>
    </NavigationContainer>
  );
}

export default AllNavigation;

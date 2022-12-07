import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, images } from "../../constants";
import { ProfileIcon } from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Entypo } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { chooseApp } from "../../utilities/redux/allApps/slice/appSlice"
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={images.headerImg} style={{ height: 130 }}>
        <SafeAreaView>
          <View style={styles.profile}>
            <ProfileIcon />
            <View style={styles.container1}>
              <View style={styles.container2}>
                <View>
                  <Text style={styles.container2Text}>Elizbeth andrew</Text>
                  <Text style={styles.container2Text2}>Initiator</Text>
                </View>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => props.navigation.closeDrawer()}
                >
                  <Feather name="x" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      {/* <DrawerContentScrollView {...props}> */}
      <View style={styles.container3}>
        <DrawerItemList {...props} />
      </View>

      {/* </DrawerContentScrollView> */}
      <View style={styles.logout}>
        <Entypo name="log-out" size={13} color={COLORS.primaryBlue} />
        <TouchableOpacity onPress={() => dispatch(chooseApp("none"))}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profile: {
    paddingHorizontal: "6%",
    paddingTop: 25,
    alignContent: "center",
    flexDirection: "row",
  },
  container1: {
    marginHorizontal: 10,
  },
  container2: {
    flexDirection: "row",
  },
  container2Text: {
    color: "white",
  },
  container2Text2: {
    color: "white",
    fontSize: 10,
    marginTop: 10,
  },
  container3: {
    paddingBottom: "70%",
  },
  icon: {
    marginLeft: "30%",
  },
  logout: {
    flexDirection: "row",
    paddingTop: 15,
    paddingLeft: 12,
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: COLORS.grey,
  },
  logoutText: {
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.primaryBlue,
  },
});
export default CustomDrawer;

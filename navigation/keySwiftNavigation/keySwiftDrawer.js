import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  AlarmBell,
  MenuIcon,
  DrawerIcon1,
  DrawerIcon2,
  DrawerIcon3,
  DrawerIcon4,
  DrawerIcon5,
  DrawerIcon6,
  DrawerIcon7,
} from "../../constants/icons";

import { COLORS, images } from "../../constants";
import { Badge } from "react-native-paper";
import {
  Home,
  Profile,
  Report,
  Schedule,
  Transaction,
} from "../../keySwift/screens";
// import {

//   Profile

// } from "../../keySwift/screens/Profile";

import CustomDrawer from "../../keySwift/components/CustomDrawer";
import { Ionicons } from "@expo/vector-icons";

import { AccountScreen, PaymentScreen } from "./";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  console.log(Profile, "profile", Home);
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
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
        drawerLabelStyle: { marginLeft: -20 },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Home}
        options={({ navigation }) => ({
          drawerIcon: DrawerIcon1,
          headerTitleStyle: {
            color: "white",
          },
          drawerLabel: "DashBoard",
          title: "Dashboard",
          headerTitleAlign: "center",
          headerShown: true,
          headerBackground: () => (
            <Image
              source={images.headerImg}
              style={{ width: "100%", height: "100%" }}
            />
          ),
          headerRight: () => (
            <View style={{ marginTop: 20, marginRight: "10%" }}>
              <Badge
                size={13}
                style={{
                  marginBottom: -10,
                  marginLeft: 10,
                  backgroundColor: "#E15656",
                }}
              ></Badge>
              <AlarmBell height={40} />
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <View style={{ marginTop: 20, marginLeft: "10%" }}>
                <MenuIcon height={40} />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="My Profile"
        component={Profile}
        options={({ navigation }) => ({
          drawerIcon: DrawerIcon2,
          headerTitleStyle: {
            color: "white",
          },
          title: "Profile",
          headerTitleAlign: "center",
          headerShown: true,
          headerBackground: () => (
            <Image
              source={images.headerImg}
              style={{ width: "100%", height: "100%" }}
            />
          ),

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.profileHeader}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
                <Text style={{ color: "white" }}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Accounts"
        component={AccountScreen}
        options={({ navigation }) => ({
          drawerIcon: DrawerIcon3,
          headerTitleStyle: {
            color: "white",
          },
          title: "Accounts",
          headerTitleAlign: "center",
          headerShown: false,
          headerBackground: () => (
            <Image
              source={images.headerImg}
              style={{ width: "100%", height: "100%" }}
            />
          ),

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.profileHeader}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
                <Text style={{ color: "white" }}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="New Payments"
        component={PaymentScreen}
        options={({ navigation }) => ({
          drawerIcon: DrawerIcon4,
          headerTitleStyle: {
            color: "white",
          },
          title: "New Payments",
          headerTitleAlign: "center",
          headerShown: false,
          headerBackground: () => (
            <Image
              source={images.headerImg}
              style={{ width: "100%", height: "100%" }}
            />
          ),

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.profileHeader}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
                <Text style={{ color: "white" }}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Schedules"
        component={Schedule}
        options={({ navigation }) => ({
          drawerIcon: DrawerIcon5,
          headerTitleStyle: {
            color: "white",
          },
          title: "Schedules",
          headerTitleAlign: "center",
          headerBackground: () => (
            <Image
              source={images.headerImg}
              style={{ width: "100%", height: "100%" }}
            />
          ),

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.profileHeader}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
                <Text style={{ color: "white" }}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Transaction Status"
        component={Transaction}
        options={({ navigation }) => ({
          drawerIcon: DrawerIcon6,
          headerTitleStyle: {
            color: "white",
          },
          title: "Transaction Status",
          headerTitleAlign: "center",
          headerBackground: () => (
            <Image
              source={images.headerImg}
              style={{ width: "100%", height: "100%" }}
            />
          ),

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.profileHeader}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
                <Text style={{ color: "white" }}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Report"
        component={Report}
        options={({ navigation }) => ({
          drawerIcon: DrawerIcon7,
          headerTitleStyle: {
            color: "white",
          },
          title: "Reports",
          headerTitleAlign: "center",
          headerBackground: () => (
            <Image
              source={images.headerImg}
              style={{ width: "100%", height: "100%" }}
            />
          ),
          headerRight: () => {
            const [visible, setVisible] = useState(false);

            const hideMenu = () => setVisible(false);

            const showMenu = () => setVisible(true);

            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Menu
                  visible={visible}
                  anchor={
                    <View style={styles.profileHeader}>
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="white"
                        onPress={showMenu}
                      />
                    </View>
                  }
                  onRequestClose={hideMenu}
                >
                  <MenuItem onPress={hideMenu}>
                    <Text style={{ color: COLORS.primaryBlue }}>
                      Export CSV
                    </Text>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onPress={hideMenu}>
                    <Text style={{ color: COLORS.primaryBlue }}>
                      Export Excel
                    </Text>
                  </MenuItem>
                </Menu>
              </View>
            );
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.profileHeader}>
                <Ionicons name="chevron-back-outline" size={24} color="white" />
                <Text style={{ color: "white" }}>Back</Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DrawerNavigator;

import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Payments,
  Multiple,
  Upload,
  Single,
  Multiple2,
  Preview,
} from "../../keySwift/screens/Payments";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, images } from "../../constants";

const Stack = createNativeStackNavigator();

const PaymentScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={Payments}
        options={({ navigation }) => ({
          headerTitleStyle: {
            color: "white",
          },
          title: "Payments",
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
      <Stack.Screen
        name="single"
        component={Single}
        options={({ navigation }) => ({
          headerTitleStyle: {
            color: "white",
          },
          title: "Single Transfer",
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

      <Stack.Screen
        name="multiple"
        component={Multiple}
        options={({ navigation }) => ({
          headerTitleStyle: {
            color: "white",
          },
          title: "Multiple Transfers",
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
      <Stack.Screen
        name="multiple2"
        component={Multiple2}
        options={({ navigation }) => ({
          headerTitleStyle: {
            color: "white",
          },
          title: "Multiple Transfers",
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
      <Stack.Screen
        name="preview"
        component={Preview}
        options={({ navigation }) => ({
          headerTitleStyle: {
            color: "white",
          },
          title: "Multiple Transfers",
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
      <Stack.Screen
        name="upload"
        component={Upload}
        options={({ navigation }) => ({
          headerTitleStyle: {
            color: "white",
          },
          title: "Upload",
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
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default PaymentScreen;

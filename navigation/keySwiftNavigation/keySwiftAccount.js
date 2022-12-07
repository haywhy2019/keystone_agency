import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Account, AccountDetails, AccountsCodes } from "../../keySwift/screens/Accounts";
import { View, Image, TouchableOpacity, Text , StyleSheet} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, images } from "../../constants";


const Stack = createNativeStackNavigator();

const AccountScreen = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen
        name="account"
        component={Account}
        options={({ navigation }) => ({
            headerTitleStyle: {
              color: "white",
            },
            title: "Accounts",
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
                  <Text style={{color: 'white'}}>Back</Text>
                </View>
              </TouchableOpacity>
            ),
          })}
      />
      <Stack.Screen
        name="account details"
        component={AccountDetails}
        options={({ navigation }) => ({
            headerTitleStyle: {
              color: "white",
            },
            title: "Accounts",
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
                  <Text style={{color: 'white'}}>Back</Text>
                </View>
              </TouchableOpacity>
            ),
          })}
      />

      <Stack.Screen
        name="account codes"
        component={AccountsCodes}
        options={({ navigation }) => ({
            headerTitleStyle: {
              color: "white",
            },
            title: "Account Codes",
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
                  <Text style={{color: 'white'}}>Back</Text>
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
      flexDirection: 'row',
      alignItems: 'center'
    }
  })

export default AccountScreen;

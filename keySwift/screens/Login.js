import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from "expo-local-authentication";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import Input from "../../components/Inputs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { COLORS, images, height } from "../../constants";
import { useDispatch } from "react-redux";
import { chooseApp } from "../../utilities/redux/allApps/slice/appSlice";



export default function Login({ navigation }) {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false);
  const [fingerprintAvailable, setFingerprintAvailable] = useState(false);
  const [showFingerPrint, setShowFingerPrint] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [rememberMe, setRememberMe] = useState("newPassword");

  const checkSupportedAuthentication = async () => {
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    setShowFingerPrint(isEnrolled);
    if (types && types.length) {
      setFingerprintAvailable(
        types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      );
    }
  };

  const authenticate = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const results = await LocalAuthentication.authenticateAsync();
      if (results.success) {
        setResult("SUCCESS");
      } else if (results.error === "unknown") {
        setResult("DISABLED");
      } else if (
        results.error === "user_cancel" ||
        results.error === "system_cancel" ||
        results.error === "app_cancel"
      ) {
        setResult("CANCELLED");
      } else if (results.error === "not_enrolled") {
        setResult("NOT AVAILABLE");
      } else {
        setResult("Error");
      }
    } catch (error) {
      setResult("ERROR");
    }

    setLoading(false);
  };

  const toggleRemeberMe = () => {
    setChecked(!checked);
    if (rememberMe == "newPassword") {
      setRememberMe("username");
    } else {
      setRememberMe("newPassword");
    }
  };

  useEffect(() => {
    checkSupportedAuthentication();
  }, []);

  let resultMessage;
  switch (result) {
    case "CANCELLED":
      resultMessage = "Authentication process has been cancelled";
      break;
    case "DISABLED":
      resultMessage = "Biometric authentication has been disabled";
      break;
    case "ERROR":
      resultMessage = "There was an error in authentication";
      break;
    case "NOT AVAILABLE":
      resultMessage =
        "Biometric authentication has not been set up on this device";
      break;
    case "SUCCESS":
      resultMessage = "Successfully authenticated";
      break;
    default:
      resultMessage = "";
      break;
  }

  let description;
  if (fingerprintAvailable) {
    description = "Authenticate with touch ID ";
  } else {
    description = "No biometric authentication methods available";
  }

  return (
    <SafeAreaView style={styles.container1}>
      <StatusBar style="auto" />
      <View style={styles.container2}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.container2Text1}>Welcome back to</Text>
        <Text style={styles.container2Text2}>KEY SWIFT</Text>
        <Text style={styles.container2Text3}>
          Please enter your details to login
        </Text>
        <Input
          placeholder="Enter your username"
          icon={<AntDesign name="user" size={16} color={COLORS.grey} />}
        />
        <Input
          placeholder="Enter your password"
          icon={<AntDesign name="eyeo" size={16} color={COLORS.grey} />}
        />
        <View style={styles.container3}>
          <Pressable style={styles.container4} onPress={toggleRemeberMe}>
            <Checkbox
              style={styles.checkbox}
              value={checked}
              // onValueChange={setChecked}
              color={checked ? COLORS.primaryBlue : undefined}
            />
            <Text style={styles.container3Text}>Remember me</Text>
          </Pressable>
          <Text style={styles.container3Text}>Forgot Password ?</Text>
        </View>
        <View style={styles.container5}>
          <CustomButton
            buttonText="Login"
            onPress={() =>  dispatch(chooseApp("keySwift"))}
          />
        </View>

        <View style={styles.container6}>
          {/* {fingerprintAvailable && showFingerPrint ? ( */}
          {fingerprintAvailable ? (
            <Ionicons
              name="finger-print-sharp"
              size={100}
              color={COLORS.primaryBlue}
              onPress={authenticate}
            />
          ) : null}
          {resultMessage ? (
            <Text style={styles.container6Text}>{resultMessage}</Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    paddingTop: "10%",
    backgroundColor: "white",
    flex: 1,
  },
  container2: {
    paddingHorizontal: "10%",
    paddingVertical: 60,
  },
  logo: {
    height: 40,
    width: 40,
  },
  container2Text1: {
    marginTop: 40,
    fontSize: 20,
    color: COLORS.primaryBlue,
    fontWeight: "bold",
  },
  container2Text2: {
    fontSize: 24,
    color: COLORS.primaryBlue,
    fontWeight: "bold",
  },
  container2Text3: {
    fontSize: 13,
    color: COLORS.grey,
    marginTop: 12,
    marginBottom: 30,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container3Text: {
    color: "#002561",
    fontWeight: "700",
    fontSize: 13,
  },
  container4: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 6,
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#002561",
  },
  container5: {
    paddingTop: 60,
  },
  container6: {
    alignContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  container6Text: {
    paddingTop: 5,
    color: COLORS.danger,
    textAlign: "center",
    fontSize: 10,
  },
});

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { GLOBAL_STYLE, COLORS, isAndroid, images } from "../../../constants";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

//components
import { AccountCard, ATMCardSlider, AtmCard } from "../../../components";
import { MenuImageLeftIconRight, TwoFactorAuth } from "../../components";
import ToggleSwitch from "toggle-switch-react-native";

//redux
import { useSelector } from "react-redux";

//temporary data
const userData = [
  { name: "Olalekan Aminu", cardNo: "**** **** **** 1234" },
  { name: "Olalekan Aminu", cardNo: "**** **** **** 1234" },
];

const userData2 = { name: "Olalekan Aminu", cardNo: "**** **** **** 1234" };
const CardServices = ({ navigation }) => {
  const customerDetails = useSelector((state) => state.auth.user);
  const [isCardBlocked, setIsCardBlocked] = useState(false);
  const [isCardControlOpen, setIsCardControlOpen] = useState(false);
  const [isInternetEnabled, setIsInternetEnabled] = useState(false);
  const [isAtmEnabled, setIsAtmEnabled] = useState(false);
  const [isPosEnabled, setIsPosEnabled] = useState(false);
  const [isNigeria, setIsNigeria] = useState(false);
  const [isInternational, setIsInternational] = useState(false);

  
  const [showAuth, setShowAuth] = useState(false);

  const openCardControl = () => {
    setIsCardControlOpen(!isCardControlOpen); //open the panel and changes the chevron
  };
 
  return (
    <ScrollView style={styles.scrollContainer}>
      <StatusBar style={isAndroid ? "light" : "dark"} />
      <View style={styles.mainContainer}>
        <AccountCard data={customerDetails.accounts}  />

        <ATMCardSlider userData={userData} onPress={() => setShowAuth(true)} />

        <View>
          <MenuImageLeftIconRight
            label="Block Card"
            rightIcon={
              <ToggleSwitch
                isOn={isCardBlocked}
                onColor={COLORS.primaryBlue}
                offColor={COLORS.grey}
                // label="Save Beneficiary"
                labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
                size="small"
                onToggle={() => setIsCardBlocked(!isCardBlocked)}
              />
            }
          />

          <View>
            <MenuImageLeftIconRight
              label="Card Request"
              leftIcon={
                <Image
                  source={images.keyMobileLogoRound}
                  style={styles.logoImage}
                />
              }
              onPress={() => navigation.navigate("DebitCardRequest")}
            />

            <MenuImageLeftIconRight
              label="Card Renewal/Replacement"
              leftIcon={
                <Image
                  source={images.keyMobileLogoRound}
                  style={styles.logoImage}
                />
              }
              onPress={() => navigation.navigate("CardReplacement")}
            />

            <MenuImageLeftIconRight
              label="Card Activation"
              leftIcon={
                <Image
                  source={images.keyMobileLogoRound}
                  style={styles.logoImage}
                />
              }
              onPress={() => navigation.navigate("CardActivation")}
            />

            <MenuImageLeftIconRight
              label="Change Daily Limits"
              leftIcon={
                <Image
                  source={images.keyMobileLogoRound}
                  style={styles.logoImage}
                />
              }
              //   onPress={() => navigation.navigate("ChangeLimits")}
              onPress={() => setShowAuth(true)}
            />

            <MenuImageLeftIconRight
              label="PIN Change/Reset"
              leftIcon={
                <Image
                  source={images.keyMobileLogoRound}
                  style={styles.logoImage}
                />
              }
              //   onPress={() => navigation.navigate("PinReset")}
              onPress={() => setShowAuth(true)}
            />

            <MenuImageLeftIconRight
              label="Credit Card Repayments"
              leftIcon={
                <Image
                  source={images.keyMobileLogoRound}
                  style={styles.logoImage}
                />
              }
              onPress={() => navigation.navigate("CardRepayments")}
            />

            <MenuImageLeftIconRight
              label="Card Control/Travel Advisory"
              leftIcon={
                <Image
                  source={images.keyMobileLogoRound}
                  style={styles.logoImage}
                />
              }
              rightIcon={
                isCardControlOpen ? (
                  <Ionicons name="chevron-up-outline" size={24} color="black" />
                ) : (
                  <Ionicons
                    name="chevron-down-outline"
                    size={24}
                    color="black"
                  />
                )
              }
              onPress={openCardControl}
            />

            {isCardControlOpen && (
              <>
                <Text style={[GLOBAL_STYLE.h4, { padding: 15 }]}>
                  Card Control By Channel
                </Text>
                <MenuImageLeftIconRight
                  label="Internet"
                  rightIcon={
                    <ToggleSwitch
                      isOn={isInternetEnabled}
                      onColor={COLORS.primaryBlue}
                      offColor={COLORS.grey}
                      // label="Save Beneficiary"
                      labelStyle={{
                        color: COLORS.primaryBlue,
                        fontWeight: "900",
                      }}
                      size="small"
                      onToggle={() => setIsInternetEnabled(!isInternetEnabled)}
                    />
                  }
                />
                <MenuImageLeftIconRight
                  label="ATM"
                  rightIcon={
                    <ToggleSwitch
                      isOn={isAtmEnabled}
                      onColor={COLORS.primaryBlue}
                      offColor={COLORS.grey}
                      // label="Save Beneficiary"
                      labelStyle={{
                        color: COLORS.primaryBlue,
                        fontWeight: "900",
                      }}
                      size="small"
                      onToggle={() => setIsAtmEnabled(!isAtmEnabled)}
                    />
                  }
                />

                <MenuImageLeftIconRight
                  label="POS"
                  rightIcon={
                    <ToggleSwitch
                      isOn={isPosEnabled}
                      onColor={COLORS.primaryBlue}
                      offColor={COLORS.grey}
                      // label="Save Beneficiary"
                      labelStyle={{
                        color: COLORS.primaryBlue,
                        fontWeight: "900",
                      }}
                      size="small"
                      onToggle={() => setIsPosEnabled(!isPosEnabled)}
                    />
                  }
                />

                <Text style={[GLOBAL_STYLE.h4, { padding: 15 }]}>
                  Card Control By Countries
                </Text>
                <MenuImageLeftIconRight
                  label="Nigeria"
                  rightIcon={
                    <ToggleSwitch
                      isOn={isNigeria}
                      onColor={COLORS.primaryBlue}
                      offColor={COLORS.grey}
                      // label="Save Beneficiary"
                      labelStyle={{
                        color: COLORS.primaryBlue,
                        fontWeight: "900",
                      }}
                      size="small"
                      onToggle={() => setIsNigeria(!isNigeria)}
                    />
                  }
                />
                <MenuImageLeftIconRight
                  label="International"
                  rightIcon={
                    <ToggleSwitch
                      isOn={isInternational}
                      onColor={COLORS.primaryBlue}
                      offColor={COLORS.grey}
                      // label="Save Beneficiary"
                      labelStyle={{
                        color: COLORS.primaryBlue,
                        fontWeight: "900",
                      }}
                      size="small"
                      onToggle={() => setIsInternational(!isInternational)}
                    />
                  }
                />
              </>
            )}
          </View>

          <View></View>
        </View>
      </View>

      <TwoFactorAuth
        title={"User Authorization"}
        component={
          <Text
            style={[GLOBAL_STYLE.h5, { width: "90%", textAlign: "center" }]}
          >
            Kindly select any of the verification method to view card details
          </Text>
        }
        onSubmit={() => setShowAuth(false)}
        onClose={() => setShowAuth(false)}
        show={showAuth}
      />
    </ScrollView>
  );
};

export default CardServices;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainContainer: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  container2: {
    marginVertical: 10,
    paddingLeft: 5,
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
  logoImage: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

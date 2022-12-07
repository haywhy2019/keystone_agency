import { View, StyleSheet, ScrollView, Keyboard,Text } from "react-native";

import { StatusBar } from "expo-status-bar";

import {
  images,
  COLORS,
  FONTS,
  GLOBAL_STYLE,
  isAndroid,
} from "../../../constants";
import {
  CustomButton,
  Input,
  SpinnerImage,
  CustomSnackBar,
  DropDownInput,
} from "../../../components";

import { MenuImageLeftIconRight, MenuLeftRightIcon, MenuOptionsCard } from "../../components";

import CreateNewRequest from "./CreateNewRequest";
import React, { useState, useEffect } from "react";
import { ConfirmCheque } from "../ChequeServices";
import { ChequeIcon, ChequeIcon2 } from "../../../constants/icons";

const StandingInstructionsMenu = ({ navigation, route,onPress }) => {

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <StatusBar style={isAndroid ? "light" : "dark"} />
      <View style={styles.backgroundImgContainer}>
<MenuOptionsCard

label="Create New Request"
screen="CreateNewRequest"
navigation={navigation}

/>

<MenuOptionsCard
label="Existing Instruction"
screen="StandingInstructionItem"


navigation={navigation}

/>

      </View>

     
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  backgroundImgContainer: {
    flex: 1,
  },
  
});
export default StandingInstructionsMenu;

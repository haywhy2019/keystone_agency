import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import { SIZES, FONTS, COLORS, GLOBAL_STYLE, isAndroid } from "../../../constants";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

//redux
import { useSelector, useDispatch } from "react-redux";

//components
import Beneficiary from "./Beneficiary";
import BillBeneficiary from "./BillBeneficiary";
import BeneficaryAgency from "./BeneficiaryAgency";
import { SpinnerImage } from "../../../components";

const BeneficiaryMainPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);


  const [routes] = React.useState([
    { key: "first", title: "Transfer" },
    { key: "second", title: "Airtime/Bills" },
    { key: "third", title: "Agency" },
  ]);


 
  const renderScene = SceneMap({
    first: Beneficiary,
    second: BillBeneficiary,
    third: BeneficaryAgency ,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={"white"}
      inactiveColor={COLORS.primaryBlue}
      style={{
        marginTop: 10,
        backgroundColor: "rgba(242, 242, 242, 0.25)",
        height: 35,
        shadowOffset: { height: 0, width: 0 },
        shadowColor: "transparent",
        shadowOpacity: 0,
        elevation: 0,
        borderWidth: 1,
        borderColor: COLORS.primaryBlue,
        borderRadius: 5,
        overflow: "hidden",
      }}
      contentContainerStyle={{ alignItems: "center" }}
      indicatorContainerStyle={{ alignItems: "center" }}
      indicatorStyle={{ backgroundColor: COLORS.primaryBlue, height: "100%" }}
      labelStyle={[isAndroid? GLOBAL_STYLE.h4Bold : GLOBAL_STYLE.h5Bold,{ textTransform: "capitalize"}]}
    />
  );
  // if (transactionDetailLoading == "pending") {
  //   return <SpinnerImage />;
  // }
  return (
    <View style={GLOBAL_STYLE.background }>
      <View>
        <View style={{ height: SIZES.height, paddingBottom: 50 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: SIZES.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </View>
  );
};

export default BeneficiaryMainPage;

const styles = StyleSheet.create({
  recentTransaction: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryBlue,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  initials: {
    color: COLORS.white,
    fontFamily: FONTS.normal,
    fontSize: 20,
    textTransform: "uppercase",
  },
  initialsBg: {
    backgroundColor: COLORS.primaryBlue,
    width: 50,
    height: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  name: {
    color: COLORS.primaryBlue,
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  nameCardContainer: {
    backgroundColor: "white",
    width: 100,
    height: 130,
    marginLeft: 12,
    marginVertical: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  container: {
    paddingHorizontal: 15,
  },
  allTransaction: {
    fontFamily: FONTS.bold,
    color: COLORS.primaryBlue,
    fontSize: 17,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
});


import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { COLORS, GLOBAL_STYLE, FONTS , isAndroid} from "../../../constants";
import { CustomButton, Input } from "../../../components";
import NewInvestment from "./NewInvestment";
import ExistingInvestment from "./ExistingInvestment";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";


const renderScene = SceneMap({
  first: NewInvestment,
  second: ExistingInvestment,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    activeColor={"white"}
    inactiveColor={COLORS.primaryBlue}
    style={{
      backgroundColor: "rgba(242, 242, 242, 0.25)",
      // height: 40,
      shadowOffset: { height: 0, width: 0 },
      // shadowColor: "transparent",
      shadowOpacity: 0,
      elevation: 1,
      // borderWidth: 1,
      // borderColor: COLORS.primaryBlue,
      // borderRadius: 5,
      overflow: "hidden",
    }}
    contentContainerStyle={{ alignItems: "center" }}
    indicatorContainerStyle={{ alignItems: "center" }}
    
    indicatorStyle={{ backgroundColor: COLORS.primaryBlue2, height: "100%" , borderBottomColor: COLORS.primaryBlue2, borderBottomWidth:5}}
    labelStyle={[isAndroid ? GLOBAL_STYLE.h5Bold : GLOBAL_STYLE.h6Bold ,{ textTransform: "capitalize", fontFamily: FONTS.bold }]}
  />
);

const Investments = () => {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Add New Investment' },
    { key: 'second', title: 'Existing Investment' },
  ]);
  return (
    <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{ width: layout.width }}
    renderTabBar={renderTabBar}
  />
  );
};

export default Investments;

const styles = StyleSheet.create({
activeAndInactiveContainer:  {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.grey2,
    width: 220,
    borderRadius: 30,
    height: 50,
  },
  activeButton: { width: 100, height: 40, borderRadius: 20 },
  textWhite: { color: COLORS.white },
  textBlue: { color: COLORS.primaryBlue },
  inactiveButton: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.grey2,
  },
});

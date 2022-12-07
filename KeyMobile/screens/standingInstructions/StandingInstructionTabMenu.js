import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Pressable,
    useWindowDimensions
  } from "react-native";
  import React, { useState } from "react";
  import { SIZES, FONTS, COLORS, GLOBAL_STYLE, isAndroid } from "../../../constants";
  import { SpinnerImage } from "../../../components";
  import { TabView, SceneMap, TabBar } from "react-native-tab-view";

  //components
  import CreateNewRequest from "./CreateNewRequest";
  import StandingInstructionItem from "./StandingInstructionItem";

  
  const StandingInstructionTabMenu = ({ navigation }) => {
    const [index, setIndex] = React.useState(0);
  
  
    const [routes] = React.useState([
      { key: "first", title: "Create New Request" },
      { key: "second", title: "Existing Instruction" }
    ]);

  
   
    const renderScene = SceneMap({
      first: CreateNewRequest,
      second: StandingInstructionItem,
    });
  
    const renderTabBar = (props) => (
      <TabBar
      {...props}
      activeColor={"white"}
      inactiveColor={COLORS.primaryBlue}
      style={{
        backgroundColor: "rgba(242, 242, 242, 0.25)",
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        elevation: 1,
        overflow: "hidden",
      }}
      contentContainerStyle={{ alignItems: "center" }}
      indicatorContainerStyle={{ alignItems: "center" }}
      
      indicatorStyle={{ backgroundColor: COLORS.primaryBlue2, height: "100%" , borderBottomColor: COLORS.primaryBlue2, borderBottomWidth:5}}
      labelStyle={{ textTransform: "none", fontFamily: FONTS.bold }}
      />
    );
    return (
      <View >
        <View >
          <View style={{ height: SIZES.height, paddingBottom: 80,backgroundColor:'white' }}>
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
  
 
  export default StandingInstructionTabMenu;
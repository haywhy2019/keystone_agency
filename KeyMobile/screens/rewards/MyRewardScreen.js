import { useState } from "react";
import {ScrollView, StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

//theme
import { COLORS, GLOBAL_STYLE,SIZES,isAndroid } from "../../../constants";

//components
import { ArrowYellowUp } from "../../../constants/icons";
import { CustomButton } from "../../../components";
import { RewardsTab,GiftsTab, DiscountsTab } from "./rewardsTabs";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";


const MyRewardScreen=()=>{
    

    //this is for the tabs that switch
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "first", title: "Gifts" },
        { key: "second", title: "Rewards" },
        { key: "third", title: "Discount" },
      ]);

    const renderScene = SceneMap({
        first: GiftsTab,
        second: RewardsTab,
        third: DiscountsTab,
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


    return(
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexGrow:1}}>
            <View style={{alignItems:'center',marginVertical:40}}>
                <Text style={[GLOBAL_STYLE.h4]}>Total Points</Text>
                <Text style={[GLOBAL_STYLE.h1Bold]}>0</Text>
                <View style={styles.percentageBox}>
                    <ArrowYellowUp/>
                    <Text style={{color:COLORS.white, marginLeft:8}}>0%</Text>
                </View>
            </View>

            <View style={{ height: SIZES.height, paddingBottom: 50 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: SIZES.width }}
                    renderTabBar={renderTabBar}
                />
            </View>
            
        </ScrollView>
    )
}

export default MyRewardScreen;

const styles=StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor: COLORS.white,
        paddingHorizontal:20

    },
    percentageBox:{
        alignItems:'center',
        flexDirection:'row',
        backgroundColor: COLORS.primaryBlue,
        paddingHorizontal:10,
        paddingVertical: 5,
        borderRadius:50,
    },
    sendingBox:{
        marginVertical:16
    },
    myGiftBtn:{
        backgroundColor: COLORS.white,
        borderColor: COLORS.primaryBlue,
        borderWidth: 1,
    }
})
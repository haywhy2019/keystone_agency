import { StyleSheet, Text, View, useWindowDimensions  } from 'react-native'
import React from 'react'
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLORS, FONTS , isAndroid, GLOBAL_STYLE} from '../../../constants';
import CreateVirtualCard from './CreateVirtualCard';
import ExistingVirtualCard from './ExistingVirtualCard';


  
  const renderScene = SceneMap({
    first: CreateVirtualCard,
    second: ExistingVirtualCard,
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
  
const VirtualCardTabHome = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Add New Card' },
      { key: 'second', title: 'My Virtual Cards' },
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
}

export default VirtualCardTabHome

const styles = StyleSheet.create({})
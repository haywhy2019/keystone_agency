import { useState } from 'react';
import {View,Text} from 'react-native';
import { SIZES,COLORS,GLOBAL_STYLE, isAndroid } from '../../../constants';

//components
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { ReceivedGifts,SentGifts, GiftHistory } from './myGiftTabs';

const MyGifts=()=>{

    //this is for the tabs that switch
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "first", title: "Received Gift" },
        { key: "second", title: "Sent Gift" },
        { key: "third", title: "Gift History" },
      ]);

    const renderScene = SceneMap({
        first: ReceivedGifts,
        second: SentGifts,
        third: GiftHistory,
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
          labelStyle={[isAndroid? GLOBAL_STYLE.h5Bold : GLOBAL_STYLE.h5Bold,{ textTransform: "capitalize"}]}
        />
      );

    return(
    <View style={{paddingVertical:30,paddingHorizontal:20}}>
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
    )
}

export default MyGifts
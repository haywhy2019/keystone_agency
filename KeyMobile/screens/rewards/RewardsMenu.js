import {StyleSheet,View } from "react-native";
import { OptionBox } from "../../../components";
import { SpeakerIcon } from "../../../constants/icons";

const RewardsMenu=({navigation})=>{
    return(
    <View style={styles.container}>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <OptionBox
                boxText={'My Rewards'}
                onPress={()=>navigation.navigate('MyRewardScreen')}
                
                />
            <OptionBox
                boxText={'Refer a Friend'}
                icon={<SpeakerIcon/>}
                onPress={()=>navigation.navigate('ReferFriendMenu')}

            />
        </View>
        
    </View>
    )
}

export default RewardsMenu;

const styles= StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:40,
        paddingHorizontal:30,
        backgroundColor:'white',

    }
})

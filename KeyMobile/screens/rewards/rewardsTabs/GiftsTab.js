import {useState} from 'react'
import { StyleSheet,ScrollView,View,Text } from "react-native";
import { GLOBAL_STYLE,COLORS } from '../../../../constants';
import { useNavigation } from '@react-navigation/native';

//components
import { GiftManIcon } from "../../../../constants/icons";
import { CustomButton } from '../../../../components';

const GiftsTab=()=>{
    const [isThereGift,setIsThereGift]=useState(false);
    const navigation= useNavigation()
    


    //this shows when there are gifts
    if(isThereGift){
        return(
            <Text>See the gifts</Text>
        )
    }

    return(
    <View style={{flexGrow:1}}>
        {
            //this shows when there are no gifts
            !isThereGift && (
                <View style={{paddingVertical: 100}}>
                    <GiftManIcon/>
                </View>
                )
            
        }
        {
            //this shows when there are gifts
            isThereGift && (
                <View style={{paddingTop: 100}}>
                    <Text>See the gifts</Text>
                </View>
                )
            
        }

       
        <View>
                <View style={styles.sendingBox}>
                    <Text style={[GLOBAL_STYLE.h5, {textAlign:'center', color:COLORS.grey}]}>Click below to redeem your gifts</Text>
                    <CustomButton
                        buttonContainerStyle={styles.myGiftBtn}
                        buttonText={'My Gifts'}
                        buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.primaryBlue}}
                        onPress={()=>navigation.navigate('MyGifts')}
                    />

                </View>

                <View style={styles.sendingBox}>
                    <Text style={[GLOBAL_STYLE.h5, {textAlign:'center', color:COLORS.grey}]}>Send an e-gift to a friend</Text>
                    <CustomButton
                        buttonText={'Gift a Friend'}
                        buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
                        onPress={()=>navigation.navigate('GiftAFriend')}
                    />

                </View>
            </View>
    </View>
    )
   
    
}

export default GiftsTab;

const styles=StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor: COLORS.white,
        paddingHorizontal:20

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
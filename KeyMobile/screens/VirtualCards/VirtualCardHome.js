import { useState } from 'react';
import {StyleSheet,View, Text, } from 'react-native';
import { GLOBAL_STYLE, COLORS } from '../../../constants';


//components
import { CustomButton } from '../../../components';
import { WalletPersonIcon} from '../../../constants/icons';
import ExistingVirtualCard from './ExistingVirtualCard';

const VirtualCardHome=({navigation})=>{
    const [isCardAvailable, setIsCardAvailable]=useState(false);

    //this shows when the user has an exisiting card
    if(isCardAvailable){
        return(
        <ExistingVirtualCard/>
        )
    }

    //this shows when the user doesn't have an existing card
    return(
    <View style={styles.virtualContainer} contentContainerStyle={{flexGrow:1}}>

        <WalletPersonIcon/>
        
        <Text style={[GLOBAL_STYLE.h3Bold,{marginTop:20}]}>No Card</Text>
        <Text style={[GLOBAL_STYLE.h4,{color: COLORS.grey}]}>You currently do not have an card</Text>

        <View style={{flex:1}}/>

        <CustomButton
            buttonContainerStyle={styles.buttonLogin}
            buttonText={'Create Dollar Card'}
            buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
            onPress={()=>navigation.navigate('CreateVirtualCard')}
        />
    </View>
    )
}

export default VirtualCardHome

const styles=StyleSheet.create({
    virtualContainer:{
        flex:1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        paddingHorizontal:20,
        paddingTop:100
    },
    buttonLogin:{
        width:'100%',
        marginBottom:30,
    }
})
import {StyleSheet, View,Text, ScrollView} from 'react-native';
import { COLORS,GLOBAL_STYLE } from '../../../constants';

//components
import { Input,CustomButton } from '../../../components';
import ToggleSwitch from "toggle-switch-react-native";

const GiftAFriend=({navigation})=>{
    return(
    <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexGrow:1}}>
        <Input
            label={'Select Source Account'}
        />

        <Input
            label={'Beneficiary Phone Number'}
        />

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={[GLOBAL_STYLE.h4]}>Select Friend from Contacts</Text>
            <ToggleSwitch
                onColor={COLORS.primaryBlue}
                offColor={COLORS.grey}
                labelStyle={GLOBAL_STYLE.h4}
                size="small"
                
            />
        </View>

        <View style={{marginTop:20,}}>
            <Input
                label={'Beneficiary Name'}
                
            />
            <Input
                label={'Amount'}
                placeholder={'NGN'}
            />
            <Input
                label={'Special Message'}
                placeholder={'NGN'}
                optional={'(Optional)'}
            />
        </View>

        <View style={{flex:1}}/>

        <CustomButton
            buttonText={'NEXT'}
            buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
            onPress={()=>navigation.navigate('InviteFriend')}
        />        
        


    </ScrollView>
    )
}

export default GiftAFriend;

const styles= StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor: COLORS.white,
        padding:20,
    }
})
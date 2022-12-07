import { useState } from 'react';
import {StyleSheet,View,Text} from 'react-native';
import { COLORS } from '../../../constants';

//components
import { DropDownInput,Input,CustomButton,BottomNotification } from '../../../components';

const RedeemPoints=()=>{
    const [sucsessModalShow, setSuccessModalShow] =useState(false)

    return(
    <View style={styles.container}>
        <DropDownInput
            label={'Select Source Account'}
            labelCustomStyle={styles.inputLabel}
            labelField="accountno"
            valueField="accountno"
            placeholder=""
            placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
          />
        <Input
            label={'Enter Pin'}
            placeholder={'****'}
        />

        <View style={{flex:1}}/>

        <CustomButton
            buttonText={'NEXT'}
            onPress={()=>setSuccessModalShow(true)}
        />

        <BottomNotification
            show={sucsessModalShow}
            headerText={'Successful'}
            buttonText={'DONE'}
            onPress={()=>setSuccessModalShow(false)}
        />

    </View>
    )
}

export default RedeemPoints

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.white,
        padding:20,
    }
})
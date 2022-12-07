import {StyleSheet,View,Text, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { COLORS,GLOBAL_STYLE } from '../../../constants';


//components
import { CustomButton, DropDownInput,Input } from '../../../components';


const animals=['cat', 'dog']
const ConfirmCheque=()=>{
    return(
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexGrow:1}}>
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="sourceaccount"
                valueField="sourceaccount"
                placeholder="Select Source Account"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
            />
            <Input
                placeholder="Cheque Leaf Number"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
            />
            <Input
                placeholder="Cheque Leaf Date"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
                icon={<Ionicons name="calendar-outline" size={24} color="black" />}
                />
            <Input
                placeholder="Amount"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
            />
            <Input
                placeholder="Beneficiary Name"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
            />

            <View style={{flex:1}}/>

            <CustomButton
				buttonContainerStyle={{marginBottom: 20}}
				buttonText={'Submit'}
				buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
            
			  />
        </ScrollView>
    )
}

export default ConfirmCheque

const styles= StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor:COLORS.white,
        paddingHorizontal:20
    },
    reactivateInput:{
		backgroundColor:COLORS.grey2,
	}
})

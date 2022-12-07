import { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { CardHandIcon, DeliveryVanIcon} from "../../../constants/icons";

//components
import { DropDownInput,Input,CustomButton,OptionBox} from "../../../components";

const animals=['dog', 'cat'];
const deliveryData=[
    {boxText:'Pick Up', icon:<CardHandIcon/>},
    {boxText:'Delivery', icon:<DeliveryVanIcon/>}
]
const CreditCardRequest=()=>{
    const [deliveryTypeIndex, setDeliveryTypeIndex]= useState(0);

    const selectDeliveryType=(index)=>{
        setDeliveryTypeIndex(index)//this changes which box has the orange tick
    }

    return(
    <ScrollView style={styles.scrollContainer}>
        <View>
            <Text style={[GLOBAL_STYLE.h4,{textAlign:'center',marginVertical:20}]}>Select Card Delivery Type</Text>
            <View style={styles.OptionBoxContainer}>
                {
                    deliveryData.map((item, index)=>{
                        const {icon, boxText}= item;
                        return(
                            <OptionBox 
                                icon={icon} 
                                boxText={boxText} 
                                key={boxText+index}
                                choosenState={deliveryTypeIndex===index ? true : false}//this determines if the orange tick shows or not
                                onPress={()=>selectDeliveryType(index)}
                                />
                        )
                    })
                }
            </View>
            
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="passverification"
                valueField="passverification"
                placeholder="Select Credit Account"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                />
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="passverification"
                valueField="passverification"
                placeholder="Select Account to Link to Card"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                />
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="passverification"
                valueField="passverification"
                placeholder="Select Current State"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                />
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="passverification"
                valueField="passverification"
                placeholder="Select Branch"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                />
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="passverification"
                valueField="passverification"
                placeholder="Select Credit Card Type (Naira or Dollar)"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                />
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="passverification"
                valueField="passverification"
                placeholder="Select Card Type"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                />
            <Input
                placeholder="Select Card Color"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
                />
            <Input
                placeholder="Pick Up Date"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
                icon={<Ionicons name="calendar-outline" size={24} color="black" />}
                />
            <Input
                placeholder="Pick Up Time"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
                />
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="passverification"
                valueField="passverification"
                placeholder="Security for Credit Card Limit"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                />
            <Input
                placeholder="Desired Credit Card Limit"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
                />
            <Text style={[GLOBAL_STYLE.h6,{textAlign:'center'}]}>Please Note That #1000 + VAT(7.5%) N75 Will Be Deducted From Your Account To Complete This Transaction</Text>

            <CustomButton
				buttonContainerStyle={styles.buttonLogin}
				buttonText={'Submit'}
				buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
			  />
        </View>
    </ScrollView>
    )
}

export default CreditCardRequest

const styles=StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor: COLORS.white,
        paddingHorizontal:20
    },
    OptionBoxContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    inputLabel:{
        marginLeft:0,
    },
    reactivateInput:{
		backgroundColor:COLORS.grey2,
		color:'pink'
	},
    buttonLogin: {
		backgroundColor:COLORS.primaryBlue,
		width:'100%',
		marginTop: 20,
		marginBottom: 30,
	}
})
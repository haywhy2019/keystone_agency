import { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { CameraIcon} from "../../../constants/icons";

//components
import { DropDownInput,Input,CustomButton,OptionBox} from "../../../components";

const animals=['dog', 'cat'];

const ChequeDeposit=()=>{
    const [cameraSelectedIndex, setCameraSelected]= useState([]);

    const captureCheque=(index)=>{
        
        if(cameraSelectedIndex.includes(index)){
            //this checks if the front/back have been captured
            setCameraSelected((previous)=>{
                const newIndex=previous.findIndex((item)=>item===index);//finds the index of the icon that was touched
                const newArray=previous
                newArray.splice(newIndex,1);//this removes the index from the array
                return [...newArray];
            })
            
        }else{
            //this adds the index of the cheque if it has not been captured
            setCameraSelected((previous)=>{
                return [...previous,index]
            })
        }
    }

    const deliveryData=[
        {boxText:'Cheque Front', icon:<CameraIcon/>},
        {boxText:'Cheque Back', icon:<CameraIcon/>}
    ]

    return(
    <ScrollView style={styles.scrollContainer}>
        <View contentContainerStyle={{flexGrow:1}}>
            <View style={{alignItems:'center'}}>
                <Text style={[GLOBAL_STYLE.h5,{textAlign:'center',marginVertical:20, width:'60%', color: COLORS.grey}]}>Please capture the code line 
                    details at the bottom of your cheque
                </Text>
            </View>
            
            <View style={styles.OptionBoxContainer}>
                {
                    deliveryData.map((item, index)=>{
                        const {icon, boxText}= item;
                        return(
                            <OptionBox 
                                icon={icon}
                                tickIconColor={COLORS.primaryBlue}//this determines the color of the tick
                                boxText={boxText} 
                                key={boxText+index}
                                choosenState={cameraSelectedIndex.includes(index) ? true : false}//this determines if the tick shows or not
                                onPress={()=>captureCheque(index)}
                                />
                        )
                    })
                }
            </View>
            
            <Input
                placeholder="Cheque Leaf Number"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
            />
            <Input
                placeholder="Bank Sort Code"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
            />
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="chequesource"
                valueField="chequesource"
                placeholder="Cheque Source Account"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                />
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="chequetype"
                valueField="chequetype"
                placeholder="Cheque Type"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
                />
            <Input
                placeholder="Cheque Amount"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
                />
            <Input
                placeholder="Account To Deposit Cheque"
                value={null}
                style={styles.reactivateInput}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
                icon={<Ionicons name="calendar-outline" size={24} color="black" />}
                />

            <View style={{flex:1}}/>


            <CustomButton
				buttonContainerStyle={{marginBottom: 20}}
				
				buttonText={'Submit'}
				buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
			  />
        </View>
    </ScrollView>
    )
}

export default ChequeDeposit

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
		marginTop: 40,
		marginBottom: 30,
	}
})
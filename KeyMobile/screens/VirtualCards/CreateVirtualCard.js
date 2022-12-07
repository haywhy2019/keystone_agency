import { useState } from "react";
import { ScrollView, StyleSheet, View, Text, Modal} from "react-native";
import { GLOBAL_STYLE,COLORS } from "../../../constants";
import { AntDesign } from '@expo/vector-icons';

//redux
import { useSelector } from "react-redux";

//components
import { AccountCard,DropDownInput,Input,CustomButton, BottomNotification } from "../../../components";
import { FlashMode } from "expo-camera/build/Camera.types";
import { color } from "react-native-reanimated";

const animals=['cat','dog']
const CreateVirtualCard=({navigtion})=>{
    const customerDetails = useSelector((state) => state.auth.user);
    const [successModal,setsuccessModal]= useState(false)


    return(
    <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexGrow:1}}>

        <Text style={[GLOBAL_STYLE.h4,{marginBottom:20,textAlign:'center'}]}>Provide Details For Your Virtual Card</Text>
        <AccountCard data={customerDetails.accounts} />

        <View style={{paddingHorizontal:20}}>
            <DropDownInput
                data={animals}
                labelCustomStyle={styles.inputLabel}
                labelField="selectcurrency"
                valueField="selectcurrency"
                placeholder="Select Currency"
                value={null}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
            />
            <Input
                placeholder="Enter Alias name"
                value={null}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
                icon={<AntDesign name="user" size={20} color={COLORS.grey} />}
            />
            <Input
                placeholder="Enter Amount (Maximum of 2,000,000)"
                value={null}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
            />
            <Input
                placeholder="Enter Card Pin"
                value={null}
                style={{color:COLORS.grey}}
                inputCustomStyle={{backgroundColor:COLORS.grey2}}
                placeholderTextColor={COLORS.primaryBlue}
                icon={<AntDesign name="eyeo" size={20} color={COLORS.grey} />}
            />
        </View>

        <View style={{flex:1}}/>

        <View style={{paddingHorizontal:20,marginBottom:20}}>
            <CustomButton
                buttonContainerStyle={styles.buttonLogin}
                buttonText={'Create Dollar Card'}
                buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
            />
            <Text style={{textAlign:'center'}}>By clicking on the continue button, you are acknowledging 
            to <Text style={styles.markOrange}>our terms</Text> and <Text style={styles.markOrange}>conditions</Text></Text>
        </View>

        <BottomNotification 
            show={successModal}
            headerText="Successful"
            infoText={`Your virtrual card was successfully created`}
            hideButton
        />

        
    </ScrollView>
    )
}

export default CreateVirtualCard

const styles= StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor: COLORS.white,
        paddingVertical:20,
    },
    markOrange:{
        color: 'orange',
    }
})
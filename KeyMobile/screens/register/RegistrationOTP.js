import { StyleSheet,View, Text } from "react-native";
import { COLORS,GLOBAL_STYLE } from "../../../constants";
import { Feather } from '@expo/vector-icons';
import TopBarCalc from "./TopBarCalc";

//components
import { CustomButton,Input } from "../../../components";

const RegistrationOTP=({navigation})=>{

    return(
        <View style={{flex:1}}>
            <View style={{height:5, backgroundColor:COLORS.primaryBlue2, width:`${TopBarCalc(2)}%`}}/>

            <View style={styles.container}>
                <Text style={[GLOBAL_STYLE.h1,{textAlign:'center'}]}>OTP Verification</Text>
                <Text style={[GLOBAL_STYLE.h3,{textAlign:'center',color:COLORS.grey, width:'80%',alignSelf:'center'}]}>Please enter the OTP sent to your mobile number</Text>
                <Input
                        placeholder={'Enter OTP'}
                        inputCustomStyle={{borderColor: COLORS.primaryBlue,borderWidth:0.3}}
                        icon={<Feather name="hash" size={24} color={COLORS.grey} />}
                    />


                <View style={{flex:1}}/>
                <CustomButton
                    buttonText={'CONTINUE'}
                    onPress={()=>navigation.navigate('RegistrationCompleting')}
                />
            </View>


        </View>
    )
}

export default RegistrationOTP;

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white,
        paddingHorizontal:20,
        paddingVertical:50,
    }
})



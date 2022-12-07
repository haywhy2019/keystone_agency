import { StyleSheet,View,Text } from "react-native";
import { COLORS,GLOBAL_STYLE } from "../../../constants";
import TopBarCalc from "./TopBarCalc";

//components
import { CustomButton } from "../../../components";
import { ThankYouPhoneIcon } from "../../../constants/icons";

const RegistrationCompleted=({navigation})=>{
    return(
        <View style={{flex:1,backgroundColor:COLORS.white}}>
            <View style={{height:5, backgroundColor:COLORS.primaryBlue2, width:`${TopBarCalc(4)}%`}}/>

            <View style={styles.container}>
                <Text style={[GLOBAL_STYLE.h1,{textAlign:'center',marginBottom:130}]}>Registration Complete</Text>
                
                <ThankYouPhoneIcon style={{marginBottom:30}}/>

                <Text style={[GLOBAL_STYLE.h3Bold]}>ANDREW BABATUNDE AMINU</Text>
                <Text style={[GLOBAL_STYLE.h3Bold]}>NUBAN: 2453567989</Text>


                <View style={{flex:1}}/>
                <CustomButton
                    buttonText={'LOGIN'}
                    onPress={()=>navigation.navigate("key mobile")}
                    buttonContainerStyle={{width:'100%'}}
                />
                
            </View>


        </View>
    )
}

export default RegistrationCompleted;

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white,
        paddingHorizontal:20,
        paddingVertical:50,
        alignItems:'center'
    }
})


import { StyleSheet, View, Text, ScrollView } from "react-native";
import {  Ionicons } from "@expo/vector-icons";

//components
import { AtmCard,Input,CustomButton} from "../../../components";

// theme
import { COLORS , FONTS,GLOBAL_STYLE,SIZES} from "../../../constants";

const userData = [
    { name: "Account Summary", icon: "ios-eye-off-sharp" },
  ];
const ChangeLimits=()=>{
    return(
    <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexGrow:1}}>
        <AtmCard item={userData[0]}/>

        <View style={styles.transactionContainer}>
            <Text style={{marginBottom:10}}>Transaction Limit</Text>
            <Input
              placeholder="N 200,000,00"
              value={null}
			  style={styles.activationInput}
			  inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}
			  label="ATM"
			/>
            <Input
              placeholder="N 200,000,00"
              value={null}
			  style={styles.activationInput}
			  inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}
			  label="POS"
			/>
            <Input
              placeholder="N 200,000,00"
              value={null}
			  style={styles.activationInput}
			  inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}
			  label="Web"
			/>
        </View>

        <View style={{flex: 1}}/>

        <View style={styles.buttonContainer}>
            <CustomButton
                    buttonContainerStyle={styles.buttonLogin}
                    buttonText={'Set Limit'}
                    buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
                />
        </View>
            
    </ScrollView>
    )
    
}

export default ChangeLimits;

const styles=StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor:COLORS.white,
        paddingVertical:20,
    },
    transactionContainer:{
        paddingVertical:20,
        paddingHorizontal:20,
    },
    buttonContainer:{
        paddingHorizontal:20,
    }
})
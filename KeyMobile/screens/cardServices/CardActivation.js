import {StyleSheet,View, Text,ScrollView} from 'react-native';
import {  Ionicons } from "@expo/vector-icons";

//components
import {
  CustomButton,
	Input,
	AccountCard
} from "../../../components";
import { useSelector } from "react-redux";

//theme
import { COLORS ,GLOBAL_STYLE} from "../../../constants";



const CardActivation=()=>{  
	const {
		accounts,
		
	  } = useSelector((state) => state.auth.user);
    return(
<ScrollView  contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobalNopadding,{justifyContent: "flex-start"}]} style={{marginTop: 10}}>
	<AccountCard data={accounts}/>
	<View style={{paddingHorizontal: "5%", flex: 1}}>
	<Input
              placeholder="Card First Six Digits"
              value={null}
				style={styles.activationInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}
			/>
        <Input
              placeholder="Card Last Four Digits"
              value={null}
				style={styles.activationInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}
			  icon={<Ionicons
                        name="eye"
                        size={16}
                        color={COLORS.grey}
                      />}
			/>
	 <Input
                placeholder="Card pin"
               
                keyboardType="numeric"
               
                placeholderTextColor={COLORS.primaryBlue}
                secureTextEntry={true}
                maxLength={4}
              />
      
		<View style={{flex: 1,justifyContent: "flex-end" }}>
		<CustomButton
				buttonContainerStyle={styles.buttonLogin}
				buttonText={'Activate'}
				buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
			  />
			</View>	
	
	</View>
		
		
	
</ScrollView>
    )
}

export default CardActivation;


const styles= StyleSheet.create({
    scrollContainer:{
        flexGrow: 1 ,
        backgroundColor:COLORS.white,
        paddingHorizontal:20,
    },
	activationInput:{
		backgroundColor:COLORS.grey2,
	},
	buttonLogin: {
		backgroundColor:COLORS.primaryBlue,
		width:'100%',
		marginTop: 20,
		marginBottom: 30,
	  }
})
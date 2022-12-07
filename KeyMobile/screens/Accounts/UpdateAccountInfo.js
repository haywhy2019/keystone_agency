import {StyleSheet, View, Text,ScrollView} from'react-native';

//components
import {
  DropDownInput,
  CustomButton,
	Input,
	CustomFilePicker
	
} from "../../../components";
import { useSelector } from "react-redux";

//theme
import { COLORS , FONTS,GLOBAL_STYLE,SIZES} from "../../../constants";

const animals=['dod', 'cac']
const UpdateAccountInfo=()=>{
	const { accounts,} = useSelector((state) => state.auth.user);

	return(
<ScrollView 
contentContainerStyle={GLOBAL_STYLE.scrollViewGlobalNopadding}
>
	<View style={styles.reactivateContainer}>
	<DropDownInput
              data={accounts}
              labelCustomStyle={styles.inputLabel}
              labelField="accountno"
                valueField="accountno"
              placeholder="Select account"
			value={null}
			placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
			renderItem={(item) => (
				<Text style={GLOBAL_STYLE.dropDownItem}>
				  {item.accountno}
				</Text>
			  )}
            />
		<Input
              placeholder="Current email address"
              value={null}
				style={styles.reactivateInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}/>
		<Input
              placeholder="New email address"
              value={null}
				style={styles.reactivateInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}/>
		
	
		
	
			
		<CustomButton
				buttonContainerStyle={styles.buttonLogin}
				buttonText={'Submit'}
				buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
			  />
		
	</View>
</ScrollView>
	)
}

export default UpdateAccountInfo;

const styles= StyleSheet.create({
	reactivateContainer:{
		flex:1,
		backgroundColor:COLORS.white,
		paddingHorizontal:20,
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
	  },
	personalFilesContainer:{
		marginTop: 30,
		marginBottom:40
	}
})

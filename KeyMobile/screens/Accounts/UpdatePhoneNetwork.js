import {StyleSheet, View, Text,ScrollView} from'react-native';

//components
import {
  DropDownInput,
  CustomButton,
	Input,
	CustomFilePicker
} from "../../../components";

//theme
import { COLORS , FONTS,GLOBAL_STYLE,SIZES} from "../../../constants";
import { useSelector } from "react-redux";


const UpdatePhoneNetwork=()=>{
	const { accounts,} = useSelector((state) => state.auth.user);

	return(
<ScrollView contentContainerStyle={GLOBAL_STYLE.scrollViewGlobalNopadding}>
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
              placeholder="Enter Current Mobile Number"
              value={null}
				style={styles.reactivateInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}/>
			
			<Input
              placeholder="Enter New Mobile Number"
              value={null}
				style={styles.reactivateInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}/>

		<View style={styles.personalFilesContainer}>
			
		</View>
			
		<CustomButton
				buttonContainerStyle={styles.buttonLogin}
				buttonText={'Submit'}
				buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
			  />
		
	</View>
</ScrollView>
	)
}

export default UpdatePhoneNetwork;

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
		marginTop: 355,
		marginBottom: 30,
	  },
	personalFilesContainer:{
		marginTop: 30,
		marginBottom:40
	}
})

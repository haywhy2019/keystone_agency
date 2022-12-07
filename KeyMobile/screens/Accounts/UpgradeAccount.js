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

const animals=['dod', 'cac']
const UpgradeAccount=()=>{
	return(
<ScrollView>
	<View style={styles.reactivateContainer}>
		<Input
              placeholder="Enter Account Number"
              value={null}
				style={styles.reactivateInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}/>
		<Input
              placeholder="Home Address"
              value={null}
				style={styles.reactivateInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}/>
		<DropDownInput
              data={animals}
              labelCustomStyle={styles.inputLabel}
              labelField="currentstate"
              valueField="currentstate"
              placeholder="Select Current State"
			value={null}
			placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
            />
		<DropDownInput
              data={animals}
              labelCustomStyle={styles.inputLabel}
              labelField="currentbranch"
              valueField="currentbranch"
              placeholder="Select Branch"
			value={null}
			placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
            />
		<Input
              placeholder="DOA Code (Optional)"
              value={null}
			style={styles.reactivateInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
            placeholderTextColor={COLORS.primaryBlue}/>
			
		<View style={styles.personalFilesContainer}>
			<CustomFilePicker
				label={'Upload ID (Front & Back)'}
				/>
			<CustomFilePicker
				label={'Upload Selfie'}
				/>
			<CustomFilePicker
				label={'Upload Signature'}
				/>
			<CustomFilePicker
				label={'Upload proof of Address'}
				/>
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

export default UpgradeAccount;

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

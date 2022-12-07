import {useState} from 'react';
import {StyleSheet,View, Text, TextInput, ScrollView} from 'react-native';

//components
import {
  DropDownInput,
  CustomButton,
	Input
} from "../../../../components";

//theme
import { COLORS , FONTS,GLOBAL_STYLE,SIZES} from "../../../../constants";

const animals=['Cat', 'Dog']

const NqrCreatePayments=()=>{
	const [isCustomerSpecifying, setIsCustomerSpecifying]=useState(false);
	
	const revealAccount=()=>{
		setIsCustomerSpecifying(true);
	}
	
	return(
		<ScrollView style={styles.scrollContainer}>
	<View style={styles.container}>
		<Text style={[GLOBAL_STYLE.h5Bold,styles.heading]}>Other People can scan your QR-code to make a transfer to you</Text>
			
		<View style={styles.qrArea}></View>
		
		<Text style={[GLOBAL_STYLE.h5,{color:COLORS.primaryBlue,fontSize:SIZES.responsiveHeight("1.8%")}]}>NQR for account {'1024893829'}</Text>
			
		<View style={styles.actionBtnContainer}>
			{
				isCustomerSpecifying && 
					(<>
				<DropDownInput
              data={animals}
              labelCustomStyle={styles.inputLabel}
              labelField="accountno"
              valueField="accountno"
              placeholder="Select account"
			value={null}
             
              placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
            />
				<Input
              placeholder="Amount"
              keyboardType="numeric"
              value={null}
              
              placeholderTextColor={COLORS.primaryBlue}/>
				
				<Input
              placeholder="Narration"
              value={null}
              
              placeholderTextColor={COLORS.primaryBlue}/>	
				 </>)
				
			}
			<CustomButton
				buttonContainerStyle={styles.buttonLogin}
				buttonText={!isCustomerSpecifying?"SPECIFY AMOUNT AND REASON": "GENERATE NQR"}
				buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
				onPress={!isCustomerSpecifying?revealAccount: null}
			  />
			<CustomButton
				buttonContainerStyle={styles.buttonOutline}
				buttonText="SHARE"
				buttonTextStyle={{...GLOBAL_STYLE.h3}}
			  />	
		</View>
	</View>
			</ScrollView>
	)
}

export default NqrCreatePayments;
		

const styles=StyleSheet.create({
	scrollContainer:{
		backgroundColor:'#fff',
		flex:1,
	},
	container:{
		flex:1,
		backgroundColor:'#fff',
		alignItems:'center',
		paddingHorizontal: 20,
	},
	heading:{
		width: '65%',
		textAlign:'center',
		marginVertical:25,
		color: COLORS.grey,
		fontSize:SIZES.responsiveHeight("1.6%")
	},
	qrArea:{
		backgroundColor:'grey',
		height:220,
		width: 220,
		marginBottom:20
	},
	actionBtnContainer:{
		width: '100%',
		marginTop:30,
		paddingTop:5,
		borderTopColor: COLORS.grey,
		borderTopWidth: 1,
	},
	buttonLogin: {
		backgroundColor:COLORS.primaryBlue2,
		width:'100%',
		marginTop: 20,
	  },
	buttonOutline: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: COLORS.primaryBlue,
		marginTop: 20,
		marginBottom: 20,
	  },
	buttonInfo: {
		color: COLORS.grey,
		textAlign: "center",
		fontSize: 10,
		paddingTop: 5,
		fontFamily: FONTS.normal,
	  },
	ShareTextStyle:{
		color: COLORS.primaryBlue,
		fontSize:18,
		fontFamily: FONTS.normal
	}
})




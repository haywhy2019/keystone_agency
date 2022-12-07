import {useState} from 'react';
import {StyleSheet,View, Text, TextInput, ScrollView} from 'react-native';

//components
import {
  DropDownInput,
  CustomButton,
	Input,
	AccountCard
} from "../../../components";

//theme
import { COLORS , FONTS,GLOBAL_STYLE,SIZES} from "../../../constants";

//redux
import { useSelector } from "react-redux";


const NqrCreatePayments=()=>{
	const customerDetails = useSelector((state) => state.auth.user);
	
	const revealAccount=()=>{
		setIsCustomerSpecifying(true);
	} 
	
	return(
		<ScrollView style={styles.scrollContainer} contentContainerStyle={{paddingVertical:20}}>
			<AccountCard data={customerDetails.accounts} hideCard />
			
			<View style={styles.container}>
					
				<View style={styles.qrArea}></View>
				
				<Text style={[GLOBAL_STYLE.h5,{color:COLORS.primaryBlue,fontSize:SIZES.responsiveHeight("1.8%"),textTransform:'uppercase'}]}>ANDREW AMINU</Text>
					
				<View style={styles.actionBtnContainer}>
					<Input
						placeholder="Amount"
						keyboardType="numeric"
						value={null}
						placeholderTextColor={COLORS.primaryBlue}
					/>

					<DropDownInput
						data={[{label:'Sender', value:'Sender'},{label:'Receiver/Merchant', value:'Receiver/Merchant'}]}
						labelCustomStyle={styles.inputLabel}
						placeholder="Enter Fee Bearer"
						labelField="label"
                		valueField="value"
						placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
						onChange={(item)=>{}}
					/>
						
					<Input
						placeholder="Narration"
						value={null}
						placeholderTextColor={COLORS.primaryBlue}
					/>

					<View style={{flex:1}}/>

					<View style={{flexDirection:'row', justifyContent:'space-between', marginTop:30}}>
						<CustomButton
							buttonContainerStyle={{width:'45%'}}
							buttonText="Share QR Code"
							buttonTextStyle={{textTransform:'none'}}
						/>	
						<CustomButton
							buttonContainerStyle={{width:'45%'}}
							buttonText="Save QR Code"
							buttonTextStyle={{textTransform:'none'}}
						/>	
					</View>
				
					
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
		marginBottom:10,
		marginTop:30
	},
	actionBtnContainer:{
		flex:1,
		width: '100%',
		marginTop:20,
		paddingTop:20,
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




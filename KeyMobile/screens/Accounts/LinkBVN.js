import { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { images,COLORS, isAndroid} from "../../../constants";

//components
import { AccountCard,Input,CustomButton } from '../../../components';
import { TwoFactorAuth } from '../../components';

//redux
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';


const LinkBVN=()=>{
	const customerDetails = useSelector((state) => state.auth.user);
	const [showTwoAuth, setShowTwoAuth]=useState(false);
	const onSubmit=()=>{
		setShowTwoAuth(false)
	}

	return(
	<ScrollView style={styles.scrollContainer}>
		<AccountCard data={customerDetails.accounts} />

		<View style={{paddingHorizontal:20}}>
			<Input
				placeholder={'Enter BVN'}
			/>

			<CustomButton
				buttonText={'LINK'}
				onPress={()=>setShowTwoAuth(true)}
			/>

		</View>

		<TwoFactorAuth
			show={showTwoAuth}
			onSubmit={onSubmit}
		/>
	</ScrollView>
	)
}

export default LinkBVN;

const styles= StyleSheet.create({
	scrollContainer:{
		flex:1,
		backgroundColor:COLORS.white,
		paddingTop:20
	},
	upgradeContainer:{
		flex:1,
		backgroundColor:'pink'
	}
})
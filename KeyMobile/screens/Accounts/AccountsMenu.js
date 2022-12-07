import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, Image,ScrollView} from 'react-native';
import { MenuOptionsCard } from '../../components'
import { images,COLORS, isAndroid} from "../../../constants";
import { StatusBar } from "expo-status-bar";
import { getItem } from '../../../utilities/helperFunctions/asyncStorage';

//components
import { MenuImageLeftIconRight } from "../../components";
import { AccountCard } from '../../../components';

//redux
import { useSelector, useDispatch } from "react-redux";


const AccountsMenu=({navigation})=>{
	
	const customerDetails = useSelector((state) => state.auth.user);

	  
	return(
	<ScrollView style={styles.scrollContainer}>
		<StatusBar style={isAndroid ? "light" : "dark"} />
		<AccountCard data={customerDetails.accounts} />

		<View style={styles.container}>
			<MenuImageLeftIconRight
				label="Reactivate Account"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('SelfReactivateAccount')}
				/>
			<MenuImageLeftIconRight
				label="Upgrade Account"
				leftIcon={<Image
					source={images.keyMobileLogoRound}
					style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('UpgradeAccount')}
				/>
			<MenuImageLeftIconRight
				label="Update Account Information"
				leftIcon={<Image
					source={images.keyMobileLogoRound}
					style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('UpdateAccountInfo')}
				/>
			<MenuImageLeftIconRight
				label="Update Phone Network"
				leftIcon={<Image
				source={images.keyMobileLogoRound}
				style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('UpdatePhoneNetwork')}
				/>
			<MenuImageLeftIconRight
				label="Account Officers"
				leftIcon={<Image
					source={images.keyMobileLogoRound}
					style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('AccountOfficers')}
				/>
			<MenuImageLeftIconRight
				label="Link BVN"
				leftIcon={<Image
				source={images.keyMobileLogoRound}
				style={styles.logoImage}/>}
				onPress={()=>navigation.navigate("LinkBVN")}
				
				/>
			<MenuImageLeftIconRight
				label="Statement & Receipts"
				leftIcon={<Image
				source={images.keyMobileLogoRound}
				style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('StatementsMainpage')}
				/>
		</View>
	</ScrollView>
	)
}

export default AccountsMenu;

const styles=StyleSheet.create({
	scrollContainer:{
		flex:1,
		backgroundColor:COLORS.white,
		paddingTop:20
	},
	container:{
		flex:1,
		marginTop:20
	},
	logoImage: {
		width: 20,
		height: 20,
		marginRight: 5,
	  }
})

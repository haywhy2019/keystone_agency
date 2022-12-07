import {StyleSheet,View, Text,Image} from 'react-native';
import { images,COLORS } from '../../../constants';

//components
import { MenuImageLeftIconRight } from '../../components';

const ChequeServicesMenu=({navigation})=>{
    return(
        <View style={styles.mainContainer}> 
            <MenuImageLeftIconRight
				label="Cheque Book Request"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('ChequeBookRequest')}
			/>
            <MenuImageLeftIconRight
				label="Confirm Cheque"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('ConfirmCheque')}
			/>
            <MenuImageLeftIconRight
				label="Cheque Deposit"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('ChequeDeposit')}
			/>
            <MenuImageLeftIconRight
				label="Stop Cheque"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('StopCheque')}
			/>
        </View>
    )
}

export default ChequeServicesMenu;

const styles= StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:COLORS.white
    },
    logoImage: {
		width: 20,
		height: 20,
		marginRight: 5,
	  }
})
import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'
import { MenuOptionsCard, MenuImageLeftIconRight } from '../../components'
import { GLOBAL_STYLE,COLORS,images } from '../../../constants'
import { useNavigation } from "@react-navigation/native";
const EnquiresMenu = ({navigation}) => {
  // const navigation = useNavigation()
  return (
    <View style={GLOBAL_STYLE.background}>
    <View style={{marginTop: 15}}>
    </View>
     <MenuImageLeftIconRight
				label="Enquiries and Request"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('EnquiresScreen')}
			/>

<MenuImageLeftIconRight
				label="Dispute Management"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('DisputeManagementScreen')}
			/>
      <MenuImageLeftIconRight
				label="FAQ"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate("FaqMenu")}
			/>
        <MenuImageLeftIconRight
				label="Contact Us"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('ContactUs')}
			/>
    </View>
  )
}

export default EnquiresMenu
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
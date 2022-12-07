import { StyleSheet, View, Image,Text, ScrollView } from "react-native";
import { images,COLORS } from "../../../constants";

//components
import { MenuImageLeftIconRight} from "../../components";

const CardRequest=({navigation})=>{
    return(
        <View style={styles.container}>
            <MenuImageLeftIconRight
				label="Credit Card Request"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
                onPress={()=>navigation.navigate('CreditCardRequest')}
				/>
            <MenuImageLeftIconRight
				label="Debit Card Request"
				leftIcon={<Image
							source={images.keyMobileLogoRound}
							style={styles.logoImage}/>}
				onPress={()=>navigation.navigate('DebitCardRequest')}
				/>
        </View>
    )
}

export default CardRequest

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.white,
    },
    logoImage: {
		width: 20,
		height: 20,
		marginRight: 5,
	  }
})
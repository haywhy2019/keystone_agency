import { StyleSheet,View,Text } from "react-native";
import { GLOBAL_STYLE } from "../constants";

//component
import CustomButton from "./CustomButton";

const InfoIconCard=({cardHeading,cardText,cardIcon,onPress,buttonText,cardBodyStyle})=>{
    return(
    <View style={[styles.infoContainer,cardBodyStyle]}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{width:'80%'}}>
                {cardHeading && <Text style={[GLOBAL_STYLE.h4Bold]}>{cardHeading}</Text>}

                <Text style={[GLOBAL_STYLE.h4]}>{cardText ?cardText : 'Add Text Here'}</Text>
            </View>
            
            {cardIcon? cardIcon : null}
        </View>

        <View style={{flex:1}}/>

        <CustomButton 
            onPress={onPress}
            buttonText={buttonText}
            buttonContainerStyle={{width: 150}}
        />
        
        
    </View>
    )
}

export default InfoIconCard

const styles=StyleSheet.create({
    infoContainer:{
        minHeight: 200,
        backgroundColor: 'rgba(189, 228, 254, 0.25)',
        paddingVertical:30,
        paddingHorizontal:25,
        marginVertical:10,
        borderRadius:5,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
        elevation: 2,
    }
})
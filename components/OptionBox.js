import {StyleSheet,View, Text, TouchableOpacity} from 'react-native';
import { GLOBAL_STYLE,COLORS } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import { GiftBoxIcon } from '../constants/icons';

const OptionBox=({icon,boxText,choosenState,onPress,tickIconColor,boxStyle})=>{
    return(
    <TouchableOpacity onPress={onPress}>
         <View style={styles.mainBox} >
            { choosenState && <Ionicons name="checkmark-circle" size={18} color={tickIconColor?tickIconColor : 'orange'} style={styles.selectIndicator}/>}
            
            {icon ? icon : <GiftBoxIcon/>}
            <Text style={[GLOBAL_STYLE.h5Bold,{marginTop: 10}]}>{boxText ? boxText : 'Add Text'}</Text>
        </View>
    </TouchableOpacity>
    )
}

export default OptionBox

const styles=StyleSheet.create({
    mainBox:{
        position:'relative',
        height: 130,
        width: 130,
        borderColor: COLORS.grey,
        borderWidth: 1,
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'center',
    },
    selectIndicator:{
        position:'absolute',
        right: 5,
        top:5,
    }
})
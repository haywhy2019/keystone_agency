import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS , GLOBAL_STYLE,} from '../../constants'
import { Ionicons} from "@expo/vector-icons";


const StandingInstructionItemDisplay = ({ leftLabel,leftText, rightLabel,rightText}) => {
  return (
       <View style={[{alignItems:'center',justifyContent:'center',borderBottomWidth:0.5,borderBottomColor:'#C4C4C4',flexDirection:'row',justifyContent:'space-between',width:'97%',}]}>
					    <View style={styles.Container}>
                        <Text style={[GLOBAL_STYLE.h4,{color: COLORS.primaryBlue}]}>{leftLabel}</Text>
                        <Text style={[GLOBAL_STYLE.h3Bold,{color: COLORS.primaryBlue}]}>{leftText}</Text>
                        </View>
                        <View style={{paddingVertical:2,width:180}}>
                        <Text style={[GLOBAL_STYLE.h4,{color: COLORS.primaryBlue,}]}>{rightLabel}</Text>
                        
                        <Text style={[GLOBAL_STYLE.h3Bold,{color: COLORS.primaryBlue,}]}>{rightText}</Text>
                        </View>
                 
       
                     
        </View> 

        
  )
}

export default StandingInstructionItemDisplay

const styles = StyleSheet.create({
Container:{paddingVertical:5,paddingHorizontal:20,alignItems:'flex-start',paddingLeft:'1%'}


})
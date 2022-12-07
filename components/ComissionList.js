import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DatePicker from './DatePicker'
import appTheme, { COLORS } from '../constants/theme'

const ComissionList = ({label,label1}) => {
  return (
    <View style={{flexDirection: "row",justifyContent: 'space-between',paddingVertical:8, borderBottomWidth:0.5,borderColor:'#C4C4C4' }}>
    
 <Text style={{color:COLORS.primaryBlue}}>
       {label}
       </Text>
       <Text style={{color:COLORS.primaryBlue}}>
         {label1}
       </Text>
      
      
       

    </View>
  )
}

export default ComissionList

const styles = StyleSheet.create({})
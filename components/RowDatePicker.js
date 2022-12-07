import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DatePicker from './DatePicker'

import { COLORS, FONTS } from "../constants";

const RowDatePicker = (props) => {
  return (
    <View style={{flexDirection: "row",justifyContent: "space-around"}}>
        <View style={{width: "38%",marginLeft:'3%'}}>
        <DatePicker
        placeholder={'start date'}
        COLORS={COLORS.primaryBlue}
        {...props}
        />
        </View>
        <View style={{width: "38%",marginRight:'10%'}}>
     <DatePicker
       placeholder={'end date'}
       color={COLORS.primaryBlue}
       
     />
     </View>
       

    </View>
  )
}

export default RowDatePicker

const styles = StyleSheet.create({})
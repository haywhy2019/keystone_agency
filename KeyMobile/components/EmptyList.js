import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GLOBAL_STYLE, COLORS } from '../../constants'

const EmptyList = ({emptyText,customStyle, noData}) => {
  return (
    <View style={{paddingHorizontal: "5%"}}>
          <Text style={!noData ? [GLOBAL_STYLE.h4,{textAlign: 'center'}] : [GLOBAL_STYLE.h4,{color: COLORS.error,marginTop: 10,textAlign: 'center'}]}>{emptyText}</Text>
        </View>
  )
}

export default EmptyList

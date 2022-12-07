import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DatePicker, CustomButton } from '../../../../components'

const ThirdTab = () => {
  return (
    <View
    style={{
      marginTop: 20,
      flexDirection: "column",
      justifyContent: "space-evenly",
      flex: 1,
    }}
  >
    <View>
      <DatePicker inputLabel="Enter Start Date" placeholder={"DD/MM/YYYY"} />

      <DatePicker inputLabel="Enter End Date" placeholder={"DD/MM/YYYY"} />
    </View>
    <CustomButton buttonText={"Download Transaction"} />
  </View>
  )
}

export default ThirdTab

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DatePicker, CustomButton } from '../../../../components'

const SecondTab = () => {
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
      <CustomButton buttonText={"Show Transaction"} />
    </View>
  )
}

export default SecondTab

const styles = StyleSheet.create({})
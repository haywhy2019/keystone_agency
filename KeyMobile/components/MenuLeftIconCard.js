import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../constants'
import { Ionicons} from "@expo/vector-icons";


const MenuLeftIconCard = ({onPress, leftIcon, label, labelStyle}) => {
  return (
   <TouchableOpacity onPress={onPress}>
      <View style={styles.menuCardContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {leftIcon && leftIcon }
          <Text style={{...styles.menuCardContainerText,...labelStyle}}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MenuLeftIconCard

const styles = StyleSheet.create({
  menuCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.primaryBlue,
    backgroundColor: "white",
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    paddingHorizontal: 20,
    fontFamily: FONTS.normal,
  },
  menuCardContainerText: {
    color: COLORS.primaryBlue,
    marginLeft: 15,
    fontFamily: FONTS.normal,
  },
})
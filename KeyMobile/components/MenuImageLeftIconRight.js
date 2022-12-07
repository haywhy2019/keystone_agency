import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../constants'
import { Ionicons} from "@expo/vector-icons";


const MenuImageLeftIconRight = ({onPress, leftIcon, rightIcon, label}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuCardContainer}>
        <View style={{ flexDirection: "row",alignItems:'center' }}>
          {leftIcon ? leftIcon : (  
            <Ionicons
            name="lock-closed-sharp"
            size={18}
            color={COLORS.primaryBlue}
          /> )}
          <Text style={styles.menuCardContainerText}>{label}</Text>
        </View>
        {rightIcon ? (
          rightIcon
        ) : (
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={COLORS.primaryBlue}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default MenuImageLeftIconRight

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
    marginLeft: 10,
    fontFamily: FONTS.normal,
  },
})
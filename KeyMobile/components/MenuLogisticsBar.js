import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../constants'
import { Ionicons} from "@expo/vector-icons";


const MenuLogisticsBar = ({onPress, leftIcon, rightIcon, label,labeltwo}) => {
  return (
    <TouchableOpacity onPress={onPress}>
       
      <View style={styles.menuCardContainer}>
        <View style={{ flexDirection: "row",alignItems:'center' ,height:50,width:'80%'}}>
            <View style={{backgroundColor:'white'}}>
          {leftIcon ? leftIcon : (  
            <Ionicons
            name="lock-closed-sharp"
            size={18}
            color={COLORS.primaryBlue}
          /> )}
          </View>
          <View style={{width:'90%',height:45,paddingRight:'5%'}}>
          <Text style={styles.menuCardContainerText}>{label}</Text>
          <Text style={styles.menuCardContainerTexttwo}>{labeltwo}</Text>
          </View>
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

export default MenuLogisticsBar

const styles = StyleSheet.create({
  menuCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.primaryBlue,
  
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    paddingHorizontal: 20,
    fontFamily: FONTS.normal,
  },
  menuCardContainerText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
    fontFamily: FONTS.bold,
    marginRight:'25%',
    textAlign:'center',
    fontSize:13
  },
  menuCardContainerTexttwo: {
    color: COLORS.grey,
    marginLeft: 10,
    fontFamily: FONTS.normal,
    marginRight:'28%',
    textAlign:'center',
    fontSize:11
  },
})
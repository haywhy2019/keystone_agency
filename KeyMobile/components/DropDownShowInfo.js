import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { COLORS, FONTS,images, GLOBAL_STYLE } from '../../constants'
import { Ionicons} from "@expo/vector-icons";



const DropDownShowInfo = ({showInfo: ShowInfo, data,label}) => {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(!show)

  // label should be a component 
  // data should be an array
  // showInfo should be a component
  return (
    <TouchableOpacity onPress={toggleShow}>

    <View style={!show ? styles.menuCardContainer : styles.menuCardContainerShow}>
      <View style={{ flexDirection: "row",alignItems:'center', flex: 1 }}>
      <Image
       source={images.keyMobileLogoRound}
       style={styles.logoImage}/>
       {label}
      </View>

      { show ? (
        <Ionicons name="chevron-down-outline" 
        size={20} color={COLORS.primaryBlue} />
      ) : (
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={COLORS.primaryBlue}
        />
     
      )}

<View>

</View>
    </View>
    <View>
      {show && (data.map((item,index) => < ShowInfo item={item} key={index.toString()}/>))}
    </View>
  </TouchableOpacity>
  )
}

export default DropDownShowInfo


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
    // paddingHorizontal: 20,

  },
  menuCardContainerShow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.primaryBlue,
    backgroundColor: "white",
    height: 60,
  },
  menuCardContainerText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
    fontFamily: FONTS.normal,
  },
  logoImage: {
		width: 20,
		height: 20,
		marginRight: 20,
	  },
})
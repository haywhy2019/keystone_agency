import { StyleSheet, Text, View , Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS, GLOBAL_STYLE, images } from "../../constants";
import { useNavigation } from '@react-navigation/native';


const ExistingInvestmentCard = ({item}) => {
  const navigation= useNavigation()
  return (
    <TouchableOpacity
      onPress={()=>navigation.navigate("LiquidateScreen")}
    >
      <View style={styles.borderColor}>
        <View style={{paddingHorizontal: "5%"}}>
          <View  style={[GLOBAL_STYLE.rowBetween, styles.listCard]}>
            <Image source={images.keyMobileLogoRound} style={styles.logoImage} />
            <View style={{flex: 1}}>
              <View style={[GLOBAL_STYLE.rowBetween]}>
                <Text style={[GLOBAL_STYLE.h4Bold]}>
                  {item.name} |{item.account}
                </Text>
                <Text style={[GLOBAL_STYLE.h4Bold]}>{item.amount}</Text>
              </View>
              <View style={[GLOBAL_STYLE.rowBetween]}>
                <Text style={[GLOBAL_STYLE.h4]}>
                  {item.date1} | {item.date2}
                </Text>
                {/* <View style={[GLOBAL_STYLE.rowBetween,styles.statusContainer]}>
                  <View style={item.status == "active" ? styles.activeIndicator : styles.inActiveIndicator}></View>
                  <Text style={item.status == "active" ? styles.active : styles.inActive }>{item.status}</Text>
                </View> */}
              
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ExistingInvestmentCard


const styles = StyleSheet.create({
    borderColor: {borderBottomWidth:0.5, borderBottomColor: COLORS.primaryBlue2},
    listCard: {justifyContent: "flex-start", alignItems: "center", paddingVertical: 20},
  logoImage: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  statusContainer: {justifyContent: "flex-start", alignItems: "center", width: 85, backgroundColor: COLORS.grey2, borderRadius: 5, paddingHorizontal: 4},
  active:{
    ...GLOBAL_STYLE.h6,
    color: COLORS.primaryGreen
  },
  inActive:{
    ...GLOBAL_STYLE.h6,
    color: COLORS.primaryBlue
  },
  activeIndicator: {width: 10, height: 10, backgroundColor: COLORS.primaryGreen, marginRight: 10, borderRadius: 5},
  inActiveIndicator: {width: 10, height: 10, backgroundColor: COLORS.error, marginRight: 10, borderRadius: 5}
});
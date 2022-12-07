import { StyleSheet, Text, View, Pressable } from "react-native";
import { GLOBAL_STYLE, FONTS, COLORS, SIZES } from "../../constants";
import { TelIcon, CableBillsIcon } from "../../constants/icons";
import React from "react";

const MenuThreeRows = ({
  firstIcon,
  firstText,
  secondIcon,
  secondText,
  thirdIcon,
  thirdText,
  onPress1,
  onPress2,
  onPress3
}) => {
  return (
    <View style={{ marginHorizontal: "10%", marginTop: 20 }}>
      <View style={[GLOBAL_STYLE.rowBetween, { marginVertical: 7 }]}>
        <Pressable
          style={styles.iconBg}
          onPress={onPress1}
        >
          {firstIcon}
          <Text style={styles.menuText}>{firstText?.line1}</Text>
        {firstText?.line2 && (<Text style={styles.menuText2}>{firstText?.line2}</Text>)}  
        </Pressable>
        <Pressable
          style={secondText ?  styles.iconBg : styles.iconBgEmpty}
          onPress={onPress2}
        >
          {secondIcon}

          <Text style={styles.menuText}>{secondText?.line1}</Text>
          {secondText?.line2 && (<Text style={styles.menuText2}>{secondText?.line2}</Text>)}  
        </Pressable>
        <Pressable
          style={thirdText ? styles.iconBg : styles.iconBgEmpty}
          onPress={onPress3}
        >
          {thirdIcon}

          <Text style={styles.menuText}>{thirdText?.line1}</Text>
        {thirdText?.line2 && (<Text style={styles.menuText2}>{thirdText?.line2}</Text>)}  

        </Pressable>
      </View>
    </View>
  );
};

export default MenuThreeRows;

const styles = StyleSheet.create({
  iconBg: {
    width: SIZES.width / 4,
    height: SIZES.width / 4,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  iconBgEmpty: {
    width: SIZES.width / 4,
    height: SIZES.width / 4,
    backgroundColor: COLORS.white
  },
  menuText: {
    color: COLORS.primaryBlue,
    fontSize: SIZES.responsiveHeight("1.3%"),
    fontFamily: FONTS.normal,
    textAlign: "center",
    marginTop: 10,
  },
  menuText2: {
    color: COLORS.primaryBlue,
    fontSize: SIZES.responsiveHeight("1.3%"),
    fontFamily: FONTS.normal,
    textAlign: "center",
  },
});

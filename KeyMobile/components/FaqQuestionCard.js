import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { isAndroid, FONTS, COLORS, GLOBAL_STYLE , SIZES} from "../../constants";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const FaqQuestionCard = ({ item, index, icon }) => {
  const [iconName, setIconName] = useState("chevron-forward-outline");

  const changeIcon = () => {
    if (iconName == "chevron-down") {
      setIconName("chevron-forward-outline");
    } else {
      setIconName("chevron-down");
    }
  };
  const selectHandler = (index) => {
    console.log(index, "text");
  };

  return (
    <TouchableOpacity onPress={() => selectHandler(index)}>
      <View style={{}}>
        <View style={styles.menuCardContainer}>
          <Text style={[GLOBAL_STYLE.h4Bold,{width: SIZES.responsiveWidth("85%")}]}>{item.Question}</Text>
          <TouchableOpacity
            onPress={changeIcon}
            style={{ width: SIZES.responsiveWidth("15%")}}
          >
            <Ionicons
              name={iconName}
              size={18}
              color={COLORS.primaryBlue}
            
            />
          </TouchableOpacity>
        </View>
        {iconName == "chevron-down" ? (
          <Text style={[GLOBAL_STYLE.h4]}>{item.Answer}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default FaqQuestionCard;

const styles = StyleSheet.create({
  menuCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderColor: COLORS.primaryBlue,
    backgroundColor: "white",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    // paddingHorizontal: 20,
    fontFamily: FONTS.normal,
  },
});

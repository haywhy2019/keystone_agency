import React , {useState,useEffect} from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { COLORS, SIZES, images, GLOBAL_STYLE } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { AtmMastercardIcon } from "../constants/icons";

//async storage
import { getItem, setItem } from "../utilities/helperFunctions/asyncStorage";
//let showATMBalance;


const AtmCard = ({ item, cardIndex, onPress,single }) => {
//	const [viewATMBalance, setViewATMBalance] = useState('');
//	
//	
//	const toggleView = async () => {
//		if (viewATMBalance === "show") {
//		  setViewATMBalance("hide");
//		} else {
//		  setViewATMBalance("show");
//		}
//
//		await setItem("showATMBalance", viewATMBalance);
//
//		getView();
//	  };
	
//	useEffect(()=>{
//		const getView = async () => {
//		  showATMBalance = await getItem("showATMBalance");
//			setViewATMBalance(showATMBalance)
//		};
//		getView()
//	},[])
	
//	console.log('checking')
	
  return (

  <View>
    <Image source={images.cardBg2} style={single ? styles.singleBg : styles.sliderBg} />
    <View style={styles.content}>
      <View style={[GLOBAL_STYLE.rowBetween,{marginHorizontal: 40, paddingVertical: 25}]}>
       
        <AtmMastercardIcon />
        <Pressable 
        style={styles.cardDetailsBg}
        onPress={onPress}
        >

        <Text style={[GLOBAL_STYLE.h4Bold]}>Card Details</Text>
        </Pressable>

      </View>
      <View>

      <View style={[GLOBAL_STYLE.columnBetween, {paddingHorizontal: 40, marginTop: 20}]}>
      <Text style={[GLOBAL_STYLE.h1,{color: COLORS.white,fontSize: 20}]}>{item.cardNo}</Text>
      <View style={[GLOBAL_STYLE.rowBetween,{marginTop: 15}]}>
        <Text style={[GLOBAL_STYLE.h2Bold, {color: COLORS.white, textTransform: "uppercase",fontSize: 20}]}>{item.name}</Text>
       { !cardIndex && (<Text style={[GLOBAL_STYLE.h2, {color: COLORS.white, textTransform: "uppercase",fontSize: 20}]}>1/2</Text>)}
       </View>
      </View>
      </View>
    </View>
  </View>
);
      }

const styles = StyleSheet.create({
  sliderBg: {
    width: SIZES.width - 40,
    height: 220,
    marginLeft: 15,
    borderRadius: 10,
  },
  singleBg: {
    width: SIZES.width - 40,
    height: 220,
    borderRadius: 10,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  cardDetailsBg: {paddingHorizontal: 10,paddingVertical: 10,borderRadius: 8, backgroundColor: "white"}
});
export default AtmCard;

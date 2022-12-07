import { StyleSheet, Text, View, TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { COLORS, FONTS, isAndroid, GLOBAL_STYLE , } from '../../constants'
import { Ionicons} from "@expo/vector-icons";
import { Input } from '../../components';

const ChangeBankingLimit = (
  {onPress, 
  label,
  compStateDaily,
  compSetStateDaily,
  compStateSingle,
  compSetStateSingle,
  editableDaily,
  editableSingle
}) => {


  const changeNumberToThousand=(number)=>{
    let numberString=number;
    if(number.includes(",")){
        numberString=number.replace(/[,.]/g,"")
    }
    numberString=numberString.toString().split("").reverse() || "";
    let formattedNumber=""
    
    for(let i=0;i<numberString.length;i++){
        formattedNumber+=numberString[i]
        if((i+1)%3===0 && i>0){
            formattedNumber+=','
        }
    }
    
    formattedNumber=formattedNumber.split("")
    if(formattedNumber[formattedNumber.length-1]===","){
        formattedNumber.pop()
    }
    formattedNumber=formattedNumber.reverse().join("")
    
    return formattedNumber
  }


  return (
   <View onPress={onPress}>
      <View>
        <View style={{marginTop:'4%' }}>
          <Text
            style={
              isAndroid
                ? [GLOBAL_STYLE.h2Bold, { color: COLORS.primaryBlue, marginTop:'4%',}]
                : [GLOBAL_STYLE.h3Bold, { color: COLORS.primaryBlue,marginTop:'4%',}]
            }
          >
          {label}
          </Text> 
          <View style={styles.inputContainer}>
            <Input
              label={"Daily Limit"}
              labelCustomStyle={{color:COLORS.grey,paddingLeft:5}}
              placeholder="Daily Limit"
              keyboardType="numeric"
              placeholderTextColor={COLORS.grey}
              multiline={true}
              value={changeNumberToThousand(compStateDaily)}
              onChangeText={(text)=>{
                compSetStateDaily(text)
              }}
              inputCustomStyle={{height:30}}
              inputCustomStyleFocus={{height:30,marginTop:5}}
              style={{padding:0,marginVertical:0}}
              styleFocus={{height:'100%'}}
              editable={editableDaily}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              label={"Single Limit"}
              labelCustomStyle={{color:COLORS.grey,paddingLeft:5}}
              placeholder="Single Limit"
              keyboardType="numeric"
              placeholderTextColor={COLORS.grey}
              value={changeNumberToThousand(compStateSingle)}
              onChangeText={(text)=>{
                compSetStateSingle(text)
              }}
              inputCustomStyle={{height:30}}
              inputCustomStyleFocus={{height:30,marginTop:5}}
              style={{padding:0,marginVertical:0}}
              styleFocus={{height:'100%'}}
              editable={editableSingle}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default ChangeBankingLimit

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
  inputContainer:{
    marginVertical:5,
    backgroundColor:COLORS.grey2,
    paddingTop:15, 
    paddingHorizontal:12,
    paddingBottom:0,
    borderRadius:5,
    marginBottom:10
  }
})
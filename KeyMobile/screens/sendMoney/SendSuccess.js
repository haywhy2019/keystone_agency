import { StyleSheet, Text, View, ScrollView, Pressable ,PixelRatio,} from "react-native";
import React from "react";
import { SendMoneySuccessIcon, SendMoneyFiveStarIcon,PdfIcon, ReceiptImageIcon, ShareReceiptPdfIcon , ShareReceiptImageIcon, SavePDFIcon} from "../../../constants/icons";
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { Input , CustomButton, CustomSnackBar} from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { formattedAmount } from "../../../utilities/helperFunctions/formatAmount";
import CreateReceipt from "../../../utilities/hooks/getReceiptHook";
import moment from "moment";


/////
import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { manipulateAsync } from 'expo-image-manipulator';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';

const SendSuccess = ({route}) => {
    const navigation = useNavigation()
    const {crAccountName, amount, item} = route.params
    console.log(item, "item")
    const [printToFile,ReceiptImage, imageToFile, savePdf, saveImage, success] = CreateReceipt(item)
    // const printToFile = async () => {
   
   
    //   // On iOS/android prints the given html. On web prints the HTML from the current page.
    //   const html =  await generateHtml()
    //   const { uri } = await printToFileAsync({
    //     html,
       
    //   });
    
    //   await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    // }
  return (
    <ScrollView contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobal,{justifyContent: "flex-start"}]}>
      <View style={styles.centerContent}>
        <SendMoneySuccessIcon />
      </View>
      <View>
        <Text style={[GLOBAL_STYLE.h2Bold, styles.textCenter, styles.marginVertical]}>Transaction Successful</Text>
      <View style={styles.marginVertical}>
      <Text style={[GLOBAL_STYLE.h4, styles.textCenter]}>You have successfully sent</Text>
        <Text style={[GLOBAL_STYLE.h4Bold, styles.textCenter]}> {formattedAmount(amount)} <Text style={GLOBAL_STYLE.h4}>to</Text> {crAccountName}</Text>
        </View>  
      </View>
      <View style={[styles.centerContent, styles.marginVertical]}>
        <Text style={[GLOBAL_STYLE.h2Bold]}>Rate Us</Text>
        <SendMoneyFiveStarIcon />
      </View>

      <View style={GLOBAL_STYLE.columnBetween}>
      <Input  
      placeholder="Enter Comment (Optional)"/>
      <View>
                <Pressable style={[GLOBAL_STYLE.rowBetween,{justifyContent: 'flex-start', alignItems: 'center', marginBottom: 30}]} 
  onPress={() => {
    console.log("pressed image")
    imageToFile()}}
  >

                
                {/* <ShareReceiptPdfIcon /> */}
                <FontAwesome name="share-square-o" size={16} color={COLORS.primaryBlue} />
                <Text style={[GLOBAL_STYLE.h4Bold,{marginLeft: 10}]}>Share Receipt</Text> 
                </Pressable>
                <View style={[GLOBAL_STYLE.rowBetween]}>
                <Pressable style={[GLOBAL_STYLE.rowBetween,{justifyContent: 'flex-start', alignItems: 'center'}]} 
                onPress={() => {
                  console.log("pressed image")
                  saveImage()
                }}
                >
              
                <Ionicons name="ios-image-outline"  size={16} color={COLORS.primaryBlue} />
                <Text style={[GLOBAL_STYLE.h4Bold,{marginLeft: 10}]}>Save as Image</Text> 
                </Pressable>

                <Pressable style={[GLOBAL_STYLE.rowBetween,{justifyContent: 'flex-start', alignItems: 'center'}]} 
                onPress={() => {
                  console.log("pressed")
                  // printToFile()
                  savePdf()
                }}
                >
               
                <SavePDFIcon />
                <Text style={[GLOBAL_STYLE.h4Bold,{marginLeft: 10}]}>Save as PDF</Text> 
                </Pressable>
                </View>
                
           
              </View>
              <CustomButton
                  onPress={() => navigation.navigate("Home")}
                  buttonText="Done"
                  // buttonTextStyle={{color: COLORS.primaryBlue}}
                  buttonContainerStyle={{marginBottom: 10}}
                />

<CustomSnackBar  
success
show={success} message={success}/>
<View style={{height: 1}}>

<ReceiptImage />
</View>




             
               
               
      </View>
     
    </ScrollView>
  );
};

export default SendSuccess;

const styles = StyleSheet.create({
    textCenter: {
        textAlign: "center"
    },
    marginVertical: {
marginVertical: 10
    },
    centerContent: {
        justifyContent: "center", alignItems: "center" 
    },
   
});

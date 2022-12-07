import { Text,View,StyleSheet, ScrollView } from "react-native";
import { color } from "react-native-reanimated";
import { images,COLORS,GLOBAL_STYLE } from '../../../constants';
import {
  WalletIcon
  } from "../../../constants/icons";
import { Ionicons } from '@expo/vector-icons';
import { CustomButton, RowDatePicker} from "../../../components";
import { EvilIcons } from '@expo/vector-icons';
import ComissionList from "../../../components/ComissionList";

const AgencyCommission=({navigation})=>{
    return(
       <View style={{flex:1,backgroundColor:'white'}}>
<View style={styles.WalletIcon}>
     <View style={{backgroundColor:'#F9FAFC',paddingHorizontal: 20,paddingVertical:20,borderRadius:50}}>
        <WalletIcon/>
     </View>
        <Text style={[GLOBAL_STYLE.h1Bold,{textAlign: "center",paddingVertical:5,}]}>₦250,000</Text>
        <Text style={[GLOBAL_STYLE.h4,{paddingVertical:10,}]}>Total Commission</Text>
    
    <CustomButton buttonText={"Withdraw"} buttonContainerStyle={{width: "80%"}}/>
     
 </View>
<View style={{flexDirection:'row'}}>
    <RowDatePicker  
    placeholderTextColor={COLORS.primaryBlue}
    />
  <View style={styles.search}>
  <EvilIcons name="search" size={28} color="white" />
  </View>
</View>
<ScrollView contentContainerStyle={GLOBAL_STYLE.scrollViewGlobalNopadding}>
<View style={{paddingHorizontal: 20,paddingVertical:10}}>
  <ComissionList label={'Widthdrawal'} label1={'50,000.00'}/>
  <ComissionList label={'Transfer'} label1={'50,000.00'}/>
  <ComissionList label={'Deposit'} label1={'50,000.00'}/>
  <ComissionList label={'Bill Payment'} label1={'50,000.00'}/>
  <ComissionList label={'NQR'} label1={'50,000.00'}/>
  <ComissionList label={'Total'} label1={'50,000.00'}/>
</View>
</ScrollView>
<View style={styles.Button}>
<CustomButton buttonText={"Download Commission Details"} buttonContainerStyle={{width: "80%",backgroundColor:'white',borderWidth:0.5,borderColor:COLORS.primaryBlue}} 
buttonTextStyle={{color:COLORS.primaryBlue}} />
</View>
</View>  

    )
}


export default AgencyCommission ;
const styles= StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        backgroundColor: COLORS.white,
        paddingVertical:15
    },
search:{
  backgroundColor:COLORS.primaryBlue,paddingHorizontal: 10,height:50,marginTop:'5%',
  borderRadius:5,justifyContent:'center',alignItems:'center',marginLeft:'-6.5%',
},
WalletIcon:{ paddingHorizontal: "5%",
paddingVertical: 10,justifyContent:'center',alignItems:'center',borderBottomWidth:0.5,borderColor:'#C4C4C4'},
Button:{ 
  paddingVertical: 10,justifyContent:'center',alignItems:'center',borderBottomWidth:0.5,borderColor:'#C4C4C4'}

});
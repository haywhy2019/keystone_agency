import { useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView,TouchableOpacity,Modal,FlatList,Pressable } from "react-native";
import { Ionicons,FontAwesome } from '@expo/vector-icons';
import { COLORS, GLOBAL_STYLE } from "../../../constants";



//components
import { DropDownInput,Input,CustomButton,OptionBox,} from "../../../components";





const AgencyBankingPin=({navigation})=>{
     return(
    <ScrollView style={styles.scrollContainer}> 
        <View style={{flexGrow:1,paddingHorizontal:20}}>
                <Input
                    placeholder={'BVN'}
                    value={null}
                    style={styles.reactivateInput}
                    inputCustomStyle={{backgroundColor:COLORS.grey2}}
                    placeholderTextColor={COLORS.primaryBlue}
                    icon={null}
                  
                />
  <Input
                 placeholder={'First Name'}
                   value={null}
                   style={styles.reactivateInput}
                   inputCustomStyle={{backgroundColor:COLORS.grey2}}
                   placeholderTextColor={COLORS.primaryBlue}
                   icon={null}
                  
               />
               
               <Input
                            placeholder={'Middle Name'}
                   value={null}
                   style={styles.reactivateInput}
                   inputCustomStyle={{backgroundColor:COLORS.grey2}}
                   placeholderTextColor={COLORS.primaryBlue}
                   icon={null}
               
               />
                 <Input
                   placeholder={'Last Name'}
                   value={null}
                   style={styles.reactivateInput}
                   inputCustomStyle={{backgroundColor:COLORS.grey2}}
                   placeholderTextColor={COLORS.primaryBlue}
                   icon={null}
                 
               />

<Input
                   
                   value={null}
                   style={styles.reactivateInput}
                   inputCustomStyle={{backgroundColor:COLORS.grey2}}
                   placeholderTextColor={COLORS.grey}
                   icon={null}
                   label={'Date of Birth'}
                   placeholder={'DD/MM/YY'}
              
               />

<Input
                    placeholder={'Phone Number'}
                   value={null}
                   style={styles.reactivateInput}
                   inputCustomStyle={{backgroundColor:COLORS.grey2}}
                   placeholderTextColor={COLORS.primaryBlue}
                   icon={null}
               
               />

<Input
                   placeholder={'example@gmail.com'}
               
                   value={null}
                   style={styles.reactivateInput}
                   inputCustomStyle={{backgroundColor:COLORS.grey2}}
                   placeholderTextColor={COLORS.grey}
                   icon={null}
                   label={'Email Address'}
               />

<DropDownInput  label={'Gender'}/>



<Input
                       placeholder={'Home Address'}
                   value={null}
                   style={styles.reactivateInput}
                   inputCustomStyle={{backgroundColor:COLORS.grey2}}
                   placeholderTextColor={COLORS.primaryBlue}
                   icon={null}
              
               />

<CustomButton
                buttonText="Next"
                buttonContainerStyle={styles.button}
                onPress={() => navigation.navigate("AgencyBankingPinUpload")}
              />
        </View>

      

    </ScrollView>
    )
}


const styles=StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor: COLORS.white,
        paddingVertical:20,
        paddingBottom:40
    },
    button:{
  marginBottom:'10%'

    }
})
export default AgencyBankingPin;

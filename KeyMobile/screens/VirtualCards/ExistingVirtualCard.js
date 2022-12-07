import { useState } from "react";
import { StyleSheet, View, Text,ScrollView } from "react-native";
import { GLOBAL_STYLE,SIZES,COLORS } from "../../../constants";
import { MaterialIcons } from '@expo/vector-icons';

//components
import { VirtualCardBox,CustomButton } from "../../../components";
import { MenuImageLeftIconRight } from "../../components";
import ToggleSwitch from "toggle-switch-react-native";
import { EditCardIcon } from "../../../constants/icons";


const userData = [
    { name: "Account Summary", icon: "ios-eye-off-sharp" },
  ];

const ExistingVirtualCard=()=>{
    const [isCardBlocked,setIsCardBlocked]=useState(false);

    return(
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{flexGrow:1}}>
            <Text style={[GLOBAL_STYLE.h5, {textAlign:'center',marginTop:20}]}>Card Balance</Text>
            <Text style={[GLOBAL_STYLE.h1Bold,{textAlign:'center',fontSize:SIZES.responsiveHeight("4.5%"),}]}>{'$100.00'}</Text>

            <VirtualCardBox/>

            <View style={{marginTop:20}}>
                <MenuImageLeftIconRight
                    label="Block Card"
                    rightIcon={
                        <ToggleSwitch
                            isOn={isCardBlocked}
                            onColor={COLORS.primaryBlue}
                            offColor={COLORS.primaryBlue2}
                                // label="Save Beneficiary"
                            labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
                            size="small"
                            onToggle={()=>setIsCardBlocked(!isCardBlocked)}
                        />
                            }
                />

                <MenuImageLeftIconRight
                        label="Change Pin"
                        leftIcon={<EditCardIcon/>}
                        rightIcon={<MaterialIcons name="chevron-right" size={24} color="black" /> }
                />
                <MenuImageLeftIconRight
                        label="View Activity"
                        leftIcon={<EditCardIcon/>}
                        rightIcon={<MaterialIcons name="chevron-right" size={24} color="black" /> }
                />
            </View>
            

            <View style={{flex:1}}/>

            <View style={{paddingHorizontal:20}}>
                <CustomButton
                    buttonContainerStyle={styles.buttonLogin}
                    buttonText={'Delete Card'}
                    buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
                    onPress={()=>navigation.navigate('CreateVirtualCard')}
                />
            </View>
            
        </ScrollView>
    )
}

export default ExistingVirtualCard;

const styles=StyleSheet.create({
    scrollContainer:{
        backgroundColor: COLORS.white,
    }
})
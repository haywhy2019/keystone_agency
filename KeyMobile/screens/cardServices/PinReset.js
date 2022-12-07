import {StyleSheet, View, Text,ScrollView} from 'react-native';
import {  Ionicons } from "@expo/vector-icons";

//components
import {
    CustomButton,
      Input,
      DropDownInput
  } from "../../../components";

// theme
import { COLORS , FONTS,GLOBAL_STYLE,SIZES} from "../../../constants";


const animals=['dod', 'cac']
const PinReset=()=>{
    return(
        <ScrollView style={styles.scrollContainer} contentContainerStyle={{ flexGrow: 1 }}>
            <Input
              placeholder="Enter Old Pin"
              value={null}
				style={styles.activationInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}
			  icon={<Ionicons
                        name="eye"
                        size={16}
                        color={COLORS.grey}
                      />}
			/>
            <Input
              placeholder="Enter New Pin"
              value={null}
				style={styles.activationInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}
			  icon={<Ionicons
                        name="eye"
                        size={16}
                        color={COLORS.grey}
                      />}
			/>
            <Input
              placeholder="Confirm New Pin"
              value={null}
				style={styles.activationInput}
			inputCustomStyle={{backgroundColor:COLORS.grey2}}
              placeholderTextColor={COLORS.primaryBlue}
			  icon={<Ionicons
                        name="eye"
                        size={16}
                        color={COLORS.grey}
                      />}
			/>

            <DropDownInput
              data={animals}
              labelCustomStyle={styles.inputLabel}
              labelField="passverification"
              valueField="passverification"
              placeholder="Select Verification Option"
			value={null}
			placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
            />

            <View style={{flex: 1}}/>
			
            <CustomButton
                    buttonContainerStyle={styles.buttonLogin}
                    buttonText={'Continue'}
                    buttonTextStyle={{...GLOBAL_STYLE.h3,color:COLORS.white}}
                  />

        </ScrollView>
    )
}

export default PinReset;

const styles=StyleSheet.create({
    scrollContainer:{
        flex:1,
        backgroundColor:COLORS.white,
        paddingHorizontal:20,
    }
})
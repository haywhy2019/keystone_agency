import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//components
import {
  AtmCard,
  Input,
  CustomButton,
  DropDownInput,
} from "../../../components";

// theme
import { COLORS, FONTS, GLOBAL_STYLE, SIZES, images } from "../../../constants";

const userData = [{ name: "53XX XXXX XXXX XXXX" }];

const animals = ["dog", "cat"];
const CardReplacement = () => {
  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLE.scrollViewGlobal}>
      <View style={styles.transactionContainer}>
        <Image source={images.cardBg3} style={{ height: 200, width: "100%" }} />
        <DropDownInput
          data={animals}
          labelCustomStyle={styles.inputLabel}
          labelField="passverification"
          valueField="passverification"
          placeholder="Select Account to Link"
          value={null}
          placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
        />
        <DropDownInput
          data={animals}
          labelCustomStyle={styles.inputLabel}
          labelField="passverification"
          valueField="passverification"
          placeholder="Select Account to Debit For Charges"
          value={null}
          placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
        />
        <DropDownInput
          data={animals}
          labelCustomStyle={styles.inputLabel}
          labelField="passverification"
          valueField="passverification"
          placeholder="Select Reason"
          value={null}
          placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
        />
        <DropDownInput
          data={animals}
          labelCustomStyle={styles.inputLabel}
          labelField="passverification"
          valueField="passverification"
          placeholder="Pick Up Branch"
          value={null}
          placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
        />
      </View>

      <CustomButton
        buttonContainerStyle={{marginBottom: 20}}
        buttonText={"Continue"}
        buttonTextStyle={{ ...GLOBAL_STYLE.h3, color: COLORS.white }}
      />
    </ScrollView>
  );
};

export default CardReplacement;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 20,
  },
  transactionContainer: {
    paddingVertical: 20,
    // paddingHorizontal:20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
});

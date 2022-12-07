import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { GLOBAL_STYLE, COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

//components
import InputsDouble from "./InputsDouble";
import CustomButton from "./CustomButton";
import Input from "./Inputs";

const primaryOptions = [{ text: "Debit" }, { text: "Credit" }];

const FilterModal = ({ showFilterModal, setShowFilterModal }) => {
  const [primaryOptionsIndex, setPrimaryOptionsIndex] = useState(0);

  return (
    <Modal visible={showFilterModal} transparent={true}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ flex: 1 }} />

        <View style={styles.mainContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[GLOBAL_STYLE.h1Bold]}>Filter</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", marginVertical: 15 }}>
            {primaryOptions.map((options, index) => {
              const { text } = options;

              return (
                <TouchableOpacity
                  style={[
                    GLOBAL_STYLE.h4,
                    primaryOptionsIndex === index
                      ? styles.textBoxActive
                      : styles.textBoxInactive,
                  ]}
                  key={text + index}
                  onPress={() => setPrimaryOptionsIndex(index)}
                >
                  <Text
                    style={
                      primaryOptionsIndex === index
                        ? styles.textActive
                        : styles.textInactive
                    }
                  >
                    {text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
<View style={styles.formContainer}>
          <View>
            <InputsDouble
              firstPlaceholderText={"Min Amount"}
              secondPlaceholderText={"Max Amount"}
              firstIcon={null}
              secondIcon={null}
              firstLabel={"Amount Range"}
              secondLabel={null}
              firstOnChangeText={null}
              secondOnChangeText={null}
              firstLabelStyle={GLOBAL_STYLE.h2Bold}
            />
          </View>

          <View>
            <InputsDouble>
              <Input
                placeholder={"Start Date"}
                label={"Date Range"}
                labelCustomStyle={GLOBAL_STYLE.h2Bold}
              />
              <Input
                placeholder={"End Date"}
              />
            </InputsDouble>
          </View>

          <View>
            <Input
              placeholder="Name or  Account Number of Receiver"
              leftIcon={
                <Ionicons name="search" size={24} color={COLORS.grey} />
              }
              label={"Receiver"}
              labelCustomStyle={GLOBAL_STYLE.h2Bold}
            />
          </View>
          <View>
            <Input
              placeholder="Bank Name"
              leftIcon={
                <Ionicons name="search" size={24} color={COLORS.grey} />
              }
              label={"Bank"}
              labelCustomStyle={GLOBAL_STYLE.h2Bold}
            />
          </View>
          </View>
          <View style={{ flex: 1 }} />

          <CustomButton buttonText={"Show Transation"} />
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({

formContainer: {flexDirection: "column", flexGrow: 1, justifyContent: "space-evenly"},
  mainContainer: {
    height: "95%",
    backgroundColor: "white",
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  textBoxActive: {
    height: 40,
    backgroundColor: COLORS.primaryBlue,
    paddingHorizontal: 18,
    marginRight: 10,
    color: COLORS.white,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 10,
  },
  textBoxInactive: {
    height: 40,
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
    marginRight: 10,
    color: COLORS.white,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
    borderRadius: 10,
  },
  textActive: {
    color: "white",
  },
  textInactive: {
    color: COLORS.primaryBlue,
  },
});

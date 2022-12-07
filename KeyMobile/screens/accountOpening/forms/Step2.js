import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import {
  CustomButton,
  Input,
  CustomDropDown,
  DropDownInput,
 
} from "../../../../components";
import { ModalList, ListItemCard } from "../../../components";
import Checkbox from "expo-checkbox";
import { FONTS, COLORS } from "../../../../constants";
import { useSelector } from "react-redux";
import { AccountFormContext } from ".././accountContext";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const Step2 = ({ next, prev }) => {
  const [errors, setErrors] = useState({});
  const {
    second: {
      resAddress,
      setResaddress,
      number,
      gender,
      setGender,
      marital,
      setMarital,
      setNumber,
      resState,
      setResState,
      resCountry,
      setResCountry,
      resCity,
      setResCity,
      email,
      setEmail,
    },
  } = useContext(AccountFormContext);
  const [checked, setChecked] = useState(false);
  const [countryVisible, setCountryVisible] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchCountryText, setSearchCountryText] = useState("");
  const [stateVisible, setStateVisible] = useState(false);
  const [searchState, setSearchState] = useState("");
  const [searchStateText, setSearchStateText] = useState("");

  setSearchCountryText


  const toggleChecked = () => {
    setChecked(!checked);
  };

  const nextPage = () => {
    if (!email) {
      return setErrors({ email: "This field is required" });
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      return setErrors({ email: "Invalid email address" });
    }
    if (!gender) {
      return setErrors({ gender: "This field is required" });
    }
    if(!marital){
      return setErrors({ marital: "This field is required" });
    }
    if (!resCountry) {
      return setErrors({ resCountry: "This field is required" });
    }
    if (!resState) {
      return setErrors({ resState: "This field is required" });
    }
    if (!resAddress) {
      return setErrors({ resAddress: "This field is required" });
    }
 
    // if (!resCity) {
    //   return setErrors({ resCity: "This field is required" });
    // }
   
    

   
  
    next();
  };

  console.log(errors, "error")
  const accountDetails = useSelector((state) => state.loan.success);
  const countryList = useSelector((state) => state.address.countrySuccess);
  const stateList = useSelector((state) => state.address.stateSuccess);

  const selectCountry = (item) => {
setResCountry(item.Value)
setCountryVisible(false)
  }


  const selectState = (item) => {
    setResState(item.Value)
    setStateVisible(false)
      }
  const displayCountry = ({ item }) => {
    return (
      <ListItemCard
      item={item}
      itemName={item.Value}
      onPress={() => selectCountry(item)}
    />
  );
    
  }

  const displayState = ({ item }) => {
    return (
      <ListItemCard
      item={item}
      itemName={item.Value}
      onPress={() => selectState(item)}
    />
  );
    
  }

  const filterCountry = (textToSearch) => {
    setSearchCountry(
      countryList.filter((item) =>
        item.Value.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
    setSearchCountryText(textToSearch);
  };

  const filterState = (textToSearch) => {
    setSearchState(
      countryList.filter((item) =>
        item.Value.toLowerCase().includes(textToSearch.toLowerCase())
      )
    );
    setSearchStateText(textToSearch);
  };

useEffect(() => {
setSearchCountry(countryList)
setSearchState(stateList)

},[countryList])

  return (
    <View>
      <Input
        // label="Email"
        placeholder="Email"
        value={email}
        labelCustomStyle={styles.inputLabel}
        onChangeText={(text) => setEmail(text)}
        error={errors.email}
        placeholderTextColor={COLORS.primaryBlue}
      />
      <DropDownInput
        // label="Gender"
        data={[
          { label: "Male", value: "M" },
          { label: "Female", value: "F" },
        ]}
        placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
        labelField={"label"}
        valueField={"value"}
        value={gender}
        placeholder={"Select gender"}
        onChange={(item) => {
          setGender(item.value);
        }}
        error={errors.gender}
      />

      <DropDownInput
        // label="marital status"
        data={[
          { label: "Single", value: "S" },
          { label: "Married", value: "M" },
        ]}
        placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
        labelField={"label"}
        valueField={"value"}
        value={marital}
        placeholder={"Marital status"}
        onChange={(item) => {
          setMarital(item.value);
        }}
        error={errors.marital}
      />
       <View>
          <ModalList
            placeholder={"Country"}
            value={resCountry}
            icon={
              <Pressable
                onPress={() => {
                  setCountryVisible(true);
                }}
                style={{
                 
                  height: 45,
                  width: 40,
                  justifyContent: "flex-end",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome
                  name="chevron-down"
                  size={14}
                  color={COLORS.grey}
                />
              </Pressable>
            }
            error={errors.resCountry}
            data={searchCountry}
            visible={countryVisible}
            onRequestClose={() => {
              setCountryVisible(false);
            }}
            search
            searchValue={searchCountryText}
            onChangeText={(text) => filterCountry(text)}
            emptyListText={"No data found"}
            renderItem={displayCountry}
          />
        </View>

        <View>


<ModalList
  placeholder={"State"}
  value={resState}
  icon={
    <Pressable
      onPress={() => {
        setStateVisible(true);
      }}
      style={{
        height: 45,
        width: 40,
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <FontAwesome
        name="chevron-down"
        size={14}
        color={COLORS.grey}
      />
    </Pressable>
  }
  error={errors.resState}
  data={searchState}
  visible={countryVisible}
  onRequestClose={() => {
    setStateVisible(false);
  }}
  search
  searchValue={searchStateText}
  onChangeText={(text) => filterState(text)}
  emptyListText={"No data found"}
  renderItem={displayState}
/>
</View>

  
         <Input
        // label="Residential state"
        placeholder="State"
        value={resState}
        onChangeText={(text) => setResState(text)}
        labelCustomStyle={styles.inputLabel}
        error={errors.resState}
        placeholderTextColor={COLORS.primaryBlue}
      />
      <Input
        // label="Residential Address"
        placeholder="Address"
        labelCustomStyle={styles.inputLabel}
        value={resAddress}
        onChangeText={(text) => setResaddress(text)}
        error={errors.resAddress}
        placeholderTextColor={COLORS.primaryBlue}
      />

      {/* <Input
        label="Residential City"
        placeholder="Enter your city"
        value={resCity}
        labelCustomStyle={styles.inputLabel}
        onChangeText={(text) => setResCity(text)}
        error={errors.resCity}
      /> */}
   

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <CustomButton
          buttonText={"Previous"}
          onPress={() => prev()}
          buttonContainerStyle={{ width: "40%" }}
        />

        <CustomButton
          buttonText={"Next"}
          onPress={nextPage}
          buttonContainerStyle={{ width: "40%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 15,
  },
  button: {
    marginVertical: 20,
  },
  noticeText: {
    fontFamily: FONTS.normal,
    textAlign: "center",
  },
  noticeTextColor: {
    color: "red",
  },
  checkText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
  },
  checkContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Step2;

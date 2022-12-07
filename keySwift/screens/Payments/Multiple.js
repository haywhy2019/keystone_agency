import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import {Input, DropDownInput, CustomButton} from "../../../components/";


const Multiple = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [name, setName] = useState(null)
  const options = [
    { label: 1, value: 1 },
    { label: 2, value: 2 },
    { label: 3, value: 3 },
    { label: 4, value: 4 },
    { label: 5, value: 5 },
    { label: 6, value: 6 },
    { label: 7, value: 7 },
    { label: 8, value: 8 },
    { label: 9, value: 9 },
    { label: 10, value: 10 },
  ];
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Input placeholder="Enter Transfer Name" value={name} onChangeText={ setName}/>
          <DropDownInput
            placeholder="Select Number of Beneficiary"
            items={options}
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
          />
        </View>
        <CustomButton buttonText="Continue" onPress={() => navigation.navigate('multiple2', {transferName: name, number: value})}/>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "10%",
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: '10%'
    
  },
});

export default Multiple;

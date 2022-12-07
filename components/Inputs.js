import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS } from "../constants";

const Input = (props) => {
  const [focus, setFocus] = useState(false);

  return (
    <View>
      <Text style={{...styles.label,...props.labelCustomStyle}}>{props.label} <Text style={styles.formError}>{props.optional}</Text></Text>
      <View style={{...styles.containerMargin,...props.containerMargin}}>
        <View
          style={[
            focus ? {...styles.inputContainerFocus,...props.inputCustomStyleFocus} : {...styles.inputContainer,
            ...props.inputCustomStyle}
          ]}
        >
          {props.leftIcon && <View style={styles.leftIcon}>{props.leftIcon}</View>}
          <TextInput
            {...props}
            style={[focus ? {...styles.inputFocus,...props.styleFocus} : {...styles.input, ...props.style} ]}
            selectionColor={COLORS.primaryBlue}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            // placeholderTextColor={COLORS.primaryBlue}
          />
          <View style={styles.icon}>
            {props.icon}
            </View>
        </View>
        { props.error && (<Text style={styles.formError}>{props.error}</Text>)}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMargin: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.grey2,
    justifyContent: "space-between",
    backgroundColor: COLORS.grey2,
  },
  inputContainerFocus: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.primaryBlue,
    justifyContent: "space-between",

    backgroundColor: COLORS.grey2,
  },
  input: {
    flex: 5,
    marginVertical: 10,
    // marginHorizontal: 20,
    marginLeft: 10,
    paddingLeft: 4,
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal
 
  },
  inputFocus: {
    flex: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingLeft: 4,
    color: COLORS.primaryBlue
  },
  icon: {
    paddingRight: 15,
  },
  leftIcon: {
    paddingLeft: 5,
    paddingRight:3
  },
  label: {
   fontFamily: FONTS.normal,
    color: COLORS.primaryBlue
  },
  formError: {
    color: "red",
    fontSize: 10,
  },
});

export default Input;

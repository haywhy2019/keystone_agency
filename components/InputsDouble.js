import React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { GLOBAL_STYLE,COLORS } from "../constants";
//components
import Inputs from "./Inputs";

const InputsDouble = ({children}) => {
  const inputWidth = useWindowDimensions().width / 2.5;
  // const {
  //   firstPlaceholderText,
  //   secondPlaceholderText,
  //   firstIcon,
  //   secondIcon,
  //   firstLabel,
  //   secondLabel,
  //   firstOnChangeText,
  //   secondOnChangeText,
  //   firstLabelStyle,
  //   secondLabelStyle,
  //   firstOnBlur,
  //   secondOnBlur,
  //   firstError,
  //   secondError
  // } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline"
      }}
    >
       {
        React.Children.map(children,(child)=>React.cloneElement(child,{ inputCustomStyle:{ width: inputWidth}}))
      }

      {/* <Inputs
        inputCustomStyle={{ width: inputWidth,borderColor: COLORS.primaryBlue,borderWidth:0.3 }}
        placeholder={firstPlaceholderText}
        label={firstLabel}
        icon={firstIcon}
        onChangeText={firstOnChangeText}
        onBlur={firstOnBlur ? firstOnBlur : null}
        labelCustomStyle={firstLabelStyle}
        error={  firstError}
      />
      <Inputs
        inputCustomStyle={{ width: inputWidth,borderColor: COLORS.primaryBlue,borderWidth:0.3 }}
        placeholder={secondPlaceholderText}
        label={secondLabel}
        icon={secondIcon}
        onChangeText={secondOnChangeText}
        onBlur={secondOnBlur ? secondOnBlur : null}
        labelCustomStyle={secondLabelStyle}
        error={  secondError}
      /> */}
    </View>
  );
};

export default InputsDouble;

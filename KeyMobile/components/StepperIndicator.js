import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StepIndicator from "react-native-step-indicator";
import { COLORS } from '../../constants';

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: COLORS.primaryBlue,
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: COLORS.primaryBlue,
    stepStrokeUnFinishedColor: COLORS.primaryBlue,
    separatorFinishedColor: COLORS.primaryBlue,
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: COLORS.primaryBlue,
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#aaaaaa",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#aaaaaa",
  };

const StepperIndicator = ({currentPosition, stepCount}) => {
  return (
    <View style={styles.indicator}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            stepCount={stepCount}
          />
        </View>
  )
}

export default StepperIndicator

const styles = StyleSheet.create({
    indicator: {
        paddingHorizontal: "10%",
        paddingVertical: 30,
      },
})
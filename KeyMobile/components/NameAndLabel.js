import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GLOBAL_STYLE, COLORS } from '../../constants';


    const NameAndLabel = ({ label, resp, bottom,customTextStyle,customBorderStyle }) => (
        <View>
          <View
            style={[
              GLOBAL_STYLE.rowBetween,
              bottom ?  styles.noBottomBorder : {...styles.bottomBorder,...customBorderStyle},
            ]}
          >
            <Text style={{...GLOBAL_STYLE.h3,...customTextStyle}}>{label}</Text>
            <Text style={{...GLOBAL_STYLE.h3,...customTextStyle}}>{resp} </Text>
          </View>
        </View>
      );
  


export default NameAndLabel

const styles = StyleSheet.create({
    bottomBorder: {
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderBottomColor: COLORS.primaryBlue,
        paddingHorizontal: 10,
        paddingVertical: 15,
      },
      noBottomBorder: {
        borderBottomColor: COLORS.primaryBlue,
        paddingHorizontal: 10,
        paddingVertical: 15,
      },
})
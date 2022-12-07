import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {  MaterialCommunityIcons} from "@expo/vector-icons";
import { COLORS } from '../../constants';

const BankCodes = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.container2}>
        <MaterialCommunityIcons
          name="bank"
          size={16}
          color={COLORS.primaryBlue}
        />
        <Text style={styles.container2Text}>{item.code}</Text>
        <Text style={styles.container2Text}>{item.name}</Text>
      </View>
      <Text style={styles.container2Text2}>{item.status}</Text>
    </View>
  );

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: COLORS.grey,
    },
    container2: {
      flexDirection: "row",
    },
    container2Text: {
      color: COLORS.primaryBlue,
      marginLeft: 30,
    },
    container2Text2: {
      color: COLORS.primaryGreen,
      marginLeft: 30,
    },
  });

export default BankCodes
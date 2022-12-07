import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../../constants";
import CustomButton from "../../../components/CustomButton";

const Preview = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
      <PreviewCard />
      <PreviewCard />
      <PreviewCard />
      <View>
        <View style={styles.container2}>
          <Text style={styles.cardItemlabel}>Transaction name</Text>
          <Text style={styles.cardItemResp}>{"Salary Payment"}</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.cardItemlabel}>Total Amount</Text>
          <Text style={styles.cardItemResp}>{"#100, 000.00"}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer} >
      <CustomButton buttonText="Submit"  />
      </View>
      </View>
  
    </ScrollView>
  );
};

export default Preview;

const PreviewCard = () => {
  return (
    <View style={styles.previewCard}>
      <PreviewCardItem label="Account Name" response="TEB WELFARE ACCOUNT" />
      <PreviewCardItem label="Delivery Date" response="12-03-2022" />
      <PreviewCardItem label="Beneficiary Name" response="OLALEKAN AMINU" />
      <PreviewCardItem label="Beneficiary Number" response="6092774839" />
      <PreviewCardItem label="Beneficiary Bank" response="GTB" />
      <PreviewCardItem label="Narration" response="SALARY" />
      <PreviewCardItem label="Amount" response="#50,000.00" />
    </View>
  );
};

const PreviewCardItem = ({ label, response }) => {
  return (
    <View style={styles.cardItem}>
      <Text style={styles.cardItemlabel}>{label}</Text>
      <Text style={styles.cardItemResp}>{response}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 25,
    backgroundColor: COLORS.white,
  },

  previewCard: {
    elevation: 20,
    width: "90%",
    backgroundColor: COLORS.white,
    height: 300,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    marginVertical: 10,
  },
  cardItem: {
    paddingHorizontal: "5%",
    paddingVertical: 10,
    flexDirection: "row",
  },
  cardItemlabel: {
    color: COLORS.primaryBlue,
    width: "37%",
  },
  cardItemResp: {
    color: COLORS.primaryBlue,
    fontWeight: "bold",
    fontSize: 14,
    paddingLeft: "10%",
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10

  },
  buttonContainer: {
    marginTop: 40
  }

});

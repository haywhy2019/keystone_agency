import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { MenuOptionsCard } from "../../components";
import { COLORS, GLOBAL_STYLE } from "../../../constants";
import { DataTable } from "react-native-paper";
import { Col, Row, Grid } from "react-native-easy-grid";
const EnquiresMenu = ({ navigation }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <View style={GLOBAL_STYLE.background}>
        <View style={{ marginTop: 15 }}>
          <MenuOptionsCard
            label="Transaction PIN"
            screen="TLimitPin"
            navigation={navigation}
          />
        </View>

        <MenuOptionsCard
          label="Debit Card"
          screen="TLimitCard"
          navigation={navigation}
        />
        <MenuOptionsCard
          label="Indemnity (e-limit)"
          screen="TLimitIndemnity"
          navigation={navigation}
        />
        <MenuOptionsCard
          label="Token"
          screen="TLimitToken"
          navigation={navigation}
        />
        <View style={{ padding: 20 }}>
          <Text style={[GLOBAL_STYLE.h3Bold, { textAlign: "center" }]}>
            Change Limit Features
          </Text>
        </View>
        <Grid style={{borderWidth: 0.5, borderColor: COLORS.grey, marginBottom: 40}}>
          <Row style={{borderBottomWidth: 0.5, paddingHorizontal: 7, height:30}}>
            <Col size={1} style={{}}>
              <Text style={[GLOBAL_STYLE.h4Bold, {marginBottom: 0, color: COLORS.primaryBlue2}]}>Name</Text>
            </Col>
            <Col size={3} style={{borderLeftWidth: 0.8, borderLeftColor: COLORS.grey, paddingLeft: 7}}>
              <Text style={[GLOBAL_STYLE.h4Bold, {color: COLORS.primaryBlue2}]}>Features</Text>
            </Col>
          </Row>
          <Row style={{borderBottomWidth: 0.5, paddingHorizontal: 7, height: 80}}>
            <Col size={1} style={{}}>
              <Text style={[GLOBAL_STYLE.h5, {color: COLORS.grey}]}>Pin Limit</Text>
            </Col>
            <Col size={3} style={{borderLeftWidth: 0.8, borderLeftColor: COLORS.grey, paddingLeft: 7}}>
              <Text style={[GLOBAL_STYLE.h5, {color: COLORS.grey}]}>
                Please Note That The Default Transaction Limit That You Can
                Increase With Your Transaction PIN is #20,000.00 (Twenty
                Thousand Naira Only) </Text>
            </Col>
          </Row>
          <Row style={{borderBottomWidth: 0.5, paddingHorizontal: 7, height: 80}}>
            <Col size={1} style={{}}>
              <Text style={[GLOBAL_STYLE.h5, {color: COLORS.grey}]}>Card Limit</Text>
            </Col>
            <Col size={3} style={{borderLeftWidth: 0.8, borderLeftColor: COLORS.grey, paddingLeft: 7}}>
              <Text style={[GLOBAL_STYLE.h5, {color: COLORS.grey}]}>
                {" "}
                Please Note That The Default Transaction Limit That You Can
                Increase With Your Debit Card is #50,000.00 (Fifty Thousand
                Naira Only)
              </Text>
            </Col>
          </Row>
          <Row style={{borderBottomWidth: 0.5, paddingHorizontal: 7, height: 80}}>
            <Col size={1} >
              <Text style={[GLOBAL_STYLE.h5, {color: COLORS.grey}]}>Token</Text>
            </Col>
            <Col size={3} style={{borderLeftWidth: 0.8, borderLeftColor: COLORS.grey, paddingLeft: 7}}>
              <Text style={[GLOBAL_STYLE.h5, {color: COLORS.grey}]}>
                {" "}
                Please Note That The Default Transaction Limit That You Can
                Increase With Your Token is #5,00,000.00 (Five Million Naira
                Only)
              </Text>
            </Col>
          </Row>
          <Row style={{ paddingHorizontal: 7, height: 80}}>
            <Col size={1} style={{}}>
              <Text style={[GLOBAL_STYLE.h5, {color: COLORS.grey}]}>Indemnity</Text>
            </Col>
            <Col size={3} style={{borderLeftWidth: 0.8, borderLeftColor: COLORS.grey, paddingLeft: 7}}>
              <Text style={[GLOBAL_STYLE.h5, {color: COLORS.grey}]}>
                {" "}
                Please Note That The Default Transaction Limit That You Can
                Increase With Your Token is #5,00,000.00 (Five Million Naira
                Only)
              </Text>
            </Col>
          </Row>
        </Grid>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default EnquiresMenu;

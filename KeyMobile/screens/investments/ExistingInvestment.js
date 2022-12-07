import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { NoInvestmentImg } from "../../../constants/icons";
import { COLORS, GLOBAL_STYLE, images } from "../../../constants";
import { ExistingInvestmentCard } from "../../components";
const data = [
  {
    name: "MM2224118027",
    account: " 00123734678",
    amount: "₦250,000",
    date1: "2022-08-29",
    date2: "2022-09-28",
    status: "active",
  },
  {
    name: "MM2224118027",
    account: " 00123734678",
    amount: "₦250,000",
    date1: "2022-08-29",
    date2: "2022-09-28",
    status: "active",
  },
  {
    name: "MM2224118027",
    account: " 00123734678",
    amount: "₦250,000",
    date1: "2022-08-29",
    date2: "2022-09-28",
    status: "Liquidated",
  },
  {
    name: "MM2224118027",
    account: " 00123734678",
    amount: "₦250,000",
    date1: "2022-08-29",
    date2: "2022-09-28",
    status: "Liquidated",
  },
];
const ExistingInvestment = () => {
  const [noData, setNoData] = useState(false);


  if (noData) {
    return <NoInvestment />;
  }
  return (
    <View style={{marginTop: 20}}>
      {data.map((item,index) => <ExistingInvestmentCard item={item} key={index}/>)}
    </View>
  );
};

export default ExistingInvestment;

const NoInvestment = () => {
  return (
    <View
      style={{
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "40%",
      }}
    >
      <NoInvestmentImg />
      <View style={{ marginTop: 30 }}>
        <Text style={[GLOBAL_STYLE.h1Bold]}>No Investment Portfolio</Text>
        <Text style={[GLOBAL_STYLE.h4, { color: COLORS.grey }]}>
          You do not have any active investment yet
        </Text>
      </View>
    </View>
  );
};

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Modal,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
} from "react-native";
import {
  COLORS,
  SIZES,
  images,
  FONTS,
  isAndroid,
  GLOBAL_STYLE,
} from "../../../../constants";
import { Ionicons } from "@expo/vector-icons";
import {
  CustomButton,
  Input,
  DatePicker,
  SpinnerImage,
} from "../../../../components";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { allLoans } from "../../../../utilities/redux/keyMobile/actions/loanActions";
import {
  LoanDashboardCard,
  HistoryCard,
  NoDataFound,
  EmptyList,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import ThirdTab from "./ThirdTab";

const noLoanData = [
  {
    loanType: "No Pending loan",
    contract_no: "not available",
    outstanding_balance: "0.00",
    next_repayment: "0.00",
    next_repayment_Date: "none",
    amount: "0.00",
  },
];

function Dashboard({ navigation }) {
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "History" },
    { key: "second", title: "Range" },
    { key: "third", title: "Statement" },
  ]);

  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails.accountno
  );
  const allLoan = useSelector((state) => state.loanAll.success);
  const allLoanFailure = useSelector((state) => state.loanAll.error);
  const allLoanLoading = useSelector((state) => state.loanAll.loading);
  useEffect(() => {
    dispatch(allLoans(selectedAccount));
  }, []);

  const renderScene = SceneMap({
    first: FirstTab,
    second: SecondTab,
    third: ThirdTab,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      activeColor={"white"}
      inactiveColor={COLORS.primaryBlue}
      style={{
        marginTop: 10,
        backgroundColor: "rgba(242, 242, 242, 0.25)",
        height: 35,
        shadowOffset: { height: 0, width: 0 },
        shadowColor: "transparent",
        shadowOpacity: 0,
        elevation: 0,
        borderWidth: 1,
        borderColor: COLORS.primaryBlue,
        borderRadius: 5,
        overflow: "hidden",
      }}
      contentContainerStyle={{ alignItems: "center" }}
      indicatorContainerStyle={{ alignItems: "center" }}
      indicatorStyle={{ backgroundColor: COLORS.primaryBlue, height: "100%" }}
      labelStyle={[
        isAndroid ? GLOBAL_STYLE.h4Bold : GLOBAL_STYLE.h5Bold,
        { textTransform: "capitalize" },
      ]}
    />
  );
  if (allLoanLoading == "pending") {
    return <SpinnerImage />;
  }


console.log(allLoan, "all loan", allLoanFailure)
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        backgroundColor: "white",
      }}
    >
      {allLoan ? (
        <View>
          <LoanDashboardCard />
          <View style={{ height: 500, paddingHorizontal: "5%" }}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: SIZES.width }}
              renderTabBar={renderTabBar}
            />
          </View>
        </View>
      ) : (
        <LoanDashboardCard data={noLoanData} />
      )}
     { allLoanFailure ? (<EmptyList emptyText={"An error occured"} noData/>) : null}
    </ScrollView>
  );
}

export default Dashboard;

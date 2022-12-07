import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { HistoryCard, NoDataFound , EmptyList} from "../../../components";
import { useSelector } from "react-redux";
import { SpinnerImage, BottomNotification,FilterSearchBox, AccountCard} from "../../../../components";

const FirstTab = () => {
  const transactionDetail = useSelector(
    (state) => state.transaction.success.transactionReceipts
  );
  const transactionPending = useSelector((state) => state.transaction.loading);
  const transactionError = useSelector((state) => state.transaction.error);

  if (transactionPending == "pending") {
    return <SpinnerImage />;
  }
//  if(transactionDetail?.length < 1){
//   return (
//     <EmptyList emptyText={"No Transaction exist"} noData/>)
//  }

 console.log(transactionDetail, "trans details")
  return (
    <ScrollView style={{ marginVertical: 20 }}>
      <View style={{marginTop: 10}}>
      <FilterSearchBox/>
      </View>
    
      {transactionDetail.map((item, index) => (
        <HistoryCard item={item} key={index} />
      ))}
    
    </ScrollView>
  );
};

export default FirstTab;
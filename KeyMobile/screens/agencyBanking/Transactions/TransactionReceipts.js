import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import { HistoryCard, NoDataFound, HistoryReceiptCard } from "../../../components";
import { useSelector } from "react-redux";
import { SpinnerImage, BottomNotification,FilterSearchBox } from "../../../../components";
import { GLOBAL_STYLE } from "../../../../constants";
import PaymentReceipt from "../../../components/PaymentReceipt";
import { MaterialIcons } from '@expo/vector-icons';

const TransactionReceipts = () => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState("");
  const transactionDetail = useSelector(
    (state) => state.transaction.success.transactionReceipts
  );
  const transactionPending = useSelector((state) => state.transaction.loading);
  const transactionError = useSelector((state) => state.transaction.error);
  console.log(transactionDetail, transactionError, "history");

  const generateReceipt =  (item) => {
    setShowReceipt(true)
    setReceipt(item)
  }
  if (transactionPending == "pending") {
    return <SpinnerImage />;
  }
  // if (transactionDetail.length < 1) {
  //   return (
  //     <NoDataFound heading={"Transactions"} infoText="No Transaction exist" />
  //   );
  // }
  return (
    <ScrollView
      contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobalNopadding,{marginVertical:20}]}
      keyboardShouldPersistTaps="handled"
      // style={{ marginVertical: 20 }}
    >

    <FilterSearchBox/>
      
      {transactionDetail?.map((item, index) => (
        <Pressable key={index.toString()} onPress={() => generateReceipt(item) }>
          <HistoryReceiptCard item={item} key={index.toString()} />
        </Pressable>
      ))}

      <PaymentReceipt
       show={showReceipt} 
       item={receipt}
       receipts
       setShowReceipt={setShowReceipt}
       onPress={() => setShowReceipt(false)}
       />
    
    
    </ScrollView>
  );
};

export default TransactionReceipts;

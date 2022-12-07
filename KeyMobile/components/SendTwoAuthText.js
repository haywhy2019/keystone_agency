import { StyleSheet, Text, View } from "react-native";
import React, { useState , useEffect} from "react";
import { Dialog } from "react-native-simple-dialogs";
import { CustomButton} from "../../components";
import { TwoFactorAuth } from ".";
import { COLORS, GLOBAL_STYLE, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { formattedAmount } from "../../utilities/helperFunctions/formatAmount";

const SendTwoAuthText = ({data}) => {
const {amount,crAccountName,beneficiaryAcct,bankName} = data
const formatAmount = formattedAmount(amount)
  return (
    <View>
     
        <View>
          <Text style={[GLOBAL_STYLE.h4, { textAlign: "center" }]}>
            You are about to send
          </Text>
          <Text
            style={[
              GLOBAL_STYLE.h2Bold,
              {
                textAlign: "center",
                paddingVertical: SIZES.responsiveHeight("3%"),
              },
            ]}
          >
           {formatAmount}
          </Text>
          <Text style={[GLOBAL_STYLE.h4, { textAlign: "center" }]}>To</Text>
          <Text
            style={[
              GLOBAL_STYLE.h4Bold,
              {
                textAlign: "center",
                paddingVertical: SIZES.responsiveHeight("1.5%"),
              },
            ]}
          >
           {beneficiaryAcct} | {crAccountName.slice(0,25)}
          </Text>
          <Text style={[GLOBAL_STYLE.h4Bold, { textAlign: "center" }]}>
            {bankName}
          </Text>
          <TwoFactorAuth />
        </View>
    </View>
  );
};

export default SendTwoAuthText;




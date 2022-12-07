import { View, Text, StyleSheet } from "react-native";
import React, {useState, useEffect} from "react";
import { CustomButton, Input, CustomDropDown, DropDownInput } from "../../../../../components";
import { FONTS, COLORS } from "../../../../../constants";
import { loanAccountDetailAction } from "../../../../../utilities/redux/keyMobile/actions/loanActions";
import { useDispatch, useSelector } from "react-redux";

const Step1 = ({next}) => {
  const dispatch = useDispatch();
  const [acctNo, setAcctNo] = useState("");
  const [selectedAcct, SetSelectedAcct] = useState("");

  const { accounts } = useSelector((state) => state.auth.user);
  
  const accountDetails = useSelector(
    (state) => state.loan.success
  );

  useEffect(() => {
    if(accountDetails){
      SetSelectedAcct(accountDetails.NUBANACCOUNTNO)
    }
    }, [accountDetails]);
 
  return (
    <View>
      <DropDownInput
        label="Account number"
        data={accounts}
        labelCustomStyle={styles.inputLabel}
        labelField= "accountno"
        valueField= "accountno"
        placeholder="Select account"
        value={selectedAcct}
        onChange={(item) => {
          dispatch(loanAccountDetailAction(item.accountno));
        }}
      />
     
      {accountDetails ? (
        <View>
          <Input
            label="Bvn"
            placeholder="22134892821"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.BVN}
            editable={false}
          />

          <Input
            label="Email address"
            placeholder="samueltbankole@gmail.com"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.CUSTOMEREMAIL}
            editable={false}
          />
          <Input
            label="Phone number"
            placeholder="+234 812 374 1286"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.TELEPHONE}
            editable={false}
          />
          <Input
            label="Name of applicant"
            placeholder="Olaken Aminu"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.ACCOUNTNAME}
            editable={false}
          />
          <Input
            label="Applicant address "
            placeholder="Home address (NOT P.O.BOX)"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.ADDRESS}
            editable={false}
          />
          <Input
            label="Date of birth"
            placeholder="(DD/MM/YYYY)"
            labelCustomStyle={styles.inputLabel}
            value={accountDetails?.CUSTONMERDOB}
            editable={false}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 20,
            }}
          >
            <CustomButton
              buttonText={"Previous"}
              // onPress={() => prev()}
              buttonContainerStyle={{ width: "40%" , backgroundColor: COLORS.grey}}
              
            />

            <CustomButton
              buttonText={"Next"}
              onPress={() => next()}
              buttonContainerStyle={{ width: "40%" }}
            />
          </View>

          {/* <CustomButton
            buttonText={"Continue"}
            onPress={() => next()}
            buttonContainerStyle={styles.button}
          /> */}
          {/* <Text style={styles.noticeText}>
            By clicking on the continue button, you are acknowledging to our{" "}
            <Text style={styles.noticeTextColor}>terms </Text>and{" "}
            <Text style={styles.noticeTextColor}>conditions</Text>
          </Text> */}
        </View>
       ): null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 15,
  },
  button: {
    marginVertical: 20,
  },
  noticeText: {
    fontFamily: FONTS.normal,
    textAlign: "center",
  },
  noticeTextColor: {
    color: "red",
  },
});

export default Step1;

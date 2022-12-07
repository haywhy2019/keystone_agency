import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Input, DatePicker, CustomButton , AccountCard} from "../../../components";
import { GLOBAL_STYLE, COLORS } from "../../../constants";
import { useSelector } from "react-redux";
import moment from "moment";
import { enquiresAction } from "../../../utilities/redux/keyMobile/axiosService/enquiries";
import {
  SpinnerImage,
  BottomNotification,
  CustomSnackBar,
  DropDownInput,

} from "../../../components";
import NumberFormat from "react-number-format";


const DisputeManagement = ({ navigation }) => {

  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails.accountno
  );
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState({});
  const [account, setAccount] = useState(selectedAccount);
  const { CustomerName, email, phoneno, accounts } = useSelector(
    (state) => state.auth.user
  );
  const [success, setSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  useEffect(() => {
    setName(CustomerName);
    setuserEmail(email);
    setPhoneNo(phoneno);
  }, []);
 


  const payload = {
    id: 0,
    FeedbackType: "dispute management",
    customername: name,
    entrydate: date,
    phone: phoneNo,
    email: userEmail,
    amount: amount,
    comment: comment,
    accountno: selectedAccount,
    source: "mobile",
  };
  const submitHandler = () => {
    if (!comment) {
      return setError({ comment: "message cannot be empty" });
    }
    setError("");
    setLoading(true);
    enquiresAction(payload)
      .then((res) => {
        if (res.status == 200) {
          setSuccess(res.data);
          setTimeout(() => navigation.goBack(), 3000);
        } else {
          setSendError("An error occured. try again");
        }
      })
      .catch((err) => {
        setSendError(err.message || "An error occured. try again");
      })
      .finally(() => setLoading(false));
  };
  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <View style={{flex: 1}}>
    <ScrollView
      contentContainerStyle={[
        GLOBAL_STYLE.scrollViewGlobalNopadding,
        { justifyContent: "flex-start" },
      ]}
    >
      <View style={{marginTop: 10}}>
      <AccountCard />
      </View>
     
      <View style={{ marginTop: 15, paddingHorizontal: "5%" }}>
    
        <Input
          // label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(text) => setName(text)}
          editable={false}
        />
        <Input
          // label="Email"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(text) => setuserEmail(text)}
          editable={false}
        />
        <Input
          // label="Phone number"
          placeholder="Enter your number"
          value={phoneNo}
          onChangeText={(text) => setPhoneNo(text)}
        />

        <Input
          // label="Date"
          value={moment(date).format("DD - MM - YYYY")}
          editable={false}
        />
            <NumberFormat
                  value={amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  renderText={(value) => (
                    <Input
                      placeholder="Enter amount"
                      onChangeText={(text) => setAmount(text)}
                      value={value}
                      placeholderTextColor={COLORS.primaryBlue}
                      keyboardType="numeric"
                      icon={
                        <Text style={{ color: COLORS.primaryBlue2 }}>
                          {"\u20A6"}
                        </Text>
                      }
                    />
                  )}
                />


      
        <Input
          placeholder="Enter your message"
          multiline={true}
          numberOfLines={7}
          inputCustomStyle={{
            height: 100,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
          placeholderTextColor={COLORS.primaryBlue}
          style={{ textAlignVertical: "top" }}
          value={comment}
          onChangeText={(text) => setComment(text)}
          error={error.comment}
        />
        <CustomButton buttonText="Send message" onPress={submitHandler}
        buttonContainerStyle={{marginBottom: 10}}
        />
      </View>

    
    </ScrollView>
    <CustomSnackBar
        show={sendError || success}
        message={sendError || success}
        success={success ? success : false}
      />
    </View>
  );
};

export default DisputeManagement;

import { View, Text, StyleSheet, Pressable, Alert, Keyboard , ScrollView} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import {
  CustomButton,
  Input,
  CustomDropDown,
  DatePicker,
  DropDownInput,
  SpinnerImage,
  CustomSnackBar,
} from "../../../../components";
import { COLORS, FONTS, GLOBAL_STYLE } from "../../../../constants";
import { bvnAction } from "../../../../utilities/redux/keyMobile/actions/bvnAction";
import { validateOtpAction } from "../../../../utilities/redux/keyMobile/axiosService/validateOtpAction";
import { useDispatch, useSelector } from "react-redux";
import { AccountFormContext } from ".././accountContext";
import { Dialog } from "react-native-simple-dialogs";

const Step1 = ({ next, prev }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showBvnDetails, setShowBvnDetails] = useState(false);
  const [placeholder, setPlaceholder] = useState("(DD/MM/YYYY)");
  const [showDialogue, setShowDialogue] = useState(false);
  const [bvnTokenErr, setBvnTokenErr] = useState(false);
  const {
    first: {
      bvn,
      setBvn,
      bvnToken,
      setBvnToken,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      middleName,
      setMiddleName,
      date,
      setDate,
      number,
      setNumber,
      requestId,
      setRequestId,
    },
  } = useContext(AccountFormContext);
  const nextPage = () => {
    setBvn(bvnDetails.bvn);
    setFirstName(bvnDetails?.firstName);
    setLastName(bvnDetails?.lastName);
    setMiddleName(bvnDetails?.middleName);
    setDate(bvnDetails?.dateOfBirth);
    setNumber(bvnDetails?.phoneNumber);

    if (!bvnToken) {
      setShowDialogue(true);
      return setErrors({ bvnToken: "Please input the bvn token recieved" });
    }
    setErrors({});
    validateTokenHandler();

    next();
  };

  let bvnDigit = /^\d{11}$/;
  const payload = {
    bvn,
    username: "testuser",
    channelname: "mobile",
    requestid: requestId,
  };

  const bvnDetails = useSelector((state) => state.bvn.success);
  const bvnDetailsErr = useSelector((state) => state.bvn.error);
  const bvnDetailsLoading = useSelector((state) => state.bvn.loading);
  const branchLoading = useSelector((state) => state.allBranch.loading);
  console.log(bvnDetails, "bvn detail");

 
  
  const validateOtpPayload = {
    source: "mobile",
    action: "ValidateUserOTP",
    username: "testuser",
    otp: bvnToken,
    requestID: requestId,
  };
  const validateTokenHandler = () => {
   
   console.log("test")
    setLoading(true);
    validateOtpAction(validateOtpPayload)
      .then((res) => {
        console.log(res, "bvn valid")
        if (res.data.ResponseCode == "00") {
          setShowDialogue(false);
          setShowBvnDetails(true);
        } else {
          setShowBvnDetails(false);
          setShowDialogue(true);
          setBvnTokenErr(res.data.ResponseMessage || "An error occured");
        }
      })
      .catch((err) => {
        setShowDialogue(true);
        setBvnTokenErr(err.ResponseMessage || "An error occured");
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    if (bvn.match(bvnDigit)) {
      dispatch(bvnAction(payload));
    }
  
  }, [bvn]);

  useEffect(() => {
   
   if (bvnDetails) {
      setShowDialogue(true);
    }
  }, [bvnDetails]);

 
   

  if (loading || bvnDetailsLoading === "pending" && (branchLoading != "pending")) {
    return (
      <View style={{ flex: 1, flexDirection: "column", height: 500 }}>
        <SpinnerImage bgColor={"white"} />
      </View>
    );
  }
  return (

      <ScrollView         
      // keyboardShouldPersistTaps="true" 
      contentContainerStyle={GLOBAL_STYLE.scrollViewGlobalNopadding}
      >
      <Input
       
        labelCustomStyle={styles.inputLabel}
        keyboardType="numeric"
        placeholder={"Bvn number"}
        value={bvn}
        onChangeText={(text) => setBvn(text)}
        error={errors.bvn}
        placeholderTextColor={COLORS.primaryBlue}

      />
      <Dialog
        visible={showDialogue}
        title="BVN Token"
        titleStyle={[GLOBAL_STYLE.h1Bold, { textAlign: "center" }]}
        dialogStyle={{ borderRadius: 5 }}
        onTouchOutside={() => setShowDialogue(false)}
        keyboardShouldPersistTaps={"always"}
      >
        <View>
          <Text
            style={[
              GLOBAL_STYLE.h2,
              { textAlign: "center", color: COLORS.error },
            ]}
          >
            {bvnTokenErr}
          </Text>
          <Text
            style={[
              GLOBAL_STYLE.h3,
              { textAlign: "center", color: COLORS.grey },
            ]}
          >
            kindly enter the token that was sent to your registered BVN number
          </Text>
          <View>
            <Input
              placeholder="Token"
              labelCustomStyle={styles.inputLabel}
              keyboardType="numeric"
              value={bvnToken}
              onChangeText={(text) => setBvnToken(text)}
              error={errors.bvn}
            placeholderTextColor={COLORS.primaryBlue}

            />
            <CustomButton
              buttonText={"Submit"}
              onPress={validateTokenHandler}
            />
          </View>
        </View>
      </Dialog>
      {showBvnDetails ? (
        <View>
          <Input
            // label="First name"
            placeholder="First name"
            labelCustomStyle={styles.inputLabel}
            value={bvnDetails.firstName}
            // onChangeText={(bvnDetails) => setFirstName(bvnDetails.firstName)}
            error={errors.firstName}
            editable={false}
            placeholderTextColor={COLORS.primaryBlue}

          />
          <Input
            // label="Last name"
            placeholder="Last name"
            labelCustomStyle={styles.inputLabel}
            value={bvnDetails.lastName}
            // onChangeText={() => setLastName(bvnDetails.lastName)}
            error={errors.lastName}
            editable={false}
            placeholderTextColor={COLORS.primaryBlue}

          />
          <Input
            // label="Middle name"
            placeholder="Middle name"
            labelCustomStyle={styles.inputLabel}
            value={bvnDetails.middleName}
            // onChangeText={() => setMiddleName(bvnDetails.middleName)}
            error={errors.middleName}
            editable={false}
            placeholderTextColor={COLORS.primaryBlue}

          />
          <Input
            // label="Date of birth"
            placeholder="Date of birth"
            labelCustomStyle={styles.inputLabel}
            value={bvnDetails.dateOfBirth}
            // onChangeText={() => setDate(bvnDetails.dateOfBirth)}
            error={errors.date}
            editable={false}
            placeholderTextColor={COLORS.primaryBlue}

          />
          <Input
            // label="Phone number"
            placeholder="Phone number"
            keyboardType="numeric"
            value={bvnDetails.phoneNumber}
            labelCustomStyle={styles.inputLabel}
            // onChangeText={() => setNumber(bvnDetails.phoneNumber)}
            error={errors.number}
            placeholderTextColor={COLORS.primaryBlue}

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
              buttonContainerStyle={{
                width: "40%",
                backgroundColor: COLORS.grey,
              }}
            />

            <CustomButton
              buttonText={"Next"}
              onPress={nextPage}
              buttonContainerStyle={{ width: "40%" }}
            />
          </View>
        </View>
      ) : null}
      <CustomSnackBar
        show={bvnDetailsErr}
        message={bvnDetailsErr || "An error occured"}
      />
    </ScrollView>
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

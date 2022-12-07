import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import React, { useState } from "react";
import { ProfileAvatar } from "../../../../../constants/icons";
import { COLORS, FONTS, SIZES, images, GLOBAL_STYLE } from "../../../../../constants";
import { CustomButton, Input, CustomDropDown, DropDownInput } from "../../../../../components";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { createLoan } from "../../../../../utilities/redux/keyMobile/actions/loanActions";
import { useSelector, useDispatch} from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { Dropdown } from 'react-native-element-dropdown';
const Step3 = ({prev, navigation}) => {
  const dispatch = useDispatch()
  const [strollStart, setScrollStart] = useState("");
  const [period, setPeriod] = useState("")
  const [amount, setAmount] = useState("")
  const [purpose, setPurpose] = useState("")
  const [errors, setErrors] = useState({})
  const enableScroll = () => setScrollStart(true);
  const disableScroll = () => setScrollStart(false);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data2 = [
    { label: "Jewery", value: "Jewery" },
    { label: "Clothes", value: "Cloths" },
    { label: "Cars", value: "Cars" },
  ];

  const maxAmount = 250000
  const data =  [
    { label: "1 week", value: "1 week" },
    { label: "2 week", value: "2 week" },
    { label: "3 week", value: "3 week" },
  ];
  const accountDetails = useSelector(
    (state) => state.loan.success
  );
  const submitHandler = () => {
    if (!amount) {
      return setErrors({ amount: "This field is required" });
    }
    if(amount < 5000){
      return setErrors({ amount: "Loan amount cannot be less than 5000" });
    }
    if(amount > maxAmount){
      return setErrors({ amount: "Loan amount cannot be greater than maximum loan amount" });
    }
    if (!period) {
     
      return setErrors({ period: "This field is required" });
    }
   
    if (!purpose) {
     
      return setErrors({ purpose: "This field is required" });
    }
    setErrors()
    const payload = {
      "CustomerID": accountDetails?.CUSTOMERID,
      "CustomerName": accountDetails?.CUSTOMERNAME,
      "CustomerTel": accountDetails?.TELEPHONE,
      "CustomerAddr": accountDetails?.ADDRESS,
      "AccountNo": accountDetails?.ACCOUNTNO,
      "DateofBirth": accountDetails?.CUSTONMERDOB,
      "BranchID": accountDetails?.BRANCH,
      "ProductID": "2",
      "EmployeeName":  accountDetails?.CUSTOMERNAME,
      "EmployeeAddr": accountDetails?.ADDRESS,
      "AccountOfficerName": "N/A",
      "AccountOfficerDAO": "N/A",
      "Tenor_Months": period,
      "RepaymentDayOfMonth": 0,
      "GuarantorName": "N/A",
      "GuarantorBank": "N/A",
      "GuarantorAcctNo": "N/A",
      "RequestAmount": amount,
      "GuarantorEmployer": "N/A",
      "GuarantorGrade": "N/A",
      "CustomerGrade": "N/A"
    }
dispatch(createLoan(payload))

  };



  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLE.backgroundNoPadding}>
    <View style={styles.mainContainer}>
     
      <View>
        <ImageBackground
          source={images.loanBg}
          style={styles.loanHeader}
          imageStyle={styles.loanHeaderImage}
        >
          <View style={styles.loanHeadercontent}>
            <Text style={styles.loanText}>Maximum Loan Amount</Text>
            <Text style={styles.loanAmount}>{maxAmount}</Text>
          </View>
        </ImageBackground>
      </View>
      {/* <View style={{backgroundColor: "white", marginLeft: 10}}> */}
      {/* <MultiSlider
        onValuesChangeStart={disableScroll}
        onValuesChangeFinish={enableScroll}
        min={0}
        max={10}
        markerContainerStyle={{ marginTop: 2 }}
        customMarker={() => (
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: "white",
              borderRadius: 20,
              elevation: 5,
            }}
          ></View>
        )}
        containerStyle={{ justifyContent: "center", alignItems: "center" }}
        selectedStyle={{
          backgroundColor: COLORS.primaryBlue,
          height: 6,
          borderRadius: 5,
        }}
        unselectedStyle={{
          backgroundColor: COLORS.grey,
          height: 6,
          borderRadius: 5,
        }}
        sliderLength={SIZES.width - 100}
        // sliderLength={280}
        minMarkerOverlapDistance={5}
      /> */}
      {/* </View> */}

      <Input label="Loan request amount" 
       value={amount}
       keyboardType={"numeric"}
       onChangeText={(text) => setAmount(text)}
       
       error={errors?.amount}
      />
       
     <DropDownInput 
     label="Loan repayment period"
     labelCustomStyle={styles.inputLabel}
     data={data}
     value={period}
     labelField={'label'}
     valueField={"value"}
     onChange={(item) => setPeriod(item.value)}
     placeholder="Select loan period"
     error={errors?.period}
     />
      
      <Input label="Loan purpose" 
      value={purpose}
      onChangeText={(text) => setPurpose(text)}
      error={errors?.purpose}
      />
      <Text style={styles.noticeText}>
        We offer a variety of lending options and features made possible by
        modern technology. Learn more
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        }}
      >
        <CustomButton
          buttonText={"Previous"}
          onPress={() => prev()}
          buttonContainerStyle={{ width: "40%" }}
        />

        <CustomButton
         buttonText={"Submit"}
         onPress={submitHandler}
          buttonContainerStyle={{ width: "40%" }}
        />
      </View>

     
      <Text style={styles.noticeText}>
        By clicking on the continue button, you are acknowledging to our{" "}
        <Text style={styles.noticeTextColor}>terms </Text>and{" "}
        <Text style={styles.noticeTextColor}>conditions</Text>
      </Text>
    
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  selfie: {
    alignItems: "center",
  },
  instruction: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    marginTop: 10,
  },
  instruction2: {
    color: COLORS.grey,
    textAlign: "center",
    marginTop: 5,
  },
  loanHeader: {
    width: "100%",
    height: 100,
marginBottom: 20,
    borderRadius: 10,

    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 5,
  },
  loanHeaderImage: {
    borderRadius: 5,
    //  paddingHorizontal: 50
  },
  loanText: {
    color: COLORS.grey,
  },
  loanAmount: {
    fontSize: 20,
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    marginTop: 10,
  },
  loanHeadercontent: {
    marginLeft: 20,
    marginTop: 20,
  },
  noticeText: {
    fontFamily: FONTS.normal,
    textAlign: "center",
    fontSize: 12
  },
  noticeTextColor: {
    color: "red",
  },
  inputLabel: {
    fontSize: 14,
  },
});

export default Step3;

const styles2 = StyleSheet.create({
  addButton: {
    fontWeight: "bold",
    color: "blue",
  },
  container1: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
  },
  mainContainer: {
    padding: 25,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  cameraText: {
    fontWeight: "bold",
  },
  multiline: {
    textAlignVertical: "top",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { COLORS, FONTS, SIZES, images } from "../../../../../constants";
import {
  CustomButton,
  CustomFilePicker,
  Input,
  CustomDropDown,
  DropDownInput,
} from "../../../../../components";
import * as ImagePicker from "expo-image-picker";
import { AccountFormContext } from ".././accountContext";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { createNewAccountAction } from "../../../../../utilities/redux/keyMobile/actions/createNewAccountAction";

const Step4 = ({ prev, navigation }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const {
    first: {
      bvn,
      firstName,
      lastName,
      middleName,
      number,
      date,
      bvnToken,
      requestId,
    },
    second: {
      resAddress,
      gender,
      resState,
      resCity,
      resCountry,
      email,
      marital,
    },

    third: {
      branch,
      referralCode,
      acctType,
      passport,
      setPassport,
      utility,
      setUtility,
      signature,
      setSignature,
      id,
      setId,
      file1Name,
      setFile1name,
      file2Name,
      setFile2name,
      file3Name,
      setFile3name,
      file4Name,
      setFile4name,
      idType,
      setIdType,
    },
  } = useContext(AccountFormContext);

  const createNewAccountSuccess = useSelector(
    (state) => state.createNewAccount.success
  );

  console.log(createNewAccountSuccess, "success");
  const pickImage = async (setImage, setName, name) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    let pattern = /([^\/]+)$/gm;

    const fileName = result.uri.match(pattern);

    if (!result.cancelled) {
      setImage(result.base64);
      // setName(fileName[0])
      setName(name);
    }
  };

  const submitHandler = () => {
    // if (!passport) {
    //   return setErrors({ passport: "This field is required" });
    // }
    // if (!id) {
    //   return setErrors({ id: "This field is required" });
    // }
    // if (!utility) {
    //   return setErrors({ utility: "This field is required" });
    // }
    // if (!signature) {
    //   return setErrors({ signature: "This field is required" });
    // }
    setErrors({});
    // navigation.navigate("account summary")

    const payload = {
      LastName: lastName,
      // gender: gender,
      gender: "M",
      accountTitle: `${lastName} ${middleName} ${firstName}`,
      mobileNumber: number,
      countryOfResidence: "NG",
      branchCode: branch.BranchCode,
      FirstName: firstName,
      productCode: acctType.producttype,
      identificationType: "passport",
      dob: date,
      residentialAddress: resAddress,
      mnemonic: "",
      MiddleName: middleName,
      location: "string",
      bvn: bvn,
      state: "12",
      processingMode: "ONLINE",
      // maritalStatus: marital,
      maritalStatus: "M",
      email: email,
      daocode: referralCode,
      passport: "",
      requestid: requestId,
      street: "Demurin",
      CategoryCode: "6001",
      EmploymentStatus: "SELF-EMPLOYED",
      Occupation: "Sw Dev",
      Nationality: "NG",
      IndustryID: "4132",
      PlaceOfBirth: "Ibadan",
      // "OfficeAddress": "Keystone Crescent",
      //   "CategoryCode": "6001",
      identificationExpiryDate: "2022-01-01",
    };

    console.log(payload, "payload");
    // {
    //   "identificationExpiryDate": "2022-01-01",
    //   "street": "Demurin",
    //   "LastName": "Fajuke",
    //   "MiddleName": "Oluwajoba",
    //   "FirstName": "Michael",
    //   "SectorID": "4030",
    //   "gender": "M",
    //   "accountTitle": "Fajuke Oluwajoba Michael",
    //   "mobileNumber": "08035614725",
    //   "countryOfResidence": "NG",
    //   "branchCode": "NG0010085",
    //   "AccountOfficerCode": "",
    //   "productCode": "263",
    //   "identificationType": "Passport",
    //   "dob": "10-04-1982",
    //   "residentialAddress": "string",
    //   "mnemonic": "string",
    //   "location": "string",
    //   "bvn": "22145633268",
    //   "state": "12",
    //   "maritalStatus": "M",
    //   "email": "olumikefajj@gmail.com",
    //   "daocode": "",
    //   "passport": "",
    //   "requestid": "1234567890",
    //   "EmploymentStatus": "SELF-EMPLOYED",
    //   "Occupation": "Sw Dev",
    //   "Nationality": "NG",
    //   "IndustryID": "4132",
    //   "PlaceOfBirth": "Ibadan",
    //   "OfficeAddress": "Keystone Crescent",
    //   "CategoryCode": "6001",
    //   "IntroducerCode": ""
    // }

    dispatch(createNewAccountAction(payload));
  };

  useEffect(() => {
    if (createNewAccountSuccess.ResponseCode == "00") {
      navigation.navigate("account summary");
    }
  }, [createNewAccountSuccess]);
  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      <View>
        <DropDownInput
          // label="marital status"
          data={[
            { label: "Passport", value: "passport" },
            { label: "Drivers licence", value: "Drivers licence" },
            { label: "National ID", value: "National ID" },
            { label: "Voters card", value: "Voters card" },
          ]}
          placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
          labelField={"label"}
          valueField={"value"}
          value={idType}
          placeholder={"ID type"}
          onChange={(item) => {
            setIdType(item.value);
          }}
          error={errors.marital}
        />
        <CustomFilePicker
          label={idType}
          // labelInfo={"(optional)"}
          pickImage={() => pickImage(setPassport, setFile1name, "passport")}
          fileName={file1Name}
          error={errors.passport}
        />

        {/* <CustomFilePicker
          label="Valid ID"
          labelInfo={"(optional)"}
          pickImage={() => pickImage(setId, setFile2name, "valid id")}
          fileName={file2Name}
          error={errors.id}
        />
        <CustomFilePicker
          label="Utility bill"
          labelInfo={"(optional)"}
          pickImage={() => pickImage(setUtility, setFile3name, "utility bill")}
          fileName={file3Name}
          error={errors.utility}
        /> */}
        <CustomFilePicker
          label="Signature"
          labelInfo={"(optional)"}
          pickImage={() => pickImage(setSignature, setFile4name, "signature")}
          fileName={file4Name}
          error={errors.signature}
        />
      </View>

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    // height: SIZES.height - 200,
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

    borderRadius: 10,

    shadowOffset: { width: 10, height: 10 },
    shadowColor: "#000",
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
  },
  noticeTextColor: {
    color: "red",
  },
});

export default Step4;

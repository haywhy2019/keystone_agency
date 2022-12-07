import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { images, COLORS, FONTS, GLOBAL_STYLE } from "../../../constants";
import {
  CustomButton,
  Input,
  SpinnerImage,
  CustomSnackBar,
  DropDownInput,
} from "../../../components";
import {DailySingleLimitSlide} from "../../components"
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { changePasswordAction } from "../../../utilities/redux/keyMobile/axiosService/changePassword";
import { useDispatch, useSelector } from "react-redux";
import { thousandOperator } from "../../../utilities/helperFunctions/thousandOperator";
import uuid from "react-native-uuid";
import { logout } from "../../../utilities/redux/allApps/slice/authSlice";
import { Dialog } from "react-native-simple-dialogs";
import { tLimitTokenAction } from "../../../utilities/redux/keyMobile/axiosService/changeTLimit";
import * as Yup from "yup";
import getUserHook from "../../../utilities/hooks/getUserHook";
import NumberFormat from "react-number-format";


const TLimitToken = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [user] = getUserHook();

  const [secureInput, setSecureInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  
  const { accounts, DailyUtilizedLimit, dailytranslimit, bvn } = useSelector(
    (state) => state.auth.user
  );
  const validationSchema = Yup.object().shape({
    account: Yup.number().required("Required"),
    singleLimit: Yup.string().required("Required"),
    dailyLimit: Yup.string().required("Required"),
    singleLimitNo: Yup.number().required("Required"),
    dailyLimitNo: Yup.number()
      .required("Required")
      .moreThan(
        Yup.ref("singleLimitNo"),
        "Daily limit must be greater than single limit"
      ),
    token: Yup.number().required("Required"),
  });

  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <StatusBar style="light" />
      <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText2}>
                Increase your transaction limit{" "}
              </Text>
              <Text style={styles.headerText2}>with Token</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.afterBgImage}>
    <DailySingleLimitSlide />

        <Formik
          initialValues={{
            account: "",
            singleLimit: "",
            dailyLimit: "",
            singleLimitNo: "",
            dailyLimitNo: "",
            token: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const id = uuid.v4();
            const payload = {
              source: "mobile",
              SingleTransactionLimit: values.singleLimit,
              RequestID: id,
              username: user,
              CumulativeDailyTransactionLimit: values.dailyLimit,
              token: values.token,
              AuthType: "withtoken",
            };
            Keyboard.dismiss();
            tLimitTokenAction(payload)
              .then((res) => {
                if (res.status == 200) {
                  if (res?.data?.ResponseCode == "00") {
                    setSuccess(res.data.ResponseMessage);
                    setTimeout(() => navigation.goBack(), 5000);
                  } else {
                    setError(res.data.ResponseMessage);
                  }
                } else {
                  setError(res.response.data.Message);
                }
              })
              .catch((err) => {
                setError(err.message || "An error occured");
              })
              .finally(() => setLoading(false));
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={{}}>
              <DropDownInput
                data={accounts}
                labelCustomStyle={styles.inputLabel}
                labelField="accountno"
                valueField="accountno"
                placeholder="Select account"
                value={values.account}
                onChange={(item) => setFieldValue("account", item.accountno)}
                error={errors.account}
                placeholderStyle={{ color: COLORS.primaryBlue, fontSize: 14 }}
              />
          <NumberFormat
                  value={values.singleLimit}
                  displayType={"text"}
                  thousandSeparator={true}
                  onValueChange={(val) => {
                    setFieldValue("singleLimitNo", val.floatValue);
                  }}
                  renderText={(value) => {
                    console.log(value);
                    return (
                      <Input
                        placeholder="Single Transaction Limit"
                        onChangeText={handleChange("singleLimit")}
                        onBlur={handleBlur("singleLimit")}
                        value={value}
                        placeholderTextColor={COLORS.primaryBlue}
                        error={
                          (errors.singleLimit &&
                          touched.singleLimit &&
                          errors.singleLimit) || (
                            errors.singleLimitNo &&
                            touched.singleLimitNo &&
                            errors.singleLimitNo
                          )
                        }
                        keyboardType="numeric"
                        icon={
                          <Text style={{ color: COLORS.primaryBlue2 }}>
                            {"\u20A6"}
                          </Text>
                        }
                      />
                    );
                  }}
                />

                <NumberFormat
                  value={values.dailyLimit}
                  displayType={"text"}
                  thousandSeparator={true}
                  onValueChange={(val) => {
                  
                    setFieldValue("dailyLimitNo", val.floatValue);
                  }}
                  renderText={(value) => (
                    <Input
                      placeholder="Daily Transaction Limit"
                   
                      onChangeText={handleChange("dailyLimit")}
                      onBlur={handleBlur("dailyLimit")}
                      value={value}
                      placeholderTextColor={COLORS.primaryBlue}
                      error={
                       ( errors.dailyLimit &&
                        touched.dailyLimit &&
                        errors.dailyLimit) || (
                          errors.dailyLimitNo &&
                          touched.dailyLimitNo &&
                          errors.dailyLimitNo
                        )
                      }
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
                placeholder="Token"
                onChangeText={handleChange("token")}
                onBlur={handleBlur("token")}
                keyboardType="numeric"
                value={values.token}
                error={errors.token && touched.token && errors.token}
                placeholderTextColor={COLORS.primaryBlue}
              />

              <CustomButton
                buttonText="Submit"
                onPress={handleSubmit}
                buttonContainerStyle={styles.button}
              />

              {/* <View>
                <Text style={[GLOBAL_STYLE.h4, { color: COLORS.grey }]}>
                  Please note that your maximum limit is 5 million naira
                </Text>
              </View> */}
            </View>
          )}
        </Formik>
      </View>

      <CustomSnackBar
        show={success || error}
        success={success ? true : false}
        message={success || error}
      />
  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  showLimitContainer: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.grey,
  },
  showAmountSpentContainer: {
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.primaryBlue,
    marginTop: -5,
  },

  container1: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.white,
  },
  backgroundImg: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  headerContainer: {
    paddingHorizontal: "10%",
    paddingVertical: "5%",
    textAlign: "center",
  },
  headerText1: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginBottom: 20,
  },
  headerText2: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 14,
    fontFamily: FONTS.normal,
  },
  backgroundImgContainer: {
    flex: 1,
  },
  afterBgImage: {
    flex: 3,
    paddingHorizontal: "8%",
    backgroundColor: COLORS.white,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  accountText: {
    color: COLORS.grey,
    fontFamily: FONTS.normal,
  },
  loginText: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.normal,
    marginLeft: 5,
  },
  button: {
    marginVertical: 30,
  },
});
export default TLimitToken;

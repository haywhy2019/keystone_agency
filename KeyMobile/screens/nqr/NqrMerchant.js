import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Keyboard,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { StatusBar } from "expo-status-bar";
  import { images, COLORS, FONTS, GLOBAL_STYLE } from "../../../constants";
  import {
    CustomButton,
    Input,
    SpinnerImage,
    CustomSnackBar,
    DropDownInput
  } from "../../../components";
  import { AntDesign, Ionicons } from "@expo/vector-icons";
  import { Formik } from "formik";
  import { changePinAction } from "../../../utilities/redux/keyMobile/axiosService/changePin";
  import uuid from "react-native-uuid";
  import { logout } from "../../../utilities/redux/allApps/slice/authSlice";
  import { Dialog } from "react-native-simple-dialogs";
import { useDispatch, useSelector } from "react-redux";
  
  const NqrMerchant = ({ route, navigation }) => {
    // const { user,id } = route.params;
  
    const dispatch = useDispatch();
    const [secureInput, setSecureInput] = useState(true);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedAcct, SetSelectedAcct] = useState("");

  const { accounts } = useSelector((state) => state.auth.user);

    if (loading) {
      return <SpinnerImage />;
    }
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      >
        <StatusBar style="auto" />
      
        <View style={styles.afterBgImage}>
          <Formik
            initialValues={{
              otp: "",
              oldPin: "",
              pin: "",
              confirmPin: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.otp) {
                errors.otp = "Required";
              }
              if (!values.oldPin) {
                errors.oldPin = "Required";
              }
              if (!values.pin) {
                errors.pin = "Required";
              }
              if (!values.confirmPin) {
                errors.confirmPin = "Required";
              }
              if (values.pin != values.confirmPin) {
                errors.pin = "pin must be the same";
                errors.confirmPin = "pin must be the same";
              }
              return errors;
            }}
            onSubmit={(values) => {
              const id = uuid.v4();
              const payload = {
                source: "mobile",
                otp: values.otp,
                RequestID: id,
                username: user,
                Oldpin: values.oldPin,
                NewPin: values.pin,
              };
              Keyboard.dismiss();
              setLoading(true);
              changePinAction(payload)
                .then((res) => {
                  if (res.data.ResponseCode == "00") {
                    setSuccess(res.data.ResponseMessage);
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        resolve();
                      }, 3000);
                    }).then(() => {
                      setShowDialog(true);
                      setTimeout(() => dispatch(logout()), 4000);
                    });
                  } else {
                    setError(res.data.ResponseMessage);
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
              values,
              errors,
              touched,
            }) => (
              <View style={{ marginTop: 20 }}>
                <DropDownInput
                  data={accounts}
                  labelCustomStyle={styles.inputLabel}
                  labelField= "accountno"
                  valueField= "accountno"
                  placeholder={"Select Account To Debit"}
                  placeholderStyle={[GLOBAL_STYLE.h4,{color:COLORS.primaryBlue}]}
                  value={selectedAcct}
                  onChange={(item) => {
                  //   dispatch(loanAccountDetailAction(item.accountno));
                  }}
                />
                <Input
                  placeholder="Enter Name"
                  onChangeText={handleChange("otp")}
                  onBlur={handleBlur("otp")}
                  value={values.otp}
                  error={errors.otp && touched.otp && errors.otp}
                  placeholderTextColor={COLORS.primaryBlue}

                />
  
                <Input
                  placeholder="Enter TIN"
                  keyboardType="numeric"
                  onChangeText={handleChange("oldPin")}
                  onBlur={handleBlur("oldPin")}
                  value={values.oldPin}
                  error={errors.oldPin && touched.oldPin && errors.oldPin}
            placeholderTextColor={COLORS.primaryBlue}

                />
                <Input
                  placeholder="eg sample@email.com"
                  textContentType="newPassword"
                  secureTextEntry={secureInput}
                  onChangeText={handleChange("pin")}
                  onBlur={handleBlur("pin")}
                  value={values.pin}
                  error={errors.pin && touched.pin && errors.pin}
            placeholderTextColor={COLORS.primaryBlue}

                />
                <Input
                  placeholder="Enter Phone number"
                  textContentType="newPassword"
                  secureTextEntry={secureInput}
                  keyboardType="numeric"
                  onChangeText={handleChange("confirmPin")}
                  onBlur={handleBlur("confirmPin")}
                  value={values.confirmPin}
                  error={errors.pin && touched.pin && errors.pin}
            placeholderTextColor={COLORS.primaryBlue}
                 
                />
                  <Input
                  placeholder="Enter Address"
                  textContentType="newPassword"
                  secureTextEntry={secureInput}
                  keyboardType="numeric"
                  onChangeText={handleChange("confirmPin")}
                  onBlur={handleBlur("confirmPin")}
                  value={values.confirmPin}
                  error={errors.pin && touched.pin && errors.pin}
            placeholderTextColor={COLORS.primaryBlue}

                />
                    <Input
                  placeholder="Enter Fee Bearer"
                  textContentType="newPassword"
                  secureTextEntry={secureInput}
                  keyboardType="numeric"
                  onChangeText={handleChange("confirmPin")}
                  onBlur={handleBlur("confirmPin")}
                  value={values.confirmPin}
                  error={errors.pin && touched.pin && errors.pin}
            placeholderTextColor={COLORS.primaryBlue}

                />
  
                <CustomButton
                  buttonText="Add Merchant"
                  onPress={handleSubmit}
                  buttonContainerStyle={styles.button}
                />
              </View>
            )}
          </Formik>
        </View>
        <CustomSnackBar
          show={success || error}
          success={success ? true : false}
          message={success || error}
        />
        <Dialog
          visible={showDialog}
          title={"Password Reset"}
          onTouchOutside={() => setShowDialog(false)}
        >
          <View>
            <Text style={GLOBAL_STYLE.h2}>
              {"You would be logged out. please login to continue"}
            </Text>
          </View>
        </Dialog>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container1: {
      flex: 1,
      flexDirection: "column",
    },
    backgroundImg: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    headerContainer: {
      paddingHorizontal: "10%",
      paddingVertical: "20%",
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
      justifyContent: "space-around",
      marginTop: -10,
      paddingHorizontal: "8%",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
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
  export default NqrMerchant;
  
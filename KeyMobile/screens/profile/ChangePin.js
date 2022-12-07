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
import {
  images,
  COLORS,
  FONTS,
  GLOBAL_STYLE,
  
} from "../../../constants";
import {
  CustomButton,
  Input,
  SpinnerImage,
  CustomSnackBar,
} from "../../../components";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { changePinAction } from "../../../utilities/redux/keyMobile/axiosService/changePin";
import { useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import { logout } from "../../../utilities/redux/allApps/slice/authSlice";
import { Dialog } from "react-native-simple-dialogs";

const ChangePin = ({ route, navigation }) => {
  const { user, id } = route.params;

  const dispatch = useDispatch();
  const [secureInput, setSecureInput] = useState(true);
  const [secureInput2, setSecureInput2] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <View style={{backgroundColor: COLORS.white, flex: 1}}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", }}
        
      >
        <StatusBar style="light" />
        {/* <View style={styles.backgroundImgContainer}>
          <ImageBackground
            source={images.headerImg}
            style={styles.backgroundImg}
          >
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.headerText2}>Your new pin must</Text>
                <Text style={styles.headerText2}>
                  be different from your old pin
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View> */}
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
                    setShowDialog(true);
                    setTimeout(() => dispatch(logout()), 2000);
                    
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
                <Input
                  // label="Enter otp"
                  placeholder="Enter OTP"
                  keyboardType="numeric"
                  onChangeText={handleChange("otp")}
                  onBlur={handleBlur("otp")}
                  value={values.otp}
                  placeholderTextColor={COLORS.primaryBlue}
                  error={errors.otp && touched.otp && errors.otp}
                />

                <Input
                  placeholder="Enter old pin"
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.primaryBlue}
                  onChangeText={handleChange("oldPin")}
                  onBlur={handleBlur("oldPin")}
                  value={values.oldPin}
                  error={errors.oldPin && touched.oldPin && errors.oldPin}
                />
                <Input
                  placeholder="Enter new pin"
                  placeholderTextColor={COLORS.primaryBlue}
                  keyboardType="numeric"
                  textContentType="newPassword"
                  secureTextEntry={secureInput}
                  onChangeText={handleChange("pin")}
                  onBlur={handleBlur("pin")}
                  value={values.pin}
                  icon={
                    secureInput ? (
                      <Ionicons
                        name="eye"
                        size={16}
                        color={COLORS.grey}
                        onPress={() => setSecureInput(!secureInput)}
                      />
                    ) : (
                      <Ionicons
                        name="eye-off"
                        size={16}
                        color={COLORS.grey}
                        onPress={() => setSecureInput(!secureInput)}
                      />
                    )
                  }
                  error={errors.pin && touched.pin && errors.pin}
                />
                <Input
                  placeholder="confirm new pin"
                  placeholderTextColor={COLORS.primaryBlue}
                  textContentType="newPassword"
                  secureTextEntry={secureInput2}
                  keyboardType="numeric"
                  onChangeText={handleChange("confirmPin")}
                  onBlur={handleBlur("confirmPin")}
                  value={values.confirmPin}
                  icon={
                    secureInput2 ? (
                      <Ionicons
                        name="eye"
                        size={16}
                        color={COLORS.grey}
                        onPress={() => setSecureInput2(!secureInput2)}
                      />
                    ) : (
                      <Ionicons
                        name="eye-off"
                        size={16}
                        color={COLORS.grey}
                        onPress={() => setSecureInput2(!secureInput2)}
                      />
                    )
                  }
                  error={errors.pin && touched.pin && errors.pin}
                />

                <CustomButton
                  buttonText="Reset password"
                  onPress={handleSubmit}
                  buttonContainerStyle={styles.button}
                />
              </View>
            )}
          </Formik>
        </View>

        <Dialog
          visible={showDialog}
          title={"Password Change Successful"}
          // onTouchOutside={() => setShowDialog(false)}
          titleStyle={[GLOBAL_STYLE.h4Bold]}
        >
          <View>
            <Text style={GLOBAL_STYLE.h4}>
              {"You would be logged out. please login to continue"}
            </Text>
          </View>
        </Dialog>
      </ScrollView>
      <CustomSnackBar
        show={success || error}
        success={success ? true : false}
        message={success || error}
      />
    </View>
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
export default ChangePin;

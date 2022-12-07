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
} from "../../../components";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { changePinAction } from "../../../utilities/redux/keyMobile/axiosService/changePin";
import { resetPin } from "../../../utilities/redux/keyMobile/axiosService/resetPin";
import { useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import { logout } from "../../../utilities/redux/allApps/slice/authSlice";
import { Dialog } from "react-native-simple-dialogs";
import * as Yup from "yup";


const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  pin: Yup.number().required("Required"),
  confirmPin: Yup.number().required("Required"),
});

//for token
const tokenSchema= Yup.object({
  token: Yup.string().required('This field is required')
      .min(6,'Enter only 6 digits in the field')
      .max(6,'Enter only 6 digits in the field'),
})

//for OTP
const OTPSchema= Yup.object({
  OTP: Yup.string().required('This field is required')
      .min(4,'Enter only 4 digits in the field')
      .max(4,'Enter only 4 digits in the field'),
})

//for Pin
const pinSchema= Yup.object({
  Pin: Yup.string().required('This field is required')
      .min(4,'Enter only 4 digits in the field')
      .max(4,'Enter only 4 digits in the field'),
})

//for card 
const cardSchema= Yup.object({
  cardNumber: Yup.string().required('This is required')
      .min(6,'Enter only 6 digits in the field')
      .max(6,'Enter only 6 digits in the field')
})

//if no verification option has been picked
const nonSchema= Yup.object({
  isVerificationPicked: Yup.boolean().required('This is required').test('check verification method','Please pick a verification option',(value)=>value===true)
  
})

const ResetPin = ({ navigation, route }) => {
  const { user} = route.params;

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
    <View style={{flex: 1}}>
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <StatusBar style="light" />
      {/* <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
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
            pin: "",
            confirmPin: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("clicked");
            const id = uuid.v4();
            const payload = {
              source: "mobile",
              otp: values.otp,
              RequestID: id,
              username: user,
              Oldpassword: values.oldPassword,
              NewPassword: values.newPassword,
            };
            Keyboard.dismiss();
            setLoading(true);
            resetPin(payload)
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
              <Input
                // label="Enter otp"
                placeholder="Username"
                keyboardType="numeric"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                error={errors.username && touched.username && errors.username}
              />

              <Input
                placeholder="New Pin"
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
                placeholder="Confirm New Pin"
                textContentType="newPassword"
                secureTextEntry={secureInput}
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
                error={errors.confirmPin && touched.confirmPin && errors.confirmPin}
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
        title={"Password Reset"}
        onTouchOutside={() => setShowDialog(false)}
      >
        <View>
          <Text style={GLOBAL_STYLE.h2}>
            {"You would be logged out. please login to continue"}
          </Text>
        </View>
      </Dialog>

      <Formik
      initialValues={{
        cardNumber:'',
        cardPin:'',
        cardMonthYear:'',
        cardCVV:'',
        OTP:'',
        Pin:'',
        token:'',
        isVerificationPicked
    }}
      enableReinitialize={true}
      validationSchema={(usingDebitCard && cardSchema) || (usingToken && tokenSchema) || (isUsingOTP && OTPSchema) || (usingPin && pinSchema)|| nonSchema}
      onSubmit={(values) => {
          // console.log(values)
          submitUpdate(values)
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
      }) => {
        // console.log(errors, "error");

        return (
          <>
          <AuthenticationDropDown
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              errors={errors}
              setUsingDebitCard={setUsingDebitCard}
              setUsingToken={setUsingToken}
              setIsUsingOTP={setIsUsingOTP}
              setUsingPin={setUsingPin}
              setIsVerificationPicked={setIsVerificationPicked}
              dropDownOptions={[
                { label: "Pin", value: "Pin" },
                { label: "Debit Card", value: "Debit Card" },
                { label: "Hard or Soft Token", value: "Hard or Soft Token" },
              ]}
              
          />
          <CustomButton
            buttonText="Continue"
            buttonContainerStyle={styles.button}
            onPress={()=>handleSubmit()}
          />
          </>
        );
      }}
    </Formik>
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
export default ResetPin;


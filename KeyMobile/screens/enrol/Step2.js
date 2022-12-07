import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Modal,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Keyboard,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as LocalAuthentication from "expo-local-authentication";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import {
  Input,
  Spinner,
  CustomSnackBar,
  SpinnerImage,
} from "../../../components/index";
import {
  AntDesign,
  Ionicons,
  SimpleLineIcons,
  Fontisto,
} from "@expo/vector-icons";
import CustomButton from "../../../components/CustomButton";
import {
  COLORS,
  images,
  FONTS,
  SIZES,
  GLOBAL_STYLE,
  isAndroid,
} from "../../../constants";
import {
  KeyMobileLogoSVG,
  BeyondSvg,
  LoginAvatar,
  ZeroDataIcon,
  NotifcationMesgIcon,
  ProfileAvatar,
  InputDriveIcon,
  InputMobileIcon,
  InputHomeIcon
} from "../../../constants/icons";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    bvn: Yup.number().required("Required"),
    email: Yup.string().email("input a valid email").required("Required"),
    name:  Yup.string().required("Required"),
    otp: Yup.number().required("Required"),
    number: Yup.number().required("Required"),
    date: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
  });

export default function Step1({ navigation }) {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      keyboardShouldPersistTaps="handled"
    >
      {/* <View > */}
      <StatusBar style={isAndroid ? "light" : "auto"} />
      <View style={styles.backgroundImgContainer}>
        <ImageBackground source={images.headerImg} style={styles.backgroundImg}>
          <View style={styles.container2}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText1}>Confirm Details</Text>
              <View>
                <Text style={styles.headerText2}>
                  Kindly confirm your details below
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.afterBgImage}>
        <Formik
        //   enableReinitialize={true}
          initialValues={{ bvn: "", email: "", otp: "", name: "", number: "", date: "", address: "" }}
        //   validationSchema={validationSchema}
          onSubmit={(values) => {
           navigation.navigate("EnrolStep3")
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
            <View>
              <View
                style={[
                  GLOBAL_STYLE.columnBetween,
                  { alignItems: "center", marginTop: 15 },
                ]}
              >
                <ProfileAvatar />
                <Text
                  style={[
                    GLOBAL_STYLE.h5,
                    { color: COLORS.grey, marginTop: 10 },
                  ]}
                >
                  Please upload your picture
                </Text>
              </View>

              <Input
                placeholder="1234567890"
                placeholderTextColor={COLORS.primaryBlue}
                icon={
                  <Pressable
                    onPress={() => console.log("eroll")}
                    style={GLOBAL_STYLE.iconBg}
                  >
                    <InputDriveIcon />
                  </Pressable>
                }
                onChangeText={handleChange("bvn")}
                onBlur={handleBlur("bvn")}
                value={values.bvn}
                // buttonContainerStyle={styles.input}
                error={errors.bvn && touched.bvn && errors.bvn}
              />

              <Input
                placeholder="Olalekan Aminu"
                placeholderTextColor={COLORS.primaryBlue}
                icon={
                  <Pressable
                    onPress={() => console.log("eroll")}
                    style={GLOBAL_STYLE.iconBg}
                  >
                    <AntDesign name="user" size={16} color={COLORS.grey} />
                  </Pressable>
                }
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                // buttonContainerStyle={styles.input}
                error={errors.name && touched.name && errors.name}
              />

              <Input
                placeholder="10-01-2020"
                placeholderTextColor={COLORS.primaryBlue}
                icon={
                  <Pressable
                    onPress={() => console.log("eroll")}
                    style={GLOBAL_STYLE.iconBg}
                  >
                    <Fontisto name="date" size={16} color={COLORS.grey} />
                  </Pressable>
                }
                onChangeText={handleChange("date")}
                onBlur={handleBlur("date")}
                value={values.date}
                // buttonContainerStyle={styles.input}
                error={errors.date && touched.date && errors.date}
              />

<Input
                placeholder="07064959292"
                placeholderTextColor={COLORS.primaryBlue}
                icon={
                  <Pressable
                    onPress={() => console.log("eroll")}
                    style={GLOBAL_STYLE.iconBg}
                  >
                    <InputMobileIcon/>
                  </Pressable>
                }
                onChangeText={handleChange("number")}
                onBlur={handleBlur("number")}
                value={values.number}
                // buttonContainerStyle={styles.input}
                error={errors.number && touched.number && errors.number}
              />

<Input
                placeholder="11 adeniji cresent tola"
                placeholderTextColor={COLORS.primaryBlue}
                icon={
                  <Pressable
                    onPress={() => console.log("eroll")}
                    style={GLOBAL_STYLE.iconBg}
                  >
                    <InputHomeIcon/>
                  </Pressable>
                }
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
                // buttonContainerStyle={styles.input}
                error={errors.address && touched.address && errors.address}
              />



              <Input
                placeholderTextColor={COLORS.primaryBlue}
                placeholder="Olalekan@gmail.com"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
                onSubmitEditing={handleSubmit}
                icon={
                  <SimpleLineIcons
                    name="envelope"
                    size={16}
                    color={COLORS.grey}
                  />
                }
                error={errors.email && touched.email && errors.email}
              />

              <View style={{ width: "100%" }}>
                <CustomButton
                  buttonText="continue"
                  onPress={handleSubmit}
                  buttonContainerStyle={styles.buttonLogin}
                />
              </View>       
            </View>
          )}
        </Formik>
        <View></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  container1: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  backgroundImgContainer: {
    flex: 1,
    // height: 200
  },
  backgroundImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  beyondSvg: {
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  afterBgImage: {
    flex: 4,
    marginTop: -10,
    paddingHorizontal: "8%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.white,
  },
  container2: {
    paddingHorizontal: "8%",
    paddingVertical: 60,
  },
  logo: {
    // height: 40,
    // width: 40,
  },
  container2Text1: {
    marginTop: 40,
    fontSize: 20,
    color: COLORS.white,
    fontFamily: FONTS.normal,
  },
  container2Text2: {
    fontSize: 24,
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  container2Text3: {
    fontSize: 13,
    color: COLORS.grey,
    marginTop: 12,
    marginBottom: 30,
    fontFamily: FONTS.normal,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container3Text: {
    color: "#002561",
    fontFamily: FONTS.bold,
    fontSize: 13,
  },
  container4: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 6,
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: "#002561",
  },
  container5: {
    paddingTop: 60,
    paddingHorizontal: "8%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container6: {
    alignContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  container6Text: {
    paddingTop: 5,
    color: COLORS.danger,
    textAlign: "center",
    fontSize: 10,
    fontFamily: FONTS.normal,
  },
  input: {
    marginBottom: 10,
  },
  buttonLogin: {
    marginBottom: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
    marginTop: 25,
  },
  buttonText: {
    color: COLORS.primaryBlue,
  },
  buttonInfo: {
    color: COLORS.grey,
    textAlign: "center",
    fontSize: 10,
    paddingTop: 5,
    fontFamily: FONTS.normal,
  },
});

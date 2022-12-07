import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Clipboard,
  Pressable,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  COLORS,
  FONTS,
  GLOBAL_STYLE,
  isAndroid,
  isIOS,
  SIZES,
} from "../../../constants";
import { images } from "../../../constants";
import { useSelector } from "react-redux";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../../../utilities/helperFunctions/asyncStorageUtils";
import { getItem } from "../../../utilities/helperFunctions/asyncStorage";
import Toast from "react-native-toast-message";
import {
  BottomNotification,
  CustomButton,
  CustomSnackBar,
  Input,
  SpinnerImage,
} from "../../../components";
import { MenuLeftRightIcon, TwoFactorAuth } from "../../components";
import { sendOtpAction } from "../../../utilities/redux/keyMobile/axiosService/sendOtp";
import { userImageAction } from "../../../utilities/redux/keyMobile/actions/userImageAction";
import uuid from "react-native-uuid";
import ToggleSwitch from "toggle-switch-react-native";
import { ChangeProfileImageIcon , AvatarIcon, ProfileIcon, ProfileAvatar} from "../../../constants/icons";
import * as Yup from "yup";
import { Formik } from "formik";

// import Clipboard from '@react-native-clipboard/clipboard';
// import {encode, decode} from 'node-base64-image';

const otpValidationSchema = Yup.object().shape({
  otp: Yup.number().required("Required"),
});

const cardValidationSchema = Yup.object().shape({
  cardNo: Yup.number().required("Required"),
  cardNo: Yup.number().required("Required"),
  cardDate: Yup.number().required("Required"),
  cardPin: Yup.number().required("Required"),
  cvv: Yup.number().required("Required"),
});

const verficationSchema = Yup.object().shape({
  verification: Yup.string().required("Required"),
});
const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.auth.user);
  const [screen, setScreen] = useState({ screen: "", label: "" });
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth]= useState(false);
  const { CustomerName, bvn } = useSelector((state) => state.auth.user);
  const [authType, setAuthType] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const [image, setImage] = useState("");
  const [copy, setCopy] = useState("tol");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const copyToClipboard = () => {
    Clipboard.setString(bvn);
  };

  const userImage = useSelector((state) => state.userImage.success);
  const userImageErr = useSelector((state) => state.userImage.error);
  const userImageLoading = useSelector((state) => state.userImage.loading);


  console.log(userImage, "user image")
  const sendPasswordOtp = () => {
    setScreen({ screen: "ChangePassword", label: "Enter password" });
    const id = uuid.v4();
    const payload = {
      username: user,
      action: "ChangePassword",
      requestId: id,
      source: "mobile",
    };
    Keyboard.dismiss();
    setLoading(true);
    sendOtpAction(payload)
      .then((res) => {
        if (res.data.ResponseCode == "00") {
          navigation.navigate("ChangePassword", { user, id });
        } else {
          setOtpError(res.data.ResponseMessage);
        }
      })
      .catch((err) => {
        setOtpError(err.messsage || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  const sendPinOtp = () => {
    setScreen({ screen: "ChangePin", label: "Enter Password" });

    const id = uuid.v4();
    const payload = {
      username: user,
      action: "ChangePin",
      requestId: id,
      source: "mobile",
    };
    Keyboard.dismiss();
    setLoading(true);
    sendOtpAction(payload)
      .then((res) => {
        console.log(res, "pin res", payload);
        if (res.data.ResponseCode == "00") {
          navigation.navigate("ChangePin", { user, id });
        } else {
          setOtpError(res.data.ResponseMessage);
        }
      })
      .catch((err) => {
        console.log(err, "pin err");
        setOtpError(err.messsage || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  const getUserDetails = async () => {
    const item = await getItem("username");
    const item2 = await getItem("password");
    setUser(item);
    setPassword(item2);
  };
  const pickImage = async () => {
    console.log("picks");
    // No permissions request is necessary for launching the image library
    const camPermission = await ImagePicker.requestCameraPermissionsAsync();
    console.log(camPermission,  'permmm')
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const payload = {
        username: user,
        Base64ProfilePic: result.base64,
      };
      setImage(result.base64);
      dispatch(userImageAction(payload));
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  if (loading) {
    return <SpinnerImage />;
  }
  return (
    <View style={{ ...GLOBAL_STYLE.background, ...{ paddingHorizontal: 0 } }}>
      <ScrollView>
        <View style={styles.profileaBackground}>
          <View style={styles.centerProfileImage}>
            {userImageLoading == "pending" ? (
              <View style={styles.profileImageLoading}>
                <ActivityIndicator size="small" color={COLORS.primaryBlue} />
              </View>
            ) : !userImage  ? (
            <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
              <View>
              <ProfileAvatar /> 
              </View>
              <Pressable style={styles.iconContainer} onPress={pickImage}>
                    <Ionicons
                      name="camera"
                      size={20}
                      color={COLORS.primaryBlue}
                    />
                  </Pressable>
              </View>)  
              : (
              <View style={styles.profileIconContainer}>
                <Image
                  source={{ uri: `data:image/png;base64,${userImage}` }}
                  style={styles.profileImage}
                />
                {isAndroid ? (
                  <Pressable style={styles.iconContainer} onPress={pickImage}>
                    <Ionicons
                      name="camera"
                      size={20}
                      color={COLORS.primaryBlue}
                    />
                  </Pressable>
                ) : (
                  <TouchableOpacity onPress={pickImage} 
                  style={{}}>
                    <ChangeProfileImageIcon
                      style={{
                        marginLeft: SIZES.responsiveWidth("-12%"),
                        paddingBottom: SIZES.responsiveHeight("5%"),
                        paddingTop: 20
                      }}
                    />
                    {/* <Text>IOS</Text> */}
                  </TouchableOpacity>
                )}
              </View>
            )}

            <View >
              <Text style={styles.name}>{CustomerName}</Text>
              <TouchableOpacity
                style={styles.bvnContainer}
                onPress={copyToClipboard}
              >
                <Text style={styles.bvn}>{`BVN: ${bvn}`}</Text>
                <Ionicons name="md-copy" size={20} color={COLORS.primaryBlue} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <MenuLeftRightIcon
            label="Change Password"
            onPress={sendPasswordOtp}
            screen="ChangePassword"
          />
          <MenuLeftRightIcon
            label="Change Pin"
            onPress={sendPinOtp}
            screen="ChangePin"
          />
           <MenuLeftRightIcon
          label="Reset Pin"
          screen="PIN Reset"
          // onPress={() => sendPinOtp("ResetPin")}
          onPress={() => navigation.navigate("ResetPin", { user})}
        />
          {/* {/* <MenuLeftRightIcon 
           label="Lock Card"
           rightIcon={
             <ToggleSwitch
               isOn={isEnabled}
               onColor={COLORS.primaryBlue}
               offColor={COLORS.grey}
               // label="Save Beneficiary"
               labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
               size="small"
               onToggle={toggleSwitch}
             />
           }
          /> */}
          {/* <MenuLeftRightIcon 
             label="Enable 2Fa"
             rightIcon={
               <ToggleSwitch
                 isOn={isEnabled}
                 onColor={COLORS.primaryBlue}
                 offColor={COLORS.primaryBlue2}
                 // label="Save Beneficiary"
                 labelStyle={{ color: COLORS.primaryBlue, fontWeight: "900" }}
                 size="small"
                 onToggle={toggleSwitch}
               />
             }
          
             />  */}
        </View>

{/* <Formik
          initialValues={{
            otp: "",
            token: "",
            cardNo: "",
            cardDate: "",
            cvv: "",
            cardPin: "",
            verification: authType,
          }}
          enableReinitialize={true}
          validationSchema={
            authType == "SMS OTP" || authType == "Hard or Soft Token"
              ? otpValidationSchema
              : authType == "Debit Card"
              ? cardValidationSchema
              : verficationSchema
          }
          onSubmit={(values) => {
             setShowAuth(false)
             console.log(values.otp, values.verification, "test")
            //  sendTransactionHandler(values.verification, values.otp)
  
  
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
            console.log(errors, "error");
  
            return (
              <TwoFactorAuth
              title={"User Authorization"}
                dropDownOptions={[
                  { label: "SMS OTP", value: "SMS OTP" },
                  { label: "Debit Card", value: "Pan Card" },
                  { label: "Hard or Soft Token", value: "Hard or Soft Token" },
                ]}
                onChange={(item) => {
                  setAuthType(item.value);
                  // setShowInfo(false)
                }}
                authType={authType}
                dropdownValue={values.verification}
                // component={
                //   <SendAuthText
                //     data={{ amount, crAccountName, beneficiaryAcct, bankName }}
                //   />
                // }
                onSubmit={handleSubmit}
                onClose={() => setShowAuth(false)}
                // lgHeight
                // info
                show={showAuth}
                error={errors}
                onChangeOtp={handleChange("otp")}
                otpValue={values.otp}
                onBlur={handleBlur("otp")}
              />
            );
          }}
        </Formik> */}
   
      </ScrollView>
      <Text style={styles.version}>version 1.0</Text>
      <CustomSnackBar
        show={userImageErr || otpError}
        message={userImageErr || otpError}
      />
         <CustomSnackBar 
      show={otpError}
      message={otpError}
      />
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  profileaBackground: {
    backgroundColor: COLORS.grey2,
  },
  centerProfileImage: {
    alignItems: "center",
    marginTop: "15%",
  },
  profileIconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileImageLoading: {
    justifyContent: "center",
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: COLORS.grey,
  },
  iconContainer: {
    backgroundColor: "#A3D8F5",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: -50,
  },
  changeImage: {
    color: COLORS.primaryBlue,
    marginRight: 5,
  },
  name: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: "center",
    marginVertical: isAndroid ? 15 : 20,
  },
  bvnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "15%",
  },
  bvn: {
    color: COLORS.primaryBlue,
    fontFamily: FONTS.bold,
    fontSize: 16,
    textAlign: "center",
    marginRight: 10,
  },
  menuCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.primaryBlue,
    backgroundColor: "white",
    height: 60,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.grey,
    paddingHorizontal: 20,
    fontFamily: FONTS.normal,
  },
  menuCardContainerText: {
    color: COLORS.primaryBlue,
    marginLeft: 10,
    fontFamily: FONTS.normal,
  },
  version: {
    color: "#C4C4C4",
    textAlign: "center",
  },
});
